"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="min-w-fit px-5 py-2 -mt-5 bg-[#179c65] rounded font-semibold hover:bg-[#127d51]"
      type="submit"
      disabled={pending}
    >
      {!pending ? <span>Create Proposal</span> : <span>Creating ...</span>}
    </button>
  );
}
