"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Download } from "lucide-react"
import Header from "./components/Header"
import SocialLinks from "./components/SocialLinks"
import ImprovedProjectCard from "./components/ImprovedProjectCard"
import GlassCard from "./components/GlassCard"
import AnimatedSection from "./components/AnimatedSection"
import BackgroundEffects from "./components/BackgroundEffects"
import { useTheme } from "./contexts/ThemeContext"

const projects = [
  {
    title: "Medibites",
    description:
      "Medibites is a comprehensive full-stack web platform that integrates advanced healthcare and smart food services into one seamless experience. Powered by AI and blockchain, it offers features like personalized medical booking, disease prediction, secure health data management, remote video consultations, and smart food ordering with real-time food image analysis, nutrition tracking, and personalized menu recommendations — all designed to improve health and wellness in an intelligent, user-friendly way.",
    image: "https://github.com/samyakraka/Medibites/blob/master/medibites-img.png?raw=true",
    github: "https://github.com/samyakraka/Medibites",
    demo: "https://medibites.vercel.app/",
    tech: ["Web", "AI", "Blockchain"],
  },
  {
    title: "EventHub",
    description:
      "EventHub is a full-stack web app for discovering and managing events, built with Next.js, MongoDB, Firebase, and Express.js.",
    image: "https://github.com/samyakraka/eventhub-frontend/blob/main/eventhub.png?raw=true",
    github: "https://github.com/samyakraka/eventhub-frontend",
    demo: "https://eventhub2.vercel.app/",
    tech: ["Next.js", "MongoDB", "AI"],
  },
  {
    title: "Research AI Agent",
    description:
      "An AI research assistant that generates research summaries and documents using LangChain, Flask, and a user-friendly interface.",
    image: "https://github.com/samyakraka/research-ai-agent/blob/main/research%20ai%20agent.png?raw=true",
    github: "https://github.com/samyakraka/research-ai-agent",
    demo: "https://research-ai-agent.vercel.app/",
    tech: ["AI", "LangChain", "Flask"],
  },
  {
    title: "SocioDev",
    description:
      "SocioDev is a React Native-powered social media app for developers to share articles, connect with peers, and grow their network. Features include user profiles, article publishing, bookmarking, AI-generated content, and Firebase integration.",
    image: "https://github.com/samyakraka/SocioDev/blob/main/sociodev-app.jpg?raw=true",
    github: "https://github.com/samyakraka/SocioDev",
    demo: "https://github.com/samyakraka/SocioDev",
    tech: ["React Native", "AI", "App"],
  },
  {
    title: "YouTranscribe",
    description:
      "YouTranscribe enables users to transcribe, translate, and summarize YouTube audio content using an intuitive Streamlit interface.",
    image: "https://github.com/samyakraka/YouTranscribe/blob/main/YouTranscribess.png?raw=true",
    github: "https://github.com/samyakraka/YouTranscribe",
    demo: "https://github.com/samyakraka/YouTranscribe",
    tech: ["Python", "Streamlit", "GTTs", "JSON"],
  },
  {
    title: "Song Recommendation System",
    description:
      "A personalized song recommender built using Spotify data and user listening habits, leveraging Spotipy and Python GUI for interactive experiences.",
    image: "https://github.com/samyakraka/Song-Recommendation-System/blob/main/Sample1.jpg?raw=true",
    github: "https://github.com/samyakraka/Song-Recommendation-System",
    demo: "https://github.com/samyakraka/Song-Recommendation-System",
    tech: ["Python", "TKinter", "Spotipy"],
  },
  {
    title: "ATS Scorer",
    description:
      "An intelligent system for job seekers & HR professionals to analyze, rank, and optimize resumes using AI and NLP.",
    image: "https://github.com/samyakraka/Resume-filtration/blob/main/resume-filtration.png?raw=true",
    github: "https://github.com/samyakraka/Resume-filtration",
    demo: "https://resumefiltration.vercel.app/",
    tech: ["MERN Stack", "Python", "ML"],
  },
  {
    title: "SmartBin",
    description:
      "IoT-based smart waste management system using ultrasonic sensors and real-time data tracking with Flask and Arduino.",
    image: "https://github.com/samyakraka/Smart-Bin/blob/main/smartbin.png?raw=true",
    github: "https://github.com/samyakraka/Smart-Bin",
    demo: "https://smart-bin-26tv.onrender.com/",
    tech: ["IoT", "Flask", "JSON"],
  },
  {
    title: "FlexiCare",
    description:
      "A webcam-based app for real-time posture correction using computer vision and ML, offering instant feedback and progress tracking.",
    image: "https://github.com/samyakraka/flexi-care/blob/main/FlexiCare.png?raw=true",
    github: "https://github.com/samyakraka/flexi-care",
    demo: "https://flexi-care.onrender.com/",
    tech: ["Python", "ML", "MediaPipe"],
  },
  {
    title: "Astralytics",
    description:
      "AI-powered analytics platform for tracking social media engagement using LangFlow and Astra DB with actionable insights.",
    image: "https://github.com/samyakraka/Astralytics/blob/main/astralytics.png?raw=true",
    github: "https://github.com/samyakraka/Astralytics",
    demo: "https://astralytics.vercel.app/",
    tech: ["AI", "LangFlow", "Next.js"],
  },
  {
    title: "Article Summarization",
    description: "A web tool for summarizing long-form articles using AI, developed for OpenHack IISC Bangalore.",
    image: "https://github.com/samyakraka/Article-Summarization/blob/main/article-summarization.png?raw=true",
    github: "https://github.com/samyakraka/Article-Summarization",
    demo: "https://article-summarization-open-hack-iisc-bangalore.vercel.app/",
    tech: ["HTML", "JavaScript", "AI"],
  },
]

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Python", "C", "C++", "Java", "HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Machine Learning",
    skills: ["TensorFlow", "PyTorch", "NumPy", "Pandas", "OpenCV", "Langflow", "Langchain", "NLP"],
  },
  {
    title: "Web Development",
    skills: [
      "Flask",
      "Django",
      "MySQL",
      "MongoDB",
      "Bootstrap",
      "Firebase",
      "ReactJS",
      "ExpressJS",
      "NodeJS",
      "NextJS",
      "Streamlit",
    ],
  },
  {
    title: "APIs and Tools",
    skills: ["Google Cloud", "Gemini API", "yt-dlp", "SpeechRecognition", "gTTS", "Text Analytics"],
  },
  {
    title: "Developer Tools",
    skills: ["Git", "Google Cloud", "VS Code", "Visual Studio", "AWS", "Arduino IDE", "JSON", "Android Studio"],
  },
  {
    title: "Others",
    skills: [
      "Arduino",
      "Raspberry Pi",
      "Figma",
      "Canva",
      "MS Excel",
      "AstraDB",
      "Data Structures",
      "Algorithms",
      "React Native",
    ],
  },
]

