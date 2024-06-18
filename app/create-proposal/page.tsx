import { createPullRequest } from "@/app/utils";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function CreateProposal() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Create Proposal</h1>
      <form
        action={async (formData: FormData) => {
          "use server";
          try {
            await createPullRequest({
              branchName: formData.get("branch") as string,
              newFileContent: formData.get("content") as string,
              pullRequestDescription: formData.get("description") as string,
              pullRequestTitle: formData.get("title") as string,
            });

            // redirect to home page
            redirect("/");
          } catch (e) {
            console.log(e);
          }
        }}
      >
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

        <div className="flex flex-col gap-4 mt-4">
          <label htmlFor="content">
            Content{" "}
            <span className="text-sm text-gray-400">
              (Content for markdown file)
            </span>
          </label>
          <textarea
            name="content"
            id="content"
            className="border p-2"
            placeholder="Content"
            rows={10}
          ></textarea>
        </div>

        <div className="flex justify-between items-center mt-1">
          <button className="bg-blue-500 px-3 py-2 text-white mt-4">
            Create Proposal
          </button>
          <Link
            href="/"
            className="cursor-pointer border px-3 py-2 hover:bg-slate-200"
          >
            Go back
          </Link>{" "}
        </div>
      </form>
    </div>
  );
}
