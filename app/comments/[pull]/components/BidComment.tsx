import { MarkdownField, SubmitButton, Checkbox } from "./";
import { addBidComment } from "../actions";

export default function BidComment({
  pullNumber,
  onSubmit,
}: {
  pullNumber: string;
  onSubmit: () => void;
}) {
  return (
    <form
      action={(formData) => {
        addBidComment(formData, pullNumber);
        onSubmit();
      }}
      className="flex flex-col gap-3"
    >
      <label htmlFor="comment" className="font-semibold text-2xl mb-1">
        Create a Bid
      </label>

      <div className="flex flex-col gap-1">
        <label htmlFor="weights">Weights requested</label>
        <input
          type="number"
          name="weights"
          id="weights"
          className="border border-neutral-800 p-3 bg-black rounded focus:outline-none focus:border-[#179c65]"
          placeholder="Number of weights"
          required
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="days">Minimum Weights Time</label>
        <p className="text-sm text-gray-500">
          {`This is the number of snapshots that will include this bid's weights,
          if accepted. All deliverables must be maintained in order to receive
          weights during the time requested.`}
        </p>
        <input
          type="number"
          name="days"
          id="days"
          className="border border-neutral-800 p-3 bg-black rounded focus:outline-none focus:border-[#179c65]"
          placeholder="Number of days"
          required
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="wallet">Wallet Address</label>
        <p className="text-sm text-gray-500">
          {`This address is the wallet that will be entitled to claim weights if this bid is accepted`}
        </p>
        <input
          type="text"
          name="wallet"
          id="wallet"
          className="border border-neutral-800 p-3 bg-black rounded focus:outline-none focus:border-[#179c65]"
          placeholder="Wallet Address"
          required
        />
      </div>

      <div>
        <MarkdownField
          id="description"
          label="Description of this bid for weights"
          description="Please describe exactly what you plan to contribute.  How will this benefit the community."
          placeholder="Description"
        />

        <MarkdownField
          id="deliverables"
          label="End of month deliverables"
          description="What will you deliver by the end of the month?  Maintenance is not a deliverable rewarded with weights."
          placeholder="Deliverables"
        />
      </div>

      {/* Checkboxes */}
      <div>
        <p className="mb-1">I understand</p>
        <Checkbox
          id="check1"
          label="I understand that I will receive a NOTICE OF ACCEPTANCE if this bid is accepted.
"
        />
        <Checkbox
          id="check2"
          label="I understand that if I do not get a notice of acceptance, I will not be rewarded weights."
        />
        <Checkbox
          id="check3"
          label="I understand all deliverables will be required for weights to be rewarded."
        />
        <Checkbox
          id="check4"
          label="I understand I can ask questions about this process on the MORPHEUS Discord."
        />
        <Checkbox
          id="check5"
          label="I understand I am required to maintain what I contribute in order to keep any weights"
        />
      </div>

      <SubmitButton text="Submit Bid" />
    </form>
  );
}
