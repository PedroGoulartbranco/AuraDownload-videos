"use client"
import { motion } from "framer-motion"
import { ChevronLeft, HardDrive, Download, Loader2, Check } from "lucide-react"

export function ResolutionView({
  setView,
  resolutions,
  selectedRes,
  setSelectedRes,
  onDownload,
  isDownloading,
  buttonColor
}: any) {
  return (
    <motion.div
      key="resolutions"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full px-4"
    >
      <div className="bg-white p-6 sm:p-8 rounded-[3rem] border border-zinc-100 shadow-xl w-full text-left">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setView("options")}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-900"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="font-black text-zinc-800 uppercase tracking-widest text-[10px]">
            Qualidade de vídeo
          </h3>
          <div className="w-8" />
        </div>

        {/* Listagem de Resoluções Ordenada */}
        <div className="space-y-2 mb-8 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
          {resolutions.map((res: any) => (
            <button
              key={res.label}
              onClick={() => setSelectedRes(res.label)}
              className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${selectedRes === res.label
                  ? 'border-zinc-900 bg-zinc-900 text-white shadow-lg'
                  : 'border-zinc-50 bg-zinc-50 text-zinc-500 hover:border-zinc-200'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-5 flex items-center justify-center">
                  {selectedRes === res.label && <Check size={18} className="text-white" />}
                </div>

                <div className="flex flex-col text-left">
                  {/* Exibe apenas o número + p */}
                  <span className={`font-black text-sm leading-none ${selectedRes === res.label ? 'text-white' : 'text-zinc-900'}`}>
                    {res.label}p
                  </span>
                  <span className={`text-[9px] font-bold uppercase tracking-tighter mt-1 ${selectedRes === res.label ? 'text-zinc-400' : 'text-zinc-400'
                    }`}>
                    {res.quality}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-bold opacity-60 flex items-center gap-1">
                <HardDrive size={12} /> {res.size}
              </span>
            </button>
          ))}
        </div>

        {/* Botão de Download */}
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className={`w-full py-5 rounded-[2rem] font-black text-white shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 ${buttonColor} disabled:opacity-50`}
        >
          {isDownloading ? (
            <><Loader2 className="animate-spin" size={20} /> PROCESSANDO...</>
          ) : (
            <><Download size={20} /> BAIXAR AGORA</>
          )}
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4d4d8;
        }
      `}</style>
    </motion.div>
  )
}