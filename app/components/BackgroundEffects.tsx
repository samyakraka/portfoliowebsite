"use client"

import { motion } from "framer-motion"
import { useTheme } from "../contexts/ThemeContext"

export default function BackgroundEffects() {
  const { theme } = useTheme()

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          theme === "dark" ? "bg-blue-500" : "bg-blue-400"
        }`}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute top-3/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 ${
          theme === "dark" ? "bg-purple-500" : "bg-purple-400"
        }`}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-10 ${
          theme === "dark" ? "bg-cyan-500" : "bg-cyan-400"
        }`}
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Floating geometric shapes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-4 h-4 ${theme === "dark" ? "bg-blue-400/20" : "bg-blue-500/20"} rounded-full`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
