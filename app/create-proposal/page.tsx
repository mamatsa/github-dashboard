import Link from "next/link";
import { Button } from "@/app/components";
import { submitProposal } from "./actions";
import { MarkdownField, SubmitButton } from "./components";

export default function CreateProposal() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Create MRC</h1>
        <Link href="/">
          <Button text="Go Back" />
        </Link>
      </div>
      <p className="text-gray-400 my-3">
        * You have to install following{" "}
        <a
          className="text-blue-500 underline hover:text-blue-800"
          href="https://github.com/apps/weights-dashboard-poc"
          target="_blank"
        >
          github app
        </a>{" "}
        on your github account to be able to create new MRC
      </p>

      <form action={submitProposal}>
        <div className="flex flex-col gap-4 mt-4">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-neutral-800 p-3 bg-black rounded focus:outline-none focus:border-[#179c65]"
            placeholder="Title"
            required
          />
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="border border-neutral-800 p-3 bg-black rounded focus:outline-none focus:border-[#179c65]"
            placeholder="Description"
          ></textarea>
        </div>
        <MarkdownField />

        <SubmitButton />
      </form>
    </div>
  );
}
