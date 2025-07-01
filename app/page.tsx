'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from './components/Header'
import SocialLinks from './components/SocialLinks'
import ProjectCard from './components/ProjectCard'
import SkillCard from './components/SkillCard'
import { useTheme } from './contexts/ThemeContext'
import { Code, Database, FileCode, GitGraphIcon as Git, Globe, Layout, Server, Brain, Link, Smartphone } from 'lucide-react'

const projects = [
  {
    "title": "Medibites",
    "description": "Medibites is a comprehensive full-stack web platform that integrates advanced healthcare and smart food services into one seamless experience. Powered by AI and blockchain, it offers features like personalized medical booking, disease prediction, secure health data management, remote video consultations, and smart food ordering with real-time food image analysis, nutrition tracking, and personalized menu recommendations — all designed to improve health and wellness in an intelligent, user-friendly way.",
    "image": "https://github.com/samyakraka/Medibites/blob/master/medibites-img.png?raw=true",
    "github": "https://github.com/samyakraka/Medibites",
    "demo": "https://medibites.vercel.app/",
    "tech": ["Web", "AI", "Blockchain"]
  },
  {
    "title": "EventHub",
    "description": "EventHub is a full-stack web app for discovering and managing events, built with Next.js, MongoDB, Firebase, and Express.js.",
    "image": "https://github.com/samyakraka/eventhub-frontend/blob/main/eventhub.png?raw=true",
    "github": "https://github.com/samyakraka/eventhub-frontend",
    "demo": "https://eventhub2.vercel.app/",
    "tech": ["Next.js", "MongoDB", "AI"]
  },
  {
    "title": "Research AI Agent",
    "description": "An AI research assistant that generates research summaries and documents using LangChain, Flask, and a user-friendly interface.",
    "image": "https://github.com/samyakraka/research-ai-agent/blob/main/research%20ai%20agent.png?raw=true",
    "github": "https://github.com/samyakraka/research-ai-agent",
    "demo": "https://research-ai-agent.vercel.app/",
    "tech": ["AI", "LangChain", "Flask"]
  },
  {
    "title": "SocioDev",
    "description": "SocioDev is a React Native-powered social media app for developers to share articles, connect with peers, and grow their network. Features include user profiles, article publishing, bookmarking, AI-generated content, and Firebase integration.",
    "image": "https://github.com/samyakraka/SocioDev/blob/main/sociodev-app.jpg?raw=true",
    "github": "https://github.com/samyakraka/SocioDev",
    "demo": "https://github.com/samyakraka/SocioDev",
    "tech": ["React Native", "AI", "App"]
  },
  
  {
    "title": "YouTranscribe",
    "description": "YouTranscribe enables users to transcribe, translate, and summarize YouTube audio content using an intuitive Streamlit interface.",
    "image": "https://github.com/samyakraka/YouTranscribe/blob/main/YouTranscribess.png?raw=true",
    "github": "https://github.com/samyakraka/YouTranscribe",
    "demo": "https://github.com/samyakraka/YouTranscribe",
    "tech": ["Python", "Streamlit", "GTTs", "JSON"]
  },
  {
    "title": "Song Recommendation System",
    "description": "A personalized song recommender built using Spotify data and user listening habits, leveraging Spotipy and Python GUI for interactive experiences.",
    "image": "https://github.com/samyakraka/Song-Recommendation-System/blob/main/Sample1.jpg?raw=true",
    "github": "https://github.com/samyakraka/Song-Recommendation-System",
    "demo": "https://github.com/samyakraka/Song-Recommendation-System",
    "tech": ["Python", "TKinter", "Spotipy"]
  },
  {
    "title": "ATS Scorer",
    "description": "An intelligent system for job seekers & HR professionals to analyze, rank, and optimize resumes using AI and NLP.",
    "image": "https://github.com/samyakraka/Resume-filtration/blob/main/resume-filtration.png?raw=true",
    "github": "https://github.com/samyakraka/Resume-filtration",
    "demo": "https://resumefiltration.vercel.app/",
    "tech": ["MERN Stack", "Python", "ML"]
  },
  {
    "title": "SmartBin",
    "description": "IoT-based smart waste management system using ultrasonic sensors and real-time data tracking with Flask and Arduino.",
    "image": "https://github.com/samyakraka/Smart-Bin/blob/main/smartbin.png?raw=true",
    "github": "https://github.com/samyakraka/Smart-Bin",
    "demo": "https://smart-bin-26tv.onrender.com/",
    "tech": ["IoT", "Flask", "JSON"]
  },
  {
    "title": "FlexiCare",
    "description": "A webcam-based app for real-time posture correction using computer vision and ML, offering instant feedback and progress tracking.",
    "image": "https://github.com/samyakraka/flexi-care/blob/main/FlexiCare.png?raw=true",
    "github": "https://github.com/samyakraka/flexi-care",
    "demo": "https://flexi-care.onrender.com/",
    "tech": ["Python", "ML", "MediaPipe"]
  },
  
  {
    "title": "Astralytics",
    "description": "AI-powered analytics platform for tracking social media engagement using LangFlow and Astra DB with actionable insights.",
    "image": "https://github.com/samyakraka/Astralytics/blob/main/astralytics.png?raw=true",
    "github": "https://github.com/samyakraka/Astralytics",
    "demo": "https://astralytics.vercel.app/",
    "tech": ["AI", "LangFlow", "Next.js"]
  },
  {
    "title": "Article Summarization",
    "description": "A web tool for summarizing long-form articles using AI, developed for OpenHack IISC Bangalore.",
    "image": "https://github.com/samyakraka/Article-Summarization/blob/main/article-summarization.png?raw=true",
    "github": "https://github.com/samyakraka/Article-Summarization",
    "demo": "https://article-summarization-open-hack-iisc-bangalore.vercel.app/",
    "tech": ["HTML", "JavaScript", "AI"]
  }
]

