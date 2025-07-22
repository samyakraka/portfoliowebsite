"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Header } from "./components/Header"
import SocialLinks from "./components/SocialLinks"
import ImprovedProjectCard from "./components/ImprovedProjectCard"
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
    title: "StackIt – A Minimal Q&A Forum Platform",
    description:
      "StackIt is a minimal question-and-answer platform that supports collaborative learning and structured knowledge sharing. It’s designed to be simple, user-friendly, and focused on the core experience of asking and answering questions within a community.",
    image: "https://github.com/VedantDeore/StackIT/blob/main/stackit.png?raw=true",
    github: "https://github.com/VedantDeore/StackIT/",
    demo: "https://stack-it-seven.vercel.app/",
    tech: ["NextJs", "Firebase", "AI"],
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
    title: "Research AI Agent",
    description:
      "An AI research assistant that generates research summaries and documents using LangChain, Flask, and a user-friendly interface.",
    image: "https://github.com/samyakraka/research-ai-agent/blob/main/research%20ai%20agent.png?raw=true",
    github: "https://github.com/samyakraka/research-ai-agent",
    demo: "https://research-ai-agent.vercel.app/",
    tech: ["AI", "LangChain", "Flask"],
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
    title: "EventHub",
    description:
      "EventHub is a full-stack web app for discovering and managing events, built with Next.js, MongoDB, Firebase, and Express.js.",
    image: "https://github.com/samyakraka/eventhub-frontend/blob/main/eventhub.png?raw=true",
    github: "https://github.com/samyakraka/eventhub-frontend",
    demo: "https://eventhub2.vercel.app/",
    tech: ["Next.js", "MongoDB", "AI"],
  },
  {
    title: "Song Recommendation System",
    description:
      "A personalized song recommender built using Spotify data and user listening habits, leveraging Spotipy and Python GUI for interactive experiences.",
    image: "https://github.com/samyakraka/Song-Recommendation-System/blob/main/Sample1.jpg?raw=true",
    github: "https://github.com/samyakraka/Song-Recommendation-System",
    demo: "https://vibesync-ai.onrender.com/",
    tech: ["Python", "Flask", "Spotipy"],
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
    skills: ["Python", "C++", "HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Machine Learning",
    skills: ["TensorFlow", "PyTorch", "NumPy", "Pandas", "OpenCV", "Langflow", "Langchain", "NLP"],
  },
  {
    title: "Web Development",
    skills: [
      "Flask",
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
    skills: ["Gemini API", "yt-dlp", "SpeechRecognition", "gTTS"],
  },
  {
    title: "Developer Tools",
    skills: ["Git", "VS Code", "Visual Studio", "Arduino IDE", "JSON", "Android Studio"],
  },
  {
    title: "Others",
    skills: ["Arduino", "Figma", "AstraDB", "Data Structures", "Algorithms", "React Native"],
  },
]
const education = [
  {
    degree: "B.TECH IN COMPUTER ENGINEERING",
    period: "2022 - 2026",
    institution: "K. K. Wagh Institute of Engineering Education and Research, Nashik",
    grade: "CGPA: 8.55/10",
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
  "Winner, Technitude Global Hackathon, SP Jain Institute of Management & Research, Sydney (03/2025)",
  "Winner of Inter-Department Database Management Systems Competition (10/2024)",
  "Finalist, Smart India Hackathon 2024 (12/2024)",
  "Top 10 Finalist, Shaastra Smart City Challenge, IIT Madras (01/2023)",
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
    organization: "Innov-era",
    period: "Jan 2025 - Mar 2025",
  },
]

export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false)
  const { theme } = useTheme()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 6)

  return (
    <div
      className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <Header />

      <main className="flex-grow relative">
        {/* Hero Section */}
        <section
          id="home"
          className={`relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36 ${theme === "dark" ? "bg-gray-950" : "bg-white"}`}
        >
          <motion.div style={{ y }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
          </motion.div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1
                className={`text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6`}
              >
                Samyak Raka
              </h1>
              <p className={`text-xl sm:text-2xl mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Software Engineer | Web & ML Developer
              </p>
              <div className="flex justify-center">
                <motion.button
                  onClick={() => (window.location.href = "mailto:samyakraka29@gmail.com")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in Touch
                </motion.button>
              </div>
              <motion.div
                className="mt-12 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <SocialLinks />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className={`py-20 relative ${theme === "dark" ? "bg-gray-950" : "bg-white"}`}>
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Computer Engineering undergrad passionate about technology, with strong skills in software development,
                AI/ML, and frontend engineering. Led impactful projects in healthcare, IoT and digital security through
                academic work and national-level hackathons. Driven to explore emerging technologies and build smart,
                real-world solutions that create meaningful impact.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-20 relative ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Skills & Expertise
            </motion.h2>
            <motion.p
              className={`text-center mb-12 max-w-2xl mx-auto text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Specialized in full-stack development with expertise in various technologies and frameworks
            </motion.p>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  className={`rounded-2xl p-6 border shadow-lg ${
                    theme === "dark"
                      ? "bg-gray-900 border-gray-700 hover:border-blue-500/50"
                      : "bg-white border-gray-200 hover:border-blue-300"
                  } transition-all duration-300 hover:shadow-xl`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <h3
                    className={`font-bold mb-4 text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
                  >
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className={`px-3 py-2 text-sm rounded-full font-medium ${
                          theme === "dark"
                            ? "bg-gray-800 text-gray-300 border border-gray-600"
                            : "bg-gray-100 text-gray-700 border border-gray-300"
                        } hover:scale-105 transition-transform`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-20 relative ${theme === "dark" ? "bg-gray-950" : "bg-white"}`}>
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>
            <motion.p
              className={`text-center mb-12 max-w-2xl mx-auto text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
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
                  <ImprovedProjectCard {...project} />
                </motion.div>
              ))}
            </motion.div>
            {projects.length > 6 && (
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showAllProjects ? "Show Less" : "Show More Projects"}
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className={`py-20 relative ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Education
            </motion.h2>
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className={`mb-8 p-6 rounded-2xl border shadow-lg ${
                    theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
                  } hover:shadow-xl transition-all duration-300`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <h3
                    className={`font-bold text-xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
                  >
                    {edu.degree}
                  </h3>
                  <p className={`text-sm mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{edu.period}</p>
                  <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{edu.institution}</p>
                  <p className={`font-semibold ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>{edu.grade}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Professional Experience Section */}
        <section id="experience" className={`py-20 relative ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Professional Experience
            </motion.h2>
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className={`mb-8 p-6 rounded-2xl border shadow-lg ${
                    theme === "dark" ? "bg-gray-950 border-gray-700" : "bg-white border-gray-200"
                  } hover:shadow-xl transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <h3
                    className={`font-bold text-xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
                  >
                    {exp.title}
                  </h3>
                  <p className={`font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {exp.company}
                  </p>
                  <p className={`text-sm mb-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{exp.period}</p>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{exp.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className={`py-20 relative ${theme === "dark" ? "bg-gray-950" : "bg-white"}`}>
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Achievements
            </motion.h2>
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className={`mb-4 p-6 rounded-2xl border-l-4 shadow-lg ${
                    theme === "dark"
                      ? "bg-gray-900 border-l-blue-400 border-gray-700"
                      : "bg-gray-50 border-l-blue-600 border-gray-200"
                  } hover:shadow-xl transition-all duration-300`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{achievement}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Position of Responsibility Section */}
        <section id="responsibilities" className={`py-20 relative ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}>
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Position of Responsibility
            </motion.h2>
            <motion.div
              className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {responsibilities.map((resp, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-2xl border shadow-lg ${
                    theme === "dark" ? "bg-gray-950 border-gray-700" : "bg-white border-gray-200"
                  } hover:shadow-xl transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <h3
                    className={`font-bold text-lg mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
                  >
                    {resp.title}
                  </h3>
                  <p className={`font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {resp.organization}
                  </p>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{resp.period}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-20 relative ${theme === "dark" ? "bg-gray-950" : "bg-white"}`}>
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
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
              <p className={`mb-8 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Interested in collaboration? Let's discuss your project and make something great together.
              </p>
              <motion.button
                onClick={() => (window.location.href = "mailto:samyakraka29@gmail.com")}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
        className={`relative border-t ${theme === "dark" ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-gray-100"} py-8`}
      >
        <div className="container mx-auto px-6 text-center">
          <SocialLinks />
          <p className={`mt-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            &copy; 2024 Samyak Raka. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