const education = [
  {
    degree: "B.TECH IN COMPUTER ENGINEERING",
    period: "2022 - 2026",
    institution: "K. K. Wagh Institute of Engineering Education and Research, Nashik",
    grade: "CGPA: 8.61",
  },
  {
    degree: "HIGHER SECONDARY (HSC)",
    period: "2020 - 2022",
    institution: "Matoshri Junior College, Mhasrul, Nashik",
    grade: "Percentage: 83%",
  },
  {
    degree: "SECONDARY (SSC)",
    period: "2020",
    institution: "Espalier The Experimental School, Nashik",
    grade: "Percentage: 89.80%",
  },
]

const achievements = [
  "Winner, Technitude Global Hackathon, SP Jain Institute of Management & Research, Sydney",
  "Winner of Inter-Department Database Management Systems Competition",
  "Finalist, Smart India Hackathon 2024",
  "Top 10 Finalist, Shaastra Smart City Challenge, IIT Madras",
]

const experience = [
  {
    title: "AI Enablement Intern – Founder's Office",
    company: "Crowdera",
    period: "Jun 2025 - Present",
    description:
      "Working directly with the Founder's Office on AI-driven initiatives across business functions, product strategy, and operational efficiency. Contributing to AI automation solutions, cross-functional collaboration, and strategic decision-making through data analysis.",
  },
  {
    title: "Open Source Contributor",
    company: "Hacktoberfest 2023 and 2024",
    period: "Oct 2023, 2024",
    description:
      "Contributed to 14+ open-source repositories, improving documentation, fixing bugs, and adding new features. Gained hands-on experience in collaborative coding for a community of over 10,000+ developers globally.",
  },
]

