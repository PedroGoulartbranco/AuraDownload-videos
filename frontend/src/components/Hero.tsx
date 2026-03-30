"use client"
import { motion } from "framer-motion"
import { Loader2, ChevronDown } from "lucide-react"

interface HeroProps {
    current: any;
    url: string;
    setUrl: (val: string) => void;
    loading: boolean;
    error: string;
    onScrollToFeatures: () => void;
}

export function Hero({ current, url, setUrl, loading, error, onScrollToFeatures }: HeroProps) {
    return (
        <motion.div
            key={`input-${current.name}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center w-full max-w-xl mx-auto px-4"
        >
            <div className="mb-4 sm:mb-6">{current.icon}</div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-8 text-zinc-900 leading-[0.9]">
                Aura <br /> <span className={`transition-colors duration-500 ${current.color}`}>Summarizer</span>
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
                    {loading && <div className="absolute right-8 top-1/2 -translate-y-1/2"><Loader2 className="animate-spin text-zinc-400" /></div>}
                </div>
                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-bold text-xs bg-red-50 py-2 rounded-xl border border-red-100">{error}</motion.p>}
            </div>

            {/* BOTÃO CORRIGIDO */}
            <motion.button
                onClick={onScrollToFeatures}
                className="mt-12 flex flex-col items-center gap-2 text-zinc-300 hover:text-zinc-500 transition-colors cursor-pointer group"
            >
                <span className="text-[10px] font-black uppercase tracking-widest">Descubra mais</span>
                <ChevronDown size={20} className="animate-bounce" />
            </motion.button>
        </motion.div>
    )
}