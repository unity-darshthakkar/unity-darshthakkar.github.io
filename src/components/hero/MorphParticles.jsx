import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { buildParticleData } from './particleTargets'

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;     // 0=face, 1=wire, 2=robot
  uniform float uWave;      // 0..1 waving intensity
  uniform float uAssembly;  // 0=exploded, 1=formed
  uniform float uSize;

  attribute vec3 aWire;
  attribute vec3 aRobot;
  attribute vec3 aExplode;
  attribute float aRnd;
  attribute float aWave;

  varying float vRnd;
  varying float vGlow;

  void main() {
    vec3 face = position;
    vec3 target;
    if (uMorph < 1.0) {
      target = mix(face, aWire, smoothstep(0.0, 1.0, uMorph));
    } else {
      target = mix(aWire, aRobot, smoothstep(0.0, 1.0, uMorph - 1.0));
    }

    // waving hand
    float wv = uWave * aWave;
    target.x += sin(uTime * 7.0 + aRnd * 2.0) * 0.4 * wv;
    target.y += cos(uTime * 7.0) * 0.06 * wv;

    // subtle idle drift so it never feels static
    target += 0.02 * vec3(
      sin(uTime * 0.8 + aRnd * 6.28),
      cos(uTime * 0.9 + aRnd * 5.0),
      sin(uTime * 0.7 + aRnd * 3.0)
    );

    // assemble-in from an exploded shell
    vec3 startPos = target + aExplode * 7.0;
    vec3 pos = mix(startPos, target, uAssembly);

    vRnd = aRnd;
    vGlow = 0.65 + 0.35 * wv;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    // perspective-correct, DPR-aware point size (kept small ~2-5 css px)
    gl_PointSize = uSize * (22.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  uniform float uAssembly;

  varying float vRnd;
  varying float vGlow;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.05, d);
    vec3 color = mix(uColorA, uColorB, vRnd) * vGlow;
    gl_FragColor = vec4(color, a * uOpacity * uAssembly);
  }
`

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function MorphParticles({ uniforms, theme }) {
  const groupRef = useRef()
  const { size, gl } = useThree()
  const pointer = useRef({ x: 0, y: 0 })

  const data = useMemo(() => buildParticleData(5200), [])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(data.face, 3))
    g.setAttribute('aWire', new THREE.BufferAttribute(data.wire, 3))
    g.setAttribute('aRobot', new THREE.BufferAttribute(data.robot, 3))
    g.setAttribute('aExplode', new THREE.BufferAttribute(data.explode, 3))
    g.setAttribute('aRnd', new THREE.BufferAttribute(data.rnd, 1))
    g.setAttribute('aWave', new THREE.BufferAttribute(data.wave, 1))
    g.setDrawRange(0, data.count)
    return g
  }, [data])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, uniforms])

  // Self-contained assemble: forms + fades the face in shortly after mount,
  // independent of the preloader so it can never get stuck invisible.
  useEffect(() => {
    if (prefersReduced) {
      uniforms.uAssembly.value = 1
      return
    }
    uniforms.uAssembly.value = 0
    const tween = gsap.to(uniforms.uAssembly, {
      value: 1,
      duration: 2.2,
      delay: 0.4,
      ease: 'power2.out',
    })
    return () => tween.kill()
  }, [uniforms])

  // Mouse parallax (properly cleaned up)
  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05) // clamp so tab-switch jumps don't spike
    uniforms.uTime.value += dt
    const dpr = gl.getPixelRatio ? gl.getPixelRatio() : 1
    uniforms.uSize.value = dpr * (1.0 + Math.min(size.width, 1600) / 2600)

    const g = groupRef.current
    if (!g) return
    const morph = uniforms.uMorph.value
    const idleSpin = morph < 1 ? dt * 0.3 : dt * 0.05
    g.rotation.y += idleSpin
    if (morph > 1.4) {
      // settle the robot to face forward
      g.rotation.y += (0 - (g.rotation.y % (Math.PI * 2))) * Math.min(1, dt * 2)
    }
    const tx = pointer.current.y * 0.12
    g.rotation.x += (tx - g.rotation.x) * Math.min(1, dt * 2)
    g.position.x += (pointer.current.x * 0.25 - g.position.x) * Math.min(1, dt * 2)
  })

  return (
    <group ref={groupRef}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  )
}
