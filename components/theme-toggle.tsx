"use client"

import { Moon, Sun, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="glass-morphism text-white hover:text-purple-300 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-xl relative overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
        />
        
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: theme === "dark" ? 0 : 180 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative z-10"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-0 left-0" />
        </motion.div>
        
        {/* Sparkle effect on hover */}
        <motion.div
          className="absolute top-1 right-1"
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Sparkles className="w-3 h-3 text-purple-400" />
        </motion.div>
        
        <span className="sr-only">Alternar tema</span>
      </Button>
    </motion.div>
  )
}