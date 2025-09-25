import React from "react";
import { useState, useEffect } from "react";

export default function Counter({ id, setId }) {
  const initial = 1;
  const maxId = 1025;
  const resetScale = 1;
  const [scaleUp, setScaleUp] = useState(resetScale);
  const [scaleDown, setScaleDown] = useState(resetScale);
  const [draftId, setDraftId] = useState(String(id));

  useEffect(() => {
    // keep the input in sync when buttons change `id`
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
    <section className="flex flex-col items-center gap-4 bg-blue-100 ring-2 ring-black  rounded-md p-4 hover:bg-blue-200">
      <div>
        <button
          onClick={() => setId((id) => (id === 1 ? maxId : id - scaleDown))}
          className="text-black bg-pink-200 rounded-md px-3 py-2 ring-2 ring-black hover:bg-pink-300"
        >
          prev
        </button>
        <input
          type="number"
          min={1}
          max={maxId}
          step={1}
          value={draftId} // use the draft string so you can clear it
          placeholder={String(id)}
          inputMode="numeric"
          onChange={(e) => {
            const v = e.target.value; // always a string
            if (v === "") {
              setDraftId("");
              return;
            }
            if (/^\d+$/.test(v)) {
              setDraftId(v); // allow digits while typing
            }
          }}
          onBlur={commitDraft}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitDraft();
          }}
          className="w-24 text-center rounded-md px-2 py-2 ml-2 mr-2 text-black bg-pink-300 hover:bg-pink-400 focus:outline-none ring-2 ring-black"
          aria-label="Jump to ID"
        />
        <button
          onClick={() => setId((id) => (id === maxId ? 1 : id + scaleUp))}
          className="text-black bg-pink-200 rounded-md px-3 py-2 ring-2 ring-black  hover:bg-pink-300"
        >
          next
        </button>
      </div>

      <div>
        <button
          onClick={() => setId(initial)}
          className="w-24 text-center rounded-md px-2 py-2  text-black bg-pink-300 hover:bg-pink-400 focus:outline-none ring-2 ring-black"
        >
          reset
        </button>
      </div>
    </section>
  );
}
