import integrations from "@/content/integrations.json";

export type IntegrationKind = "instagram" | "linkedin" | "github";
export type IntegrationPreview = { kind: IntegrationKind; label: string; url: string; status: "outbound" | "authorized"; description: string };
export const integrationPreviews: IntegrationPreview[] = [
  { kind: "instagram", label: "Instagram posts and reels", url: integrations.instagram.profileUrl, status: "outbound", description: "Profile connection only. Posts and reels will appear after authorized professional-account access or approved embed URLs are supplied." },
  { kind: "linkedin", label: "LinkedIn highlights", url: integrations.linkedin.profileUrl, status: "outbound", description: "Profile connection only. No employment history, posts or credentials are inferred from public HTML." },
  { kind: "github", label: "GitHub contribution activity", url: integrations.github.profileUrl, status: "outbound", description: "Profile connection only. Contribution totals require the server-side GitHub GraphQL adapter and GITHUB_TOKEN." },
];
