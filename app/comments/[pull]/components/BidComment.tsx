import { MarkdownField, SubmitButton } from "./";
import { addBidComment } from "../actions";

export default function BidComment({ issue_number }: { issue_number: string }) {
  return (
    <form
      action={(formData) => addBidComment(formData, issue_number)}
      className="flex flex-col gap-1"
    >
      <label htmlFor="comment" className="font-semibold text-lg mb-1">
        Create a Bid
      </label>
      <div className="w-full flex gap-2 mb-1">
        <input
          type="number"
          name="weights"
          id="weights"
          className="border border-neutral-800 p-3 bg-black rounded focus:outline-none focus:border-[#179c65]"
          placeholder="Requested weights"
          required
        />

        <input
          type="number"
          name="days"
          id="days"
          className="border border-neutral-800 p-3 bg-black rounded focus:outline-none focus:border-[#179c65]"
          placeholder="Number of days"
          required
        />
      </div>
      <MarkdownField />
      <SubmitButton />
    </form>
  );
}
