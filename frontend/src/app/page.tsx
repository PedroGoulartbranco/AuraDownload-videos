"use client"
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { Play, Music2 } from "lucide-react"
import { 
  sendLinkToBackend, 
  downloadVideo, 
  downloadAudio, 
  fetchYoutubeResolutions, 
  fetchYoutubeAudioQualities 
} from "@/services/api"

import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { ResultCard } from "@/components/ResultCard"
import { Features } from "@/components/Features"
import { About } from "@/components/About"

const formatCompactNumber = (number: any) => {
  if (!number || isNaN(number)) return "0";
  return Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(number);
};

export const PLATFORMS = {
  youtube: { name: "YouTube", color: "text-red-600", bgGlow: "from-red-200/50", button: "bg-red-600", endpoint: "/youtube", regex: /(youtube\.com|youtu\.be)/ },
  tiktok: { name: "TikTok", color: "text-zinc-900", bgGlow: "from-cyan-200/40 via-pink-200/40", button: "bg-zinc-900", endpoint: "/tiktok", regex: /(tiktok\.com|vt\.tiktok\.com)/ }
}

const QUALITY_LABELS: any = { "2160": "4K Ultra HD", "1440": "2K Quad HD", "1080": "Full HD", "720": "HD", "480": "SD", "360": "Basic", "240": "Mobile", "144": "Data Saver" };

