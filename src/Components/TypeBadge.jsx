export default function TypeBadge({ type }) {
  const TYPE_STYLES = {
    normal: "bg-stone-100  text-stone-800  ring-stone-300",
    fire: "bg-orange-100 text-orange-800 ring-orange-300",
    water: "bg-sky-100    text-sky-800    ring-sky-300",
    grass: "bg-emerald-100 text-emerald-800 ring-emerald-300",
    electric: "bg-yellow-100 text-yellow-800 ring-yellow-300",
    ice: "bg-cyan-100   text-cyan-800   ring-cyan-300",
    fighting: "bg-red-100    text-red-800    ring-red-300",
    poison: "bg-fuchsia-100 text-fuchsia-800 ring-fuchsia-300",
    ground: "bg-amber-100  text-amber-800  ring-amber-300",
    flying: "bg-indigo-100 text-indigo-800 ring-indigo-300",
    psychic: "bg-pink-100   text-pink-800   ring-pink-300",
    bug: "bg-lime-100   text-lime-800   ring-lime-300",
    rock: "bg-yellow-100 text-yellow-900 ring-yellow-300",
    ghost: "bg-violet-100 text-violet-800 ring-violet-300",
    dragon: "bg-purple-100 text-purple-800 ring-purple-300",
    dark: "bg-neutral-100 text-neutral-800 ring-neutral-300",
    steel: "bg-slate-100  text-slate-800  ring-slate-300",
    fairy: "bg-rose-100   text-rose-800   ring-rose-300",
  };

  const key = (type || "").toLowerCase();
  const color = TYPE_STYLES[key] || "bg-gray-100 text-gray-800 ring-gray-300";

  const base =
    "inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold " +
    "ring-1 ring-offset-1 capitalize select-none";

  return (
    <span
      className={`${base} ${color}`}
      aria-label={`Type: ${type}`}
      title={type}
    >
      {type}
    </span>
  );
}
