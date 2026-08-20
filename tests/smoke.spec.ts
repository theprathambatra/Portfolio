import { expect, test } from "@playwright/test";

const routes = ["/", "/work", "/music", "/contact"];
for (const width of [360, 430, 768, 1024, 1440]) test(`routes fit at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow, `${route} has horizontal overflow`).toBe(false);
  }
});

test("all 18 approved work sites are present in the semantic manifest", async ({ page }) => {
  await page.goto("/work");
  await expect(page.locator("ol li")).toHaveCount(18);
  await expect(page.locator("ol a", { hasText: "Visit site" })).toHaveCount(18);
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
  await expect(page.getByRole("link", { name: "prathambatra68@gmail.com" })).toBeVisible();
});

test("reduced motion keeps semantic home and work content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Ideas in motion/ })).toBeVisible();
  await page.goto("/work");
  await expect(page.getByRole("heading", { name: "Every site, within reach." })).toBeVisible();
});
