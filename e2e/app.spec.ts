import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".container", { strict: false });
});

test.describe("Basic App", () => {
  test("displays title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Speech To Text" }).first(),
    ).toBeVisible();
  });

  test("displays file input", async ({ page }) => {
    await expect(page.getByLabel("Add Audio, Video Files")).toBeAttached();
    await expect(page.getByText("Please add some files.")).toBeVisible();
  });

  test("displays formats from config", async ({ page }) => {
    await expect(page.getByLabel("Plain Text (txt)")).toBeVisible();
    await expect(page.getByLabel("CSV")).toBeVisible();
    await expect(page.getByLabel("JSON")).toBeVisible();
    await expect(page.getByLabel("Subtitles VTT")).toBeVisible();
    await expect(page.getByLabel("Subtitles SRT")).toBeVisible();
    await expect(page.getByLabel("Lyrics LRC", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Lyrics LRC Enhanced")).toBeVisible();
  });

  test("displays settings from config", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await expect(page.getByLabel("Input Language")).toHaveValue("auto");
    await expect(page.getByLabel("Ignore Non Speech")).not.toBeChecked();
    await expect(page.getByLabel("Plain Text (txt)")).toBeChecked();
  });

  test("display convert button", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Convert All" }),
    ).toBeDisabled();
  });
});

test.describe("Pages", () => {
  test("About page", async ({ page }) => {
    await page.getByRole("link", { name: "About" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/info");
    await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/");
  });

  test("Preferences page", async ({ page }) => {
    await page.getByRole("link", { name: "Preferences" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/preferences");
    await expect(
      page.getByRole("heading", { name: "Preferences" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/");
  });

  test("Privacy page", async ({ page }) => {
    await page.getByRole("link", { name: "Privacy" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/privacy");
    await expect(page.getByRole("heading", { name: "Privacy" })).toBeVisible();
    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/");
  });

  test("Imprint page", async ({ page }) => {
    await page.getByRole("link", { name: "Imprint" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/imprint");
    await expect(page.getByRole("heading", { name: "Imprint" })).toBeVisible();
    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/");
  });

  test("FAQ page", async ({ page }) => {
    await page.getByRole("link", { name: "FAQ" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/faq");
    await expect(page.getByRole("heading", { name: "FAQ" })).toBeVisible();
    await page.getByRole("link", { name: "Back to Home" }).click();
    await expect(page.url()).toBe("http://localhost:5173/#/");
  });
});
