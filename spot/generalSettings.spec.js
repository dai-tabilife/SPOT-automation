import GeneralSettingsPage from "../pages/generalSettings.page";
import LoginPage from "../pages/login.page";
const { test, expect } = require("@playwright/test");
require("dotenv").config();

let generalSettingsPage;

test.describe("update information", () => {
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    try {
      await loginPage.loginWithCredentials(
        process.env.EMAIL,
        process.env.PASSWORD
      );

      const newPagePromise = new Promise((resolve) =>
        page.once("framenavigated", resolve)
      );

      await newPagePromise;
      generalSettingsPage = new GeneralSettingsPage(page);

      // const currentUrl = await loginPage.getCurrentUrl();
      // const expectedUrlPattern =
      //   /https:\/\/test-38739\.web\.app\/admin\/#\/\?h=\w+/;

      // expect(currentUrl).toMatch(expectedUrlPattern);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Click general settings pencil icon", async () => {
    try {
      await generalSettingsPage.openGeneralSettings();
      await expect(
        generalSettingsPage.page.locator(".uni-popup > uni-view:nth-child(2)")
      ).toBeVisible();
    } catch (error) {
      console.error("Error clicking general settings pencil icon:", error);
    }
  });

  test("Click Cancel button at popup content", async () => {
    try {
      await generalSettingsPage.clickCancelButtonAtPopupContent();
    } catch (error) {
      console.error("Error clicking Cancel button:", error);
    }
  });

  test("Update the changes to Banner transition time interval", async () => {
    try {
      await generalSettingsPage.updateBannerTransitionTimeInterval("3");
    } catch (error) {
      console.error("Error updating banner transition time interval:", error);
    }
  });

  test("Click Information pencil icon", async () => {
    try {
      await generalSettingsPage.clickInformationPencilIcon();
    } catch (error) {
      console.error("Error clicking Information pencil icon:", error);
    }
  });

  test.afterAll(async ({ browser }) => {
    if (generalSettingsPage) {
      await browser.close();
    }
  });
});
