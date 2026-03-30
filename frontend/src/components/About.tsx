"use client"
import { motion } from "framer-motion";
import { Users, Code, Globe } from "lucide-react";

export function About() {
    return (
        <footer id="about" className="min-h-screen w-full bg-zinc-900 px-6 sm:px-8 flex flex-col items-center justify-center text-center mt-auto py-10 sm:py-20">
            { }
            <div className="max-w-4xl w-full flex flex-col justify-between gap-8 sm:gap-12">

                {/* Header do Sobre */}
                <div className="space-y-4 sm:space-y-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mx-auto justify-center"
                    >
                        <Users size={14} /> Equipe Aura
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] text-center uppercase px-2">
                        Criado para facilitar <br className="hidden sm:block" /> sua rotina digital.
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-medium leading-relaxed max-w-xl mx-auto opacity-70 text-center px-4">
                        O projeto Aura surgiu da colaboração entre Vitor Rovani e Pedro Branco para transformar a produtividade com inteligência artificial.
                    </p>
                </div>

                { }
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto w-full px-4">

                    {/* Card Vitor */}
                    <motion.div
                        whileHover={{ y: -8, scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="bg-white/5 p-6 sm:p-8 rounded-[2rem] border border-white/5 text-left flex flex-col gap-4 group cursor-default shadow-2xl"
                    >
                        <motion.div
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-xl transition-colors"
                        >
                            VR
                        </motion.div>
                        <div>
                            <h4 className="font-black text-white text-lg tracking-tight leading-tight">Vitor Rovani Marcelino</h4>
                            <p className="text-red-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mt-1 opacity-80">UX & Frontend Master</p>
                        </div>
                    </motion.div>

                    {/* Card Pedro */}
                    <motion.div
                        whileHover={{ y: -8, scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="bg-white/5 p-6 sm:p-8 rounded-[2rem] border border-white/5 text-left flex flex-col gap-4 group cursor-default shadow-2xl"
                    >
                        <motion.div
                            whileHover={{ rotate: -12, scale: 1.1 }}
                            className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-xl transition-colors"
                        >
                            PG
                        </motion.div>
                        <div>
                            <h4 className="font-black text-white text-lg tracking-tight leading-tight">Pedro Goulart Branco</h4>
                            <p className="text-blue-500 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mt-1 opacity-80">Backend & AI Architect</p>
                        </div>
                    </motion.div>

                </div>

                {/* Rodapé Final mais compacto */}
                <div className="pt-4 sm:pt-8 flex flex-col items-center gap-6">
                    <div className="flex gap-8">
                        <motion.button whileHover={{ scale: 1.2, rotate: 5 }} className="text-zinc-600 hover:text-white transition-colors">
                            <Code size={20} />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.2, rotate: -5 }} className="text-zinc-600 hover:text-white transition-colors">
                            <Globe size={20} />
                        </motion.button>
                    </div>
                    <p className="text-zinc-700 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.6em]">Aura Summarizer © 2026</p>
                </div>
            </div>
        </footer>
    );
}