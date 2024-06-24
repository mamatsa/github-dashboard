"use client";

import { useState } from "react";
import { Button } from "@/app/components";
import { BidComment, PlainComment } from "./";

export default function AddCommentForm({
  issue_number,
}: {
  issue_number: string;
}) {
  const [commentType, setCommentType] = useState<"plain" | "bid" | null>();
  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          text="Add Plain Comment"
          onClick={() => setCommentType("plain")}
        />
        <Button text="Add Bid" onClick={() => setCommentType("bid")} />
      </div>
      {commentType === "plain" && (
        <PlainComment
          pullNumber={issue_number}
          onSubmit={() => setCommentType(null)}
        />
      )}
      {commentType === "bid" && (
        <BidComment
          pullNumber={issue_number}
          onSubmit={() => setCommentType(null)}
        />
      )}
    </>
  );
}
