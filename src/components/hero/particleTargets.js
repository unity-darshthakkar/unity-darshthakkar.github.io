// ---------------------------------------------------------------------------
//  Procedurally generates three matched point clouds of identical length:
//    FACE  → a stylised human face/head
//    WIRE  → a tangled ball of wires (the "breaking apart" transition state)
//    ROBOT → a friendly robot with one arm raised, waving hello
//  Plus per-point attributes: a random seed, an explosion vector (for the
//  assemble-in intro) and a "wave mask" (1 near the robot's waving hand).
//
//  Because each cloud is sampled independently per index, morphing between
//  them reads as an organic swarm re-forming — exactly the intended flow.
// ---------------------------------------------------------------------------

const TAU = Math.PI * 2

// ---- low-level samplers ---------------------------------------------------
function onSphere(r, c = [0, 0, 0], sy = 1) {
  const u = Math.random()
  const v = Math.random()
  const theta = TAU * u
  const phi = Math.acos(2 * v - 1)
  const s = Math.sin(phi)
  return [
    c[0] + r * s * Math.cos(theta),
    c[1] + r * Math.cos(phi) * sy,
    c[2] + r * s * Math.sin(theta),
  ]
}

function inSphere(r, c = [0, 0, 0]) {
  const rr = r * Math.cbrt(Math.random())
  const p = onSphere(1)
  return [c[0] + p[0] * rr, c[1] + p[1] * rr, c[2] + p[2] * rr]
}

function onBox(w, h, d, c = [0, 0, 0]) {
  const hx = w / 2
  const hy = h / 2
  const hz = d / 2
  const aX = h * d
  const aY = w * d
  const aZ = w * h
  let pick = Math.random() * (aX + aY + aZ)
  const s = Math.random() < 0.5 ? -1 : 1
  let x, y, z
  if ((pick -= aX) < 0) {
    x = s * hx
    y = (Math.random() * 2 - 1) * hy
    z = (Math.random() * 2 - 1) * hz
  } else if ((pick -= aY) < 0) {
    y = s * hy
    x = (Math.random() * 2 - 1) * hx
    z = (Math.random() * 2 - 1) * hz
  } else {
    z = s * hz
    x = (Math.random() * 2 - 1) * hx
    y = (Math.random() * 2 - 1) * hy
  }
  return [c[0] + x, c[1] + y, c[2] + z]
}

function onSegment(p1, p2, jitter = 0.03) {
  const t = Math.random()
  return [
    p1[0] + (p2[0] - p1[0]) * t + (Math.random() - 0.5) * jitter,
    p1[1] + (p2[1] - p1[1]) * t + (Math.random() - 0.5) * jitter,
    p1[2] + (p2[2] - p1[2]) * t + (Math.random() - 0.5) * jitter,
  ]
}

function onPolyline(pts, jitter = 0.04) {
  // pick a segment weighted by its length
  let total = 0
  const segs = []
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i]
    const b = pts[i + 1]
    const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2])
    segs.push({ a, b, len })
    total += len
  }
  let r = Math.random() * total
  for (const s of segs) {
    if ((r -= s.len) <= 0) return onSegment(s.a, s.b, jitter)
  }
  const last = segs[segs.length - 1]
  return onSegment(last.a, last.b, jitter)
}

// smile arc: lowest in the middle, curling up at the ends
function onSmile(cx, cy, cz, width, depth, jitter = 0.03) {
  const t = Math.random() * 2 - 1
  return [
    cx + (t * width) / 2 + (Math.random() - 0.5) * jitter,
    cy - depth * (1 - t * t) + (Math.random() - 0.5) * jitter,
    cz + (Math.random() - 0.5) * jitter,
  ]
}

// ---- weighted multi-emitter cloud ----------------------------------------
function sampleCloud(count, emitters, out, offset = 0) {
  const total = emitters.reduce((s, e) => s + e.w, 0)
  for (let i = 0; i < count; i++) {
    let r = Math.random() * total
    let chosen = emitters[emitters.length - 1]
    for (const e of emitters) {
      if ((r -= e.w) <= 0) {
        chosen = e
        break
      }
    }
    const p = chosen.fn()
    const idx = (offset + i) * 3
    out[idx] = p[0]
    out[idx + 1] = p[1]
    out[idx + 2] = p[2]
  }
}

// ---- the three shapes -----------------------------------------------------
const faceEmitters = [
  { w: 50, fn: () => onSphere(2.0, [0, 0.1, 0], 1.12) }, // head
  { w: 6, fn: () => inSphere(0.24, [-0.72, 0.5, 1.72]) }, // left eye
  { w: 6, fn: () => inSphere(0.24, [0.72, 0.5, 1.72]) }, // right eye
  { w: 2.5, fn: () => onSegment([-1.06, 0.95, 1.6], [-0.42, 1.02, 1.66], 0.05) }, // left brow
  { w: 2.5, fn: () => onSegment([0.42, 1.02, 1.66], [1.06, 0.95, 1.6], 0.05) }, // right brow
  { w: 3.5, fn: () => onSegment([0, 0.32, 2.02], [0, -0.24, 2.06], 0.05) }, // nose bridge
  { w: 1.5, fn: () => onSegment([-0.18, -0.28, 2.03], [0.18, -0.28, 2.03], 0.04) }, // nose base
  { w: 7, fn: () => onSmile(0, -0.62, 1.98, 1.5, 0.32, 0.04) }, // mouth
]

