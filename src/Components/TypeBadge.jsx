export default function TypeBadge({ type }) {
  const TYPE_STYLES = {
    normal:   { bg: "bg-stone-400/15",  text: "text-stone-300",   glow: "shadow-[0_0_8px_rgba(168,162,158,0.3)]" },
    fire:     { bg: "bg-orange-500/15",  text: "text-orange-300",  glow: "shadow-[0_0_8px_rgba(251,146,60,0.4)]" },
    water:    { bg: "bg-sky-500/15",     text: "text-sky-300",     glow: "shadow-[0_0_8px_rgba(56,189,248,0.4)]" },
    grass:    { bg: "bg-emerald-500/15", text: "text-emerald-300", glow: "shadow-[0_0_8px_rgba(74,222,128,0.4)]" },
    electric: { bg: "bg-yellow-500/15",  text: "text-yellow-300",  glow: "shadow-[0_0_8px_rgba(250,204,21,0.4)]" },
    ice:      { bg: "bg-cyan-400/15",    text: "text-cyan-300",    glow: "shadow-[0_0_8px_rgba(103,232,249,0.4)]" },
    fighting: { bg: "bg-red-500/15",     text: "text-red-300",     glow: "shadow-[0_0_8px_rgba(248,113,113,0.4)]" },
    poison:   { bg: "bg-fuchsia-500/15", text: "text-fuchsia-300", glow: "shadow-[0_0_8px_rgba(217,70,239,0.4)]" },
    ground:   { bg: "bg-amber-500/15",   text: "text-amber-300",   glow: "shadow-[0_0_8px_rgba(251,191,36,0.4)]" },
    flying:   { bg: "bg-indigo-500/15",  text: "text-indigo-300",  glow: "shadow-[0_0_8px_rgba(129,140,248,0.4)]" },
    psychic:  { bg: "bg-pink-500/15",    text: "text-pink-300",    glow: "shadow-[0_0_8px_rgba(244,114,182,0.4)]" },
    bug:      { bg: "bg-lime-500/15",    text: "text-lime-300",    glow: "shadow-[0_0_8px_rgba(163,230,53,0.4)]" },
    rock:     { bg: "bg-yellow-600/15",  text: "text-yellow-400",  glow: "shadow-[0_0_8px_rgba(217,180,78,0.3)]" },
    ghost:    { bg: "bg-violet-500/15",  text: "text-violet-300",  glow: "shadow-[0_0_8px_rgba(167,139,250,0.4)]" },
    dragon:   { bg: "bg-purple-500/15",  text: "text-purple-300",  glow: "shadow-[0_0_8px_rgba(168,85,247,0.4)]" },
    dark:     { bg: "bg-neutral-500/15", text: "text-neutral-300", glow: "shadow-[0_0_8px_rgba(120,113,108,0.3)]" },
    steel:    { bg: "bg-slate-400/15",   text: "text-slate-300",   glow: "shadow-[0_0_8px_rgba(148,163,184,0.3)]" },
    fairy:    { bg: "bg-rose-500/15",    text: "text-rose-300",    glow: "shadow-[0_0_8px_rgba(244,114,182,0.4)]" },
  };

  const key = (type || "").toLowerCase();
  const style = TYPE_STYLES[key] || { bg: "bg-gray-500/15", text: "text-gray-300", glow: "" };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1",
        "text-xs font-display font-semibold tracking-wide capitalize select-none",
        "border border-white/10 backdrop-blur-sm",
        "transition-shadow duration-200",
        style.bg,
        style.text,
        style.glow,
      ].join(" ")}
      aria-label={`Type: ${type}`}
      title={type}
    >
      {type}
    </span>
  );
}
