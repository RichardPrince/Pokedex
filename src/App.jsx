import { useState } from "react";
import Counter from "./Components/Counter";
import Poke from "./Components/Poke";

function App() {
  const [id, setId] = useState(1);

  return (
    <main className="flex items-center justify-center min-h-screen px-4 py-8">
      {/* Pokedex device */}
      <div className="pokedex-shell relative w-full max-w-[400px] flex flex-col rounded-[28px] overflow-hidden border border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.15),0_0_80px_rgba(239,68,68,0.05)]">

        {/* Top bezel */}
        <div className="bg-[#1a1028] px-5 pt-5 pb-3 flex items-center gap-3 border-b border-white/5">
          {/* Lens */}
          <div className="relative w-10 h-10 rounded-full bg-cyan-500/20 border-2 border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.4)] flex items-center justify-center flex-shrink-0">
            <div className="w-5 h-5 rounded-full bg-cyan-400/60 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),0_0_8px_rgba(6,182,212,0.6)]" />
          </div>
          {/* Indicator LEDs */}
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70 shadow-[0_0_6px_rgba(248,113,113,0.5)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70 shadow-[0_0_6px_rgba(250,204,21,0.5)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/70 shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
          </div>
        </div>

        {/* Screen area — FIXED HEIGHT */}
        <div className="relative bg-[#0c0c1d] mx-4 mt-3 rounded-xl border border-neon-purple/15 overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
          {/* Scanline overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none rounded-xl" style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)"
          }} />
          {/* Screen glow edge */}
          <div className="absolute inset-0 z-10 pointer-events-none rounded-xl shadow-[inset_0_0_30px_rgba(124,58,237,0.08)]" />

          <Poke id={id} />
        </div>

        {/* Controls panel */}
        <div className="bg-[#1a1028] px-5 pt-4 pb-5 flex flex-col items-center gap-4 border-t border-white/5 mt-3">
          <Counter id={id} setId={setId} />
        </div>
      </div>
    </main>
  );
}

export default App;
