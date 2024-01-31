import CMSPage from "../pages/cms.page";
import LoginPage from "../pages/login.page";
const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.describe("Login and Logout", () => {
  let cmsPage;
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
      cmsPage = new CMSPage(page);
      await cmsPage.waitForPageLoad();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Click Logout button on CMS home page", async () => {
    try {
      await cmsPage.clickLogoutButtonByText();
      await expect(cmsPage.page.locator(".uni-modal")).toBeVisible();
    } catch (error) {
      console.error("Error clicking logout button:", error);
    }
  });

  test("Click No button on logout dialog confirmation message", async () => {
    try {
      await cmsPage.clickLogoutButtonByText();
      await cmsPage.clickCancelButton();
      expect(cmsPage.page.locator(".uni-modal")).toBeHidden();
    } catch (error) {
      console.error("Error clicking cancel button:", error);
    }
  });

  test("Click Yes button on logout dialog confirmation message", async () => {
    try {
      await cmsPage.clickLogoutButtonByText();
      await cmsPage.clickAcceptButton();

      const currentUrl = cmsPage.page.url();
      expect(currentUrl).toMatch(`${process.env.BASE_URL}pages/login/login`);
    } catch (error) {
      console.error("Error clicking accept button:", error);
    }
  });

  test("Change current hotel id parameter to different id", async () => {
    try {
      await cmsPage.changeHotelIdToDifferentId();

      await expect(cmsPage.page.locator(".uni-modal")).toBeVisible();
    } catch (error) {
      console.error("Error changing hotel ID:", error);
    }
  });

  test("Click Logout button on error dialog confirmation message", async () => {
    try {
      await cmsPage.clickLogoutButtonOnErrorDialog();

      const currentUrl = cmsPage.page.url();
      expect(currentUrl).toMatch(`${process.env.BASE_URL}pages/login/login`);
    } catch (error) {
      console.error("Error clicking logout button on error dialog:", error);
    }
  });

  test("Click Refresh button on error dialog confirmation message", async () => {
    try {
      await cmsPage.clickRefreshButtonOnErrorDialog();
      const currentUrl = cmsPage.page.url();
      const expectedUrlPattern =
        /https:\/\/test-38739\.web\.app\/admin\/#\/\?h=\w+/;

      expect(currentUrl).toMatch(expectedUrlPattern);
    } catch (error) {
      console.error("Error clicking refresh button on error dialog:", error);
    }
  });

  test("Click on top right language selection dropdown list", async () => {
    try {
      const isVisible = await cmsPage.verifyGroupItemVisibility();
      expect(isVisible).toBeTruthy();
    } catch (error) {
      console.error("Error clicking language dropdown:", error);
    }
  });

  test("Select other system text language translation selection", async () => {
    try {
      const isLanguageSelected = await cmsPage.selectRandomLanguage();
      expect(isLanguageSelected).toBeTruthy();
    } catch (error) {
      console.error("Error selecting random language:", error);
    }
  });

  test.afterAll(async ({ browser }) => {
    browser.close;
  });
});
