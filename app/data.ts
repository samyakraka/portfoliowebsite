// All portfolio content lives here. `tags` are extra search keywords that
// don't appear on the page but should still make an item match.

export const profile = {
  name: "Samyak Raka",
  role: "Associate Software Engineer, AI Systems",
  company: "Crowdera",
  tagline: "Software engineer building AI systems with LLMs, RAG and AI agents. 4× hackathon winner.",
  intro:
    "I take AI from prototype to production: RAG pipelines, LLM agents and the full-stack apps that put them in front of real users.",
  location: "Nashik, India",
  email: "rakasamyak@gmail.com",
  resume: "/Samyak%20Raka%20Resume.pdf",
  links: [
    { label: "GitHub", url: "https://github.com/samyakraka" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/samyakraka/" },
    { label: "LeetCode", url: "https://leetcode.com/u/samyakraka/" },
    { label: "X", url: "https://x.com/samyak_raka" },
  ],
};

export type Project = {
  title: string;
  kind: string;
  summary: string;
  detail: string;
  tech: string[];
  tags?: string;
  live?: string;
  code?: string;
};

export const featured: Project[] = [
  {
    title: "AI-powered web application firewall",
    kind: "Security, deep learning",
    summary: "Catches zero-day and anomalous web requests that rule-based firewalls let through.",
    detail:
      "A DeBERTa-v3 transformer scores each request in real time. It runs as an Nginx sidecar, so existing services stay untouched, and the model updates incrementally as traffic changes.",
    tech: ["Python", "PyTorch", "DeBERTa-v3", "Nginx", "Docker", "Redis", "FastAPI"],
    tags: "waf transformer anomaly detection unsupervised cybersecurity ml",
  },
  {
    title: "KYCrypt AI",
    kind: "Identity verification for SMEs",
    summary:
      "Lets small businesses verify customer identity and flag fraud without an enterprise KYC budget.",
    detail:
      "OCR and computer vision read and check ID documents, every step is AES-encrypted end to end, and a blockchain audit trail records each verification so it can't be quietly altered.",
    tech: ["Next.js", "Tailwind CSS", "FastAPI", "OpenCV", "Tesseract", "MongoDB", "Firebase", "Blockchain"],
    tags: "kyc security encryption aes ocr fraud fintech",
    live: "https://kycryptai.vercel.app",
    code: "https://github.com/samyakraka/kycryptai",
  },
  {
    title: "Medibites",
    kind: "GenAI ordering and scheduling",
    summary: "One platform for restaurant orders and medical appointments, run by voice and chat AI.",
    detail:
      "Two interfaces share one backend: diners order and pay through a conversational assistant, and patients book appointments by talking to it. Payments go through Razorpay, live chat through Stream.",
    tech: ["Next.js", "Flask", "Python", "Mistral AI", "ElevenLabs", "Firebase", "Razorpay", "Stream Chat"],
    tags: "genai llm voice healthcare restaurant",
    live: "https://medibites11.vercel.app/",
    code: "https://github.com/samyakraka/Medibites",
  },
  {
    title: "SocioDev",
    kind: "Mobile app",
    summary: "A community app where developers share articles, bookmark posts and draft writing with AI.",
    detail:
      "Built in React Native with Firebase handling auth, Firestore and storage. Grok generates article drafts that authors can edit before posting.",
    tech: ["React Native", "Firebase", "Grok", "NativeWind"],
    tags: "mobile android ios social ai",
    code: "https://github.com/samyakraka/SocioDev-Main",
  },
];

export const otherProjects: Project[] = [
  {
    title: "StackIt",
    kind: "Q&A forum",
    summary: "A minimal question-and-answer platform for communities.",
    detail: "",
    tech: ["Next.js", "Firebase"],
    live: "https://stackit-teamzerotrace.vercel.app/",
    code: "https://github.com/VedantDeore/StackIT",
  },
  {
    title: "Astralytics",
    kind: "Social analytics",
    summary: "Social media engagement insights with LangFlow and Astra DB.",
    detail: "",
    tech: ["LangFlow", "Astra DB", "Next.js"],
    tags: "ai llm analytics",
    live: "https://astralytics.vercel.app/",
    code: "https://github.com/samyakraka/Astralytics",
  },
  {
    title: "ATS Scorer",
    kind: "Resume ranking",
    summary: "Ranks and improves resumes against a job description with NLP.",
    detail: "",
    tech: ["MERN", "Python", "NLP"],
    tags: "ml ai",
    live: "https://resumefiltration.vercel.app/",
    code: "https://github.com/samyakraka/Resume-filtration",
  },
  {
    title: "Research AI Agent",
    kind: "AI agent",
    summary: "Researches a topic and writes a summary document.",
    detail: "",
    tech: ["LangChain", "Flask"],
    tags: "llm agent ai",
    live: "https://research-ai-agent.vercel.app/",
    code: "https://github.com/samyakraka/research-ai-agent",
  },
  {
    title: "FlexiCare",
    kind: "Computer vision",
    summary: "Corrects posture in real time from a webcam feed.",
    detail: "",
    tech: ["Python", "MediaPipe", "OpenCV"],
    tags: "ml cv",
    live: "https://flexi-care.onrender.com/",
    code: "https://github.com/samyakraka/flexi-care",
  },
  {
    title: "Article Summarizer",
    kind: "Built at OpenHack, IISc",
    summary: "Turns long articles into short summaries.",
    detail: "",
    tech: ["JavaScript", "AI"],
    tags: "nlp hackathon",
    live: "https://article-summarization-open-hack-iisc-bangalore.vercel.app/",
    code: "https://github.com/samyakraka/Article-Summarization",
  },
  {
    title: "Smart Bin",
    kind: "IoT",
    summary: "Tracks garbage levels in public bins with ultrasonic sensors.",
    detail: "",
    tech: ["Arduino", "Flask"],
    tags: "hardware iot",
    live: "https://smart-bin-26tv.onrender.com/",
    code: "https://github.com/samyakraka/Smart-Bin",
  },
  {
    title: "YouTranscribe",
    kind: "Speech to text",
    summary: "Transcribes, translates and summarizes YouTube audio.",
    detail: "",
    tech: ["Python", "Streamlit", "gTTS", "yt-dlp"],
    tags: "nlp ai",
    code: "https://github.com/samyakraka/YouTranscribe",
  },
];

export type Role = {
  company: string;
  title: string;
  period: string;
  place: string;
  points: string[];
  tech: string[];
  // Total time at the company, when it spans more than one role.
  tenure?: string;
  earlier?: { title: string; period: string; points: string[] };
};

export const experience: Role[] = [
  {
    company: "Crowdera",
    title: "Associate Software Engineer, AI Systems",
    period: "Jul 2026 – now",
    tenure: "Jun 2025 – now",
    place: "Hybrid, Singapore",
    points: [
      "Building LLM, RAG and AI agent systems into Crowdera's products, now full time after a year in the Founder's Office.",
    ],
    tech: ["LLMs", "RAG", "AI agents", "Vector databases", "Next.js", "Firebase", "MongoDB", "Python", "AWS"],
    earlier: {
      title: "AI Enablement Intern, Founder's Office",
      period: "Jun 2025 – Jun 2026",
      points: [
        "Built and deployed AI applications, agents and decision systems used across the business.",
        "Integrated LLMs, RAG and automation workflows into production products, from system design and model experiments through deployment and tuning.",
      ],
    },
  },
  {
    company: "CaDashboard",
    title: "AI Engineer, part time",
    period: "May 2026 – Jun 2026",
    place: "Remote",
    points: [
      "Built knowledge systems that answer tax, compliance and financial-advisory questions from the firm's own documents.",
      "Shipped FAQ assistants and retrieval pipelines on Pinecone, grounded in real organizational data.",
    ],
    tech: ["LLMs", "RAG", "Pinecone", "MySQL", "Python", "NLP"],
  },
  {
    company: "Hacktoberfest",
    title: "Open source contributor",
    period: "Oct 2023 – Oct 2024",
    place: "Remote",
    points: [
      "Contributed to 14+ repositories: documentation, bug fixes and new features, alongside 10,000+ developers.",
    ],
    tech: ["C++", "Python", "Machine learning"],
  },
];

export type Recognition = { title: string; detail: string; tags?: string };

export const wins: Recognition[] = [
  { title: "Technitude Global Hackathon", detail: "SP Jain Institute, Sydney" },
  { title: "Hack4Real Good", detail: "Crowdera" },
  { title: "Prompt & Profit AI Hackathon", detail: "DTU × Blogy", tags: "ai" },
  { title: "LoRRI AI Hackathon 2026", detail: "LogisticsNow", tags: "ai" },
];

export const recognition: Recognition[] = [
  {
    title: "Smart India Hackathon finalist, team lead",
    detail: "2024, UIDAI problem at MUJ Jaipur. 2025, ISRO problem at GTU Ahmedabad.",
  },
  {
    title: "Top 10, Shaastra Smart City Challenge",
    detail: "IIT Madras",
  },
  {
    title: "Top 1000, Amazon ML Challenge and IMC Prosperity 4",
    detail: "Out of 60,000+ teams",
    tags: "machine learning",
  },
  {
    title: "Finalist at national hackathons",
    detail: "OpenHack (IISc Bangalore), SunHacks, Kleos 2.0, Level SuperMind, Incuverse 1.0",
  },
];

export const product = {
  name: "Expenseek",
  icon: "/expenseek-icon.png",
  role: "Founder and developer",
  summary:
    "Split bills, track spending and settle up with friends, roommates or travel groups, all in one place.",
  features: [
    "Online groups with real-time sync, or offline groups that never leave your phone",
    "Equal or custom splits, with balances and settlements worked out automatically",
    "150+ currencies, spending dashboards, and PDF or Excel reports",
  ],
  stats: [
    { value: "50+", label: "installs" },
    { value: "5.0", label: "rating on Google Play" },
  ],
  url: "https://play.google.com/store/apps/details?id=com.expenseek.app",
  tags: "mobile android app founder product fintech",
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "AI and ML",
    items: [
      "LLMs",
      "RAG",
      "LangChain",
      "Langflow",
      "NLP",
      "PyTorch",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "OCR",
      "Pinecone",
      "NumPy",
      "Pandas",
    ],
  },
  {
    group: "Web and mobile",
    items: [
      "Next.js",
      "React",
      "React Native",
      "Node.js",
      "Express",
      "FastAPI",
      "Flask",
      "Tailwind CSS",
      "Streamlit",
    ],
  },
  { group: "Data and infra", items: ["MongoDB", "MySQL", "Firebase", "AWS S3", "Docker", "Vercel", "Git"] },
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "C++", "C"] },
  {
    group: "Also",
    items: [
      "System design",
      "Data structures and algorithms",
      "AES encryption",
      "Blockchain (PKI, hashing)",
      "Figma",
    ],
  },
];

export const education = [
  {
    school: "K. K. Wagh Institute of Engineering Education and Research",
    degree: "B.Tech, Computer Engineering",
    period: "2022 – 2026",
    note: "CGPA 8.71 / 10",
  },
];

export const certifications = [
  { title: "Data Science, ML, DL and NLP Bootcamp", issuer: "Udemy", date: "Jul 2025" },
  { title: "The Ultimate React Course: React, Next.js, Redux", issuer: "Udemy", date: "Jul 2025" },
  { title: "React Native", issuer: "Infosys Springboard", date: "Apr 2025" },
  { title: "AWS Academy Cloud Foundations", issuer: "AWS Academy", date: "Mar 2025" },
];

export const searchSuggestions = ["RAG", "Next.js", "Security", "Python", "React Native"];
