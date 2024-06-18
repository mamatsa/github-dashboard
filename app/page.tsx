import Link from "next/link";
import { timePassed, fetchRepositoryPullRequests } from "@/app/utils";
import { auth } from "@/auth";

export const revalidate = 0;

export default async function Home() {
  let session = await auth();

  const pullRequests = await fetchRepositoryPullRequests(
    "mamatsa",
    "sample-proposals",
    "all"
  );

  // Count how many tokens are in the response body
  const extraxtTokens = (body: string) => {
    const tokensMatch = body.match(/- Number of tokens\s*:?\s*(\d+)/);
    return tokensMatch ? parseInt(tokensMatch[1], 10) : 0;
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          Pull requests ({pullRequests.length})
        </h1>
        {session?.accessToken && (
          <Link
            href="/create-proposal"
            className="bg-blue-500 px-3 py-2 text-white"
          >
            Add New Proposal
          </Link>
        )}
      </div>

      {/* List of pull requests */}
      {pullRequests.map((pr) => (
        <Link
          href={`/comments/${pr.number}`}
          key={pr.id}
          className="border p-5 flex flex-col my-3 gap-1"
        >
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-lg">{pr.title}</h2>
            <p
              className={`px-3 py-0.5 rounded-xl text-white text-sm ${
                pr.state === "open" ? "bg-green-400" : "bg-slate-400"
              }`}
            >
              {pr.state}
            </p>
          </div>
          <p>Number of tokens: {extraxtTokens(pr.body || "")}</p>
          <p className="text-xs opacity-50 mt-1">
            #{pr.number} opened {timePassed(pr.created_at)} by {pr.user?.login}
          </p>
        </Link>
      ))}

      {/* Sum of tokens */}
      <p className="text-lg font-semibold">
        Total number of tokens:{" "}
        {pullRequests.reduce(
          (acc, pr) => acc + extraxtTokens(pr.body || ""),
          0
        )}
      </p>
    </>
  );
}
