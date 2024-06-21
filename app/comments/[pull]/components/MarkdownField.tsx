"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import "@/app/styles/custom-mde.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function MarkdownField({
  label,
  description,
  id,
  placeholder,
}: {
  label: string;
  description: string;
  id: string;
  placeholder: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEditorChange = (value: string) => {
    if (textareaRef.current) {
      textareaRef.current.value = value;
    }
  };

  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor="days">{label}</label>
      <p className="text-sm text-gray-500">{description}</p>
      <SimpleMDE
        onChange={handleEditorChange}
        options={{
          placeholder: placeholder,
          spellChecker: false,
          hideIcons: ["fullscreen", "side-by-side"],
        }}
      />
      <textarea
        ref={textareaRef}
        name={id}
        id={id}
        className="hidden"
      ></textarea>
    </div>
  );
}
