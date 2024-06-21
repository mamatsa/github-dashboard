"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";

export default function ProposalMarkdown({
  content,
  pullNumber,
}: {
  content: string | undefined;
  pullNumber: string;
}) {
  return (
    <div className="relative border border-gray-800 bg-gray-900 p-5 mt-8">
      <p className="absolute -top-0 -translate-y-1/2 text-xs border-gray-800 bg-gray-900 border p-2  rounded-md">
        {`/MRC-${pullNumber}.md`}
      </p>
      <div className="remove-all">
        <MarkdownPreview
          source={`${content}`}
          style={{ padding: 14, backgroundColor: "#111827", color: "#D1D5DB" }}
        />
      </div>
    </div>
  );
}
