import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"

// Simple Loader component (since you're importing from "../Loader")
const Loader = () => (
  <div style={{ 
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '18px',
    zIndex: 10
  }}>
    Loading 3D Model...
  </div>
)

const Earth = () => {
  const earth = useGLTF("/earth/scene.gltf")

  // Debug: Check if the model loaded
  console.log("Earth model:", earth)

  return (
    <primitive 
      object={earth.scene}
      scale={0.8}  // Adjusted for 200x200 container
      position={[0, 0, 0]}  // Centered
      rotation={[0, 0, 0]}
    />
  )
}

const EarthCanvas = () => {
  return (
    <div style={{ 
      width: '300px', 
      height: '300px', 
      position: 'relative',
      margin: '0 auto' // Center the canvas
    }}>
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 25,  // Reduced FOV for tighter view
          near: 0.1,
          far: 200,
          position: [0, 0, 5]  // Closer, centered position
        }}
      >
        <Suspense fallback={null}>
          {/* CRITICAL: Add lighting - this is why your model wasn't visible */}
          <ambientLight intensity={0.15} />
          <directionalLight position={[-20, 50, 10]} intensity={1} />
          <hemisphereLight intensity={0.35} groundColor="black" />
          <pointLight intensity={1} />
          <spotLight
            position={[-20, 50, 10]}
            angle={0.12}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={1024}
          />
          
          <OrbitControls 
            autoRotate
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />

          <Earth />
          <Preload all />
        </Suspense>
      </Canvas>
      
      {/* Loader outside Canvas */}
      <Suspense fallback={
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '14px',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          Loading...
        </div>
      }>
        <div style={{ display: 'none' }} />
      </Suspense>
    </div>
  )
}

// Preload the GLTF model
useGLTF.preload("/moon/scene.gltf")

export default EarthCanvas