"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Play, Music2, X, Loader2, AlertCircle, FileVideo, Music, FileSearch, 
  Sparkles, Eye, ThumbsUp, Zap, ShieldCheck, Globe, Users, Code, 
  Download, ChevronLeft, Check, HardDrive
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

// Resoluções fictícias para o MP4
const RESOLUTIONS = [
  { label: "1080p", size: "124.5 MB", quality: "Full HD" },
  { label: "720p", size: "82.1 MB", quality: "HD" },
  { label: "480p", size: "35.8 MB", quality: "SD" },
  { label: "360p", size: "18.2 MB", quality: "Mobile" },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState<keyof typeof PLATFORMS>("youtube")
  const [url, setUrl] = useState("") 
  const [loading, setLoading] = useState(false) 
  const [videoData, setVideoData] = useState<any>(null) 
  const [error, setError] = useState("")
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [isVertical, setIsVertical] = useState(false)
  
  // Estados para o seletor de resolução
  const [view, setView] = useState<"options" | "resolutions">("options")
  const [selectedRes, setSelectedRes] = useState("1080p")

  const current = PLATFORMS[activeTab]

  useEffect(() => {
    const triggerAutoProcess = async () => {
      if (url.trim() && current.regex.test(url)) {
        const isShorts = url.includes("youtube.com/shorts/") || url.includes("tiktok.com");
        setIsVertical(isShorts);
        setError("");
        setLoading(true);
        try {
          const data = await sendLinkToBackend(url, current.endpoint);
          setVideoData(data);
          setView("options"); // Garante que comece na tela de opções
        } catch (err) {
          setError("Erro na conexão. O backend está ativo?");
        } finally {
          setLoading(false);
        }
      }
    };
    triggerAutoProcess();
  }, [url, activeTab]);

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-white flex flex-col items-center transition-colors duration-700">
      <div className={`absolute inset-0 bg-gradient-to-b ${current.bgGlow} to-white -z-10 transition-all duration-700`} />

      {/* Navbar */}
      <nav className="flex justify-center gap-8 p-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 z-10">
        {Object.keys(PLATFORMS).map((id) => (
          <button 
            key={id}
            onClick={() => { setActiveTab(id as any); setVideoData(null); setUrl(""); setError(""); setIsVertical(false); }}
            className={`transition-all ${activeTab === id ? 'text-zinc-900 border-b-2 border-zinc-900 scale-110' : 'hover:text-zinc-600'}`}
          >
            {id}
          </button>
        ))}
        <button onClick={() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})} className="hover:text-zinc-900">Sobre</button>
      </nav>

      <div className="max-w-4xl w-full flex flex-col items-center justify-center pt-12 px-4 z-10 text-center min-h-[75vh]">
        <AnimatePresence mode="wait">
          {!videoData ? (
            <motion.div 
              key={`input-${activeTab}`} 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center w-full"
            >
              <div className="mb-6">{current.icon}</div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 text-zinc-900 leading-[0.8]">
                Aura <br/> <span className={`transition-colors duration-500 ${current.color}`}>Summarizer</span>
              </h1>
              
              <div className="w-full max-w-xl space-y-6">
                <div className="relative group">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Cole o link para começar..."
                    className={`w-full py-6 px-10 rounded-full border-2 transition-all bg-white/80 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.1)] focus:outline-none text-lg ${error ? 'border-red-500' : 'border-white focus:border-zinc-300'}`}
                  />
                  {loading && <div className="absolute right-8 top-6"><Loader2 className="animate-spin text-zinc-400" /></div>}
                </div>
                {error && <p className="text-red-500 font-bold text-xs bg-red-50 py-3 rounded-2xl border border-red-100 mx-4">{error}</p>}
                <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Processamento automático via IA</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="result-screen"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} 
              className="flex flex-col items-center w-full max-w-lg mb-20"
            >
              {/* Thumbnail Area */}
              <div className={`bg-zinc-200 rounded-[3rem] mb-6 overflow-hidden border-[6px] border-white shadow-2xl relative transition-all duration-500 ${isVertical ? 'w-52 aspect-[9/16]' : 'w-full aspect-video md:w-[32rem]'}`}>
                {videoData.thumbnail ? <img src={videoData.thumbnail} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold">CARREGANDO...</div>}
                {isVertical && <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest">Shorts</div>}
              </div>

              {/* CONTEÚDO DINÂMICO (Escolha ou Resolução) */}
              <AnimatePresence mode="wait">
                {view === "options" ? (
                  <motion.div key="options" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full">
                    <div className="mb-10 w-full px-6 text-center">
                      <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.4em]">Identificado</span>
                      <h2 className="text-3xl font-black text-zinc-900 leading-none mt-2 mb-6 tracking-tighter line-clamp-2">{videoData.titulo || "Vídeo Encontrado"}</h2>
                      <div className="flex justify-center gap-3">
                        {videoData.views && <div className="flex items-center gap-1.5 bg-zinc-100 px-4 py-2 rounded-full text-[10px] font-black text-zinc-500 uppercase"><Eye size={12}/> {videoData.views}</div>}
                        {videoData.likes && <div className="flex items-center gap-1.5 bg-zinc-100 px-4 py-2 rounded-full text-[10px] font-black text-zinc-500 uppercase"><ThumbsUp size={12}/> {videoData.likes}</div>}
                      </div>
                    </div>

                    <div className="flex gap-4 w-full mb-4 px-4">
                      {/* MP4 - Agora abre a seleção */}
                      <button onClick={() => setView("resolutions")} className="flex-1 py-6 bg-zinc-900 text-white rounded-[2rem] font-black transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 shadow-2xl">
                        <FileVideo size={20}/> MP4
                      </button>
                      {/* MP3 - Mesma animação */}
                      <button className="flex-1 py-6 bg-white text-zinc-900 rounded-[2rem] font-black transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 border-2 border-zinc-100 shadow-xl">
                        <Music size={20}/> MP3
                      </button>
                    </div>

                    <button onClick={() => setShowAnalysis(!showAnalysis)} className="w-[calc(100%-2rem)] py-5 border-2 border-zinc-200 rounded-[2rem] font-black text-zinc-500 hover:bg-zinc-50 transition-all flex items-center justify-center gap-3 mb-4">
                      <FileSearch size={20}/> {showAnalysis ? "FECHAR RESUMO" : "VER ANÁLISE DA IA"}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="resolutions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full px-4">
                    <div className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-xl w-full">
                      <div className="flex items-center justify-between mb-8">
                        <button onClick={() => setView("options")} className="p-2 hover:bg-zinc-50 rounded-full transition-colors">
                          <ChevronLeft />
                        </button>
                        <h3 className="font-black text-zinc-800 uppercase tracking-widest text-xs">Qualidade do Vídeo</h3>
                        <div className="w-8" />
                      </div>

                      <div className="space-y-3 mb-8">
                        {RESOLUTIONS.map((res) => (
                          <button 
                            key={res.label}
                            onClick={() => setSelectedRes(res.label)}
                            className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${selectedRes === res.label ? 'border-zinc-900 bg-zinc-900 text-white shadow-lg' : 'border-zinc-50 bg-zinc-50 text-zinc-500 hover:border-zinc-200'}`}
                          >
                            <div className="flex items-center gap-3">
                              {selectedRes === res.label ? <Check size={18}/> : <div className="w-[18px]"/>}
                              <span className="font-black">{res.label}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-md ${selectedRes === res.label ? 'bg-white/20' : 'bg-zinc-200'}`}>{res.quality}</span>
                            </div>
                            <span className="text-xs font-bold opacity-60 flex items-center gap-1"><HardDrive size={12}/> {res.size}</span>
                          </button>
                        ))}
                      </div>

                      <button className={`w-full py-6 rounded-[2rem] font-black text-white shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 ${current.button}`}>
                        <Download size={20}/> BAIXAR AGORA
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Resumo da IA (fora do switch de view para persistir se aberto) */}
              <AnimatePresence>
                {showAnalysis && view === "options" && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-6 mx-4 p-10 bg-zinc-900 rounded-[3rem] text-left w-full overflow-hidden shadow-2xl">
                    <div className="flex items-center gap-2 text-yellow-500 font-black text-[10px] uppercase tracking-widest mb-6"><Sparkles size={16}/> Inteligência Aura</div>
                    <p className="text-zinc-300 font-medium leading-relaxed text-xl italic italic leading-relaxed">"{videoData.resumo || "Aguardando processamento dos dados transcritos..."}"</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button onClick={() => {setVideoData(null); setUrl(""); setView("options")}} className="mt-12 text-zinc-300 hover:text-zinc-900 font-black text-[10px] uppercase tracking-[0.3em] transition-colors">
                ← buscar novo link
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Equipe - Mantido igual seu pedido anterior */}
      <footer id="about" className="w-full bg-zinc-900 py-32 px-8 flex flex-col items-center text-center mt-auto">
        <div className="max-w-4xl space-y-12">
          <div className="inline-flex items-center gap-2 bg-white/5 px-6 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
            <Users size={14}/> Equipe Aura
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none text-center">Criado para facilitar <br/> sua rotina digital.</h2>
          <p className="text-xl text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto text-center">
            O projeto Aura surgiu da colaboração entre <span className="text-white font-black text-2xl mx-1 underline decoration-red-600 underline-offset-4">Vitor Rovani Marcelino</span> e <span className="text-white font-black text-2xl underline decoration-blue-600 underline-offset-4">Pedro Goulart Branco</span>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 text-left">
              <div className="w-16 h-16 bg-red-600 rounded-2xl mb-6 flex items-center justify-center text-white font-black text-2xl shadow-xl">VR</div>
              <h4 className="font-black text-white text-2xl tracking-tighter">Vitor Rovani Marcelino</h4>
              <p className="text-red-500 text-xs font-black uppercase tracking-widest mt-2">UX & Frontend Master</p>
            </div>
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 text-left">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl mb-6 flex items-center justify-center text-white font-black text-2xl shadow-xl">PG</div>
              <h4 className="font-black text-white text-2xl tracking-tighter">Pedro Goulart Branco</h4>
              <p className="text-blue-500 text-xs font-black uppercase tracking-widest mt-2">Backend & AI Architect</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}