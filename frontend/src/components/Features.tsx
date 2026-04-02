"use client"
import { Zap, ShieldCheck, MonitorPlay } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 max-w-6xl w-full px-8 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-100">
      
      { }
      <div className="space-y-4 text-center md:text-left group">
        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-inner transition-transform group-hover:scale-110">
          <Zap size={28}/>
        </div>
        <h3 className="text-xl font-black text-zinc-800 tracking-tighter">Resposta Imediata</h3>
        <p className="text-zinc-500 font-medium leading-relaxed text-sm">
          Nossa infraestrutura processa seus links em tempo real, entregando o conteúdo pronto para baixar em segundos.
        </p>
      </div>

      { }
      <div className="space-y-4 text-center md:text-left group">
        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-inner transition-transform group-hover:scale-110">
          <MonitorPlay size={28}/>
        </div>
        <h3 className="text-xl font-black text-zinc-800 tracking-tighter">Alta Definição</h3>
        <p className="text-zinc-500 font-medium leading-relaxed text-sm">
          Escolha a melhor qualidade para você. Suportamos resoluções de até 1440p (Quad HD) para vídeos e 320kbps para áudios MP3.
        </p>
      </div>

      { }
      <div className="space-y-4 text-center md:text-left group">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-inner transition-transform group-hover:scale-110">
          <ShieldCheck size={28}/>
        </div>
        <h3 className="text-xl font-black text-zinc-800 tracking-tighter">Privacidade Total</h3>
        <p className="text-zinc-500 font-medium leading-relaxed text-sm">
          Não armazenamos seus arquivos. Após o download, os dados são limpos periodicamente do nosso servidor.
        </p>
      </div>

    </section>
  );
}