"use client"
import { motion } from "framer-motion"
import { ChevronLeft, HardDrive, Download, Loader2 } from "lucide-react"

export function ResolutionView({ setView, resolutions, selectedRes, setSelectedRes, onDownload, isDownloading, buttonColor }: any) {
  return (
    <motion.div key="resolutions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full px-4">
      <div className="bg-white p-8 rounded-[3rem] border border-zinc-100 shadow-xl w-full text-left">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setView("options")} className="p-2 hover:bg-zinc-50 rounded-full transition-colors"><ChevronLeft /></button>
          <h3 className="font-black text-zinc-800 uppercase tracking-widest text-[10px]">Qualidade de vídeo</h3>
          <div className="w-8" />
        </div>
        <div className="space-y-3 mb-8">
          {resolutions.map((res: any) => (
            <button key={res.label} onClick={() => setSelectedRes(res.label)} className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${selectedRes === res.label ? 'border-zinc-900 bg-zinc-900 text-white shadow-lg' : 'border-zinc-50 bg-zinc-50 text-zinc-500 hover:border-zinc-200'}`}>
              <div className="flex items-center gap-3"><span className="font-black">{res.label}</span><span className={`text-[10px] px-2 py-0.5 rounded-md ${selectedRes === res.label ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-600'}`}>{res.quality}</span></div>
              <span className="text-xs font-bold opacity-60 flex items-center gap-1"><HardDrive size={12}/> {res.size}</span>
            </button>
          ))}
        </div>
        <button onClick={onDownload} disabled={isDownloading} className={`w-full py-6 rounded-[2rem] font-black text-white shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 ${buttonColor} disabled:opacity-50`}>
          {isDownloading ? <><Loader2 className="animate-spin" size={20}/> BAIXANDO...</> : <><Download size={20}/> BAIXAR AGORA</>}
        </button>
      </div>
    </motion.div>
  )
}