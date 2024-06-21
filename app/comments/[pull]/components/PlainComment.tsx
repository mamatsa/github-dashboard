import { SubmitButton, MarkdownField } from "./";
import { addPlainComment } from "../actions";

export default function PlainComment({
  issue_number,
}: {
  issue_number: string;
}) {
  return (
    <form
      action={(formData) => addPlainComment(formData, issue_number)}
      className="flex flex-col gap-1"
    >
      <label htmlFor="comment" className="font-semibold text-lg mb-1">
        Add Plain Comment
      </label>
      <MarkdownField />
      <SubmitButton />
    </form>
  );
}
