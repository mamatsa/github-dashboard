import { Octokit } from "octokit";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  // Fetch repository pull requests
  const response = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner: "mamatsa",
    repo: "test-repo",
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">
        Pull requests ({response.data.length})
      </h1>
      {response.data.map((pr) => (
        <Link
          href={`/comments/${pr.number}`}
          key={pr.id}
          className="border p-5 flex gap-3 items-center my-3"
        >
          {/* Display user name and avatar */}
          <div>
            <h3 className="text-sm opacity-50">{pr.user?.login}</h3>
            {pr.user?.avatar_url && (
              <Image
                src={pr.user.avatar_url}
                alt="User Avatar"
                width={70}
                height={70}
              />
            )}
          </div>

          {/* Display PR title and body */}
          <div>
            <h2 className="font-semibold">{pr.title}</h2>
            <p>{pr.body}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
