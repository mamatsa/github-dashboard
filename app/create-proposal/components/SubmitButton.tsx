"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-blue-500 min-w-fit px-3 py-2 text-white ${
        pending ? "bg-blue-300" : "bg-blue-500"
      }`}
      disabled={pending}
    >
      {!pending ? <span>Create Proposal</span> : <span>Creating ...</span>}
    </button>
  );
}
