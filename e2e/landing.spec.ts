import { test, expect } from "@playwright/test";

test.describe("Page load", () => {
  test("/ko — Korean headline renders", async ({ page }) => {
    await page.goto("/ko");
    await expect(page.locator("h1")).toContainText(
      "샤오홍슈 체험단, 이제 쉽고 간편하게 시작하세요."
    );
  });

  test("/zh — Chinese headline renders", async ({ page }) => {
    await page.goto("/zh");
    await expect(page.locator("h1")).toContainText("小红书推广，现在就是这么简单");
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
    await expect(
      page.locator("text=올바른 이메일 주소를 입력해주세요")
    ).toBeVisible();
  });

  test("invalid email shows inline error", async ({ page }) => {
    await page.fill('[data-testid="email-input"]', "notanemail");
    await page.click('[data-testid="submit-btn"]');
    await expect(
      page.locator("text=올바른 이메일 주소를 입력해주세요")
    ).toBeVisible();
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

    // Wait for survey popup
    await expect(page.locator('[data-testid="survey-popup"]')).toBeVisible({
      timeout: 10_000,
    });

    // Skip closes popup
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
    await expect(page.locator("text=감사합니다")).toBeVisible();
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
    await expect(page.locator("h1")).toContainText("小红书推广，现在就是这么简单");
  });

  test("switching back to ko changes URL and content", async ({ page }) => {
    await page.goto("/zh");
    await page.click('[data-testid="locale-ko"]');
    await expect(page).toHaveURL(/\/ko/);
    await expect(page.locator("h1")).toContainText("샤오홍슈 체험단");
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
