"use server";

import { addCommentToPullRequest } from "@/app/utils";

export const addBidComment = async (
  formData: FormData,
  issue_number: string
) => {
  // Build the comment body
  const body = `- Weights requested: ${formData.get(
    "weights"
  )}\n- Minimum Weights Time: ${formData.get(
    "days"
  )}\n- Wallet Address: ${formData.get(
    "wallet"
  )}\n- Description of this bid for weights: \n\n${formData.get(
    "description"
  )}\n\n\n- End of month deliverables: \n\n${formData.get("deliverables")}`;

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
