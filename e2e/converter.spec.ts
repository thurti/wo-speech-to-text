import { test, expect } from "@playwright/test";
import path from "path";

const __dirname = path.resolve() + "/e2e";
const __tempDir = path.resolve() + "/e2e/temp";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".container", { strict: false });

  await page
    .getByLabel("Add Audio, Video Files")
    .setInputFiles(path.join(__dirname, "jfk.wav"));

  await page
    .getByLabel("Add Audio, Video Files")
    .setInputFiles(path.join(__dirname, "albert.ogg"));
});

test.describe("Load/Remove File(s)", () => {
  test("convert button is enabled", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Convert All" }),
    ).toBeEnabled();
  });

  test("display file names in list", async ({ page }) => {
    await expect(page.getByText("jfk.wav")).toBeVisible();
    await expect(
      page.getByRole("main").filter({ hasText: "Speech To Text" }),
    ).toContainText("albert.ogg");
  });

  test("removes single file", async ({ page }) => {
    await page.getByTitle("Remove file jfk.wav").click();
    await expect(
      page.getByRole("main").filter({ hasText: "Speech To Text" }),
    ).not.toContainText("jfk.wav");
  });

  test("removes all files", async ({ page }) => {
    await page.getByTitle("Remove All").click();
    await expect(
      page.getByRole("main").filter({ hasText: "Speech To Text" }),
    ).not.toContainText("jfk.wav");
    await expect(
      page.getByRole("main").filter({ hasText: "Speech To Text" }),
    ).not.toContainText("albert.ogg");
    await expect(
      page.getByRole("button", { name: "Convert All" }),
    ).toBeDisabled();
  });
});
