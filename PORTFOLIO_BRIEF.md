# Portfolio product brief

## 1. Product goal

Create a four-route personal portfolio that presents Pratham Batra as a multidisciplinary website builder, brand and content practitioner, business operator and football-loving creative.

The experience should feel like a kinetic editorial match-day diary meeting a professional case file. It must be polished enough for clients, recruiters and collaborators, while retaining personality.

Primary outcomes:

- Show the websites Pratham has created or contributed to.
- Present verified education and a careful, non-invented work narrative.
- Surface GitHub, Instagram, Spotify and LinkedIn through honest integrations.
- Give Swawlambi Renewables and Swawlambi Inc. a substantial, clearly labelled section.
- Make contact, WhatsApp and booking effortless.

## 2. Information architecture

### Route 1: Home, `/`

The home page is a continuous story with the following order.

#### A. Greeting loader

- Use `public/assets/greetings.json` as the primary animation.
- Use `public/assets/greetings.svg` as a fallback.
- The sequence must communicate Hello, Hola and Namaste.
- Show it once per browsing session where practical.
- Set a sensible minimum display duration so it feels intentional, but never make the visitor wait indefinitely.
- Respect reduced motion with a short static greeting and immediate entry.

#### B. Football hero

- A stylised character resembling Pratham continuously juggles a football while checking his phone.
- The character travels left to right and right to left without a visible reset.
- `@theprathambatra` sits beneath it and follows the same direction with an intentional bounce rhythm.
- The loop is a core hero performance, not decorative content placed over a normal hero.
- Add a concise headline and navigation without covering the animation.
- Preferred football identity: Real Madrid supporter and left winger.

The supplied formal photograph is a contact and identity reference. Do not simply cut it out and pretend it is the illustrated football character. Create the character as a separate authored SVG, sprite sequence or lightweight Rive-style vector treatment during implementation.

#### C. Ball-kick transition into work

- As the visitor scrolls, the character plants, kicks the ball and follows through.
- The ball travels toward the camera and enlarges until it becomes a full-screen wipe.
- The wipe reveals work experience and selected capabilities.
- The transition must be reversible or at least stable when the visitor scrolls upward.

#### D. Work experience

- Present verified information only.
- Do not scrape or invent LinkedIn history.
- Highlight website building, brand building, content, SEO, digital marketing and work connected with Swawlambi.
- If exact employer titles and dates remain unavailable, use a project-led narrative rather than fake chronology.
- Include a restrained GitHub contribution view for `theprathambatra`.

#### E. Briefcase transition

- On the next scroll sequence, work cards and labels lift with individual trajectories.
- They converge into an illustrated briefcase.
- The briefcase closes and latches.
- The closed briefcase becomes the visual object that introduces education.
- Avoid generic particles, sparkles or random floating elements.

#### F. Education and credentials

- York University, Post-Graduate Certificate in Public Relations, 2023 to 2024.
- York University, Post-Graduate Certificate in Digital and Content Marketing, September 2024 to May 2025.
- Maharaja Agrasen Institute of Management Studies, Bachelor of Journalism and Mass Communication. Dates must stay hidden until confirmed.
- PTE Core overall score 90 may be shown only if it adds value. Do not expose registration IDs, date of birth, address or test-taker IDs.
- Licenses and certificates that are not present in structured content must remain hidden until confirmed.
- The layout should be clean, exact and quiet enough to let credentials read quickly.

#### G. Education-to-music transition

- Education objects scatter with choreographed direction, not random physics.
- They settle as tactile postcards.
- Postcards rotate or unfold to reveal Spotify music tiles.
- The visitor should understand that interests and influences follow formal credentials.

#### H. Featured music and home footer

- Show a small, curated Spotify selection on Home.
- Use Spotify embeds or the Spotify iFrame API for supported playback.
- Every item includes an explicit Open in Spotify action.
- Do not claim every track is free or fully playable on the website.
- Finish with contact details and links to Work Orbit, Music Vault and Contact.

### Route 2: Work Orbit, `/work`

Use the public label `Work Orbit` unless a stronger name emerges during implementation without violating the brief.

#### A. Website sphere

- Present all approved websites as a beautiful draggable spherical or orbital display.
- Each site uses a real preview captured from its live URL.
- Every item exposes its name, category and Visit site action.
- Desktop can use React Three Fiber or a custom WebGL sphere.
- Mobile should use a touch-friendly orbital carousel or well-composed spatial list if the full 3D treatment harms performance.
- Provide an accessible non-canvas list for keyboard and screen-reader users.
- Never load 18 full websites in iframes at once.

Approved sites are defined in `content/websites.json`.

#### B. Swawlambi focus

- Treat Swawlambi Renewables Pvt. Ltd. and Swawlambi Inc. as a featured operational case study, not another thumbnail.
- Cover Solar, HVAC, Power Backup, Energy Audits and Electrical and Fire Safety Audits.
- Use the supplied Swawlambi logo without redrawing or rebranding it.
- Add an embedded map for the office at 219, Syndicate House, Inderlok, Delhi.
- Use coordinates 28.6690016, 77.1686023.
- Show company-reported scale claims only with the exact disclosure in structured content.

#### C. Service postcards

- Create separate postcard objects for Solar, HVAC, Power and Safety Audits.
- The postcards can flip, slide from a case file or arrange around the sphere.
- Use concrete service copy, no fake client outcomes.
- Keep the postcards visually distinct from generic equal-sized feature cards.