const responsibilities = [
  {
    title: "Student Ambassador",
    organization: "IDS Bharat Blockchain Network",
    period: "Dec 2024 - Present",
  },
  {
    title: "Creatives/Social Media Head",
    organization: "Debugger's Club KKWIEER",
    period: "Sep 2024 - Present",
  },
  {
    title: "Committee Member",
    organization: "Institutions Innovation Council",
    period: "Oct 2023 - Present",
  },
  {
    title: "Head of Hackathon Operations",
    organization: "Innov-era National Level Hackathon",
    period: "Jan 2025 - Mar 2025",
  },
]

export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false)
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 6)

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = "/Samyak_Raka_CV.pdf"
    link.download = "Samyak_Raka_CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-x-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      <BackgroundEffects />
      <Header />

      <main className="flex-grow relative">
        {/* Hero Section */}
        <section
          id="home"
          className={`relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36 min-h-screen flex items-center`}
        >
          <motion.div style={{ y, opacity, scale }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
          </motion.div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.25, 0, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="relative inline-block mb-8"
              >
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-6 relative">
                  Samyak Raka
                </h1>
              </motion.div>

              <motion.p
                className={`text-xl sm:text-2xl mb-12 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Software Engineer | Web & ML Developer
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <motion.button
                  onClick={() => (window.location.href = "mailto:rakasamyak@gmail.com")}
                  className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white rounded-full font-semibold text-lg shadow-2xl overflow-hidden"
                  whileHover={{ scale: 1.05, rotateX: 10 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Get in Touch</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                </motion.button>

                <motion.button
                  onClick={downloadCV}
                  className={`group relative px-10 py-5 border-2 border-blue-500 text-blue-500 rounded-full font-semibold text-lg hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-3 backdrop-blur-sm ${
                    theme === "dark" ? "bg-white/5" : "bg-white/20"
                  }`}
                  whileHover={{ scale: 1.05, rotateX: 10 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download CV
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <SocialLinks />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Me Section */}
        <AnimatedSection
          id="about"
          className={`py-24 relative ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-100/50"} backdrop-blur-sm`}
        >
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            <GlassCard className="max-w-5xl mx-auto p-12">
              <motion.p
                className={`text-xl leading-relaxed text-center ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Computer Engineering undergrad passionate about technology, with strong skills in software development,
                AI/ML, and frontend engineering. Led impactful projects in healthcare, IoT and digital security through
                academic work and national-level hackathons. Driven to explore emerging technologies and build smart,
                real-world solutions that create meaningful impact.
              </motion.p>
            </GlassCard>
          </div>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection
          id="skills"
          className={`py-24 relative ${theme === "dark" ? "bg-gray-950/50" : "bg-white/50"} backdrop-blur-sm`}
          delay={0.2}
        >
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Skills & Expertise
            </motion.h2>
            <motion.p
              className={`text-center mb-16 max-w-2xl mx-auto text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Specialized in full-stack development with expertise in various technologies and frameworks
            </motion.p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <GlassCard className="p-8 h-full group">
                    <h3 className="font-bold mb-6 text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          className={`px-4 py-2 text-sm rounded-full font-medium backdrop-blur-sm ${
                            theme === "dark"
                              ? "bg-gray-800/50 text-gray-300 border border-gray-600/50"
                              : "bg-gray-100/50 text-gray-700 border border-gray-300/50"
                          } hover:scale-110 transition-all duration-300 cursor-default`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: skillIndex * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: theme === "dark" ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection
          id="projects"
          className={`py-24 relative ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-100/50"} backdrop-blur-sm`}
          delay={0.3}
        >
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>
            <motion.p
              className={`text-center mb-16 max-w-2xl mx-auto text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Explore some of my recent work and personal projects
            </motion.p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <ImprovedProjectCard {...project} />
                </motion.div>
              ))}
            </div>
            {projects.length > 6 && (
              <motion.div
                className="text-center mt-16"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold text-lg shadow-2xl backdrop-blur-sm"
                  whileHover={{ scale: 1.05, rotateX: 10 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {showAllProjects ? "Show Less" : "Show More Projects"}
                </motion.button>
              </motion.div>
            )}
          </div>
        </AnimatedSection>

        {/* Education Section */}
        <AnimatedSection
          id="education"
          className={`py-24 relative ${theme === "dark" ? "bg-gray-950/50" : "bg-white/50"} backdrop-blur-sm`}
          delay={0.4}
        >
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Education
            </motion.h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50, rotateY: -10 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <GlassCard className="p-8">
                    <h3 className="font-bold text-2xl mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {edu.degree}
                    </h3>
                    <p className={`text-lg mb-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {edu.period}
                    </p>
                    <p className={`mb-3 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      {edu.institution}
                    </p>
                    <p
                      className={`font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
                    >
                      {edu.grade}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Professional Experience Section */}
        <AnimatedSection
          id="experience"
          className={`py-24 relative ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-100/50"} backdrop-blur-sm`}
          delay={0.5}
        >
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Professional Experience
            </motion.h2>
            <div className="max-w-4xl mx-auto space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <GlassCard className="p-8">
                    <h3 className="font-bold text-2xl mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {exp.title}
                    </h3>
                    <p className={`font-semibold mb-3 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      {exp.company}
                    </p>
                    <p className={`text-lg mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {exp.period}
                    </p>
                    <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      {exp.description}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Achievements Section */}
        <AnimatedSection
          id="achievements"
          className={`py-24 relative ${theme === "dark" ? "bg-gray-950/50" : "bg-white/50"} backdrop-blur-sm`}
          delay={0.6}
        >
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Achievements
            </motion.h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50, rotateZ: -2 }}
                  whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <GlassCard className="p-6 border-l-4 border-l-blue-500">
                    <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{achievement}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Position of Responsibility Section */}
        <AnimatedSection
          id="responsibilities"
          className={`py-24 relative ${theme === "dark" ? "bg-gray-900/50" : "bg-gray-100/50"} backdrop-blur-sm`}
          delay={0.7}
        >
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Position of Responsibility
            </motion.h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {responsibilities.map((resp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateY: index % 2 === 0 ? -10 : 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <GlassCard className="p-8 h-full">
                    <h3 className="font-bold text-xl mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {resp.title}
                    </h3>
                    <p className={`font-semibold mb-3 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      {resp.organization}
                    </p>
                    <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{resp.period}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection
          id="contact"
          className={`py-24 relative ${theme === "dark" ? "bg-gray-950/50" : "bg-white/50"} backdrop-blur-sm`}
          delay={0.8}
        >
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Let's Connect
            </motion.h2>
            <GlassCard className="max-w-2xl mx-auto p-12 text-center">
              <motion.p
                className={`mb-12 text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Interested in collaboration? Let's discuss your project and make something great together.
              </motion.p>
              <motion.button
                onClick={() => (window.location.href = "mailto:rakasamyak@gmail.com")}
                className="px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold text-xl shadow-2xl"
                whileHover={{ scale: 1.05, rotateX: 10 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Contact Me
              </motion.button>
            </GlassCard>
          </div>
        </AnimatedSection>
      </main>

      <footer
        className={`relative border-t backdrop-blur-sm ${
          theme === "dark" ? "border-gray-800 bg-gray-950/50" : "border-gray-200 bg-gray-100/50"
        } py-12`}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SocialLinks />
            <p className={`mt-6 text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              &copy; 2024 Samyak Raka. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
