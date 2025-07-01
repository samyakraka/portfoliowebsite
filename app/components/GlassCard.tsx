"use client"

import { motion } from "framer-motion"
import { useTheme } from "../contexts/ThemeContext"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  const { theme } = useTheme()

  return (
    <motion.div
      className={`
        relative backdrop-blur-xl border border-opacity-20 rounded-3xl overflow-hidden
        ${
          theme === "dark"
            ? "bg-white/5 border-white/10 shadow-2xl shadow-black/20"
            : "bg-white/40 border-white/20 shadow-2xl shadow-black/10"
        }
        ${className}
      `}
      whileHover={
        hover
          ? {
              scale: 1.02,
              rotateX: 5,
              rotateY: 5,
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Border glow effect */}
      <div
        className={`absolute inset-0 rounded-3xl ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20"
            : "bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
      />
    </motion.div>
  )
}
