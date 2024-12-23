"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Header from "./components/Header";
import SocialLinks from "./components/SocialLinks";
import ProjectCard from "./components/ProjectCard";
import SkillCard from "./components/SkillCard";
import { useTheme } from "./contexts/ThemeContext";
import {
  Code,
  Database,
  Globe,
  Layout,
  Server,
  Brain,
  Link,
  Smartphone,
} from "lucide-react";

const projects = [
  {
    title: "Medical AI",
    description:
      "An AI-driven chatbot offering accurate medical information, preliminary assessments, and healthcare support. Users can input symptoms, get initial guidance, and access reliable data on conditions and treatments, with features like appointment scheduling assistance and a chat history available for up to a week.",
    image:
      "https://github.com/samyakraka/Medecro_AI_MediTech_Minds/blob/main/Medecro%20SS.jpeg?raw=true",
    github: "https://github.com/samyakraka/Medecro_AI_MediTech_Minds/",
    demo: "https://medecro-ai-medi-tech-minds.vercel.app/",
    tech: ["ML", "Flask", "MERN STACK"],
  },
  {
    title: "Song Recommendation System",
    description:
      "We have developed a song recommendation system utilizing Spotify data and user listening habits. Our primary goal was to leverage users listening habits while also collecting data directly from the users themselves.",
    image:
      "https://media.licdn.com/dms/image/v2/D4D2DAQHZSVnwZXRYTA/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1721847121055?e=1735322400&v=beta&t=65z6yc6KQRhtTqlv5Rt283k0IRju6UaTmjcL3jxAZiM",
    github: "https://github.com/samyakraka/Song-Recommendation-System",
    demo: "https://github.com/samyakraka/Song-Recommendation-System",
    tech: ["Python", "TKinter", "Spotipy"],
  },
  {
    title: "Praman: Resume Filtration",
    description:
      "Suraksha is our solution for Similar Document Template Matching. It extracts, standardises, and compares document templates to detect fraud, using blockchain, machine learning, and AI for security. Templates are securely stored on IPFS, and the system handles high document volumes efficiently.",
    image:
      "https://github.com/samyakraka/Sunhacks-2k24-Hackathon/blob/main/pramanportalss.png?raw=true",
    github: "https://github.com/samyakraka/Sunhacks-2k24-Hackathon",
    demo: "https://github.com/samyakraka/Sunhacks-2k24-Hackathon",
    tech: ["MERN Stack", "Python", "ML"],
  },
  {
    title: "YouTranscribe",
    description:
      "YouTranscribe is a powerful tool that allows users to transcribe, translate, and summarize audio content from YouTube videos seamlessly. With an intuitive user interface built on Streamlit, this application harnesses the capabilities of various libraries to enhance the accessibility and understanding of video content in different languages.",
    image:
      "https://github.com/samyakraka/YouTranscribe/blob/main/YouTranscribess.png?raw=true",
    github: "https://github.com/samyakraka/YouTranscribe",
    demo: "https://github.com/samyakraka/YouTranscribe",
    tech: ["Python", "Streamlit", "GTTs", "JSON"],
  },
  {
    title: "Dhan-Vruksha",
    description:
      "In Indias diverse linguistic landscape, our app bridges the language gap for financial services and cyber fraud protection. It translates between regional languages and English, processes financial documents, detects cyber fraud, complies with security laws, integrates OCR, supports various output modes, and encourages feedback.",
    image:
      "https://github.com/samyakraka/Kleos-Hackathon-Multi-Lingual-Financial-Security-Bridge/blob/main/DhanVrukshass.png?raw=true",
    github:
      "https://github.com/samyakraka/Kleos-Hackathon-Multi-Lingual-Financial-Security-Bridge",
    demo: "https://github.com/samyakraka/Kleos-Hackathon-Multi-Lingual-Financial-Security-Bridge",
    tech: ["HTML,CSS,JS", "Python", "Flask"],
  },
];

const skills = [
  { name: "Frontend Development", icon: Layout, color: "text-pink-500" },
  { name: "Backend Development", icon: Server, color: "text-blue-500" },
  { name: "Database Management", icon: Database, color: "text-green-500" },
  { name: "Web Development", icon: Globe, color: "text-purple-500" },
  { name: "Android Development", icon: Smartphone, color: "text-orange-500" },
  { name: "Problem Solving", icon: Code, color: "text-yellow-500" },
  { name: "Machine Learning", icon: Brain, color: "text-red-500" },
  { name: "Blockchain Development", icon: Link, color: "text-teal-500" },
];

export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <Header />

      <main className="flex-grow relative">
        {/* Hero Section */}
        <section
          id="home"
          className={`relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36 ${
            theme === "dark" ? "bg-black" : "bg-gray-100"
          }`}
        >
          <motion.div style={{ y }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-30" />
          </motion.div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1
                className={`text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl ${
                  theme === "dark" ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Samyak Raka
              </h1>
              <p
                className={`mt-6 text-lg ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Tech Enthusiast and Full Stack Developer passionate about
                creating innovative solutions
              </p>
              <div className="mt-8 flex justify-center">
                <motion.button
                  onClick={() =>
                    (window.location.href = "mailto:rakasamyak@gmail.com")
                  }
                  className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in Touch
                </motion.button>
              </div>
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <SocialLinks />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className={`py-20 relative ${
            theme === "dark" ? "bg-black" : "bg-gray-100"
          }`}
        >
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Skills & Expertise
            </motion.h2>
            <motion.p
              className={`text-center mb-12 max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Specialized in full-stack development with expertise in various
              technologies and frameworks
            </motion.p>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <SkillCard {...skill} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className={`py-20 relative ${
            theme === "dark" ? "bg-black" : "bg-gray-100"
          }`}
        >
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>
            <motion.p
              className={`text-center mb-12 max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Explore some of my recent work and personal projects
            </motion.p>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </motion.div>
            {projects.length > 3 && (
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="rounded-full bg-blue-500/10 border border-blue-500/20 px-6 py-2 text-blue-400 hover:bg-blue-500/20 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showAllProjects ? "Show Less" : "Show More"}
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className={`py-20 relative ${
            theme === "dark" ? "bg-black" : "bg-gray-100"
          }`}
        >
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Let&apos;s Connect
            </motion.h2>
            <motion.div
              className="max-w-md mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p
                className={`mb-8 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Interested in collaboration? Let&apos;s discuss your project and
                make something great together.
              </p>
              <motion.button
                onClick={() =>
                  (window.location.href = "mailto:rakasamyak@gmail.com")
                }
                className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 text-white shadow-lg hover:opacity-90 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer
        className={`relative border-t ${
          theme === "dark"
            ? "border-gray-800 bg-black"
            : "border-gray-200 bg-gray-100"
        } py-6`}
      >
        <div className="container mx-auto px-6 text-center">
          <SocialLinks />
          <p
            className={`mt-4 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            &copy; 2024 Samyak Raka. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
