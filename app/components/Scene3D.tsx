"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment } from "@react-three/drei"
import type * as THREE from "three"

function FloatingLaptop() {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[2, 0.1, 1.5]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <mesh position={[0, 0.5, -0.7]}>
          <boxGeometry args={[2, 1.2, 0.1]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      </group>
    </Float>
  )
}

function ParticleField() {
  const points = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05
      points.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  const particlesPosition = new Float32Array(1000 * 3)
  for (let i = 0; i < 1000; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 10
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 10
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={1000} array={particlesPosition} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#3b82f6" />
    </points>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingLaptop />
        <ParticleField />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
