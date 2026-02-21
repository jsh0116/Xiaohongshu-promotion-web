import { test, expect } from "@playwright/test";
import ko from "../src/i18n/locales/ko.json";
import zh from "../src/i18n/locales/zh.json";

test.describe("Page load", () => {
  test("/ko — Korean headline renders", async ({ page }) => {
    await page.goto("/ko");
    await expect(page.locator("h1")).toContainText(ko.hero.mainLine1);
    await expect(page.locator("h1")).toContainText(ko.hero.mainLine2);
  });

  test("/zh — Chinese headline renders", async ({ page }) => {
    await page.goto("/zh");
    await expect(page.locator("h1")).toContainText(zh.hero.mainLine1);
    await expect(page.locator("h1")).toContainText(zh.hero.mainLine2);
  });
});

test.describe("Redirect", () => {
  test("/ redirects to /ko", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/ko/);
  });
});

test.describe("Lead form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ko");
    await page.waitForSelector('[data-testid="lead-form"]');
  });

  test("empty email shows inline error", async ({ page }) => {
    await page.click('[data-testid="submit-btn"]');
    await expect(page.locator(`text=${ko.form.emailError}`)).toBeVisible();
  });

  test("invalid email shows inline error", async ({ page }) => {
    await page.fill('[data-testid="email-input"]', "notanemail");
    await page.click('[data-testid="submit-btn"]');
    await expect(page.locator(`text=${ko.form.emailError}`)).toBeVisible();
  });

  test("valid email submission shows success state", async ({ page }) => {
    await page.fill('[data-testid="email-input"]', "test@example.com");
    await page.click('[data-testid="submit-btn"]');
    await expect(page.locator('[data-testid="form-success"]')).toBeVisible({
      timeout: 10_000,
    });
  });
});

test.describe("Survey popup", () => {
  test("appears after form submission and can be skipped", async ({ page }) => {
    await page.goto("/ko");
    await page.fill('[data-testid="email-input"]', "test@example.com");
    await page.click('[data-testid="submit-btn"]');

    await expect(page.locator('[data-testid="survey-popup"]')).toBeVisible({
      timeout: 10_000,
    });

    await page.click('[data-testid="survey-skip"]');
    await expect(
      page.locator('[data-testid="survey-popup"]')
    ).not.toBeVisible();
  });

  test("selecting option and submitting shows thanks message", async ({
    page,
  }) => {
    await page.goto("/ko");
    await page.fill('[data-testid="email-input"]', "test2@example.com");
    await page.click('[data-testid="submit-btn"]');

    await expect(page.locator('[data-testid="survey-popup"]')).toBeVisible({
      timeout: 10_000,
    });

    await page.click('[data-testid="survey-opt1"]');
    await page.click('[data-testid="survey-submit"]');
    await expect(page.locator(`text=${ko.survey.thanks}`)).toBeVisible();
  });
});

test.describe("Dark mode", () => {
  test("theme toggle adds dark class to html", async ({ page }) => {
    await page.goto("/ko");
    await page.click('[data-testid="theme-toggle"]');
    const htmlClass = await page.locator("html").getAttribute("class");
    expect(htmlClass).toContain("dark");
  });

  test("dark mode persists after reload via cookie", async ({ page }) => {
    await page.goto("/ko");
    await page.click('[data-testid="theme-toggle"]');
    await page.reload();
    const htmlClass = await page.locator("html").getAttribute("class");
    expect(htmlClass).toContain("dark");
  });
});

test.describe("Locale switch", () => {
  test("switching to zh changes URL and content", async ({ page }) => {
    await page.goto("/ko");
    await page.click('[data-testid="locale-zh"]');
    await expect(page).toHaveURL(/\/zh/);
    await expect(page.locator("h1")).toContainText(zh.hero.mainLine1);
  });

  test("switching back to ko changes URL and content", async ({ page }) => {
    await page.goto("/zh");
    await page.click('[data-testid="locale-ko"]');
    await expect(page).toHaveURL(/\/ko/);
    await expect(page.locator("h1")).toContainText(ko.hero.mainLine1);
  });
});

test.describe("Scroll reveal", () => {
  test("pain-section is in viewport after scroll", async ({ page }) => {
    await page.goto("/ko");
    await page.locator('[data-testid="pain-section"]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-testid="pain-section"]')).toBeInViewport();
  });

  test("features-section is in viewport after scroll", async ({ page }) => {
    await page.goto("/ko");
    await page
      .locator('[data-testid="features-section"]')
      .scrollIntoViewIfNeeded();
    await expect(
      page.locator('[data-testid="features-section"]')
    ).toBeInViewport();
  });

  test("lead-form-section is in viewport after scroll", async ({ page }) => {
    await page.goto("/ko");
    await page
      .locator('[data-testid="lead-form-section"]')
      .scrollIntoViewIfNeeded();
    await expect(
      page.locator('[data-testid="lead-form-section"]')
    ).toBeInViewport();
  });

  test("section cards are fully visible after animation completes", async ({
    page,
  }) => {
    await page.goto("/ko");
    await page.locator('[data-testid="pain-section"]').scrollIntoViewIfNeeded();
    // ANIMATION_DURATION_S(0.6) + CARD_STAGGER_DELAY_S(0.12) + buffer
    await page.waitForTimeout(900);
    const cards = page.locator('[data-testid="pain-section"] .rounded-2xl');
    for (const card of await cards.all()) {
      const opacity = await card.evaluate(
        (el) => parseFloat(getComputedStyle(el).opacity)
      );
      expect(opacity).toBeGreaterThan(0.9);
    }
  });
});

test.describe("SEO", () => {
  test("/sitemap.xml returns 200", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
  });

  test("/robots.txt returns 200", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
  });

  test("hreflang tags exist on /ko", async ({ page }) => {
    await page.goto("/ko");
    const hreflang = await page
      .locator('link[rel="alternate"][hreflang]')
      .count();
    expect(hreflang).toBeGreaterThan(0);
  });
});
