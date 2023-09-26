"use client";

import { useState } from "react";
import { VocabRow } from "./types";
import { convert } from "roman-numeral";

export default function VocabTest({ rows }: { rows: VocabRow[] }) {
  const [row, setRow] = useState<VocabRow>();
  const [solutionShown, setSolutionShown] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const nextVocab = () => {
    while (true) {
      const idx = Math.floor(Math.random() * rows.length);
      if (rows[idx].latin !== row?.latin) {
        return rows[idx];
      }
    }
  };

  const next = () => {
    setSolutionShown(false);
    setRow(nextVocab());
  };

  return (
    <div className="flex flex-col">
      <div className="py-8 flex flex-col align-center h-36">
        <div className="font-bold">{row?.latin}</div>
        <div className={!solutionShown ? "invisible" : ""}>
          {row?.forms ? <div className="italic">{row.forms}</div> : null}
          <div>{row?.french}</div>
        </div>
      </div>
      {!row && (
        <button className="rounded bg-slate-200 px-4 py-2" onClick={() => next()}>
          Start
        </button>
      )}
      {!solutionShown && row && (
        <button
          className="rounded bg-slate-200 px-4 py-2"
          onClick={() => (!solutionShown ? setSolutionShown(true) : next())}
        >
          Lösung anzeigen
        </button>
      )}

      {solutionShown && (
        <div className="flex flex-row justify-between">
          <button
            className="rounded px-4 py-2 mr-4 bg-green-300"
            onClick={() => {
              setCorrect((n) => n + 1);
              next();
            }}
          >
            Korrekt
          </button>
          <button
            className="rounded px-4 py-2 bg-red-300"
            onClick={() => {
              setIncorrect((n) => n + 1);
              next();
            }}
          >
            Falsch
          </button>
        </div>
      )}

      <div className="py-4 flex flex-row justify-between font-bold font-mono">
        <div className="w-1/2 text-center text-green-500 mr-4">{correct ? convert(correct) : "-"}</div>
        <div className="w-1/2  text-center text-red-500 ml-4">{incorrect ? convert(incorrect) : "-"}</div>
      </div>
    </div>
  );
}
