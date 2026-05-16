import issuesJson from "@/data/issues.json";
import type { Issue, IssueId, IssueTagSlug } from "@/lib/types";

const issues: Issue[] = issuesJson as Issue[];

function parseYear(isoDate: string): number {
  const y = new Date(isoDate).getUTCFullYear();
  if (Number.isNaN(y)) {
    throw new Error(`Invalid publication_date: ${isoDate}`);
  }
  return y;
}

function compareByDateDesc(a: Issue, b: Issue): number {
  return (
    new Date(b.publication_date).getTime() -
    new Date(a.publication_date).getTime()
  );
}

/** All issues, newest first. */
export function getAllIssues(): Issue[] {
  return [...issues].sort(compareByDateDesc);
}

export function getIssueById(id: IssueId): Issue | undefined {
  return issues.find((issue) => issue.id === id);
}

export function getIssuesByYear(year: number): Issue[] {
  return issues
    .filter((issue) => parseYear(issue.publication_date) === year)
    .sort(compareByDateDesc);
}

/** Distinct publication years in the archive, newest first. */
export function getArchiveYears(): number[] {
  const set = new Set<number>();
  for (const issue of issues) {
    set.add(parseYear(issue.publication_date));
  }
  return [...set].sort((a, b) => b - a);
}

/** Demo year nav range (1960–1970). Swap to `getArchiveYears()` when real data spans multiple years. */
export function getDemoYearNavYears(): number[] {
  const years: number[] = [];
  for (let y = 1960; y <= 1970; y++) {
    years.push(y);
  }
  return years;
}

/** Distinct tag slugs in use, sorted alphabetically. */
export function getAllTags(): IssueTagSlug[] {
  const set = new Set<IssueTagSlug>();
  for (const issue of issues) {
    for (const tag of issue.tags) {
      set.add(tag);
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

/**
 * Client-side style search: title, tags, summary, featured article titles.
 * Empty or whitespace-only query returns all issues (newest first).
 */
export function searchIssues(query: string): Issue[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return getAllIssues();
  }

  return issues
    .filter((issue) => {
      if (issue.title.toLowerCase().includes(q)) return true;
      if (issue.summary?.toLowerCase().includes(q)) return true;
      if (issue.tags.some((t) => t.toLowerCase().includes(q))) return true;
      if (
        issue.featured_articles.some((a) =>
          a.title.toLowerCase().includes(q)
        )
      ) {
        return true;
      }
      return false;
    })
    .sort(compareByDateDesc);
}
