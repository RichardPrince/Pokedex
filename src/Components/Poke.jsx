import { useEffect, useState } from "react";
import TypeBadge from "./TypeBadge";

export default function Poke({ id }) {
  const [sprite, setSprite] = useState(null);
  const [name, setName] = useState(null);
  const [types, setTypes] = useState([]);
  const [ability, setAbility] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    async function load() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        const nextUrl =
          data.sprites?.other?.["official-artwork"]?.front_default ||
          data.sprites?.front_default ||
          null;

        if (nextUrl) {
          await new Promise((resolve) => {
            const img = new Image();
            img.src = nextUrl;
            if (img.complete) resolve();
            else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          });
        }

        if (cancelled) return;

        setSprite(nextUrl);
        setName(data.name);
        setTypes(data.types?.map((t) => t.type.name) ?? []);
        setAbility(
          data.abilities?.map((a) => a.ability?.name).join(", ") ?? "\u2014"
        );
        setHeight(data.height ?? null);
        setWeight(data.weight ?? null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const idStr = String(id).padStart(4, "0");

  return (
    <div
      className={[
        "flex flex-col items-center h-[420px] sm:h-[440px] p-4 pt-3",
        "motion-safe:transition-opacity duration-200",
        isLoading ? "opacity-70" : "opacity-100",
      ].join(" ")}
      aria-busy={isLoading}
    >
      {/* Top row: name + id */}
      <div className="w-full flex items-baseline justify-between mb-1">
        <h2 className="font-display font-bold text-xl sm:text-2xl capitalize truncate text-surface-text">
          {name || "\u00A0"}
        </h2>
        <span className="font-body text-[11px] font-semibold text-surface-dim tracking-widest select-none ml-2 flex-shrink-0">
          #{idStr}
        </span>
      </div>

      {/* Sprite — fixed container */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center flex-shrink-0 my-2">
        {/* Type-colored glow */}
        <div
          className="absolute inset-6 rounded-full blur-2xl opacity-25 animate-pulse-glow"
          style={{
            background: types.length
              ? `radial-gradient(circle, ${typeGlow(types[0])} 0%, transparent 70%)`
              : "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {sprite ? (
          <img
            src={sprite}
            alt={name || "pokemon"}
            className={[
              "relative z-[1] max-w-full max-h-full object-contain drop-shadow-lg",
              "motion-safe:transition-all duration-300",
              isLoading ? "opacity-50 scale-95" : "opacity-100 scale-100",
            ].join(" ")}
            draggable={false}
          />
        ) : (
          <div className="w-full h-full rounded-2xl animate-pulse bg-neon-purple/10" />
        )}
      </div>

      {/* Types */}
      <div className="flex flex-wrap justify-center gap-2 mb-3 min-h-[28px]">
        {types.map((t) => (
          <TypeBadge key={t} type={t} />
        ))}
      </div>

      {/* Stats grid — pushed to bottom */}
      <div className="w-full grid grid-cols-3 gap-2 mt-auto">
        <StatBlock label="Ability" value={ability || "\u2014"} wide />
        <StatBlock
          label="Height"
          value={
            height != null
              ? `${Math.round((height / 3.048) * 100) / 100} ft`
              : "\u2014"
          }
        />
        <StatBlock
          label="Weight"
          value={
            weight != null
              ? `${Math.round((weight / 4.536) * 10) / 10} lbs`
              : "\u2014"
          }
        />
      </div>
    </div>
  );
}

function StatBlock({ label, value, wide }) {
  return (
    <div className={`flex flex-col rounded-lg bg-white/[0.03] border border-white/5 px-2.5 py-1.5 ${wide ? "col-span-3 sm:col-span-1" : ""}`}>
      <span className="font-body text-[10px] uppercase tracking-wider text-surface-dim">{label}</span>
      <span className="font-body text-xs text-surface-text font-medium truncate">{value}</span>
    </div>
  );
}

function typeGlow(type) {
  const glows = {
    fire: "rgba(251,146,60,0.5)",
    water: "rgba(56,189,248,0.5)",
    grass: "rgba(74,222,128,0.5)",
    electric: "rgba(250,204,21,0.5)",
    ice: "rgba(103,232,249,0.5)",
    fighting: "rgba(248,113,113,0.5)",
    poison: "rgba(217,70,239,0.5)",
    ground: "rgba(251,191,36,0.5)",
    flying: "rgba(129,140,248,0.5)",
    psychic: "rgba(244,114,182,0.5)",
    bug: "rgba(163,230,53,0.5)",
    rock: "rgba(217,180,78,0.5)",
    ghost: "rgba(167,139,250,0.5)",
    dragon: "rgba(168,85,247,0.5)",
    dark: "rgba(120,113,108,0.5)",
    steel: "rgba(148,163,184,0.5)",
    fairy: "rgba(244,114,182,0.5)",
    normal: "rgba(168,162,158,0.5)",
  };
  return glows[type] || "rgba(124,58,237,0.4)";
}
