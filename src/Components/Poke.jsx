import { useEffect, useState } from "react";
import TypeBadge from "./TypeBadge";

export default function Poke({ id }) {
  const [sprite, setSprite] = useState(null);
  const [name, setName] = useState(null);
  const [types, setTypes] = useState([]);
  const [ability, setAbility] = useState(null);
  const [height, setHeight] = useState(null);
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

        // Preload the next image to avoid a visible pop
        if (nextUrl) {
          await new Promise((resolve) => {
            const img = new Image();
            img.src = nextUrl;
            if (img.complete) resolve();
            else {
              img.onload = resolve;
              img.onerror = resolve; // still resolve to continue UI
            }
          });
        }

        if (cancelled) return;

        setSprite(nextUrl);
        setName(data.name);
        setTypes(data.types?.map((t) => t.type.name) ?? []);
        setAbility(
          data.abilities?.map((a) => a.ability?.name).join(", ") ?? "—"
        );
        setHeight(data.height ?? null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <section
      className={[
        "w-96 mx-auto flex-none",
        "flex flex-col items-center gap-4 rounded-xl p-5 bg-pink-300/70 ring-2 ring-black",
        "motion-safe:transition-opacity duration-200",
        isLoading ? "opacity-90" : "opacity-100",
      ].join(" ")}
      aria-busy={isLoading}
    >
      {/* Name — keep width fixed, prevent long names from pushing layout */}
      <h1 className="w-full text-3xl text-center capitalize font-semibold truncate">
        {name || "\u00A0"}
      </h1>

      {/* Fixed image footprint so height/width stay stable */}
      <div className="relative w-64 h-64">
        {sprite ? (
          <img
            src={sprite}
            alt={name || "pokemon"}
            className={[
              "absolute inset-0 w-full h-full object-contain",
              "motion-safe:transition-opacity duration-200",
              isLoading ? "opacity-80" : "opacity-100",
            ].join(" ")}
            draggable={false}
          />
        ) : (
          // skeleton while first sprite is unknown
          <div className="absolute inset-0 rounded-lg animate-pulse bg-slate-200/40" />
        )}
      </div>

      {/* Types */}
      <div className="flex flex-wrap justify-center gap-2">
        {types.map((t) => (
          <TypeBadge key={t} type={t} />
        ))}
      </div>

      {/* Ability & Height */}
      <h4 className="text-lg text-center">
        <span className="opacity-80">Ability:</span> {ability || "—"}
      </h4>
      <h4 className="text-lg text-center tabular-nums">
        <span className="opacity-80">Height:</span>{" "}
        {height != null
          ? `${Math.round((height / 3.048) * 100) / 100} ft`
          : "—"}
      </h4>
    </section>
  );
}
