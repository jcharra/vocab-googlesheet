import { convert } from "roman-numeral";

export default function Stats({ correct, incorrect }: { correct: number; incorrect: number }) {
  return (
    <div className="py-4 flex flex-row justify-between font-bold font-mono">
      <div className="w-1/2 text-center text-green-500 mr-4">
        {correct ? <span className="rounded p-2 bg-green-100">{convert(correct)}</span> : ""}
      </div>
      <div className="w-1/2  text-center text-red-500 ml-4">
        {incorrect ? <span className="rounded p-2 bg-red-100">{convert(incorrect)}</span> : ""}
      </div>
    </div>
  );
}
