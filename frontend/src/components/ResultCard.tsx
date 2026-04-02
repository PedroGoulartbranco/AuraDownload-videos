"use client"
import { motion, AnimatePresence } from "framer-motion"
import { OptionsView } from "./OptionView"
import { ResolutionView } from "./ResolutionView"
import { AudioView } from "./AudioView"

export function ResultCard({ 
  videoData, 
  isVertical, 
  view, 
  setView, 
  onReset, 
  ...props 
}: any) {
  
  const calculatedRatio = videoData.largura && videoData.altura 
    ? `${videoData.largura} / ${videoData.altura}` 
    : (isVertical ? '9/16' : '16/9');

  return (
    <div className="flex flex-col items-center w-full max-w-lg mb-10">
      
      { }
      <div 
        style={{ aspectRatio: calculatedRatio }}
        className={`bg-zinc-200 rounded-[3rem] mb-6 overflow-hidden border-[6px] border-white shadow-2xl relative transition-all duration-500 w-full max-w-[400px] mx-auto`}
      >
        {videoData.thumbnail ? (
          <img src={videoData.thumbnail} className="w-full h-full object-cover" alt="Thumb" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold uppercase text-xs tracking-widest">
            Buscando vídeo...
          </div>
        )}

        { }
        {isVertical && props.current.name === "YouTube" && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
            Shorts
          </div>
        )}
      </div>

      { }
      <AnimatePresence mode="wait">
        {view === "options" && (
          <OptionsView 
            key="options" 
            videoData={videoData} 
            setView={setView} 
            {...props} 
          />
        )}
        
        {view === "resolutions" && (
          <ResolutionView 
            key="resolutions" 
            setView={setView} 
            resolutions={props.resolutions} 
            selectedRes={props.selectedRes} 
            setSelectedRes={props.setSelectedRes} 
            onDownload={props.onDownload} 
            isDownloading={props.isDownloading} 
            buttonColor={props.current.button} 
          />
        )}

        {view === "audio" && (
          <AudioView 
            key="audio" 
            setView={setView} 
            audioResolutions={props.audioResolutions} 
            selectedBitrate={props.selectedBitrate} 
            setSelectedBitrate={props.setSelectedBitrate} 
            onDownload={props.onAudioDownload} 
            isDownloading={props.isDownloadingAudio} 
            buttonColor={props.current.button} 
          />
        )}
      </AnimatePresence>

      { }
      <button 
        onClick={onReset} 
        className="mt-12 text-zinc-300 hover:text-zinc-900 font-black text-[10px] uppercase tracking-[0.3em] transition-colors mb-10"
      >
        ← buscar novo link
      </button>
    </div>
  )
}