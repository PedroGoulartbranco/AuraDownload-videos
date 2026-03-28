"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play, Music2, X, Loader2, AlertCircle, FileVideo, Music, FileSearch,
  Sparkles, Eye, ThumbsUp, Zap, ShieldCheck, Globe, Users, Code,
  Download, ChevronLeft, Check, HardDrive, ChevronDown
} from "lucide-react"
import { sendLinkToBackend, downloadYoutubeVideo } from "@/services/api"

const PLATFORMS = {
  youtube: {
    name: "YouTube",
    color: "text-red-600",
    bgGlow: "from-red-200/50",
    button: "bg-red-600",
    icon: <Play className="w-12 h-12 text-red-600" />,
    endpoint: "/youtube",
    regex: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|youtube\.com\/shorts\/)\/.+$/
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

const RESOLUTIONS = [
  { label: "1080p", size: "124.5 MB", quality: "Full HD" },
  { label: "720p", size: "82.1 MB", quality: "HD" },
  { label: "480p", size: "35.8 MB", quality: "SD" },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState<keyof typeof PLATFORMS>("youtube")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [videoData, setVideoData] = useState<any>(null)
  const [error, setError] = useState("")
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [isVertical, setIsVertical] = useState(false)
  const [view, setView] = useState<"options" | "resolutions">("options")
  const [selectedRes, setSelectedRes] = useState("1080p")
  const [isDownloading, setIsDownloading] = useState(false)

  const current = PLATFORMS[activeTab]

  // MONITORADOR AUTOMÁTICO E VALIDADOR
  useEffect(() => {
    const triggerAutoProcess = async () => {
      if (!url.trim()) {
        setError("");
        return;
      }

      // Validação de formato de link
      if (!current.regex.test(url)) {
        setError(`Formato de link inválido para ${current.name.toUpperCase()}`);
        setVideoData(null);
        return;
      }

      setError("");
      const isShorts = url.includes("/shorts/") || url.includes("tiktok.com");
      setIsVertical(isShorts);

      setLoading(true);
      try {
        const data = await sendLinkToBackend(url, current.endpoint);
        setVideoData(data);
        setView("options");
      } catch (err) {
        setError("Erro na conexão. O backend está ativo?");
      } finally {
        setLoading(false);
      }
    };
    triggerAutoProcess();
  }, [url, activeTab]);

  // FUNÇÃO DE DOWNLOAD REAL
  const handleFinalDownload = async () => {
    setIsDownloading(true);
    try {
      const blob = await downloadYoutubeVideo(url, selectedRes);
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;

      const cleanTitle = videoData.titulo ? videoData.titulo.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'video';
      link.setAttribute('download', `${cleanTitle}_${selectedRes}.mp4`);

      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      alert("Erro ao processar o download no servidor.");
    } finally {
      setIsDownloading(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-white flex flex-col items-center transition-colors duration-700">
      {/* Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-b ${current.bgGlow} to-white -z-10 transition-all duration-700`} />

      {/* Navbar Original Estilo Texto */}
      <nav className="flex justify-center gap-8 p-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 z-10">
        {Object.keys(PLATFORMS).map((id) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id as any); setVideoData(null); setUrl(""); setError(""); setIsVertical(false); }}
            className={`transition-all pb-1 ${activeTab === id ? 'text-zinc-900 border-b-2 border-zinc-900 scale-110' : 'hover:text-zinc-600'}`}
          >
            {id}
          </button>
        ))}
        <button onClick={() => scrollToSection('about')} className="hover:text-zinc-900 transition-colors">Sobre</button>
      </nav>

      {/* Main Container Area */}
      <div className="max-w-4xl w-full flex flex-col items-center justify-center pt-4 px-4 z-10 text-center min-h-[80vh]">
        <AnimatePresence mode="wait">
          {!videoData ? (
            <motion.div
              key={`input-${activeTab}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center w-full"
            >
              <div className="mb-6">{current.icon}</div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 text-zinc-900 leading-[0.8]">
                Aura <br /> <span className={`transition-colors duration-500 ${current.color}`}>Summarizer</span>
              </h1>
              <div className="w-full max-w-xl space-y-6">
                <div className="relative group">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Cole o link aqui..."
                    className={`w-full py-6 px-10 rounded-full border-2 transition-all bg-white/80 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.1)] focus:outline-none text-lg ${error ? 'border-red-500' : 'border-white focus:border-zinc-300'}`}
                  />
                  {loading && <div className="absolute right-8 top-6"><Loader2 className="animate-spin text-zinc-400" /></div>}
                </div>
                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-bold text-xs bg-red-50 py-3 rounded-2xl border border-red-100 mx-4">{error}</motion.p>}
                <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest italic opacity-60">IA detecta e processa o link automaticamente</p>
              </div>
              <motion.button onClick={() => scrollToSection('features')} className="mt-16 flex flex-col items-center gap-2 text-zinc-300 hover:text-zinc-500 transition-colors group">
                <span className="text-[10px] font-black uppercase tracking-widest">Descubra mais</span>
                <ChevronDown className="animate-bounce" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="result-screen" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center w-full max-w-lg mb-10">
              {/* Thumbnail Container */}
              <div className={`bg-zinc-200 rounded-[3rem] mb-6 overflow-hidden border-[6px] border-white shadow-2xl relative transition-all duration-500 ${isVertical ? 'w-52 aspect-[9/16]' : 'w-full aspect-video md:w-[32rem]'}`}>
                {videoData.thumbnail ? <img src={videoData.thumbnail} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold uppercase tracking-widest">Buscando...</div>}
                {isVertical && <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg">Shorts</div>}
              </div>

              <AnimatePresence mode="wait">
                {view === "options" ? (
                  <motion.div key="options" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full">
                    <div className="mb-10 w-full px-6 text-center">
                      <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.4em]">Identificado</span>
                      <h2 className="text-2xl md:text-3xl font-black text-zinc-900 leading-snug mt-2 mb-6 tracking-tighter line-clamp-2 pb-2">
                        {videoData.titulo || "Vídeo Encontrado"}
                      </h2>
                      <div className="flex justify-center gap-3">
                        {videoData.views && <div className="flex items-center gap-1.5 bg-zinc-100 px-4 py-2 rounded-full text-[10px] font-black text-zinc-500 uppercase"><Eye size={12} /> {videoData.views}</div>}
                        {videoData.likes && <div className="flex items-center gap-1.5 bg-zinc-100 px-4 py-2 rounded-full text-[10px] font-black text-zinc-500 uppercase"><ThumbsUp size={12} /> {videoData.likes}</div>}
                      </div>
                    </div>
                    <div className="flex gap-4 w-full mb-4 px-4">
                      <button onClick={() => setView("resolutions")} className="flex-1 py-6 bg-zinc-900 text-white rounded-[2rem] font-black transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 shadow-2xl">
                        <FileVideo size={20} /> MP4
                      </button>
                      <button className="flex-1 py-6 bg-white text-zinc-900 rounded-[2rem] font-black transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 border-2 border-zinc-100 shadow-xl">
                        <Music size={20} /> MP3
                      </button>
                    </div>
                    <div className="px-4 w-full">
                      <button onClick={() => setShowAnalysis(!showAnalysis)} className="w-full py-5 border-2 border-zinc-200 rounded-[2rem] font-black text-zinc-500 hover:bg-zinc-50 transition-all flex items-center justify-center gap-3 mb-4">
                        <FileSearch size={20} /> {showAnalysis ? "FECHAR RESUMO" : "VER ANÁLISE DA IA"}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="resolutions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full px-4">
                    <div className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-xl w-full text-left">
                      <div className="flex items-center justify-between mb-8">
                        <button onClick={() => setView("options")} className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><ChevronLeft /></button>
                        <h3 className="font-black text-zinc-800 uppercase tracking-widest text-[10px]">Qualidade de vídeo</h3>
                        <div className="w-8" />
                      </div>
                      <div className="space-y-3 mb-8">
                        {RESOLUTIONS.map((res) => (
                          <button key={res.label} onClick={() => setSelectedRes(res.label)} className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${selectedRes === res.label ? 'border-zinc-900 bg-zinc-900 text-white shadow-lg' : 'border-zinc-50 bg-zinc-50 text-zinc-500 hover:border-zinc-200'}`}>
                            <div className="flex items-center gap-3">
                              <span className="font-black">{res.label}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-md ${selectedRes === res.label ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-600'}`}>{res.quality}</span>
                            </div>
                            <span className="text-xs font-bold opacity-60 flex items-center gap-1"><HardDrive size={12} /> {res.size}</span>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={handleFinalDownload}
                        disabled={isDownloading}
                        className={`w-full py-6 rounded-[2rem] font-black text-white shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 ${current.button} disabled:opacity-50`}
                      >
                        {isDownloading ? <><Loader2 className="animate-spin" size={20} /> BAIXANDO...</> : <><Download size={20} /> BAIXAR AGORA</>}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI Analysis Box */}
              <AnimatePresence>
                {showAnalysis && view === "options" && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-6 mx-4 p-10 bg-zinc-900 rounded-[3rem] text-left w-full overflow-hidden shadow-2xl">
                    <div className="flex items-center gap-2 text-yellow-500 font-black text-[10px] uppercase tracking-widest mb-6"><Sparkles size={16} /> Inteligência Aura</div>
                    <p className="text-zinc-300 font-medium leading-relaxed text-lg italic italic text-left italic">"{videoData.resumo || "O resumo inteligente está sendo gerado..."}"</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <button onClick={() => { setVideoData(null); setUrl(""); setView("options") }} className="mt-12 text-zinc-300 hover:text-zinc-900 font-black text-[10px] uppercase tracking-[0.3em] transition-colors mb-10">← buscar novo link</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Feature Cards Section */}
      <section id="features" className="scroll-mt-20 max-w-6xl w-full px-8 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-100">
        <div className="space-y-4 text-center md:text-left"><div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-inner"><Zap size={28} /></div><h3 className="text-xl font-black text-zinc-800 tracking-tighter">Resposta Imediata</h3><p className="text-zinc-500 font-medium leading-relaxed text-sm">Processamento em tempo real via Radmin.</p></div>
        <div className="space-y-4 text-center md:text-left"><div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-inner"><Sparkles size={28} /></div><h3 className="text-xl font-black text-zinc-800 tracking-tighter">IA Contextual</h3><p className="text-zinc-500 font-medium leading-relaxed text-sm">Entendemos o tom e o conteúdo do vídeo.</p></div>
        <div className="space-y-4 text-center md:text-left"><div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-inner"><ShieldCheck size={28} /></div><h3 className="text-xl font-black text-zinc-800 tracking-tighter">Privacidade</h3><p className="text-zinc-500 font-medium leading-relaxed text-sm">Downloads seguros e links temporários.</p></div>
      </section>

      {/* About Team Full Screen Section */}
      <footer id="about" className="min-h-screen w-full bg-zinc-900 px-8 flex flex-col items-center justify-center text-center mt-auto py-20">
        <div className="max-w-4xl w-full space-y-16">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mx-auto justify-center"><Users size={14} /> Equipe Aura</div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none text-center uppercase">Criado para facilitar <br /> sua rotina digital.</h2>
            <p className="text-base text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto text-center opacity-70">O projeto Aura surgiu da colaboração entre <span className="text-white font-bold mx-1 underline decoration-red-600 underline-offset-4">Vitor Rovani Marcelino</span> e <span className="text-white font-bold mx-1 underline decoration-blue-600 underline-offset-4">Pedro Goulart Branco</span>.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
            <motion.div whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.06)" }} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 text-left transition-all flex flex-col gap-4 group">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-xl">VR</div>
              <div><h4 className="font-black text-white text-lg tracking-tight">Vitor Rovani Marcelino</h4><p className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">UX & Frontend Master</p></div>
            </motion.div>
            <motion.div whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.06)" }} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 text-left transition-all flex flex-col gap-4 group">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-xl">PG</div>
              <div><h4 className="font-black text-white text-lg tracking-tight">Pedro Goulart Branco</h4><p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Backend & AI Architect</p></div>
            </motion.div>
          </div>
          <div className="pt-12 flex flex-col items-center gap-8">
            <div className="flex gap-10">
              <button className="text-zinc-600 hover:text-white transition-all hover:scale-125"><Code size={24} /></button>
              <button className="text-zinc-600 hover:text-white transition-all hover:scale-125"><Globe size={24} /></button>
            </div>
            <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.6em]">Aura Summarizer © 2026</p>
          </div>
        </div>
      </footer>
    </main>
  )
}