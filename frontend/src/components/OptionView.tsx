import { motion } from "framer-motion"
import { FileVideo, Music, FileSearch, Eye, ThumbsUp, Loader2 } from "lucide-react"

export function OptionsView({ videoData, setView, setShowAnalysis, showAnalysis, loadingRes }: any) {
  return (
    <motion.div key="options" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full">
      <div className="mb-10 w-full px-6 text-center text-black">
        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.4em]">Identificado</span>
        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 leading-snug mt-2 mb-6 tracking-tighter line-clamp-2 pb-2 leading-tight">{videoData.titulo || "Vídeo Encontrado"}</h2>
        <div className="flex justify-center gap-3">
          {videoData.views && <div className="flex items-center gap-1.5 bg-zinc-100 px-4 py-2 rounded-full text-[10px] font-black text-zinc-500 uppercase"><Eye size={12} /> {videoData.views}</div>}
          {videoData.likes && <div className="flex items-center gap-1.5 bg-zinc-100 px-4 py-2 rounded-full text-[10px] font-black text-zinc-500 uppercase"><ThumbsUp size={12} /> {videoData.likes}</div>}
        </div>
      </div>

      <div className="flex gap-4 w-full mb-4 px-4">
        { }
        <button
          onClick={() => !loadingRes && setView("resolutions")}
          disabled={loadingRes}
          className={`flex-1 py-6 bg-zinc-900 text-white rounded-[2rem] font-black transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 shadow-2xl ${loadingRes ? 'opacity-70 cursor-wait' : ''}`}
        >
          {loadingRes ? (
            <Loader2 className="animate-spin" size={10} />
          ) : (
            <FileVideo size={20} />
          )}
          {loadingRes ? "LENDO TAMANHOS..." : "MP4"}
        </button>

        <button
          onClick={() => setView("audio")}
          className="flex-1 py-6 bg-white text-zinc-900 rounded-[2rem] font-black transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-2 border-2 border-zinc-100 shadow-xl"
        >
          <Music size={20} /> MP3
        </button>
      </div>

      <div className="px-4 w-full">
        <button onClick={() => setShowAnalysis(!showAnalysis)} className="w-full py-5 border-2 border-zinc-200 rounded-[2rem] font-black text-zinc-500 hover:bg-zinc-50 transition-all flex items-center justify-center gap-3 mb-4">
          <FileSearch size={20} /> {showAnalysis ? "FECHAR RESUMO" : "VER ANÁLISE DA IA"}
        </button>
      </div>
    </motion.div>
  )
}