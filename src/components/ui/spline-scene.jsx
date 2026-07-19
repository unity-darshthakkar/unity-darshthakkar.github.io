import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

// Interactive 3D scene loaded from Spline. Lazy-loaded so the heavy runtime
// only ships when the hero mounts.
export function SplineScene({ scene, className, onLoad }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="loader" />
        </div>
      }
    >
      <Spline scene={scene} className={className} onLoad={onLoad} />
    </Suspense>
  )
}
