"use client"
import { motion } from "framer-motion";
import { Users, Code, Globe } from "lucide-react";

export function About() {
    return (
        <footer id="about" className="min-h-screen w-full bg-zinc-900 px-8 flex flex-col items-center justify-center text-center mt-auto py-20">
            <div className="max-w-4xl w-full space-y-16">
                
                { }
                <div className="space-y-6 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 mx-auto justify-center"
                    >
                        <Users size={14} /> Equipe Aura
                    </motion.div>
                    
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none text-center uppercase">
                        Criado para facilitar <br /> sua rotina digital.
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-400 font-medium leading-relaxed max-w-xl mx-auto opacity-70 text-center">
                        O projeto Aura surgiu da colaboração entre Vitor Rovani e Pedro Branco para transformar a produtividade com IA.
                    </p>
                </div>

                { }
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
                    
                    { }
                    <motion.div 
                        whileHover={{ 
                            y: -12, 
                            scale: 1.02,
                            backgroundColor: "rgba(255,255,255,0.08)",
                            borderColor: "rgba(255,255,255,0.2)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 text-left flex flex-col gap-6 group cursor-default shadow-2xl"
                    >
                        <motion.div 
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl transition-colors"
                        >
                            VR
                        </motion.div>
                        <div>
                            <h4 className="font-black text-white text-xl tracking-tight leading-tight">Vitor Rovani Marcelino</h4>
                            <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2 opacity-80 group-hover:opacity-100 transition-opacity">UX & Frontend Master</p>
                        </div>
                    </motion.div>

                    { }
                    <motion.div 
                        whileHover={{ 
                            y: -12, 
                            scale: 1.02,
                            backgroundColor: "rgba(255,255,255,0.08)",
                            borderColor: "rgba(255,255,255,0.2)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 text-left flex flex-col gap-6 group cursor-default shadow-2xl"
                    >
                        <motion.div 
                            whileHover={{ rotate: -12, scale: 1.1 }}
                            className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl transition-colors"
                        >
                            PG
                        </motion.div>
                        <div>
                            <h4 className="font-black text-white text-xl tracking-tight leading-tight">Pedro Goulart Branco</h4>
                            <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2 opacity-80 group-hover:opacity-100 transition-opacity">Backend & AI Architect</p>
                        </div>
                    </motion.div>

                </div>

                { }
                <div className="pt-12 flex flex-col items-center gap-8">
                    <div className="flex gap-10">
                        <motion.button whileHover={{ scale: 1.2, rotate: 5 }} className="text-zinc-600 hover:text-white transition-colors">
                            <Code size={24} />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.2, rotate: -5 }} className="text-zinc-600 hover:text-white transition-colors">
                            <Globe size={24} />
                        </motion.button>
                    </div>
                    <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.6em]">Aura Summarizer © 2026</p>
                </div>
            </div>
        </footer>
    );
}