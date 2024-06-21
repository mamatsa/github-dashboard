import Link from "next/link";
import { timePassed, fetchRepositoryPullRequests } from "@/app/utils";
import { auth } from "@/auth";
import { Button } from "@/app/components";

export const revalidate = 0;

export default async function Home() {
  let session = await auth();

  const pullRequests = await fetchRepositoryPullRequests("all");

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">
          MRCs ({pullRequests && pullRequests.length})
        </h1>
        {session?.accessToken && (
          <Link href="/create-proposal">
            <Button text="Add New MRC" />
          </Link>
        )}
      </div>

      {/* List of pull requests */}
      {pullRequests &&
        pullRequests.map((pr) => (
          <Link
            href={`/comments/${pr.number}`}
            key={pr.id}
            className="border border-neutral-600 p-5 flex flex-col my-3 gap-1 hover:bg-neutral-800 "
          >
            <div className="flex items-center gap-4">
              <div className="flex justify-between items-center w-full">
                <h2 className="font-semibold text-lg">{pr.title}</h2>
                <p
                  className={`px-3 py-0.5 rounded-xl text-white text-sm ${
                    pr.state === "open" ? "bg-green-400" : "bg-slate-400"
                  }`}
                >
                  {pr.state}
                </p>
              </div>
            </div>
            <p className="text-xs opacity-50 mt-1">
              #{pr.number} opened {timePassed(pr.created_at)} by{" "}
              {pr.user?.login}
            </p>
          </Link>
        ))}
    </>
  );
}
