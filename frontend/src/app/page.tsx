"use client"
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { Play, Music2 } from "lucide-react"

// Chamadas de API
import {
  sendLinkToBackend,
  downloadYoutubeVideo,
  downloadYoutubeAudio,
  fetchYoutubeResolutions,
  fetchYoutubeAudioQualities
} from "@/services/api"

// Componentes
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { ResultCard } from "@/components/ResultCard"
import { Features } from "@/components/Features"
import { About } from "@/components/About"

export const PLATFORMS = {
  youtube: {
    name: "YouTube", color: "text-red-600", bgGlow: "from-red-200/50", button: "bg-red-600", endpoint: "/youtube",
    regex: /(youtube\.com|youtu\.be)/
  },
  tiktok: {
    name: "TikTok", color: "text-zinc-900", bgGlow: "from-cyan-200/40 via-pink-200/40", button: "bg-zinc-900", endpoint: "/tiktok",
    regex: /tiktok\.com/
  }
}

const QUALITY_LABELS: Record<string, string> = {
  "2160": "4K Ultra HD", "1440": "2K Quad HD", "1080": "Full HD", "720": "HD", "480": "SD", "360": "Basic", "240": "Mobile", "144": "Data Saver"
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<keyof typeof PLATFORMS>("youtube")
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [view, setView] = useState<"options" | "resolutions" | "audio">("options")
  const [isVertical, setIsVertical] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)

  // Estados de Loading
  const [loadingBase, setLoadingBase] = useState(false)
  const [loadingRes, setLoadingRes] = useState(false)
  const [loadingAudio, setLoadingAudio] = useState(false)

  // Estados de Dados
  const [videoData, setVideoData] = useState<any>(null)
  const [resolutionsData, setResolutionsData] = useState<any>(null)
  const [audioQualitiesData, setAudioQualitiesData] = useState<any>(null)

  // Seleções
  const [selectedRes, setSelectedRes] = useState("")
  const [selectedBitrate, setSelectedBitrate] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloadingAudio, setIsDownloadingAudio] = useState(false)

  const current = PLATFORMS[activeTab]

  // Mapeamentos dinâmicos
  const dynamicResolutions = resolutionsData ? Object.entries(resolutionsData).map(([resKey, size]: any) => {
    const cleanLabel = resKey.replace("tamanho_", "").replace("p", "");
    return { label: cleanLabel, size: size, quality: QUALITY_LABELS[cleanLabel] || "Qualidade Padrão" }
  }).sort((a, b) => parseInt(b.label) - parseInt(a.label)) : [];

  const dynamicAudioResolutions = audioQualitiesData ? Object.entries(audioQualitiesData).map(([resKey, size]: any) => {
    const cleanLabel = resKey.replace("tamanho_", "").replace("qualidade_", "").replace("p", "");
    return { label: cleanLabel, size: size, quality: parseInt(cleanLabel) >= 256 ? "Alta Fidelidade" : "MP3" }
  }).sort((a, b) => parseInt(b.label) - parseInt(a.label)) : [];

  // --- 1. CARREGAMENTO INICIAL ---
  useEffect(() => {
    const triggerAutoProcess = async () => {
      if (!url.trim()) { setError(""); return; }
      if (!current.regex.test(url.toLowerCase())) {
        setError(`O link colado não parece ser do ${current.name}`);
        setVideoData(null);
        return;
      }
      setError("");
      setIsVertical(url.includes("/shorts/") || url.includes("tiktok.com"));
      setLoadingBase(true);
      setVideoData(null); setResolutionsData(null); setAudioQualitiesData(null);

      try {
        const info = await sendLinkToBackend(url, current.endpoint);
        setVideoData(info);
        setView("options");
      } catch (err) {
        setError("Não conseguimos identificar este vídeo.");
      } finally {
        setLoadingBase(false);
      }
    };
    const timeoutId = setTimeout(triggerAutoProcess, 500);
    return () => clearTimeout(timeoutId);
  }, [url, activeTab]);

  // --- 2. CARREGAR MP4 ---
  const handleLoadResolutions = async () => {
    if (resolutionsData) { setView("resolutions"); return; }
    setLoadingRes(true);
    try {
      const data = await fetchYoutubeResolutions(url);
      setResolutionsData(data);
      const keys = Object.keys(data).map(k => k.replace("tamanho_", "").replace("p", ""));
      setSelectedRes(keys.sort((a, b) => parseInt(b) - parseInt(a))[0]);
      setView("resolutions");
    } catch (err) { alert("Erro ao buscar resoluções."); } finally { setLoadingRes(false); }
  };

  // --- 3. CARREGAR MP3 ---
  const handleLoadAudio = async () => {
    if (audioQualitiesData) { setView("audio"); return; }
    setLoadingAudio(true);
    try {
      const data = await fetchYoutubeAudioQualities(url);
      setAudioQualitiesData(data);
      const keys = Object.keys(data).map(k => k.replace("tamanho_", "").replace("qualidade_", ""));
      setSelectedBitrate(keys.sort((a, b) => parseInt(b) - parseInt(a))[0]);
      setView("audio");
    } catch (err) { alert("Erro ao buscar qualidades de áudio."); } finally { setLoadingAudio(false); }
  };

  // --- DOWNLOAD MP4 (COM NOME DO VÍDEO + QUALIDADE) ---
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const blob = await downloadYoutubeVideo(url, selectedRes);
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;

      // LÓGICA DO NOME: Título limpo + Resolução
      const cleanTitle = videoData?.titulo ? videoData.titulo.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'video';
      link.setAttribute('download', `${cleanTitle}_${selectedRes}p.mp4`);

      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) { alert("Erro no download."); } finally { setIsDownloading(false); }
  };

  // --- DOWNLOAD MP3 (COM NOME DO VÍDEO + BITRATE) ---
  const handleAudioDownload = async () => {
    setIsDownloadingAudio(true);
    try {
      const blob = await downloadYoutubeAudio(url, selectedBitrate);
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;

      // LÓGICA DO NOME: Título limpo + kbps
      const cleanTitle = videoData?.titulo ? videoData.titulo.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'audio';
      link.setAttribute('download', `${cleanTitle}_${selectedBitrate}kbps.mp3`);

      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) { alert("Erro no áudio."); } finally { setIsDownloadingAudio(false); }
  };

  const resetAll = () => {
    setVideoData(null); setResolutionsData(null); setAudioQualitiesData(null);
    setUrl(""); setError(""); setView("options");
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
            <Hero current={current} url={url} setUrl={setUrl} loading={loadingBase} error={error} onScrollToFeatures={() => scrollToSection('features')} />
          ) : (
            <ResultCard
              videoData={videoData} isVertical={isVertical} view={view} setView={setView}
              selectedRes={selectedRes} setSelectedRes={setSelectedRes}
              isDownloading={isDownloading} onDownload={handleDownload}
              resolutions={dynamicResolutions}
              selectedBitrate={selectedBitrate} setSelectedBitrate={setSelectedBitrate}
              isDownloadingAudio={isDownloadingAudio} onAudioDownload={handleAudioDownload}
              audioResolutions={dynamicAudioResolutions}
              loadingRes={loadingRes} loadingAudio={loadingAudio}
              onLoadResolutions={handleLoadResolutions} onLoadAudio={handleLoadAudio}
              showAnalysis={showAnalysis} setShowAnalysis={setShowAnalysis}
              onReset={resetAll} current={current}
            />
          )}
        </AnimatePresence>
      </div>
      {!videoData && <Features />}
      <About />
    </main>
  )
}