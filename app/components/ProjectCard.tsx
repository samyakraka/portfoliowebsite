import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  github: string
  demo: string
  tech: string[]
}

export default function ProjectCard({ title, description, image, github, demo, tech }: ProjectCardProps) {
  return (
    <motion.div 
      className="group bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 border border-gray-800 hover:border-blue-500/50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item) => (
            <span
              key={item}
              className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </motion.a>
          <motion.a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Live Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
