import { addCommentToPullRequest } from "@/app/utils";
import SubmitButton from "./SubmitButton";
import MarkdownField from "./MarkdownField";

export default function AddCommentForm({
  issue_number,
}: {
  issue_number: string;
}) {
  return (
    <form
      action={async (formData) => {
        "use server";

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
      }}
      className="flex flex-col my-7 gap-1"
    >
      <label htmlFor="comment" className="font-semibold text-lg mb-1">
        Add comment
      </label>
      <div className="w-full flex gap-2 mb-1">
        <input
          type="number"
          name="weights"
          id="weights"
          className="border py-2 px-3 rounded placeholder:text-neutral-500"
          placeholder="Requested weights"
          required
        />

        <input
          type="number"
          name="days"
          id="days"
          className="border py-2 px-3 rounded placeholder:text-neutral-500"
          placeholder="Number of days"
          required
        />
      </div>
      <MarkdownField />
      <SubmitButton />
    </form>
  );
}
