import { SubmitButton, MarkdownField } from "./";
import { addPlainComment } from "../actions";

export default function PlainComment({
  pullNumber,
  onSubmit,
}: {
  pullNumber: string;
  onSubmit: () => void;
}) {
  return (
    <form
      action={(formData) => {
        addPlainComment(formData, pullNumber);
        onSubmit();
      }}
      className="flex flex-col gap-1"
    >
      <label htmlFor="comment" className="font-semibold text-lg mb-1">
        Add Plain Comment
      </label>
      <MarkdownField
        id="description"
        label=""
        description=""
        placeholder="Comment"
      />
      <SubmitButton text="Submit Comment" />
    </form>
  );
}
