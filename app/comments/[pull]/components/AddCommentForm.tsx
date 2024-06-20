import { addCommentToPullRequest } from "@/app/utils";
import SubmitButton from "./SubmitButton";

export default function AddCommentForm({
  issue_number,
}: {
  issue_number: string;
}) {
  return (
    <form
      action={async (formData) => {
        "use server";
        await addCommentToPullRequest({
          issue_number: +issue_number,
          body: formData.get("comment") as string,
        });
      }}
      className="flex flex-col my-6 gap-1"
    >
      <label htmlFor="comment" className="font-semibold">
        Add comment
      </label>
      <textarea
        name="comment"
        id="comment"
        className="border p-2"
        placeholder="Comment"
        required
      ></textarea>
      <SubmitButton />
    </form>
  );
}
