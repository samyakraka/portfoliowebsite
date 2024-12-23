import { LucideIcon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";

interface SkillCardProps {
  name: string;
  icon: LucideIcon;
  color: string;
}

export default function SkillCard({ name, icon: Icon, color }: SkillCardProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`group relative rounded-xl p-6 transition-all duration-300 border ${
        theme === "dark"
          ? "bg-black border-gray-800 hover:border-blue-500/50"
          : "bg-white border-gray-200 hover:border-blue-500/50 hover:bg-gray-50"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(120,119,198,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className={`w-8 h-8 mb-4 ${color}`} />
        <h3
          className={`font-semibold ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {name}
        </h3>
      </motion.div>
    </motion.div>
  );
}
