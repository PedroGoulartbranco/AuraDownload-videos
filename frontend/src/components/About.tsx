"use client"
import { motion } from "framer-motion";
import { Users, Code, Globe } from "lucide-react";

export function About() {
    return (
        <footer id="about" className="min-h-screen w-full bg-zinc-900 px-6 sm:px-8 flex flex-col items-center justify-center text-center mt-auto py-8 sm:py-12">
            <div className="max-w-4xl w-full flex flex-col gap-6 sm:gap-10">

                { }
                <div className="space-y-3 sm:space-y-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10 text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500 mx-auto justify-center"
                    >
                        <Users size={12} /> Equipe Aura
                    </motion.div>

                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight text-center uppercase">
                        Criado para facilitar <br className="hidden sm:block" /> sua rotina digital.
                    </h2>
                    <p className="text-[10px] sm:text-xs md:text-sm text-zinc-400 font-medium leading-relaxed max-w-lg mx-auto opacity-70 text-center">
                        O projeto Aura surgiu da colaboração entre Vitor Rovani e Pedro Branco para transformar a produtividade com IA.
                    </p>
                </div>

                { }
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">

                    {/* Card Vitor */}
                    <motion.div
                        whileHover={{ y: -5, scale: 1.01, backgroundColor: "rgba(255,255,255,0.08)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="bg-white/5 p-5 sm:p-6 rounded-[1.5rem] border border-white/5 text-left flex flex-col gap-3 group cursor-default shadow-xl"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-xl flex items-center justify-center text-white font-black text-base sm:text-lg shadow-lg">
                            VR
                        </div>
                        <div>
                            <h4 className="font-black text-white text-base sm:text-lg tracking-tight leading-tight">Vitor Rovani Marcelino</h4>
                            <p className="text-red-500 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] mt-1 opacity-80">UX & Frontend Master</p>
                        </div>
                    </motion.div>

                    {/* Card Pedro */}
                    <motion.div
                        whileHover={{ y: -5, scale: 1.01, backgroundColor: "rgba(255,255,255,0.08)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="bg-white/5 p-5 sm:p-6 rounded-[1.5rem] border border-white/5 text-left flex flex-col gap-3 group cursor-default shadow-xl"
                    >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-base sm:text-lg shadow-lg">
                            PG
                        </div>
                        <div>
                            <h4 className="font-black text-white text-base sm:text-lg tracking-tight leading-tight">Pedro Goulart Branco</h4>
                            <p className="text-blue-500 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] mt-1 opacity-80">Backend & AI Architect</p>
                        </div>
                    </motion.div>

                </div>

                { }
                <div className="pt-4 flex flex-col items-center gap-4">
                    <div className="flex gap-6">
                        <motion.button whileHover={{ scale: 1.1 }} className="text-zinc-600 hover:text-white transition-colors">
                            <Code size={18} />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} className="text-zinc-600 hover:text-white transition-colors">
                            <Globe size={18} />
                        </motion.button>
                    </div>
                    <p className="text-zinc-700 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.6em]">Aura Summarizer © 2026</p>
                </div>
            </div>
        </footer>
    );
}