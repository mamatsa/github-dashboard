"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="py-2 px-5 w-min whitespace-nowrap bg-[#179c65] rounded font-semibold hover:bg-[#127d51]"
      type="submit"
      disabled={pending}
    >
      {pending ? "Submitting..." : text}
    </button>
  );
}
