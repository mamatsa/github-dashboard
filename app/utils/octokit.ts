import { Octokit } from "octokit";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// Fetch repository pull requests
export const fetchRepositoryPullRequests = async (
  owner: string,
  repo: string,
  state: "open" | "closed" | "all" = "all"
) => {
  try {
    let session = await auth();

    const octokit = new Octokit({
      auth: session?.accessToken,
    });

    const response = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
      owner,
      repo,
      state: state,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching repository pull requests:", error);
    throw error;
  }
};

// Fetch specific pull request details
export const fetchPullRequestDetails = async (
  owner: string,
  repo: string,
  pull_number: number
) => {
  try {
    let session = await auth();

    const octokit = new Octokit({
      auth: session?.accessToken,
    });

    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}",
      {
        owner,
        repo,
        pull_number,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pull request details:", error);
    throw error;
  }
};

// Fetch specific pull request comments
export const fetchPullRequestComments = async (
  owner: string,
  repo: string,
  issue_number: number
) => {
  try {
    let session = await auth();

    const octokit = new Octokit({
      auth: session?.accessToken,
    });

    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner,
        repo,
        issue_number,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pull request comments:", error);
    throw error;
  }
};

// Create a new pull request
export async function createPullRequest({
  branchName,
  newFileContent,
  pullRequestTitle,
  pullRequestDescription,
}: {
  branchName: string;
  newFileContent: string;
  pullRequestTitle: string;
  pullRequestDescription: string;
}) {
  let session = await auth();

  const octokit = new Octokit({
    auth: session?.accessToken,
  });

  const owner = "mamatsa";
  const repo = "sample-proposals";
  const newFilePath = "proposal.md";

  try {
    // Step 1: Check if the repository is already forked
    let forkOwner: string;
    let forkRepo: string;

    try {
      const forkResponse = await octokit.rest.repos.get({
        owner: "authenticated_user", // Change to the authenticated user's GitHub username
        repo,
      });

      forkOwner = forkResponse.data.owner.login;
      forkRepo = forkResponse.data.name;
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        error.status === 404
      ) {
        // Repository is not forked yet, so we fork it
        const forkResponse = await octokit.rest.repos.createFork({
          owner,
          repo,
        });

        forkOwner = forkResponse.data.owner.login;
        forkRepo = forkResponse.data.name;

        // Wait for the fork to be ready
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } else {
        throw error;
      }
    }

    // Step 2: Get the default branch of the forked repository
    const {
      data: { default_branch: defaultBranch },
    } = await octokit.rest.repos.get({
      owner: forkOwner,
      repo: forkRepo,
    });

    // Step 3: Get the reference to the default branch
    const {
      data: {
        object: { sha: baseSha },
      },
    } = await octokit.rest.git.getRef({
      owner: forkOwner,
      repo: forkRepo,
      ref: `heads/${defaultBranch}`,
    });

    // Step 4: Create a new branch in the forked repository
    await octokit.rest.git.createRef({
      owner: forkOwner,
      repo: forkRepo,
      ref: `refs/heads/${branchName}`,
      sha: baseSha,
    });

    // Step 5: Create or update a file in the new branch
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: forkOwner,
      repo: forkRepo,
      path: newFilePath,
      message: `Adding new file for PR: ${pullRequestTitle}`,
      content: Buffer.from(newFileContent).toString("base64"),
      branch: branchName,
    });

    // Step 6: Create a pull request from the forked repository to the original repository
    const pullRequest = await octokit.rest.pulls.create({
      owner,
      repo,
      title: pullRequestTitle,
      body: pullRequestDescription,
      head: `${forkOwner}:${branchName}`,
      base: defaultBranch,
    });

    return pullRequest.data;
  } catch (error) {
    console.error("Error creating pull request:", error);
    throw error;
  }
}

// Add a comment to a pull request
export async function addCommentToPullRequest({
  issue_number,
  body,
}: {
  issue_number: number;
  body: string;
}) {
  let session = await auth();

  const octokit = new Octokit({
    auth: session?.accessToken,
  });

  const owner = "mamatsa";
  const repo = "sample-proposals";

  try {
    const response = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body,
    });

    revalidatePath(`/comments/${issue_number}`);

    return response.data;
  } catch (error) {
    console.error("Error adding comment to pull request:", error);
    throw error;
  }
}

export async function fetchPullRequestFileContent(
  owner: string,
  repo: string,
  pull_number: number
): Promise<string> {
  let session = await auth();

  const octokit = new Octokit({
    auth: session?.accessToken,
  });

  try {
    // Step 1: List the files in the pull request
    const filesResponse = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number,
    });

    const files = filesResponse.data;

    // Assuming there's only one file in the pull request
    if (files.length === 1) {
      const file = files[0];
      const filePath = file.filename;

      // Step 2: Get the list of commits in the pull request
      const commitsResponse = await octokit.rest.pulls.listCommits({
        owner,
        repo,
        pull_number,
      });

      // Get the SHA of the latest commit
      const latestCommit =
        commitsResponse.data[commitsResponse.data.length - 1];
      const ref = latestCommit.sha; // Use the latest commit SHA

      // Step 3: Fetch the file content from the latest commit
      const contentResponse = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: filePath,
        ref, // Commit SHA
      });

      if (Array.isArray(contentResponse.data)) {
        throw new Error(
          "Expected a file but found a directory or multiple items."
        );
      }

      const contentData = contentResponse.data;

      // Ensure that the content is present and is a file
      if ("content" in contentData && contentData.type === "file") {
        // The content is Base64 encoded, so decode it
        const content = Buffer.from(contentData.content, "base64").toString(
          "utf8"
        );
        return content;
      } else {
        throw new Error("Content is not a file.");
      }
    } else {
      throw new Error(
        "Expected one file in the pull request, but found multiple or none."
      );
    }
  } catch (error) {
    console.error("Error fetching pull request file content:", error);
    throw error;
  }
}
