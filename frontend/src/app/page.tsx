"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Music2, X, Info } from "lucide-react"

// 1. Definição dos temas
const PLATFORMS = {
  youtube: {
    name: "YouTube",
    color: "text-red-600",
    bgGlow: "from-red-200/50",
    button: "bg-red-600",
    icon: <Play className="w-12 h-12 text-red-600" />,
    placeholder: "busque ou cole um link do youtube"
  },
  tiktok: {
    name: "TikTok",
    color: "text-zinc-900",
    bgGlow: "from-cyan-200/40 via-pink-200/40",
    button: "bg-zinc-900",
    icon: <Music2 className="w-12 h-12 text-zinc-900" />,
    placeholder: "cole um link do tiktok aqui"
  },
  twitter: {
    name: "Twitter",
    color: "text-blue-500",
    bgGlow: "from-blue-200/50",
    button: "bg-black",
    icon: <X className="w-12 h-12 text-black" />, // <--- Aqui agora é X
    placeholder: "cole o link do post (X)"
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<keyof typeof PLATFORMS>("youtube")
  const current = PLATFORMS[activeTab]

  return (
    // O fundo muda de cor suavemente baseado no tema
    <main className={`min-h-screen relative overflow-hidden transition-colors duration-700 bg-white`}>

      {/* Background Glow (O gradiente do seu protótipo) */}
      <div className={`absolute inset-0 bg-gradient-to-b ${current.bgGlow} to-white -z-10`} />

      {/* Navbar Minimalista */}
      <nav className="flex justify-center gap-8 p-8 text-lg font-medium text-zinc-500">
        <button onClick={() => setActiveTab("youtube")} className={activeTab === 'youtube' ? 'text-black border-b-2 border-red-600' : ''}>youtube</button>
        <button onClick={() => setActiveTab("tiktok")} className={activeTab === 'tiktok' ? 'text-black border-b-2 border-zinc-900' : ''}>tiktok</button>
        <button className="hover:text-black">sobre</button>
      </nav>

      {/* Área Central Animada */}
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center pt-20 px-4">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab} // Isso faz o Framer Motion saber que deve animar a troca
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6">{current.icon}</div>
            <h1 className="text-6xl font-bold tracking-tighter mb-12">
              titulo foda <br />
              <span className={current.color}>({current.name.toLowerCase()})</span>
            </h1>

            {/* Input Estilizado do seu Protótipo */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder={current.placeholder}
                className={`w-full py-4 px-6 rounded-full border-2 border-black/10 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${current.button} text-white placeholder:text-white/70`}
              />
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </main>
  )
}