import { PLATFORMS } from "@/app/page";

export function Navbar({ activeTab, setActiveTab, onReset }: any) {
  return (
    <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 p-6 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 z-10">
      {Object.keys(PLATFORMS).map((id) => (
        <button
          key={id}
          onClick={() => { setActiveTab(id); onReset(); }}
          className={`transition-all pb-1 ${activeTab === id ? 'text-zinc-900 border-b-2 border-zinc-900 scale-105' : 'hover:text-zinc-600'}`}
        >
          {id}
        </button>
      ))}
      <button 
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} 
        className="hover:text-zinc-900 transition-colors"
      >
        Sobre
      </button>
    </nav>
  );
}