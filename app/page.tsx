import { Octokit } from "octokit";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  // Fetch repository pull requests
  const response = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner: "mamatsa",
    repo: "test-repo",
  });

  // Count how many tokens are in the response body
  const extraxtTokens = (body: string) => {
    const tokensMatch = body.match(/- Number of tokens\s*:?\s*(\d+)/);
    return tokensMatch ? parseInt(tokensMatch[1], 10) : 0;
  };

  // Count how many minutes passed since comment was created
  const timePassed = (date: string) => {
    const created = new Date(date);
    const now = new Date();
    const diff = now.getTime() - created.getTime();
    const minutesPassed = Math.floor(diff / (1000 * 60));
    return minutesPassed > 60
      ? `${Math.floor(minutesPassed / 60)} hours ago`
      : `${minutesPassed} minutes ago`;
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">
        Pull requests ({response.data.length})
      </h1>
      {response.data.map((pr) => (
        <Link
          href={`/comments/${pr.number}`}
          key={pr.id}
          className="border p-5 flex flex-col my-3 gap-1"
        >
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-lg">{pr.title}</h2>
            <p className=" bg-green-400 px-3 py-0.5 rounded-xl text-white text-sm">
              {pr.state}
            </p>
          </div>
          <p>Number of tokens: {extraxtTokens(pr.body || "")}</p>
          <p className="text-xs opacity-50 mt-1">
            #{pr.number} opened {timePassed(pr.created_at)} ago by{" "}
            {pr.user?.login}
          </p>
        </Link>
      ))}

      {/* Sum of tokens */}
      <p className="text-lg font-semibold">
        Total number of tokens:{" "}
        {response.data.reduce(
          (acc, pr) => acc + extraxtTokens(pr.body || ""),
          0
        )}
      </p>
    </>
  );
}
