import "server-only";
export type GitHubActivity = { source: "github" | "fallback"; weeks: { date: string; count: number }[]; message: string };
export async function githubActivity(): Promise<GitHubActivity> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return { source: "fallback", weeks: [], message: "Outbound profile preview. GITHUB_TOKEN is not configured, so no contribution count is claimed." };
  const query = `query { user(login: "theprathambatra") { contributionsCollection { contributionCalendar { weeks { contributionDays { date contributionCount } } } } } }`;
  const response = await fetch("https://api.github.com/graphql", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ query }), next: { revalidate: 3600 } });
  if (!response.ok) return { source: "fallback", weeks: [], message: "GitHub activity is temporarily unavailable. No count is shown." };
  type Payload = { data?: { user?: { contributionsCollection?: { contributionCalendar?: { weeks?: { contributionDays?: { date: string; contributionCount: number }[] }[] } } } } };
  const payload = await response.json() as Payload;
  const weeks = payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks?.flatMap((week) => week.contributionDays ?? []).map((day) => ({ date: day.date, count: day.contributionCount })) ?? [];
  return { source: "github", weeks, message: "Authorized GitHub contribution activity." };
}
