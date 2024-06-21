"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import "@/app/styles/custom-mde.css";

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
    <div className="flex flex-col gap-4 mt-4">
      <label htmlFor="content">
        Content{" "}
        <span className="text-sm text-gray-400">
          (Details of MRC in markdown format)
        </span>
      </label>
      <SimpleMDE
        onChange={handleEditorChange}
        options={{
          placeholder: "Content",
          spellChecker: false,
          hideIcons: ["fullscreen", "side-by-side"],
        }}
      />
      <textarea
        ref={textareaRef}
        name="content"
        id="content"
        className="hidden"
      ></textarea>
    </div>
  );
}
