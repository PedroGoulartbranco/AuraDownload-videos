import { Zap, Sparkles, ShieldCheck } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 max-w-6xl w-full px-8 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-zinc-100">
      <div className="space-y-4 text-center md:text-left">
        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-inner"><Zap size={28}/></div>
        <h3 className="text-xl font-black text-zinc-800 tracking-tighter">Resposta Imediata</h3>
        <p className="text-zinc-500 font-medium leading-relaxed text-sm">Processamento em tempo real via Radmin.</p>
      </div>
      <div className="space-y-4 text-center md:text-left">
        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-inner"><Sparkles size={28}/></div>
        <h3 className="text-xl font-black text-zinc-800 tracking-tighter">IA Contextual</h3>
        <p className="text-zinc-500 font-medium leading-relaxed text-sm">Entendemos o tom e o conteúdo do vídeo.</p>
      </div>
      <div className="space-y-4 text-center md:text-left">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-inner"><ShieldCheck size={28}/></div>
        <h3 className="text-xl font-black text-zinc-800 tracking-tighter">Privacidade Total</h3>
        <p className="text-zinc-500 font-medium leading-relaxed text-sm">Seus dados são limpos periodicamente.</p>
      </div>
    </section>
  );
}