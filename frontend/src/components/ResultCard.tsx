"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
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
  return (
    <div className="flex flex-col items-center w-full max-w-lg mb-10">
      
      <div className={`bg-zinc-200 rounded-[3rem] mb-6 overflow-hidden border-[6px] border-white shadow-2xl relative transition-all duration-500 ${isVertical ? 'w-52 aspect-[9/16]' : 'w-full aspect-video md:w-[32rem]'}`}>
        {videoData.thumbnail ? (
          <img src={videoData.thumbnail} className="w-full h-full object-cover" alt="Thumbnail" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold uppercase tracking-tighter text-xs">
            Carregando imagem...
          </div>
        )}
        {isVertical && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase">
            Shorts
          </div>
        )}
      </div>

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
            
            // --- ESTA LINHA ABAIXO É A CORREÇÃO ---
            audioResolutions={props.audioResolutions} 
            
            selectedBitrate={props.selectedBitrate}
            setSelectedBitrate={props.setSelectedBitrate}
            onDownload={props.onAudioDownload}
            isDownloading={props.isDownloadingAudio}
            buttonColor={props.current.button}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {props.showAnalysis && view === "options" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-6 mx-4 p-10 bg-zinc-900 rounded-[3rem] text-left w-full overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-2 text-yellow-500 font-black text-[10px] uppercase tracking-widest mb-6">
              <Sparkles size={16} /> Inteligência Aura
            </div>
            <p className="text-zinc-300 font-medium leading-relaxed text-lg italic text-left">
              "{videoData.resumo || "O resumo inteligente está sendo gerado através da análise do áudio..."}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onReset}
        className="mt-12 text-zinc-300 hover:text-zinc-900 font-black text-[10px] uppercase tracking-[0.3em] transition-colors mb-10"
      >
        ← buscar novo link
      </button>
    </div>
  )
}