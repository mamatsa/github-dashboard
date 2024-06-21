"use server";

import { addCommentToPullRequest } from "@/app/utils";

export const addBidComment = async (
  formData: FormData,
  issue_number: string
) => {
  // Build the comment body
  const body = `- Requested weights: ${formData.get(
    "weights"
  )}\n- Number of days: ${formData.get("days")}\n\n\n${formData.get(
    "description"
  )}`;

  await addCommentToPullRequest({
    issue_number: +issue_number,
    body,
  });
};

export const addPlainComment = async (
  formData: FormData,
  issue_number: string
) => {
  const body = `${formData.get("description")}`;

  await addCommentToPullRequest({
    issue_number: +issue_number,
    body: body,
  });
};
