import Link from "next/link";
import {
  fetchPullRequestDetails,
  fetchPullRequestComments,
  fetchPullRequestFileContent,
} from "@/app/utils";
import { Button } from "@/app/components";
import { AddComment, CommentList, ProposalMarkdown } from "./components";

export default async function Page({ params }: { params: { pull: string } }) {
  // Fetch pull request details
  const prDetails = await fetchPullRequestDetails(+params.pull);

  // Fetch pull request comments
  const prComments = await fetchPullRequestComments(+params.pull);

  const prFileContent = await fetchPullRequestFileContent(+params.pull);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold -mb-2">MRC #{params.pull}</h1>
        {/* Go back button */}
        <div>
          <Link href="/">
            <Button text="Go Back" />
          </Link>
        </div>
      </div>

      {/* Display PR title and body */}
      <div className="text-lg">
        <>
          <p className="font-semibold">Title</p>
          <p>{prDetails && prDetails.title}</p>
        </>
        {prDetails?.body && (
          <>
            <p className="font-semibold mt-3">MRI Number</p>
            <p>{prDetails.body}</p>
          </>
        )}
      </div>

      {/* Display proposal markdown */}
      <ProposalMarkdown content={prFileContent} pullNumber={params.pull} />

      {/* Display comments */}
      <div>
        <h2 className="font-bold text-lg">Comments</h2>

        {prComments?.length ? (
          <CommentList prComments={prComments} />
        ) : (
          <p className="text-gray-400">No comments have been added yet</p>
        )}
      </div>

      {/* Add comment form */}
      <AddComment issue_number={params.pull} />
    </div>
  );
}
