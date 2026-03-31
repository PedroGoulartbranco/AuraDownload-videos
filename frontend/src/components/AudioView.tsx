"use client"
import { motion } from "framer-motion"
import { ChevronLeft, Headphones, Download, Loader2, Check, HardDrive } from "lucide-react"

export function AudioView({
  setView,
  audioResolutions = [],
  selectedBitrate,
  setSelectedBitrate,
  onDownload,
  isDownloading,
  buttonColor
}: any) {

  return (
    <motion.div
      key="audio-view"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full px-4"
    >
      <div className="bg-white p-6 sm:p-8 rounded-[3rem] border border-zinc-100 shadow-xl w-full text-left">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setView("options")}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-900"
            title="Voltar"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="text-center">
            <h3 className="font-black text-zinc-800 uppercase tracking-widest text-[10px]">
              Qualidade de Áudio
            </h3>
            <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-tighter text-center">Tamanhos estimados (MP3)</p>
          </div>
          <div className="w-8" />
        </div>

        {/* Lista de Bitrates Dinâmica */}
        <div className="space-y-2 mb-8 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
          {(audioResolutions?.length || 0) > 0 ? (
            audioResolutions.map((bit: any) => (
              <button
                key={bit.label}
                onClick={() => setSelectedBitrate(bit.label)}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                  selectedBitrate === bit.label
                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-lg'
                    : 'border-zinc-50 bg-zinc-50 text-zinc-500 hover:border-zinc-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 flex items-center justify-center">
                    {selectedBitrate === bit.label ? (
                      <Check size={18} className="text-white" />
                    ) : (
                      <Headphones size={16} className="opacity-30" />
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className={`font-black text-sm leading-none ${selectedBitrate === bit.label ? 'text-white' : 'text-zinc-900'}`}>
                      {bit.label} kbps
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-tighter mt-1 ${
                      selectedBitrate === bit.label ? 'text-zinc-400' : 'text-zinc-400'
                    }`}>
                      {bit.quality}
                    </span>
                  </div>
                </div>
                
                {/* TAMANHO COM ÍCONE DE MEMÓRIA (Ajustado para combinar com o VideoView) */}
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold opacity-60 flex items-center gap-1 uppercase tracking-tighter">
                        <HardDrive size={10} className="opacity-50" />
                        ~{bit.size}
                    </span>
                </div>
              </button>
            ))
          ) : (
            <div className="py-10 text-center text-zinc-400 text-xs font-bold uppercase tracking-widest animate-pulse">
              Calculando tamanhos...
            </div>
          )}
        </div>

        {/* Botão de Download */}
        <button
          onClick={onDownload}
          disabled={isDownloading || (audioResolutions?.length || 0) === 0}
          className={`w-full py-5 rounded-[2rem] font-black text-white shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 ${buttonColor} disabled:opacity-50`}
        >
          {isDownloading ? (
            <><Loader2 className="animate-spin" size={20} /> CONVERTENDO...</>
          ) : (
            <><Download size={20} /> BAIXAR ÁUDIO</>
          )}
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d4d4d8; }
      `}</style>
    </motion.div>
  )
}