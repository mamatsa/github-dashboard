import Link from "next/link";
import { Octokit } from "octokit";

export default async function Page({ params }: { params: { pull: string } }) {
  // Fetch pull request comments
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  // Fetch pull request details
  const prDetails = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}",
    {
      owner: "mamatsa",
      repo: "test-repo",
      pull_number: +params.pull,
    }
  );

  // Fetch pull request comments
  const prComments = await octokit.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      owner: "mamatsa",
      repo: "test-repo",
      issue_number: +params.pull,
    }
  );

  console.log(
    "----------------------------------------------------------------------"
  );
  console.log(prDetails.data);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-3">Pull Request #{params.pull}</h1>

      {/* Display PR title and body */}
      <div className="mb-5">
        <p className="text-lg">
          <span className="font-semibold ">Title: </span>
          {prDetails.data.title}
        </p>
        <p>
          <span className="font-semibold">Description:</span>{" "}
          {prDetails.data.body}
        </p>
      </div>

      {/* Display comments */}
      <h2 className="font-bold text-lg">Comments</h2>
      {prComments.data.map((comment) => (
        <div key={comment.id} className="border mb-3 mt-2 px-3 py-2">
          <h2 className="font-bold text-sm">{comment.user?.login}</h2>
          <p>{comment.body}</p>
        </div>
      ))}

      {/* Go back button */}
      <div className="mt-16">
        <Link
          href="/"
          className="cursor-pointer border px-3 py-2 hover:bg-slate-200"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
