"use client"
import { motion } from "framer-motion"
import { Loader2, ChevronDown } from "lucide-react"

interface HeroProps {
    current: any;
    activeTab: string;
    url: string;
    setUrl: (val: string) => void;
    loading: boolean;
    error: string;
    onScrollToFeatures: () => void;
}

export function Hero({ current, activeTab, url, setUrl, loading, error, onScrollToFeatures }: HeroProps) {
    return (
        <motion.div
            key={`input-${current.name}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center w-full max-w-xl mx-auto px-4"
        >
            <div className="mb-4 sm:mb-6">{current.icon}</div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-10 text-zinc-900 leading-none pb-2 flex flex-wrap justify-center gap-x-4">
                <span>Flux</span>
                <span className={activeTab === 'tiktok'
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-[#00f2ea] to-[#ff0050]"
                    : current.color
                }>
                    Media
                </span>
            </h1>

            <div className="w-full space-y-4">
                <div className="relative group">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Cole o link aqui..."
                        className="w-full py-4 sm:py-5 px-6 sm:px-10 rounded-full border-2 transition-all bg-white/80 backdrop-blur-md shadow-xl focus:outline-none text-base sm:text-lg border-white focus:border-zinc-300 text-black"
                    />
                    {loading && (
                        <div className="absolute right-8 top-1/2 -translate-y-1/2">
                            <Loader2 className="animate-spin text-zinc-400" />
                        </div>
                    )}
                </div>
                {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-bold text-xs bg-red-50 py-2 rounded-xl border border-red-100">
                        {error}
                    </motion.p>
                )}
            </div>

            <motion.button
                onClick={onScrollToFeatures}
                className="mt-12 flex flex-col items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer group"
            >
                <span className="text-[10px] font-black uppercase tracking-widest">Descubra mais</span>
                <ChevronDown size={20} className="animate-bounce" />
            </motion.button>
        </motion.div>
    )
}