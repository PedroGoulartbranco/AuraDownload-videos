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
                        <Users size={12} /> Equipe Flux Media
                    </motion.div>

                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight text-center uppercase">
                        Criado para facilitar <br className="hidden sm:block" /> sua rotina digital.
                    </h2>
                    <p className="text-[10px] sm:text-xs md:text-sm text-zinc-400 font-medium leading-relaxed max-w-lg mx-auto opacity-70 text-center">
                        O projeto surgiu da colaboração entre Vitor Rovani e Pedro Branco para simplificar a forma como você baixa e consome seus conteúdos favoritos.
                    </p>
                </div>

                { }
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">

                    { }
                    <motion.div
                        whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.08)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="bg-white/5 p-5 sm:p-8 rounded-[2rem] border border-white/5 text-left flex flex-col gap-4 group cursor-default shadow-xl"
                    >
                        { }
                        <motion.div 
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg transition-colors"
                        >
                            VR
                        </motion.div>
                        <div>
                            <h4 className="font-black text-white text-lg tracking-tight leading-tight">Vitor Rovani Marcelino</h4>
                            <p className="text-red-500 text-[9px] font-black uppercase tracking-[0.2em] mt-1 opacity-80 group-hover:opacity-100 transition-opacity">UX & Frontend Master</p>
                        </div>
                    </motion.div>

                    { }
                    <motion.div
                        whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.08)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="bg-white/5 p-5 sm:p-8 rounded-[2rem] border border-white/5 text-left flex flex-col gap-4 group cursor-default shadow-xl"
                    >
                        { }
                        <motion.div 
                            whileHover={{ rotate: -12, scale: 1.1 }}
                            className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg transition-colors"
                        >
                            PG
                        </motion.div>
                        <div>
                            <h4 className="font-black text-white text-lg tracking-tight leading-tight">Pedro Goulart Branco</h4>
                            <p className="text-blue-500 text-[9px] font-black uppercase tracking-[0.2em] mt-1 opacity-80 group-hover:opacity-100 transition-opacity">Backend & Systems Architect</p>
                        </div>
                    </motion.div>

                </div>

                { }
                <div className="pt-4 flex flex-col items-center gap-4">
                    <div className="flex gap-6">
                        <motion.button whileHover={{ scale: 1.2, rotate: 5 }} className="text-zinc-600 hover:text-white transition-all">
                            <Code size={20} />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.2, rotate: -5 }} className="text-zinc-600 hover:text-white transition-all">
                            <Globe size={20} />
                        </motion.button>
                    </div>
                    <p className="text-zinc-700 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.6em]">Flux Media © 2026</p>
                </div>
            </div>
        </footer>
    );
}