const robotEmitters = [
  { w: 19, fn: () => onBox(1.7, 1.5, 1.4, [0, 1.55, 0]) }, // head
  { w: 1.5, fn: () => onSegment([0, 2.32, 0], [0, 2.95, 0], 0.03) }, // antenna
  { w: 2.5, fn: () => inSphere(0.16, [0, 3.05, 0]) }, // antenna bulb
  { w: 5, fn: () => inSphere(0.25, [-0.42, 1.68, 0.72]) }, // left eye
  { w: 5, fn: () => inSphere(0.25, [0.42, 1.68, 0.72]) }, // right eye
  { w: 4, fn: () => onSmile(0, 1.12, 0.74, 0.9, 0.14, 0.03) }, // mouth
  { w: 20, fn: () => onBox(1.8, 1.9, 1.05, [0, -0.25, 0]) }, // torso
  { w: 2, fn: () => inSphere(0.18, [0, 0.0, 0.56]) }, // chest light
  {
    w: 6,
    fn: () => onPolyline([[-1.06, 0.6, 0], [-1.28, -0.2, 0], [-1.24, -1.0, 0]]),
  }, // left arm (down)
  { w: 2.5, fn: () => inSphere(0.2, [-1.24, -1.12, 0]) }, // left hand
  {
    w: 7,
    fn: () => onPolyline([[1.06, 0.65, 0], [1.5, 1.3, 0.05], [1.72, 2.02, 0.2]]),
  }, // right arm (raised, waving)
  { w: 4, fn: () => inSphere(0.26, [1.74, 2.14, 0.22]) }, // right hand
  { w: 4, fn: () => onSegment([-0.5, -1.2, 0], [-0.52, -2.15, 0], 0.05) }, // left leg
  { w: 4, fn: () => onSegment([0.5, -1.2, 0], [0.52, -2.15, 0], 0.05) }, // right leg
  { w: 2, fn: () => onBox(0.55, 0.25, 0.75, [-0.52, -2.28, 0.12]) }, // left foot
  { w: 2, fn: () => onBox(0.55, 0.25, 0.75, [0.52, -2.28, 0.12]) }, // right foot
]

function buildWires(count, out) {
  const WIRES = 170
  const ends = []
  for (let i = 0; i < WIRES; i++) {
    ends.push([onSphere(2.5 + Math.random() * 0.7), onSphere(2.5 + Math.random() * 0.7)])
  }
  for (let i = 0; i < count; i++) {
    const [a, b] = ends[(Math.random() * WIRES) | 0]
    const t = Math.random()
    // base point along the wire
    let x = a[0] + (b[0] - a[0]) * t
    let y = a[1] + (b[1] - a[1]) * t
    let z = a[2] + (b[2] - a[2]) * t
    // helical twist + jitter so it reads as loose, tangled wiring
    const twist = Math.sin(t * Math.PI) * 0.5
    const ang = t * TAU * 2 + i
    x += Math.cos(ang) * twist * 0.4 + (Math.random() - 0.5) * 0.08
    y += Math.sin(ang) * twist * 0.4 + (Math.random() - 0.5) * 0.08
    z += (Math.random() - 0.5) * 0.08
    const idx = i * 3
    out[idx] = x
    out[idx + 1] = y
    out[idx + 2] = z
  }
}

export function buildParticleData(count = 6500) {
  const face = new Float32Array(count * 3)
  const wire = new Float32Array(count * 3)
  const robot = new Float32Array(count * 3)
  const rnd = new Float32Array(count)
  const wave = new Float32Array(count)
  const explode = new Float32Array(count * 3)

  sampleCloud(count, faceEmitters, face)
  sampleCloud(count, robotEmitters, robot)
  buildWires(count, wire)

  for (let i = 0; i < count; i++) {
    rnd[i] = Math.random()
    const rx = robot[i * 3]
    const ry = robot[i * 3 + 1]
    // wave mask: strongest at the raised right hand (high x, high y)
    const wx = Math.min(Math.max((rx - 0.9) / 0.9, 0), 1)
    const wy = Math.min(Math.max((ry - 0.6) / 1.4, 0), 1)
    wave[i] = wx * wy

    const e = onSphere(1)
    const mag = 0.6 + Math.random() * 0.9
    explode[i * 3] = e[0] * mag
    explode[i * 3 + 1] = e[1] * mag
    explode[i * 3 + 2] = e[2] * mag
  }

  return { count, face, wire, robot, rnd, wave, explode }
}
