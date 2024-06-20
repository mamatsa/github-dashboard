"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function MarkdownField() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEditorChange = (value: string) => {
    if (textareaRef.current) {
      textareaRef.current.value = value;
    }
  };

  return (
    <div>
      <SimpleMDE
        onChange={handleEditorChange}
        options={{
          placeholder: "Description",
          spellChecker: false,
        }}
      />
      <textarea
        ref={textareaRef}
        name="description"
        id="description"
        className="hidden"
      ></textarea>
    </div>
  );
}
