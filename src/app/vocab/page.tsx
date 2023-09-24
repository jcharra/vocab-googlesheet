"use client";

import { useState } from "react";

export default function Vocab() {
  const [latin, setLatin] = useState("");
  const [forms, setForms] = useState("");
  const [french, setFrench] = useState("");

  const loadNext = async () => {
    const res = await fetch("/api/randomWord");
    const { latin, forms, french } = await res.json();
    setLatin(latin);
    setForms(forms);
    setFrench(french);
  };

  return (
    <div className="flex flex-col">
      <div>
        <div>{latin}</div>
        {!!forms ? <div>{forms}</div> : null}
        <div>{french}</div>
      </div>
      <button className="rounded bg-slate-200 px-4 py-2" onClick={loadNext}>
        Next
      </button>
    </div>
  );
}
