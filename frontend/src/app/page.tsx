"use client"
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { Play, Music2 } from "lucide-react"

import {
  sendLinkToBackend,
  downloadYoutubeVideo,
  fetchYoutubeResolutions
} from "@/services/api"

// Importação dos Componentes
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

const QUALITY_LABELS: Record<string, string> = {
  "2160": "4K Ultra HD",
  "1440": "2K Quad HD",
  "1080": "Full HD",
  "720": "HD",
  "480": "SD",
  "360": "Basic",
  "240": "Mobile",
  "144": "Data Saver"
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<keyof typeof PLATFORMS>("youtube")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [videoData, setVideoData] = useState<any>(null)
  const [isVertical, setIsVertical] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [view, setView] = useState<"options" | "resolutions" | "audio">("options")

  const [loadingRes, setLoadingRes] = useState(false)
  const [resolutionsData, setResolutionsData] = useState<any>(null)
  const [selectedRes, setSelectedRes] = useState("1080")
  const [isDownloading, setIsDownloading] = useState(false)

  const [selectedBitrate, setSelectedBitrate] = useState("320kbps")
  const [isDownloadingAudio, setIsDownloadingAudio] = useState(false)

  const current = PLATFORMS[activeTab]

  const dynamicResolutions = resolutionsData
    ? Object.entries(resolutionsData).map(([resKey, size]: any) => {
      const cleanLabel = resKey.replace("tamanho_", "").replace("p", "");
      return {
        label: cleanLabel,
        size: size,
        quality: QUALITY_LABELS[cleanLabel] || "Qualidade Padrão"
      }
    }).sort((a, b) => parseInt(b.label) - parseInt(a.label))
    : [];

  useEffect(() => {
    const triggerAutoProcess = async () => {
      if (!url.trim()) { setError(""); return; }
      if (!current.regex.test(url)) {
        setError(`Link inválido para ${current.name.toUpperCase()}`);
        setVideoData(null);
        return;
      }
      setError("");
      const isShorts = url.includes("/shorts/") || url.includes("tiktok.com");
      setIsVertical(isShorts);
      setLoading(true);
      setResolutionsData(null);

      try {
        const info = await sendLinkToBackend(url, current.endpoint);
        setVideoData(info);
        setView("options");
        setLoading(false);

        setLoadingRes(true);
        const resInfo = await fetchYoutubeResolutions(url);
        setResolutionsData(resInfo);

        if (resInfo) {
          const keys = Object.keys(resInfo).map(k => k.replace("tamanho_", "").replace("p", ""));
          const sortedKeys = keys.sort((a, b) => parseInt(b) - parseInt(a));
          setSelectedRes(sortedKeys[0]);
        }
      } catch (err) {
        setError("Erro na conexão com o servidor.");
      } finally {
        setLoading(false);
        setLoadingRes(false);
      }
    };
    triggerAutoProcess();
  }, [url, activeTab]);

  // --- FUNÇÃO DOWNLOAD MP4 ---
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const blob = await downloadYoutubeVideo(url, selectedRes);
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      const cleanTitle = videoData.titulo ? videoData.titulo.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'video';
      link.setAttribute('download', `${cleanTitle}_${selectedRes}p.mp4`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      alert("Erro ao baixar o vídeo.");
    } finally {
      setIsDownloading(false);
    }
  };

  const resetAll = () => {
    setVideoData(null);
    setResolutionsData(null);
    setUrl("");
    setError("");
    setView("options");
    setShowAnalysis(false);
    setIsDownloadingAudio(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-white flex flex-col items-center transition-colors duration-700">
      <div className={`absolute inset-0 bg-gradient-to-b ${current.bgGlow} to-white -z-10 transition-all duration-700`} />
      
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onReset={resetAll} onScroll={scrollToSection} />
      
      <div className="max-w-4xl w-full flex flex-col items-center justify-center pt-4 px-4 z-10 text-center min-h-[80vh]">
        <AnimatePresence mode="wait">
          {!videoData ? (
            <Hero current={current} url={url} setUrl={setUrl} loading={loading} error={error} onScrollToFeatures={() => scrollToSection('features')} />
          ) : (
            <ResultCard
              videoData={videoData}
              isVertical={isVertical}
              view={view}
              setView={setView}
              
              // Props Vídeo
              selectedRes={selectedRes}
              setSelectedRes={setSelectedRes}
              isDownloading={isDownloading}
              onDownload={handleDownload}
              resolutions={dynamicResolutions}
              loadingRes={loadingRes}

              // Props Áudio
              selectedBitrate={selectedBitrate}
              setSelectedBitrate={setSelectedBitrate}
              isDownloadingAudio={isDownloadingAudio}
              onAudioDownload={handleAudioDownload}

              // Props Gerais
              showAnalysis={showAnalysis}
              setShowAnalysis={setShowAnalysis}
              onReset={resetAll}
              current={current}
            />
          )}
        </AnimatePresence>
      </div>
      
      {!videoData && <Features />}
      <About />
    </main>
  )
}