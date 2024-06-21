"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({}) {
  const { pending } = useFormStatus();

  return (
    <button
      className="py-2 px-5 w-min whitespace-nowrap -mt-5 bg-[#179c65] rounded font-semibold hover:bg-[#127d51]"
      type="submit"
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit Comment"}
    </button>
  );
}
