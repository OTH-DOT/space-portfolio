import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const StarsCanvas = () => {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const starsRef = useRef(null)
  const animationIdRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 1)
    mountRef.current.appendChild(renderer.domElement)

    // Create star geometry with varying brightness
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 2000
    const positions = new Float32Array(starCount * 3)
    const colors = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)

    // Generate random positions in a sphere with varying brightness
    for (let i = 0; i < starCount; i++) {
      // Generate random point in sphere
      let x, y, z
      do {
        x = (Math.random() - 0.5) * 2
        y = (Math.random() - 0.5) * 2
        z = (Math.random() - 0.5) * 2
      } while (x * x + y * y + z * z > 1)

      // Scale to desired radius
      const radius = 1.5
      positions[i * 3] = x * radius
      positions[i * 3 + 1] = y * radius
      positions[i * 3 + 2] = z * radius

      // Create galaxy-like color variations (white to blue-white)
      const brightness = Math.random() * 0.5 + 0.5 // 0.5 to 1.0
      const blueShift = Math.random() * 0.3 // Slight blue tint for some stars
      
      colors[i * 3] = brightness // Red
      colors[i * 3 + 1] = brightness // Green  
      colors[i * 3 + 2] = Math.min(1, brightness + blueShift) // Blue

      // Varying star sizes for depth
      sizes[i] = Math.random() * 2 + 0.5
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Create star material with glow effect
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.004,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false
    })

    // Create points mesh
    const stars = new THREE.Points(starGeometry, starMaterial)
    stars.rotation.z = Math.PI / 4
    scene.add(stars)

    // Position camera
    camera.position.z = 1

    // Store refs
    sceneRef.current = scene
    rendererRef.current = renderer
    starsRef.current = stars

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      
      if (starsRef.current) {
        starsRef.current.rotation.x -= 0.0001
        starsRef.current.rotation.y -= 0.00006
      }
      
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return
      
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      if (renderer) {
        renderer.dispose()
      }
      
      if (starGeometry) {
        starGeometry.dispose()
      }
      
      if (starMaterial) {
        starMaterial.dispose()
      }
    }
  }, [])

  return (
    <div 
      ref={mountRef}
      className="top-0 left-0 w-full h-full"
      style={{ background: '#000000' }}
    />
  )
}

export default StarsCanvas