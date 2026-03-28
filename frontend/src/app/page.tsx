"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Play, 
  Music2, 
  X, 
  Loader2, 
  AlertCircle, 
  FileVideo, 
  Music, 
  FileSearch, 
  Sparkles,
  Eye,       // Novo
  ThumbsUp,  // Novo
  Clock,     // Novo
  Monitor    // Novo
} from "lucide-react"
import { sendLinkToBackend } from "@/services/api"

const PLATFORMS = {
  youtube: {
    name: "YouTube",
    color: "text-red-600",
    bgGlow: "from-red-200/50",
    button: "bg-red-600",
    icon: <Play className="w-12 h-12 text-red-600" />,
    endpoint: "/youtube",
    regex: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
  },
  tiktok: {
    name: "TikTok",
    color: "text-zinc-900",
    bgGlow: "from-cyan-200/40 via-pink-200/40",
    button: "bg-zinc-900",
    icon: <Music2 className="w-12 h-12 text-zinc-900" />,
    endpoint: "/tiktok",
    regex: /^(https?:\/\/)?(www\.)?tiktok\.com\/.+$/
  },
  twitter: {
    name: "Twitter",
    color: "text-blue-500",
    bgGlow: "from-blue-200/50",
    button: "bg-black",
    icon: <X className="w-12 h-12 text-black" />,
    endpoint: "/twitter",
    regex: /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.+$/
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<keyof typeof PLATFORMS>("youtube")
  const [url, setUrl] = useState("") 
  const [loading, setLoading] = useState(false) 
  const [videoData, setVideoData] = useState<any>(null) 
  const [error, setError] = useState("")
  const [showAnalysis, setShowAnalysis] = useState(false)

  const current = PLATFORMS[activeTab]

  useEffect(() => {
    const triggerAutoProcess = async () => {
      if (url.trim() && current.regex.test(url)) {
        setError("");
        setLoading(true);
        try {
          const data = await sendLinkToBackend(url, current.endpoint);
          setVideoData(data);
        } catch (err) {
          setError("Conexão falhou. O servidor está ativo?");
        } finally {
          setLoading(false);
        }
      }
    };
    triggerAutoProcess();
  }, [url, activeTab]);

  return (
    <main className="min-h-screen relative overflow-hidden transition-colors duration-700 bg-white flex flex-col items-center">
      <div className={`absolute inset-0 bg-gradient-to-b ${current.bgGlow} to-white -z-10`} />

      <nav className="flex justify-center gap-8 p-8 text-sm font-bold uppercase text-zinc-400 z-10">
        {Object.keys(PLATFORMS).map((id) => (
          <button 
            key={id}
            onClick={() => { setActiveTab(id as any); setVideoData(null); setUrl(""); setError(""); }}
            className={`transition-all ${activeTab === id ? 'text-zinc-900 border-b-2 border-zinc-900 scale-110' : 'hover:text-zinc-600'}`}
          >
            {id}
          </button>
        ))}
      </nav>

      <div className="max-w-4xl w-full flex flex-col items-center justify-center pt-12 px-4 z-10 text-center">
        <AnimatePresence mode="wait">
          {!videoData ? (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center w-full">
              <div className="mb-6">{current.icon}</div>
              <h1 className="text-6xl font-black tracking-tighter mb-10">Aura <span className={current.color}>Summarizer</span></h1>
              
              <div className="w-full max-w-xl space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Cole o link aqui para carregar..."
                    className={`w-full py-5 px-8 rounded-full border-2 transition-all bg-white shadow-2xl focus:outline-none ${error ? 'border-red-500' : 'border-black/5'}`}
                  />
                  {loading && <div className="absolute right-6 top-5"><Loader2 className="animate-spin text-zinc-400" /></div>}
                </div>

                {error && (
                  <div className="flex items-center justify-center gap-2 text-red-500 font-bold bg-red-50 py-3 rounded-2xl border border-red-100 animate-bounce">
                    <AlertCircle size={18}/> {error}
                  </div>
                )}
                <p className="text-zinc-400 text-sm italic">O processamento inicia automaticamente ao colar o link</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="step2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center w-full max-w-lg">
              
              {/* Thumbnail Container */}
              <div className="w-56 h-56 bg-zinc-200 rounded-[2.5rem] mb-6 overflow-hidden border-4 border-white shadow-2xl relative">
                {videoData.thumbnail ? (
                  <img src={videoData.thumbnail} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold uppercase">thumb</div>
                )}
                {/* Badge de Resolução sobre a imagem */}
                {videoData.resolucao && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded-lg">
                    {videoData.resolucao}
                  </div>
                )}
              </div>

              <div className="mb-6 w-full px-4">
                <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em]">Título do Vídeo</span>
                <h2 className="text-2xl font-black text-zinc-800 leading-tight mt-1 mb-4 line-clamp-2">
                  {videoData.titulo || "Vídeo Identificado"}
                </h2>

                {/* BARRA DE ESTATÍSTICAS (NOVO) */}
                <div className="flex flex-wrap justify-center gap-4 text-zinc-400">
                  {videoData.views && (
                    <div className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
                      <Eye size={14} className="text-zinc-400"/>
                      <span className="text-xs font-bold">{videoData.views}</span>
                    </div>
                  )}
                  {videoData.likes && (
                    <div className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
                      <ThumbsUp size={14} className="text-zinc-400"/>
                      <span className="text-xs font-bold">{videoData.likes}</span>
                    </div>
                  )}
                  {videoData.duracao && (
                    <div className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
                      <Clock size={14} className="text-zinc-400"/>
                      <span className="text-xs font-bold">{videoData.duracao}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 w-full mb-4 px-4">
                <button className="flex-1 py-5 bg-zinc-100 hover:bg-zinc-200 rounded-3xl font-black text-zinc-700 transition-all border-b-4 border-zinc-300 active:border-b-0 flex items-center justify-center gap-2">
                  <FileVideo size={20}/> mp4
                </button>
                <button className="flex-1 py-5 bg-zinc-100 hover:bg-zinc-200 rounded-3xl font-black text-zinc-700 transition-all border-b-4 border-zinc-300 active:border-b-0 flex items-center justify-center gap-2">
                  <Music size={20}/> mp3
                </button>
              </div>

              <div className="w-full px-4">
                <button 
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="w-full py-5 border-2 border-zinc-200 rounded-3xl font-black text-zinc-500 hover:bg-zinc-50 transition-all flex items-center justify-center gap-3"
                >
                  <FileSearch size={20}/> {showAnalysis ? "ocultar análise" : "ver análise detalhada"}
                </button>
              </div>

              <AnimatePresence>
                {showAnalysis && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="mt-6 mx-4 p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 text-left overflow-hidden shadow-inner"
                  >
                    <div className="flex items-center gap-2 text-yellow-600 font-black text-[10px] uppercase tracking-widest mb-4">
                      <Sparkles size={14}/> Resumo Inteligente IA
                    </div>
                    <p className="text-zinc-600 font-medium leading-relaxed italic">
                      "{videoData.resumo || "O resumo completo será exibido aqui após a análise da inteligência artificial."}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button onClick={() => {setVideoData(null); setUrl("")}} className="mt-10 text-zinc-300 hover:text-zinc-500 font-bold text-xs uppercase tracking-widest transition-colors mb-10">
                ← Voltar e buscar outro
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}