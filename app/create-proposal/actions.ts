"use server";

import { createPullRequest } from "@/app/utils";
import { revalidatePath } from "next/cache";

export async function submitProposal(formData: FormData) {
  "use server";
  try {
    await createPullRequest({
      newFileContent: formData.get("description") as string,
      pullRequestDescription: formData.get("mri") as string,
      pullRequestTitle: formData.get("title") as string,
    });

    revalidatePath("/");
  } catch (e) {
    console.log(e);
  }
}
