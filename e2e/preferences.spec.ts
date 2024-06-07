import { test, expect } from "@playwright/test";
import path from "path";

const __dirname = path.resolve() + "/e2e";
const __tempDir = path.resolve() + "/e2e/temp";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Preferences" }).click();
});

test.describe("Preferences", () => {
  test("color scheme", async ({ page }) => {
    await expect(page.getByLabel("Color Scheme")).toHaveValue("auto");
    await page.getByLabel("Color Scheme").selectOption("dark");

    const storage = await page.evaluate(() => window.localStorage);
    expect(JSON.parse(storage["wo-speech-to-text-prefersLightTheme"])).toEqual(
      "dark",
    );
  });

  test("threads", async ({ page }) => {
    await expect(page.getByLabel("Threads")).toHaveValue("0");
    await page.getByLabel("Threads").selectOption("8");

    const storage = await page.evaluate(() => window.localStorage);
    expect(
      JSON.parse(storage["wo-speech-to-text-selectedSettings"]).threads,
    ).toEqual(8);
  });

  test("list of models", async ({ page }) => {
    await expect(page.getByText("tiny q5 (32M)")).toBeVisible();
    await expect(page.getByText("base q5 (60M) Load")).toBeVisible();
    await expect(page.getByText("tiny (78M) Load")).toBeVisible();
    await expect(
      page.getByText("tiny - english only (78M) Load"),
    ).toBeVisible();
    await expect(page.getByText("base (148M) Load")).toBeVisible();
    await expect(
      page.getByText("base - english only (148M) Load"),
    ).toBeVisible();
    await expect(page.getByText("small (489M) Load")).toBeVisible();
    await expect(
      page.getByText("small - english only (489M) Load"),
    ).toBeVisible();
  });

  test("selects the model after download", async ({ page }) => {
    await page
      .locator("li")
      .filter({ hasText: "base q5 (60M) Load" })
      .getByRole("button")
      .click();
    await expect(page.getByLabel("base q5 (60M)")).toBeChecked();

    const storage = await page.evaluate(() => window.localStorage);
    expect(
      JSON.parse(storage["wo-speech-to-text-selectedSettings"]).model,
    ).toEqual("ggml-base-q5_1.bin");
  });
});
