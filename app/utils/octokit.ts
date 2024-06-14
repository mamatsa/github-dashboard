import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Fetch repository pull requests
export const fetchRepositoryPullRequests = async (
  owner: string,
  repo: string,
  state: "open" | "closed" | "all" = "all"
) => {
  try {
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
