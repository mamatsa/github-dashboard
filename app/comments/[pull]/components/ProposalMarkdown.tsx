"use client";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function ProposalMarkdown({
  content,
}: {
  content: string | undefined;
}) {
  return (
    <div className="relative border bg-slate-50 p-5 mt-8">
      <p className="absolute -top-0 -translate-y-1/2 text-xs text-gray-500 border p-2 bg-slate-50 rounded-md">
        /proposal.md
      </p>
      <div className="remove-all">
        <MarkdownPreview
          source={`${content}`}
          style={{ padding: 14, backgroundColor: "#f8fafc" }}
        />
      </div>
    </div>
  );
}
