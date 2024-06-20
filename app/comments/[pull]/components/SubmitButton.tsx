"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({}) {
  const { pending } = useFormStatus();

  return (
    <button
      className="border py-2 px-3 w-min cursor-pointer hover:bg-slate-200"
      type="submit"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
