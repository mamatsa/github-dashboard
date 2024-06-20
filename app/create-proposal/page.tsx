import Link from "next/link";
import { Button } from "@/app/components";
import { submitProposal } from "./actions";
import { MarkdownField, SubmitButton } from "./components";

export default function CreateProposal() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Create Proposal</h1>
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
        on your github account to be able to create new proposal
      </p>

      <form action={submitProposal}>
        <div className="flex flex-col gap-4 mt-4">
          <label htmlFor="branch">
            Branch Name{" "}
            <span className="text-sm text-gray-400">
              (Name of the new branch)
            </span>
          </label>
          <input
            type="text"
            id="branch"
            name="branch"
            className="border p-2"
            placeholder="Branch Name"
          />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <label htmlFor="title">
            Title{" "}
            <span className="text-sm text-gray-400">(Pull request title)</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border p-2"
            placeholder="Title"
          />
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <label htmlFor="description">
            Description{" "}
            <span className="text-sm text-gray-400">
              (Pull request description)
            </span>
          </label>
          <textarea
            name="description"
            id="description"
            className="border p-2"
            placeholder="Description"
          ></textarea>
        </div>
        <MarkdownField />

        <SubmitButton />
      </form>
    </div>
  );
}
