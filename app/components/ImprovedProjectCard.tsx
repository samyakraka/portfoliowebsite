"use client";

import Image from "next/image";
import { Github, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  tech: string[];
}

export default function ImprovedProjectCard({
  title,
  description,
  image,
  github,
  demo,
  tech,
}: ProjectCardProps) {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const shortDescription =
    description.length > 120
      ? description.substring(0, 120) + "..."
      : description;

  return (
    <motion.div
      className={`group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-blue-600"
          : "bg-gradient-to-br from-slate-50 to-white border-gray-200 hover:border-blue-300"
      }`}
      whileHover={{ y: -8 }}
      layout
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-t from-black/60 via-transparent to-transparent"
              : "bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"
          }`}
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 backdrop-blur-sm rounded-full text-white transition-colors ${
              theme === "dark"
                ? "bg-black/20 hover:bg-black/40"
                : "bg-white/20 hover:bg-white/30"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="w-4 h-4" />
          </motion.a>
          <motion.a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 backdrop-blur-sm rounded-full text-white transition-colors ${
              theme === "dark"
                ? "bg-black/20 hover:bg-black/40"
                : "bg-white/20 hover:bg-white/30"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h3>

        <AnimatePresence mode="wait">
          <motion.div
            key={isExpanded ? "expanded" : "collapsed"}
            initial={{ opacity: 0, height: "auto" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p
              className={`mb-4 leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {isExpanded ? description : shortDescription}
            </p>
          </motion.div>
        </AnimatePresence>

        {description.length > 120 && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-1 text-sm font-medium mb-4 transition-colors ${
              theme === "dark"
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Read More <ChevronDown className="w-4 h-4" />
              </>
            )}
          </motion.button>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item, index) => (
            <motion.span
              key={item}
              className={`px-3 py-1 text-xs font-medium rounded-full border ${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-blue-300 border-blue-700"
                  : "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {item}
            </motion.span>
          ))}
        </div>

        <div className="flex gap-4">
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
              theme === "dark"
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-4 h-4" />
            Code
          </motion.a>
          <motion.a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-4 h-4" />
            Demo
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
