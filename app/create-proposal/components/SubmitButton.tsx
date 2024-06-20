"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`min-w-fit px-3 py-2 border -mt-5 hover:bg-slate-200`}
      type="submit"
      disabled={pending}
    >
      {!pending ? <span>Create Proposal</span> : <span>Creating ...</span>}
    </button>
  );
}
