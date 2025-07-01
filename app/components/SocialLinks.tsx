import { Github, Linkedin, Twitter, Code } from 'lucide-react'

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/samyakraka" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/samyakraka/",
  },
  { name: "Twitter", icon: Twitter, url: "https://x.com/samyak_raka" },
  { name: "LeetCode", icon: Code, url: "https://leetcode.com/u/samyakraka/" },
];

export default function SocialLinks() {
  return (
    <div className="flex justify-center space-x-4">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
          aria-label={link.name}
        >
          <link.icon className="w-6 h-6" />
        </a>
      ))}
    </div>
  )
}
