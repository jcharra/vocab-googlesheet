"use client";

import { useEffect, useState } from "react";
import { VocabRow } from "./types";
import Stats from "./Stats";
import { getRandomPermutation } from "./utils";
import { convert } from "roman-numeral";

const RETRY_DISTANCE = 4;

export default function VocabTest({ rows }: { rows: VocabRow[] }) {
  const [row, setRow] = useState<VocabRow>();
  const [testRows, setTestRows] = useState<VocabRow[]>(rows);
  const [solutionShown, setSolutionShown] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (rows?.length && running) {
      const shuffled = getRandomPermutation(rows);
      setTestRows(shuffled);
    }
  }, [running, rows]);

  useEffect(() => {
    setSolutionShown(false);

    if (index >= testRows.length) {
      setRunning(false);
    } else {
      setRow(testRows[index]);
    }
  }, [index, testRows]);

  const restart = () => {
    setIndex(0);
    setCorrect(0);
    setIncorrect(0);
    setRunning(true);
  };

  const reinsertLater = (row: VocabRow) => {
    if (index + RETRY_DISTANCE >= testRows.length) {
      testRows.push(row);
    } else {
      testRows.splice(index + RETRY_DISTANCE, 0, row);
    }
  };

  if (!running) {
    if (index > 0) {
      return (
        <div className="flex flex-col h-36">
          <div className="rounded py-1 mt-2 text-center text-2xl">finis</div>
          <div className="py-4">
            <div>
              <div className="w-24 inline-block">Rectus:</div>
              <div className="inline-block text-right"> {correct ? convert(correct) : "nullus"}</div>
            </div>
            <div>
              <div className="w-24 inline-block">Falsus:</div>
              <div className="inline-block text-right"> {incorrect ? convert(incorrect) : "nullus"}</div>
            </div>
          </div>
          <button
            className={`opacity-100 transition-opacity duration-500 rounded py-1 mt-2 text-center bg-green-100`}
            onClick={restart}
          >
            iterum?
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col h-36">
          <button className="rounded py-1 mt-2 text-center bg-green-100" onClick={restart}>
            incipere
          </button>
        </div>
      );
    }
  }

  if (!row) {
    return null;
  }

  return (
    <div className="flex flex-col h-36">
      <div className="py-8 flex flex-col align-center">
        <div className="font-bold">{row.latin}</div>
        <div className={!solutionShown ? "invisible" : ""}>
          {row.forms ? <div className="italic">{row.forms}</div> : null}
          <div>{row.french}</div>
        </div>
      </div>
      {!solutionShown && (
        <button className="rounded bg-slate-200 px-4 py-2" onClick={() => setSolutionShown(true)}>
          significare
        </button>
      )}

      {solutionShown && (
        <div className="flex flex-row justify-between">
          <button
            className="rounded px-4 py-2 mr-4 bg-green-300"
            onClick={() => {
              setCorrect((n) => n + 1);
              setIndex((n) => n + 1);
            }}
          >
            rectus
          </button>
          <button
            className="rounded px-4 py-2 bg-red-300"
            onClick={() => {
              setIncorrect((n) => n + 1);
              reinsertLater(row);
              setIndex((n) => n + 1);
            }}
          >
            falsus
          </button>
        </div>
      )}

      <Stats correct={correct} incorrect={incorrect} />
    </div>
  );
}
