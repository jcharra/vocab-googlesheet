"use client";

import { useState } from "react";
import { VocabRow } from "../types";

export default function VocabTest({ rows }: { rows: VocabRow[] }) {
  const [row, setRow] = useState<VocabRow>();
  const [visible, setVisible] = useState(false);

  const nextVocab = () => {
    while (true) {
      const idx = Math.floor(Math.random() * rows.length);
      if (rows[idx].latin !== row?.latin) {
        return rows[idx];
      }
    }
  };

  const next = () => {
    setVisible(false);
    setRow(nextVocab());
  };

  return (
    <div className="flex flex-col">
      <div className="py-8 flex flex-col align-center">
        <div className="font-bold">{row?.latin}</div>
        <div className={!visible ? "invisible" : ""}>
          {row?.forms ? <div className="italic">{row.forms}</div> : null}
          <div>{row?.french}</div>
        </div>
      </div>
      <button
        className={`rounded bg-slate-200 px-4 py-2 mb-4 ${visible ? "text-white/25" : "text-black"}`}
        onClick={() => setVisible(true)}
        disabled={visible}
      >
        Anzeigen
      </button>
      <button className="rounded bg-slate-200 px-4 py-2" onClick={() => next()}>
        Weiter
      </button>
    </div>
  );
}