### Route 3: Music Vault, `/music`

- Design the data model and interface to support at least 5,000 Spotify track records through pagination and virtualization.
- Do not render 5,000 DOM tiles at once.
- Use search, filters, playlists or chapters to make the collection navigable.
- Feature a smaller number of playable Spotify embeds at any one time.
- Use Spotify metadata through authorized server-side API routes when credentials are configured.
- Provide curated JSON fallback content when OAuth is unavailable.
- Clicking an item must provide a reliable Spotify deep link.
- Do not promise free full-track playback. Spotify controls playback availability and account requirements.

### Route 4: Contact, `/contact`

- Use `public/assets/pratham-contact.jpeg` as the main personal image.
- Email: `prathambatra68@gmail.com`.
- WhatsApp and contact number: `+91 93100 09800`.
- Include Instagram, LinkedIn, GitHub and Spotify links.
- Include the Swawlambi office address and map.
- Provide an external Cal.com or Topmate booking embed when a public booking URL is supplied.
- Until that URL exists, show a polished email and WhatsApp booking path. Do not show a broken calendar placeholder.
- Prefer direct links and external booking over storing contact submissions in V1.

## 3. Approved public profile facts

- Name: Pratham Batra
- Public handle: `@theprathambatra`
- Email: `prathambatra68@gmail.com`
- WhatsApp: `+91 93100 09800`
- GitHub: `https://github.com/theprathambatra`
- Instagram: `https://www.instagram.com/theprathambatra/`
- LinkedIn: `https://www.linkedin.com/in/theprathambatra/`
- Spotify: `https://open.spotify.com/user/31hfojbpw2eu4xhwikesijhylapm`
- Football club: Real Madrid
- Preferred playing position: Left winger

## 4. Visual system

### Direction

Use an editorial, tactile and sports-informed visual language. It should feel composed by a designer, not generated from a component library.

Suggested palette:

- Warm paper: `#F1E9DA`
- Ink: `#171713`
- Deep field green: `#17634A`
- Oxblood: `#982E29`
- Cobalt: `#2455B5`
- Saffron accent: `#CC861B`

Use only a controlled subset of these colours at one time. Do not turn the interface into rainbow colouring.

Typography should contrast an expressive editorial display face with a highly readable text face. Do not use Inter, Geist or Space Grotesk. Avoid tiny captions and oversized headlines that dominate the viewport.

Use borders, cropping, masks, type hierarchy, flat colour fields and physical composition instead of drop shadows, glass effects and glowing orbs. Corners should be square or intentionally cut rather than generically soft.

The BYOB reference pages document earlier work and website screenshots. Their purple styling and marketing metrics are not the approved visual system for this site.

## 5. Motion system

- Motion has narrative responsibility.
- Use one master scroll timeline for each major home sequence.
- Prefer transforms and opacity over layout-triggering animation.
- Pin only where the visitor understands why the scene pauses.
- Avoid scroll hijacking.
- Keep an always-available route navigation.
- Preserve meaningful states on reverse scroll.
- Pause continuous animation when the tab is hidden or the section is far offscreen.
- Reduced-motion mode must replace travel, zoom, scatter and fly-in sequences with short crossfades or state changes.

## 6. Integration truth

- A public profile URL does not automatically grant API access.
- Instagram API access is intended for professional accounts and requires authorization. Do not scrape the public page.
- LinkedIn profile and member-post APIs require OAuth and, for many permissions, platform approval. Use curated cards and outbound links until access exists.
- Spotify Embeds and the iFrame API support playback controls for supported content. Full playback and availability remain controlled by Spotify.
- GitHub public contribution data can be fetched through the GitHub GraphQL API. Use a server token only when needed and keep it in Vercel environment variables.

Implementation details and official documentation links are in `docs/INTEGRATIONS.md`.

## 7. Content integrity

The following are not approved as independent facts:

- Website performance percentages or ROI claims shown in the old BYOB PDF
- Any claim that every Spotify song is free to stream
- Any work title, employment date, certification or license not listed in structured content
- Any LinkedIn or Instagram post that was not obtained through an authorized integration or manually curated record

Swawlambi claims of 42,000+ projects and 21,000+ clients may appear only as company-reported claims with a visible disclosure. They must not be presented as independently verified or as Pratham's personal output.

## 8. Responsive and accessibility requirements

- Deliver deliberately designed layouts at 1440, 1024, 768, 430 and 360 CSS pixels.
- Touch controls must work without hover.
- Keyboard users must reach every project, media item and contact action.
- Provide visible focus states that fit the visual system.
- Canvas and motion scenes require semantic alternatives.
- Maintain WCAG AA contrast for normal text.
- Decorative motion must not cause horizontal overflow.
- Respect `prefers-reduced-motion` throughout.

## 9. Performance targets

- Keep the initial route light. Defer 3D, social feeds and music data.
- Optimise images through Next Image or an equivalent pipeline.
- Avoid loading all project previews or music tiles at once.
- Target strong Core Web Vitals on a mid-range mobile device.
- Ensure the football loop and scroll scenes do not leak requestAnimationFrame handlers.

## 10. Definition of a successful V1

V1 is successful when all four routes work, the complete Home narrative is recognisable, Work Orbit contains every approved URL, the Music Vault has a scalable honest integration layer, Contact is fully usable, and all missing credentials degrade gracefully without invented content.

The detailed release checklist is in `docs/ACCEPTANCE_CRITERIA.md`.
