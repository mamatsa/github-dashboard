import { Octokit } from "octokit";
import { auth } from "@/auth";

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
export const createPullRequest = async ({
  branchName,
  pullRequestTitle,
  pullRequestDescription,
  newFileContent,
}: {
  branchName: string;
  pullRequestTitle: string;
  pullRequestDescription: string;
  newFileContent: string;
}) => {
  let session = await auth();

  const octokit = new Octokit({
    auth: session?.accessToken,
  });

  const owner = "mamatsa";
  const repo = "sample-proposals";
  const baseBranch = "main";
  const newFilePath = "proposal.md";

  try {
    // Get the reference (SHA) of the main branch
    const { data: mainRefData } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${baseBranch}`,
    });

    const mainSha = mainRefData.object.sha;

    // Create a new branch from the main branch
    await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branchName}`,
      sha: mainSha,
    });

    // Get the SHA of the new branch
    const { data: newBranchRefData } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${branchName}`,
    });

    const newBranchSha = newBranchRefData.object.sha;

    // Create a blob for the new file content
    const { data: blobData } = await octokit.rest.git.createBlob({
      owner,
      repo,
      content: Buffer.from(newFileContent).toString("base64"),
      encoding: "base64",
    });

    const blobSha = blobData.sha;

    // Get the latest commit on the new branch
    const { data: commitData } = await octokit.rest.git.getCommit({
      owner,
      repo,
      commit_sha: newBranchSha,
    });

    const treeSha = commitData.tree.sha;

    // Create a new tree including the new file
    const { data: newTreeData } = await octokit.rest.git.createTree({
      owner,
      repo,
      base_tree: treeSha,
      tree: [
        {
          path: newFilePath,
          mode: "100644",
          type: "blob",
          sha: blobSha,
        },
      ],
    });

    const newTreeSha = newTreeData.sha;

    // Create a new commit with the new tree
    const { data: newCommitData } = await octokit.rest.git.createCommit({
      owner,
      repo,
      message: "Add new file",
      tree: newTreeSha,
      parents: [newBranchSha],
    });

    const newCommitSha = newCommitData.sha;

    // Update the reference to point to the new commit
    await octokit.rest.git.updateRef({
      owner,
      repo,
      ref: `heads/${branchName}`,
      sha: newCommitSha,
    });

    // Create a pull request
    const response = await octokit.rest.pulls.create({
      owner,
      repo,
      title: pullRequestTitle,
      body: pullRequestDescription,
      head: branchName,
      base: baseBranch,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    console.log(response.data.html_url);
  } catch (error) {
    console.error("Error creating pull request:", error);
  }
};