export default function Home() {
  const [activeTab, setActiveTab] = useState<keyof typeof PLATFORMS>("youtube")
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [view, setView] = useState<"options" | "resolutions" | "audio">("options")
  const [videoData, setVideoData] = useState<any>(null)
  const [isVertical, setIsVertical] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)

  // Loadings
  const [loadingBase, setLoadingBase] = useState(false)
  const [loadingRes, setLoadingRes] = useState(false)
  const [loadingAudio, setLoadingAudio] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isDownloadingAudio, setIsDownloadingAudio] = useState(false)

  // Dados das Rotas Lazy
  const [resolutionsData, setResolutionsData] = useState<any>(null)
  const [audioQualitiesData, setAudioQualitiesData] = useState<any>(null)
  const [selectedRes, setSelectedRes] = useState("")
  const [selectedBitrate, setSelectedBitrate] = useState("")

  const current = PLATFORMS[activeTab]

  const dynamicResolutions = resolutionsData ? Object.entries(resolutionsData).map(([resKey, size]: any) => {
    const cleanLabel = resKey.replace("tamanho_", "").replace("p", "");
    return { label: cleanLabel, size: size, quality: QUALITY_LABELS[cleanLabel] || "Qualidade Padrão" }
  }).sort((a, b) => parseInt(b.label) - parseInt(a.label)) : [];

  const dynamicAudioResolutions = audioQualitiesData ? Object.entries(audioQualitiesData).map(([resKey, size]: any) => {
    const cleanLabel = resKey.replace("tamanho_", "").replace("qualidade_", "").replace("p", "");
    return { label: cleanLabel, size: typeof size === 'number' ? `${size.toFixed(2)} MB` : size, quality: parseInt(cleanLabel) >= 256 ? "Alta Fidelidade" : "MP3" }
  }).sort((a, b) => parseInt(b.label) - parseInt(a.label)) : [];

  // --- 1. CARREGAMENTO INICIAL ---
  useEffect(() => {
    const triggerAutoProcess = async () => {
      if (!url.trim()) { setError(""); return; }
      if (!current.regex.test(url.toLowerCase())) { setError(`Link inválido para ${current.name}`); setVideoData(null); return; }
      
      let cleanUrl = url;
      if (url.includes("watch?v=") && url.includes("&list=")) cleanUrl = url.split("&")[0];

      setError(""); setLoadingBase(true); setVideoData(null);
      setIsVertical(cleanUrl.includes("/shorts/") || cleanUrl.includes("tiktok.com"));

      try {
        const info = await sendLinkToBackend(cleanUrl, current.endpoint);
        setVideoData({
          ...info,
          thumbnail: info.thumbnail || info.thumb,
          views: formatCompactNumber(info.views),
          likes: formatCompactNumber(info.likes)
        });
        setView("options");
      } catch (err) { setError("Vídeo não identificado."); } finally { setLoadingBase(false); }
    };
    const tid = setTimeout(triggerAutoProcess, 500);
    return () => clearTimeout(tid);
  }, [url, activeTab]);

  // --- 2. LÓGICA DE AÇÃO MP4 (Lazy Loading ou Download Direto) ---
  const handleMP4Action = async () => {
    if (activeTab === 'tiktok') {
      handleFinalDownload();
      return;
    }
    if (resolutionsData) { setView("resolutions"); return; }
    setLoadingRes(true);
    try {
      const data = await fetchYoutubeResolutions(url);
      setResolutionsData(data);
      const keys = Object.keys(data).map(k => k.replace("tamanho_", "").replace("p", ""));
      setSelectedRes(keys.sort((a,b) => parseInt(b)-parseInt(a))[0]);
      setView("resolutions");
    } catch (err) { alert("Erro ao carregar resoluções."); } finally { setLoadingRes(false); }
  };

  // --- 3. LÓGICA DE AÇÃO MP3 ---
  const handleMP3Action = async () => {
    if (activeTab === 'tiktok') {
      handleFinalAudioDownload();
      return;
    }
    if (audioQualitiesData) { setView("audio"); return; }
    setLoadingAudio(true);
    try {
      const data = await fetchYoutubeAudioQualities(url);
      setAudioQualitiesData(data);
      setSelectedBitrate("320");
      setView("audio");
    } catch (err) { alert("Erro ao carregar áudio."); } finally { setLoadingAudio(false); }
  };

  const handleFinalDownload = async () => {
    setIsDownloading(true);
    try {
      const blob = await downloadVideo(url, selectedRes || "best", activeTab);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      const cleanTitle = (videoData?.titulo || 'video').replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.setAttribute('download', `${cleanTitle}.mp4`);
      document.body.appendChild(link); link.click();
    } catch (err) { alert("Erro no download."); } finally { setIsDownloading(false); }
  };

  const handleFinalAudioDownload = async () => {
    setIsDownloadingAudio(true);
    try {
      const blob = await downloadAudio(url, selectedBitrate || "320", activeTab);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      const cleanTitle = (videoData?.titulo || 'audio').replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.setAttribute('download', `${cleanTitle}.mp3`);
      document.body.appendChild(link); link.click();
    } catch (err) { alert("Erro no áudio."); } finally { setIsDownloadingAudio(false); }
  };

  const resetAll = () => { setVideoData(null); setResolutionsData(null); setAudioQualitiesData(null); setUrl(""); setError(""); setView("options"); };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-white flex flex-col items-center transition-colors duration-700">
      <div className={`absolute inset-0 bg-gradient-to-b ${current.bgGlow} to-white -z-10 transition-all duration-700`} />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onReset={resetAll} />
      <div className="max-w-4xl w-full flex flex-col items-center justify-center pt-4 px-4 z-10 text-center min-h-[80vh]">
        <AnimatePresence mode="wait">
          {!videoData ? (
            <Hero current={current} url={url} setUrl={setUrl} loading={loadingBase} error={error} onScrollToFeatures={() => document.getElementById('features')?.scrollIntoView({behavior:'smooth'})} />
          ) : (
            <ResultCard
              videoData={videoData} isVertical={isVertical} view={view} setView={setView}
              onLoadResolutions={handleMP4Action} onLoadAudio={handleMP3Action}
              selectedRes={selectedRes} setSelectedRes={setSelectedRes}
              selectedBitrate={selectedBitrate} setSelectedBitrate={setSelectedBitrate}
              isDownloading={isDownloading} onDownload={handleFinalDownload}
              isDownloadingAudio={isDownloadingAudio} onAudioDownload={handleFinalAudioDownload}
              resolutions={dynamicResolutions} audioResolutions={dynamicAudioResolutions}
              loadingRes={loadingRes} loadingAudio={loadingAudio}
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