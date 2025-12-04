import { type Repository } from './types';

/**
 * Calculates the top 5 most forked repositories
 * @param repositories Array of repository data from GitHub API
 * @returns Array of objects containing repository names and their fork counts
 * Example return: [{ repo: "react", count: 1000 }, { repo: "vue", count: 500 }]
 */
export const calculateMostForkedRepos = (
  repositories: Repository[]
): { repo: string; count: number }[] => {
  if (repositories.length === 0) return [];

  const forkedRepos = repositories
    .map((repo) => {
      return {
        repo: repo.name,
        count: repo.forkCount,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  return forkedRepos;
};

/**
 * Calculates the top 5 most starred repositories
 * @param repositories Array of repository data from GitHub API
 * @returns Array of objects containing repository names and their star counts
 * Example return: [{ repo: "tensorflow", stars: 5000 }, { repo: "linux", stars: 4000 }]
 */
