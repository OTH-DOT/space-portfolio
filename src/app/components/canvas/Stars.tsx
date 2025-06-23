'use client';

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const StarsCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const starsRef = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Capture the mount element in a variable for cleanup
    const mount: HTMLDivElement = mountRef.current 

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 1)
    mount.appendChild(renderer.domElement)

    // Create star geometry with varying brightness
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 8000
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

    // Create circular texture for rounded stars
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const context = canvas.getContext('2d')
    if (!context) return
    
    // Create radial gradient for circular star
    const gradient = context.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width / 2
    )
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)')
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    
    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)
    
    const texture = new THREE.CanvasTexture(canvas)

    // Create star material with glow effect and circular shape
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.004,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
      map: texture
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
      
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      
      renderer.dispose()
      starGeometry.dispose()
      starMaterial.dispose()
      texture.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef}
      className="top-0 fixed left-0 w-full h-full"
      style={{ background: '#000000' }}
    />
  )
}

export default StarsCanvas