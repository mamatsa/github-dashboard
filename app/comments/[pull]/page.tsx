import Link from "next/link";
import { fetchPullRequestDetails, fetchPullRequestComments } from "@/app/utils";
import AddCommentForm from "./components/AddCommentForm";
import CommentList from "./components/CommentList";

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

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-3">Pull Request #{params.pull}</h1>
        {/* Go back button */}
        <div>
          <Link
            href="/"
            className="cursor-pointer border px-3 py-2 hover:bg-slate-200"
          >
            Go back
          </Link>
        </div>
      </div>

      {/* Display PR title and body */}
      <div className="mb-5 text-lg">
        <p>
          <span className="font-semibold ">Title: </span>
          {prDetails.title}
        </p>
        <p>
          <span className="font-semibold">Description:</span> {prDetails.body}
        </p>
      </div>

      {/* Display comments */}
      <h2 className="font-bold text-lg">Comments</h2>
      <CommentList prComments={prComments} />

      {/* Add comment form */}
      <AddCommentForm issue_number={params.pull} />
    </>
  );
}
