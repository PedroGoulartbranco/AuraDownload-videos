"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import { OptionsView } from "./OptionView"
import { ResolutionView } from "./ResolutionView"

export function ResultCard({ videoData, isVertical, view, setView, onReset, ...props }: any) {
  return (
    <motion.div className="flex flex-col items-center w-full max-w-lg mx-auto mb-10 px-4">
      {/* Limitei a altura máxima da thumb para não expulsar os botões da tela */}
      <div className={`bg-zinc-200 rounded-[2.5rem] mb-6 overflow-hidden border-[4px] border-white shadow-xl relative transition-all duration-500 ${
        isVertical ? 'w-40 sm:w-48 aspect-[9/16]' : 'w-full aspect-video max-h-[250px] sm:max-h-[300px]'
      }`}>
        {videoData.thumbnail ? <img src={videoData.thumbnail} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold uppercase">Buscando...</div>}
      </div>

      <AnimatePresence mode="wait">
        {view === "options" ? (
          <OptionsView videoData={videoData} setView={setView} {...props} />
        ) : (
          <ResolutionView setView={setView} {...props} buttonColor={props.current.button} />
        )}
      </AnimatePresence>

      {/* BOTÃO DE VOLTAR: Agora com borda e maior para facilitar leitura */}
      <button 
        onClick={onReset} 
        className="mt-10 px-6 py-3 border border-zinc-200 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 font-bold text-sm uppercase tracking-widest transition-all"
      >
        ← buscar outro link
      </button>
    </motion.div>
  )
}