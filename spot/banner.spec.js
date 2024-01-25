import BannerPage from "../pages/banner.page";
import LoginPage from "../pages/login.page";
const { test, expect } = require("@playwright/test");
require("dotenv").config();

let bannerPage;

test.describe("update banner", () => {
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
      bannerPage = new BannerPage(page);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Click banner pencil icon", async () => {
    try {
      await bannerPage.clickBannerPencilIcon();
      await expect(
        bannerPage.page.getByText("広告", { exact: true }).first()
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Click Cancel button", async () => {
    try {
      await bannerPage.clickBannerPencilIcon();
      await bannerPage.clickCancelButton();
      await expect(bannerPage.page.getByText("広告")).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Click edit pencil icon at existing banner ad", async () => {
    try {
      await bannerPage.clickBannerPencilIcon();
      await bannerPage.page.locator(".ad-actions > svg").first().click();
      await expect(
        bannerPage.page.getByText("広告種類:Please select an option")
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Click add button", async () => {
    try {
      await bannerPage.clickBannerPencilIcon();
      await bannerPage.clickAddButton();
      await expect(
        bannerPage.page.locator(".ad-window", { exact: true }).first()
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Under Type, select Image / GIF", async () => {
    try {
      await bannerPage.clickBannerPencilIcon();
      await bannerPage.clickAddButton();
      await bannerPage.changeTypeImage();
      await expect(
        bannerPage.page.getByText("* .gif, .png, .jpg, .jpeg, .")
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Under Type, select Video", async () => {
    try {
      await bannerPage.clickBannerPencilIcon();
      await bannerPage.clickAddButton();
      await bannerPage.changeTypeVideo();
      await expect(
        bannerPage.page.getByText("* .mp4, .m4v, & .mov")
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Under Type, select URL", async () => {
    try {
      await bannerPage.clickBannerPencilIcon();
      await bannerPage.clickAddButton();
      await bannerPage.changeTypeURL();
      await expect(
        bannerPage.page.locator(".uni-input-input").first()
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Create an image banner without image uploaded", async () => {
    try {
      await bannerPage.clickBannerPencilIcon();
      await bannerPage.clickAddButton();
      await bannerPage.windowForm();
      await bannerPage.clickConfirmButton();
      await expect(
        bannerPage.page.locator("uni-text:nth-child(3) > span")
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  const filePath = "../images/image.jpg";
  test.describe("update editing with Separate and Same", () => {
    test("Create an image banner without Banner name inputted with Separate", async () => {
      try {
        await bannerPage.clickBannerPencilIcon();
        await bannerPage.clickAddButton();
        await bannerPage.windowForm();

        bannerPage.page.on("filechooser", async (filechooser) => {
          await filechooser.setFiles([filePath]);
        });
        await bannerPage.page.click(".file-picker__box-content > svg");

        await bannerPage.clickConfirmButton();
        await expect(
          bannerPage.page
            .locator(".uni-forms-item__content > .error-message > span")
            .first()
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });

    test("Create an image banner without Banner name inputted with same", async () => {
      try {
        await bannerPage.clickBannerPencilIcon();
        await bannerPage.clickAddButton();
        await bannerPage.windowForm();

        bannerPage.page.on("filechooser", async (filechooser) => {
          await filechooser.setFiles([filePath]);
        });
        await bannerPage.page.click(".file-picker__box-content > svg");

        await bannerPage.localeVersion();
        await bannerPage.clickConfirmButton();
        await expect(
          bannerPage.page
            .locator(".uni-forms-item__content > .error-message > span")
            .first()
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
  });

  test.afterAll(async ({ browser }) => {
    if (bannerPage) {
      await browser.close();
    }
  });
});
