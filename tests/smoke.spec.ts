import { expect, test } from "@playwright/test";

const routes = ["/", "/work", "/music", "/contact"];
for (const width of [360, 430, 768, 1024, 1440]) test(`routes fit at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    if (route === "/work") await expect(page.getByRole("group", { name: /spherical display/i, includeHidden: true })).toHaveCount(1);
    if (route === "/music") await expect(page.getByText(/Integration status:/)).toBeVisible();
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow, `${route} has horizontal overflow`).toBe(false);
  }
});

test("all 18 approved work sites are present in the semantic manifest", async ({ page }) => {
  await page.goto("/work");
  await expect(page.locator("ol li")).toHaveCount(18);
  await expect(page.locator("ol a", { hasText: "Visit site" })).toHaveCount(18);
});

test("work orbit exposes the spherical index and four verified service postcards", async ({ page }) => {
  await page.goto("/work");
  const sphere = page.getByRole("group", { name: /spherical display of eighteen website projects/i });
  await expect(sphere.getByRole("button")).toHaveCount(18);
  const services = page.locator('[aria-label="Swawlambi service postcards"]');
  for (const heading of ["Solar", "HVAC", "Power", "Safety Audits"]) {
    await expect(services.getByRole("heading", { name: heading, exact: true })).toBeVisible();
  }
});

test("home exposes supported social connections without invented activity", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Contribution activity", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open instagram" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open linkedin" })).toBeVisible();
});

test("music reports its integration status and remains useful without credentials", async ({ page }) => {
  await page.goto("/music");
  await expect(page.getByText(/Integration status:/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Open in Spotify" }).first()).toBeVisible();
});

test("direct contact actions are reachable", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("link", { name: /WhatsApp \+91/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Call \+91/ })).toBeVisible();
  await expect(page.locator("#main").getByRole("link", { name: "prathambatra68@gmail.com" })).toBeVisible();
});

test("reduced motion keeps semantic home and work content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Ideas in motion/ })).toBeVisible();
  await page.goto("/work");
  await expect(page.getByRole("heading", { name: "Every site, within reach." })).toBeVisible();
});
