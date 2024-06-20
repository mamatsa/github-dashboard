"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({}) {
  const { pending } = useFormStatus();

  return (
    <button
      className="border py-2 px-3 w-min whitespace-nowrap -mt-5 hover:bg-slate-200"
      type="submit"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit Comment"}
    </button>
  );
}
