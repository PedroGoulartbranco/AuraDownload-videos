"use client"
import { motion } from "framer-motion"
import { ChevronLeft, Music, Download, Loader2, Check, Headphones } from "lucide-react"

export function AudioView({ setView, selectedBitrate, setSelectedBitrate, onDownload, isDownloading, buttonColor }: any) {
    const bitrates = [
        { label: "320kbps", quality: "Qualidade Pro", size: "12.5 MB" },
        { label: "192kbps", quality: "Padrão", size: "8.2 MB" },
        { label: "128kbps", quality: "Econômico", size: "4.5 MB" },
    ]

    return (
        <motion.div
            key="audio-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full px-4"
        >
            <div className="bg-white p-6 sm:p-8 rounded-[3rem] border border-zinc-100 shadow-xl w-full text-left">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => setView("options")} className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-900">
                        <ChevronLeft size={20} />
                    </button>
                    <h3 className="font-black text-zinc-800 uppercase tracking-widest text-[10px]">Configurações de Áudio</h3>
                    <div className="w-8" />
                </div>

                <div className="space-y-3 mb-8">
                    {bitrates.map((bit) => (
                        <button
                            key={bit.label}
                            onClick={() => setSelectedBitrate(bit.label)}
                            className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${selectedBitrate === bit.label
                                    ? 'border-zinc-900 bg-zinc-900 text-white shadow-lg'
                                    : 'border-zinc-50 bg-zinc-50 text-zinc-500 hover:border-zinc-200'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-5 flex items-center justify-center">
                                    {selectedBitrate === bit.label ? <Check size={18} /> : <Headphones size={16} className="opacity-40" />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-sm">{bit.label}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-tighter opacity-60">{bit.quality}</span>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold opacity-60 italic">~{bit.size}</span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={onDownload}
                    disabled={isDownloading}
                    className={`w-full py-5 rounded-[2rem] font-black text-white shadow-2xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 ${buttonColor} disabled:opacity-50`}
                >
                    {isDownloading ? <><Loader2 className="animate-spin" size={20} /> CONVERTENDO...</> : <><Download size={20} /> BAIXAR MP3</>}
                </button>
            </div>
        </motion.div>
    )
}