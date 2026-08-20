# External integration design

## Core rule

Public profile links are not API credentials. Every integration must have a server-only authenticated path and an honest fallback. Never scrape a platform to simulate a supported API.

## Spotify

Use Spotify Embeds and the iFrame API for on-page playback. Use the Web API only through server routes when OAuth credentials and a refresh token are configured.

Official references:

- https://developer.spotify.com/documentation/embeds
- https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api
- https://developer.spotify.com/documentation/web-api

Requirements:

- Normalize track metadata into an internal type.
- Paginate and virtualize the Music Vault.
- Keep only a small number of active embeds mounted.
- Always expose an Open in Spotify link.
- Do not promise free or full playback.
- Cache metadata server-side and handle rate limits.

Suggested variables:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

## Instagram

The Instagram Platform supports authorised access for professional accounts. A public personal profile alone is not enough for a reliable live feed.

Official references:

- https://developers.facebook.com/documentation/instagram-platform/overview
- https://developers.facebook.com/documentation/instagram-platform/instagram-graph-api/reference/ig-user/media

Requirements:

- Activate live media only after an appropriate account type and token are confirmed.
- Handle feed and reel media types.
- Never scrape the public HTML page.
- Until authorised, render the profile callout and manually curated post URLs only.

Suggested variables:

- `INSTAGRAM_ACCESS_TOKEN`
- `INSTAGRAM_USER_ID`

## LinkedIn

LinkedIn uses OAuth and many profile or member-feed permissions require approval. Do not describe LinkedIn content as live until an authorised request succeeds.

Official references:

- https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access
- https://learn.microsoft.com/en-us/linkedin/shared/integrations/people/profile-api
- https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api

Requirements:

- Use manually approved profile, experience and post records as the initial source.
- Hide unknown job dates, titles, licenses and certificates.
- Add OAuth support only after the LinkedIn application and permissions are approved.

Suggested variables:

- `LINKEDIN_CLIENT_ID`
- `LINKEDIN_CLIENT_SECRET`
- `LINKEDIN_ACCESS_TOKEN`

## GitHub

Use GitHub GraphQL `contributionsCollection` for an authenticated contribution calendar. Public repository information can be shown without claiming private activity.

Official references:

- https://docs.github.com/en/graphql
- https://docs.github.com/en/graphql/reference/users

Requirements:

- Keep any token server-side.
- Cache contribution data.
- If no token exists, show public repositories or a profile link without a fabricated count.

Suggested variable:

- `GITHUB_TOKEN`

## Google Maps

V1 can use the supplied no-key query embed:

`https://www.google.com/maps?q=28.6690016,77.1686023&z=17&output=embed`

Label it with the full Swawlambi office address and include an external directions link.

## Booking

Use an external Cal.com or Topmate embed only after a public booking URL is supplied. The placeholder state should become direct email and WhatsApp actions, not an empty calendar frame.

Suggested variables:

- `NEXT_PUBLIC_CALCOM_URL`
- `NEXT_PUBLIC_TOPMATE_URL`

## Data and privacy posture

- No analytics by default.
- No first-party contact-form storage in V1.
- No cookies for decorative purposes.
- No secret in client code or public content.
- If first-party data collection is introduced later, review legal notice and consent requirements before deployment.
