import InformationPage from "../pages/information.page";
import LoginPage from "../pages/login.page";
const { test, expect } = require("@playwright/test");
require("dotenv").config();

test.describe("update information", () => {
  let informationPage;
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
      informationPage = new InformationPage(page);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Click Information pencil icon", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await expect(
        informationPage.page.getByText("詳細", { exact: true }).first()
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Click Cancel button", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.clickCancelButton();
      await expect(
        informationPage.page.getByText("インフォーメーション>")
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Under Type, select Image / GIF", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.changeTypeImage();
      await expect(
        informationPage.page.getByText("* .gif, .png, .jpg, .jpeg, .").first()
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Upload all supported images at Image / GIF Type (gif, png, jpg, jpeg, webp)", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.changeTypeImage();
      await informationPage.closeAllImages();
      await informationPage.changeUploadImage();
      await informationPage.selectImage();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Leave image banner empty and click Confirm button", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.changeTypeImage();
      await informationPage.closeAllImages();
      await informationPage.clickConfirmlButton();
      await expect(
        informationPage.page.getByText("画像をアップロードしてください。")
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Leave video banner empty and click Confirm button", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.changeTypeVideo();
      await informationPage.closeAllVideo();
      await informationPage.clickConfirmlButton();
      await expect(
        informationPage.page.getByText("動画をアップロードしてください。")
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Leave url banner empty and click Confirm button", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.changeTypeURL();
      await informationPage.clearUrl();
      await informationPage.clickConfirmlButton();
      await expect(
        informationPage.page.getByText("画像URLを入力してください。")
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Leave facility name empty and click Confirm button", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.localeVersion();
      await informationPage.clearFacilityName();
      await informationPage.clickConfirmlButton();
      await expect(
        informationPage.page.getByText("施設名を入力してください。")
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Leave address empty and click Confirm button", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.localeVersion();
      await informationPage.clearAddressEempty();
      await informationPage.clickConfirmlButton();
      await expect(
        informationPage.page.getByText("住所を入力してください。")
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Leave phone number empty and click Confirm button", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.localeVersion();
      await informationPage.clearPhoneNumber();
      await informationPage.clickConfirmlButton();
      await expect(
        informationPage.page.getByText("電話番号を入力してください。")
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Input incorrect japan phone number format anc click Confirm buttonn", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.localeVersion();
      await informationPage.clearPhoneNumber();
      await informationPage.addFillPhone();
      await informationPage.clickConfirmlButton();
      await expect(
        informationPage.page.getByText(
          "入力された電話番号は登録できません。もう一度ご確認ください。"
        )
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  const dynamicSelector =
    ".left-input > .box > .box-translate > .input-data > .uni-easyinput > .uni-easyinput__content";

  test("Click +Add button at hotel basic entry", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.localeVersion();
      await informationPage.addBasicEntry();
      await expect(
        informationPage.page
          .locator(
            "uni-view:nth-child(6) > .left-input > .box > .box-translate > .input-data > .uni-easyinput > .uni-easyinput__content"
          )
          .first()
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Click delete icon at each hotel basic entry (title is empty)", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.localeVersion();
      await informationPage.clearTitle();
      await informationPage.delBasicEntry();
      await expect(
        informationPage.page.locator(dynamicSelector).first()
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Click delete icon at each hotel basic entry (title is not empty)", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.localeVersion();
      await informationPage.delBasicEntry();
      await expect(
        informationPage.page.locator(dynamicSelector).first()
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Click No button hotel basic entry ", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.localeVersion();
      await informationPage.delBasicEntry();
      await informationPage.cancelButtonDelBasicEntry();
      await expect(
        informationPage.page.locator(dynamicSelector).first()
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test("Click yes button hotel basic entry ", async () => {
    try {
      await informationPage.clickInformationPencilIcon();
      await informationPage.localeVersion();
      await informationPage.delBasicEntry();
      await informationPage.confirmButtonDelBasicEntry();
      await expect(
        informationPage.page.locator(dynamicSelector).first()
      ).toBeVisible();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  });

  test.describe("update information with Separate and Same", () => {
    test("Under Type, select Video with Separate", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeVideo();
        await expect(
          informationPage.page.getByText("* .mp4, .m4v, & .mov").first()
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
    test("Under Type, select Video with Same", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeVideo();
        await expect(
          informationPage.page.getByText("* .mp4, .m4v, & .mov")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });

    test("Under Type, select URL with Separate", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeURL();
        await expect(
          informationPage.page
            .getByText("画像 URL:入力してください。URL")
            .first()
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
    test("Under Type, select URL with Same", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeURL();
        await expect(
          informationPage.page.getByText("画像 URL:入力してください。URL")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });

    test("Click on the image picker with Type Image / GIF with ", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeImage();
        await informationPage.page.locator(".uni-icon-clear").first().click();
        await informationPage.changeUploadImage();
        await expect(
          informationPage.page.locator(".popup-content")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
    test("Click on the image picker with Type Image / GIF with Same", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeImage();
        await informationPage.closeAllImages();
        await informationPage.changeUploadImage();
        await expect(
          informationPage.page.locator(".popup-content")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });

    test("Click Cancel button at popup contents with Separate", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeImage();
        await informationPage.page.locator(".uni-icon-clear").first().click();
        await informationPage.changeUploadImage();
        await informationPage.page.locator(".popup-content");
        await informationPage.clickCancelPupButton();
        await expect(
          informationPage.page.getByText("詳細", { exact: true }).first()
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
    test("Click Cancel button at popup contents with Same", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeImage();
        await informationPage.closeAllImages();
        await informationPage.changeUploadImage();
        await informationPage.page.locator(".popup-content");
        await informationPage.clickCancelPupButton();
        await expect(
          informationPage.page.getByText("詳細", { exact: true }).first()
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });

    test("Click on the video picker with Type Video with Separate", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeVideo();
        await informationPage.page.locator(".uni-icon-cancel").first().click();
        await informationPage.changeUploadVideo();
        await expect(
          informationPage.page.locator(".popup-content")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
    test("Click on the video picker with Type Video with Same", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeVideo();
        await informationPage.closeAllVideo();
        await informationPage.changeUploadVideo();
        await expect(
          informationPage.page.locator(".popup-content")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });

    test("Create a video banner without video uploaded with Separate", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeVideo();
        await informationPage.page.locator(".uni-icon-cancel").first().click();
        await informationPage.changeUploadVideo();
        await informationPage.clickConfirmPupButton();
        await expect(
          informationPage.page.getByText("* 必須項目")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
    test("Create a video banner without video uploaded with Same", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeVideo();
        await informationPage.closeAllVideo();
        await informationPage.changeUploadVideo();
        await informationPage.clickConfirmPupButton();
        await expect(
          informationPage.page.getByText("* 必須項目")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });

    test("Save hotel detail information with Image / GIF type with Separate ", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeImage();
        await informationPage.page.locator(".uni-icon-clear").first().click();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.changeUploadImage();
        await informationPage.selectImage();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clickConfirmPupButton();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearFacilityName();
        await informationPage.addFillFacilityName();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearAddressEempty();
        await informationPage.addAddressEempty();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearPhoneNumber();
        await informationPage.addFillPhoneCorrect();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearEditor();
        await informationPage.addEditor();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clickConfirmlButton();
        await expect(
          informationPage.page
            .locator("uni-page-body")
            .getByText("インフォーメーション")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
    test("Save hotel detail information with Image / GIF type with Same ", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeImage();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.closeAllImages();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.changeUploadImage();
        await informationPage.selectImage();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clickConfirmPupButton();
        await informationPage.localeVersion();
        await informationPage.clearFacilityName();
        await informationPage.addFillFacilityName();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearAddressEempty();
        await informationPage.addAddressEempty();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearPhoneNumber();
        await informationPage.addFillPhoneCorrect();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearEditor();
        await informationPage.addEditor();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clickConfirmlButton();
        await expect(
          informationPage.page
            .locator("uni-page-body")
            .getByText("インフォーメーション")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });

    test("Save hotel detail information with video type with Separate ", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeVideo();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.page.locator(".uni-icon-cancel").first().click();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.changeUploadVideo();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.selectVideo();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clickConfirmPupButton();
        await informationPage.page.waitForTimeout(1000);

        await informationPage.clearFacilityName();
        await informationPage.addFillFacilityName();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearAddressEempty();
        await informationPage.addAddressEempty();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearPhoneNumber();
        await informationPage.addFillPhoneCorrect();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearEditor();
        await informationPage.addEditor();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clickConfirmlButton();
        await expect(
          informationPage.page
            .locator("uni-page-body")
            .getByText("インフォーメーション")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
    test("Save hotel detail information with video type with Same ", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeVideo();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.closeAllVideo();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.changeUploadVideo();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.selectVideo();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clickConfirmPupButton();
        await informationPage.page.waitForTimeout(1000);

        await informationPage.localeVersion();
        await informationPage.clearFacilityName();
        await informationPage.addFillFacilityName();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearAddressEempty();
        await informationPage.addAddressEempty();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearPhoneNumber();
        await informationPage.addFillPhoneCorrect();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearEditor();
        await informationPage.addEditor();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clickConfirmlButton();
        await expect(
          informationPage.page
            .locator("uni-page-body")
            .getByText("インフォーメーション")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });

    test("Save hotel detail information with url type with Separate ", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeURL();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearUrl();
        await informationPage.addUrl();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearFacilityName();
        await informationPage.addFillFacilityName();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearAddressEempty();
        await informationPage.addAddressEempty();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearPhoneNumber();
        await informationPage.addFillPhoneCorrect();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearEditor();
        await informationPage.addEditor();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clickConfirmlButton();
        await expect(
          informationPage.page
            .locator("uni-page-body")
            .getByText("インフォーメーション")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
    test("Save hotel detail information with url type with Same ", async () => {
      try {
        await informationPage.clickInformationPencilIcon();
        await informationPage.changeTypeURL();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearUrl();
        await informationPage.addUrl();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.localeVersion();
        await informationPage.clearFacilityName();
        await informationPage.addFillFacilityName();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearAddressEempty();
        await informationPage.addAddressEempty();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearPhoneNumber();
        await informationPage.addFillPhoneCorrect();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clearEditor();
        await informationPage.addEditor();
        await informationPage.page.waitForTimeout(1000);
        await informationPage.clickConfirmlButton();
        await expect(
          informationPage.page
            .locator("uni-page-body")
            .getByText("インフォーメーション")
        ).toBeVisible();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });
  });

  test.afterAll(async ({ browser }) => {
    browser.close;
  });
});
