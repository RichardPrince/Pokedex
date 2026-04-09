import { useState, useEffect } from "react";

export default function Counter({ id, setId }) {
  const maxId = 1025;
  const [draftId, setDraftId] = useState(String(id));

  useEffect(() => {
    setDraftId(String(id));
  }, [id]);

  function commitDraft() {
    if (draftId.trim() === "") {
      setDraftId(String(id));
      return;
    }
    const num = Number(draftId);
    if (Number.isNaN(num)) {
      setDraftId(String(id));
      return;
    }
    const clamped = Math.max(1, Math.min(maxId, Math.floor(num)));
    setId(clamped);
    setDraftId(String(clamped));
  }

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* D-pad row + input */}
      <div className="flex items-center gap-3">
        {/* Prev */}
        <button
          onClick={() => setId((prev) => (prev === 1 ? maxId : prev - 1))}
          className="dpad-btn w-11 h-11 rounded-full bg-[#2a2040] border border-white/10 flex items-center justify-center text-neon-violet hover:bg-neon-purple/20 hover:border-neon-purple/40 hover:shadow-neon-purple active:scale-90 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple"
          aria-label="Previous Pokemon"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* ID display */}
        <input
          type="number"
          min={1}
          max={maxId}
          step={1}
          value={draftId}
          placeholder={String(id)}
          inputMode="numeric"
          onChange={(e) => {
            const v = e.target.value;
            if (v === "") {
              setDraftId("");
              return;
            }
            if (/^\d+$/.test(v)) setDraftId(v);
          }}
          onBlur={commitDraft}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitDraft();
          }}
          className="w-16 text-center font-display font-bold text-sm text-surface-text bg-[#0c0c1d] rounded-lg px-2 py-2.5 border border-neon-purple/20 shadow-[inset_0_2px_6px_rgba(0,0,0,0.4)] focus:outline-none focus:border-neon-purple/50 focus:shadow-[inset_0_2px_6px_rgba(0,0,0,0.4),0_0_10px_rgba(124,58,237,0.2)] transition-all duration-200 placeholder:text-surface-dim"
          aria-label="Jump to Pokemon ID"
        />

        {/* Next */}
        <button
          onClick={() => setId((prev) => (prev === maxId ? 1 : prev + 1))}
          className="dpad-btn w-11 h-11 rounded-full bg-[#2a2040] border border-white/10 flex items-center justify-center text-neon-violet hover:bg-neon-purple/20 hover:border-neon-purple/40 hover:shadow-neon-purple active:scale-90 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple"
          aria-label="Next Pokemon"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Bottom buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setId(1)}
          className="font-display text-[11px] font-semibold tracking-wider uppercase rounded-full px-4 py-1.5 bg-white/[0.04] border border-white/8 text-surface-dim hover:text-surface-text hover:bg-white/[0.08] active:scale-95 transition-all duration-150 cursor-pointer"
        >
          Reset
        </button>
        <button
          onClick={() => setId(Math.floor(Math.random() * maxId) + 1)}
          className="font-display text-[11px] font-semibold tracking-wider uppercase rounded-full px-4 py-1.5 bg-neon-rose/10 border border-neon-rose/20 text-neon-rose/70 hover:bg-neon-rose/20 hover:text-neon-rose hover:shadow-[0_0_12px_rgba(244,63,94,0.3)] active:scale-95 transition-all duration-150 cursor-pointer"
        >
          Random
        </button>
      </div>
    </div>
  );
}
