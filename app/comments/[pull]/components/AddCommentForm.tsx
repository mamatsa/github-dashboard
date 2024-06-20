import { addCommentToPullRequest } from "@/app/utils";

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
      className="flex flex-col mt-6 gap-1"
    >
      <label htmlFor="comment" className="font-semibold">
        Add comment
      </label>
      <textarea
        name="comment"
        id="comment"
        className="border p-2"
        placeholder="Comment"
      ></textarea>
      <button className="border py-2 px-3 mt-2 w-min">Submit</button>
    </form>
  );
}
