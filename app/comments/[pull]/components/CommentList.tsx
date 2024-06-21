"use client";

import { timePassed } from "@/app/utils";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function CommentList({ prComments }: { prComments: any[] }) {
  return (
    <div>
      {prComments.map((comment) => (
        <div
          key={comment.id}
          className="border border-neutral-600 mb-3 mt-2 px-3 py-2"
        >
          {/* Comment author and time */}
          <div className="flex items-center gap-2 mb-1">
            <p className="font-bold text-sm">{comment.user?.login}</p>
            <p className="text-xs opacity-50">
              commented {timePassed(comment.created_at)}
            </p>
          </div>

          {/* Comment body */}
          <div className="remove-all">
            <MarkdownPreview
              source={`${comment.body}`}
              style={{
                padding: 14,
                backgroundColor: "#000",
                color: "#fff",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