const skills = [
  { name: 'Frontend Development', icon: Layout, color: 'text-pink-500' },
  { name: 'Backend Development', icon: Server, color: 'text-blue-500' },
  { name: 'Database Management', icon: Database, color: 'text-green-500' },
  { name: 'Web Development', icon: Globe, color: 'text-purple-500' },
  { name: 'Android Development', icon: Smartphone, color: 'text-orange-500' },
  { name: 'Problem Solving', icon: Code, color: 'text-yellow-500' },
  { name: 'Machine Learning', icon: Brain, color: 'text-red-500' },
  { name: 'Blockchain Development', icon: Link, color: 'text-teal-500' },
];

export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false)
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3)

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <Header />
      
      <main className="flex-grow relative">
        {/* Hero Section */}
        <section id="home" className={`relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36 ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'}`}>
          <motion.div
            style={{ y }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-30" />
          </motion.div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className={`text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                Samyak Raka
              </h1>
              <p className={`mt-6 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Web & ML Developer | Passionate About Innovation and Impact
              </p>
              <div className="mt-8 flex justify-center">
                <motion.button 
                  onClick={() => window.location.href = 'mailto:samyakraka2908@gmail.com'}
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
        <section id="skills" className={`py-20 relative ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'}`}>
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
              className={`text-center mb-12 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Specialized in full-stack development with expertise in various technologies and frameworks
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
        <section id="projects" className={`py-20 relative ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'}`}>
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
              className={`text-center mb-12 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
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
                  {showAllProjects ? 'Show Less' : 'Show More'}
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-20 relative ${theme === 'dark' ? 'bg-black' : 'bg-gray-100'}`}>
          <div className="container mx-auto px-6">
            <motion.h2 
              className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Let's Connect
            </motion.h2>
            <motion.div 
              className="max-w-md mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Interested in collaboration? Let's discuss your project and make something great together.
              </p>
              <motion.button
                onClick={() => window.location.href = 'mailto:samyakraka2908@gmail.com'}
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

      <footer className={`relative border-t ${theme === 'dark' ? 'border-gray-800 bg-black' : 'border-gray-200 bg-gray-100'} py-6`}>
        <div className="container mx-auto px-6 text-center">
          <SocialLinks />
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>&copy; 2024 Samyak Raka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
