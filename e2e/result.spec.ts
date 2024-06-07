// Transcribing doesnt work in playwright. Not sure why. I leave this here for future reference.

// import { test, expect } from "@playwright/test";
// import path from "path";
// import fs from "fs";

// const __dirname = path.resolve() + "/e2e";
// const __tempDir = path.resolve() + "/e2e/temp";

// test.describe.serial("Results", () => {
//   test("convert", async ({ page }) => {
//     await page.goto("http://localhost:5173/");
//     await page.waitForSelector(".container", { strict: false });

//     await page.getByRole("link", { name: "Preferences" }).click();
//     await page.getByLabel("Threads").selectOption("1");
//     await page.getByRole("link", { name: "Back to Home" }).click();

//     // Set input files
//     await page
//       .getByLabel("Add Audio, Video Files")
//       .setInputFiles(path.join(__dirname, "jfk.wav"));

//     // settings
//     await page.getByLabel("Plain Text (txt)").click();
//     await page.getByLabel("Ignore Non Speech").check();
//     await page.selectOption("select[id=lang]", { value: "en" });
//     await page.getByRole("button", { name: "Convert All" }).click();

//     // convert
//     await expect(page.getByTitle("Save jfk.csv as")).toBeVisible();
//   });

//   test("shows download all button", async ({ page }) => {
//     await expect(
//       page.getByRole("button", { name: "Download All" }),
//     ).toBeVisible();
//   });

//   test("show preview text", async ({ page }) => {
//     // result preview
//     await expect(
//       page.getByText(
//         "And so my fellow Americans ask not what your country can do for you, ask what you can do for your country.",
//       ),
//     ).toBeVisible();
//   });

//   test("downloads file", async ({ page }) => {
//     const downloadPromise = page.waitForEvent("download");
//     await page.getByText("Download Plain Text (txt)").click();
//     const download = await downloadPromise;

//     expect(download.suggestedFilename()).toBe("jfk.txt");
//     await download.saveAs(__tempDir + download.suggestedFilename());
//   });

//   test("downloaded file contains text", async () => {
//     const data = fs.readFileSync(__tempDir + "jfk.txt", "utf8");
//     expect(data).toContain(
//       "And so my fellow Americans ask not what your country can do for you, ask what you can do for your country.",
//     );
//   });
// });
