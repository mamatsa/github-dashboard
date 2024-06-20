import Link from "next/link";
import {
  fetchPullRequestDetails,
  fetchPullRequestComments,
  fetchPullRequestFileContent,
} from "@/app/utils";
import { Button } from "@/app/components";
import { AddCommentForm, CommentList, ProposalMarkdown } from "./components";

export default async function Page({ params }: { params: { pull: string } }) {
  // Fetch pull request details
  const prDetails = await fetchPullRequestDetails(
    "mamatsa",
    "sample-proposals",
    +params.pull
  );

  // Fetch pull request comments
  const prComments = await fetchPullRequestComments(
    "mamatsa",
    "sample-proposals",
    +params.pull
  );

  const prFileContent = await fetchPullRequestFileContent(
    "mamatsa",
    "sample-proposals",
    +params.pull
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pull Request #{params.pull}</h1>
        {/* Go back button */}
        <div>
          <Link href="/">
            <Button text="Go Back" />
          </Link>
        </div>
      </div>

      {/* Display PR title and body */}
      <div className="text-lg">
        <p>
          <span className="font-semibold ">Title: </span>
          {prDetails.title}
        </p>
        {prDetails.body && (
          <p>
            <span className="font-semibold">Description:</span> {prDetails.body}
          </p>
        )}
      </div>

      {/* Display proposal markdown */}
      <ProposalMarkdown content={prFileContent} />

      {/* Display comments */}
      <div>
        <h2 className="font-bold text-lg">Comments</h2>

        {prComments.length ? (
          <CommentList prComments={prComments} />
        ) : (
          <p className="text-gray-400">No comments have been added yet</p>
        )}
      </div>

      {/* Add comment form */}
      <AddCommentForm issue_number={params.pull} />
    </div>
  );
}
