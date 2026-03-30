"use client"
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { Play, Music2, X } from "lucide-react"

import { sendLinkToBackend, downloadYoutubeVideo } from "@/services/api"

import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { ResultCard } from "@/components/ResultCard"
import { Features } from "@/components/Features"
import { About } from "@/components/About"

export const PLATFORMS = {
  youtube: {
    name: "YouTube",
    color: "text-red-600",
    bgGlow: "from-red-200/50",
    button: "bg-red-600",
    icon: <Play size={40} className="text-red-600" />,
    endpoint: "/youtube",
    regex: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|youtube\.com\/shorts\/)\/.+$/
  },
  tiktok: {
    name: "TikTok",
    color: "text-zinc-900",
    bgGlow: "from-cyan-200/40 via-pink-200/40",
    button: "bg-zinc-900",
    icon: <Music2 size={40} className="text-zinc-900" />,
    endpoint: "/tiktok",
    regex: /^(https?:\/\/)?(www\.)?tiktok\.com\/.+$/
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const triggerAutoProcess = async () => {
      if (!url.trim()) { setError(""); return; }

      if (!current.regex.test(url)) {
        setError(`Link inválido para ${current.name.toUpperCase()}`);
        setVideoData(null);
        return;
      }

      setError("");
      const isShorts = url.includes("youtube.com/shorts/") || url.includes("tiktok.com");
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

  const handleDownload = async () => {
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
      alert("Erro ao baixar o vídeo. Verifique o servidor.");
    } finally {
      setIsDownloading(false);
    }
  };

  const resetAll = () => {
    setVideoData(null);
    setUrl("");
    setError("");
    setView("options");
    setShowAnalysis(false);
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-white flex flex-col items-center transition-colors duration-700">
      { }
      <div className={`absolute inset-0 bg-gradient-to-b ${current.bgGlow} to-white -z-10 transition-all duration-700`} />

      { }
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onReset={resetAll} 
      />

      { }
      <div className="max-w-4xl w-full flex flex-col items-center justify-center pt-4 px-4 z-10 text-center min-h-[80vh]">
        <AnimatePresence mode="wait">
          {!videoData ? (
            <Hero 
              current={current} 
              url={url} 
              setUrl={setUrl} 
              loading={loading} 
              error={error} 
              onScrollToFeatures={() => scrollToSection('features')}
            />
          ) : (
            <ResultCard 
              videoData={videoData} 
              isVertical={isVertical} 
              view={view} 
              setView={setView} 
              selectedRes={selectedRes} 
              setSelectedRes={setSelectedRes} 
              isDownloading={isDownloading} 
              showAnalysis={showAnalysis} 
              setShowAnalysis={setShowAnalysis} 
              onDownload={handleDownload} 
              onReset={resetAll} 
              current={current} 
              resolutions={RESOLUTIONS}
            />
          )}
        </AnimatePresence>
      </div>

      { }
      {!videoData && <Features />}

      { }
      <About />
    </main>
  )
}