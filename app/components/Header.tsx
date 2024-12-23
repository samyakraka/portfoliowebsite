"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";

export default function Header() {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close the mobile menu after clicking
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === "dark"
            ? "bg-black/80 backdrop-blur-md shadow-lg"
            : "bg-white/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Samyak Raka
          </Link>
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
          <motion.ul
            className={`md:flex md:items-center md:space-x-6 ${
              isMenuOpen
                ? theme === "dark"
                  ? "absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md shadow-lg p-4 border-t border-gray-800"
                  : "absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg p-4 border-t border-gray-200"
                : "hidden"
            } md:relative md:bg-transparent md:p-0 md:border-none md:shadow-none`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <li className="py-2 md:py-0">
              <Link
                href="#home"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("home")}
                >
                  Home
                </motion.span>
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link
                href="#skills"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("skills")}
                >
                  Skills
                </motion.span>
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link
                href="#projects"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("projects")}
                >
                  Projects
                </motion.span>
              </Link>
            </li>
            <li className="py-2 md:py-0">
              <Link
                href="#contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("contact")}
                >
                  Contact
                </motion.span>
              </Link>
            </li>
            <li className="py-2 md:py-0 md:ml-6">
              <ThemeToggle />
            </li>
          </motion.ul>
        </div>
      </nav>
    </motion.header>
  );
}
