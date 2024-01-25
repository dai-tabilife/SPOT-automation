class InformationPage {
  constructor(page) {
    this.page = page;
  }

  async clickInformationPencilIcon() {
    await this.page
      .locator("uni-view")
      .filter({ hasText: /^インフォーメーション>$/ })
      .locator("svg")
      .click();
  }

  async checkbox() {
    const element1Handle = await this.page
      .locator("uni-radio-group div")
      .nth(1);
    const element3Handle = await this.page
      .locator("uni-radio-group div")
      .nth(3);

    const isElement1Checked = await element1Handle.evaluate((element) =>
      element.classList.contains("uni-radio-input-checked")
    );

    const isElement3Checked = await element3Handle.evaluate((element) =>
      element.classList.contains("uni-radio-input-checked")
    );

    return { isElement1Checked, isElement3Checked };
  }

  async clickCancelButton() {
    await this.page.getByText("キャンセル").click();
  }

  async clickConfirmlButton() {
    await this.page.getByText("確定").click();
  }

  async clickCancelPupButton() {
    await this.page
      .locator("uni-button")
      .filter({ hasText: "キャンセル" })
      .click();
  }

  async clickConfirmPupButton() {
    await this.page.locator("uni-button").filter({ hasText: "確定" }).click();
  }

  async changeTypeImage() {
    const { isElement1Checked, isElement3Checked } = await this.checkbox();
    if (isElement1Checked) {
      await this.localeVersion();
      await this.page.getByRole("combobox").first();
      console.log("isElement1Checked", isElement1Checked);
    } else if (isElement3Checked) {
      await this.page.getByRole("combobox").selectOption("画像/GIF");
      console.log("isElement3Checked", isElement3Checked);
    }
  }

  async changeTypeVideo() {
    await this.page.getByRole("combobox").selectOption("ビデオ");
  }

  async changeTypeURL() {
    await this.page.getByRole("combobox").selectOption("URL");
  }

  async closeAllImages() {
    const closeIconSelector = "uni-icon.icon-close";

    while (true) {
      const imageCount = await this.page
        .locator(".setting-images uni-view img")
        .count();
      if (imageCount === 0) {
        break;
      }

      await this.page.click(closeIconSelector);
    }
  }

  async changeUploadImage() {
    await this.page
      .locator("uni-view")
      .filter({
        hasText:
          /^\* \.gif, \.png, \.jpg, \.jpeg, \.webpの画像形式をアップロードしてください$/,
      })
      .locator("svg")
      .click();
  }

  async selectImage() {
    await this.page.locator(".file-picker__box-content").click();
    await this.page.locator("body").setInputFiles("a.jpg");
  }

  async closeAllVideo() {
    const closeIconVideo = "uni-icon .uni-icon-cancel";

    while (true) {
      const videoCount = await this.page
        .locator(".setting-images uni-view div")
        .count();
      if (videoCount === 0) {
        break;
      }

      await this.page.click(closeIconVideo);
    }
  }

  async changeUploadVideo() {
    await this.page
      .locator("uni-view")
      .filter({
        hasText:
          /^\* \.mp4, \.m4v, & \.movの動画形式をアップロードしてください。\(上限10MB\)$/,
      })
      .locator("svg")
      .click();
  }

  async clearUrl() {
    await this.page.locator(".uni-input-input").first().clear();
  }

  async clearFacilityName() {
    await this.page
      .locator(
        ".input-data > .uni-easyinput > .uni-easyinput__content > .uni-easyinput__content-input > .uni-input-wrapper > .uni-input-input"
      )
      .first()
      .clear();
  }

  async clearAddressEempty() {
    await this.page
      .locator(
        "uni-view:nth-child(2) > .uni-forms-item__box > .uni-forms-item__inner > .uni-forms-item__content > .box > .box-translate > .input-data > .uni-easyinput > .uni-easyinput__content > .uni-easyinput__content-input > .uni-input-wrapper > .uni-input-input"
      )
      .first()
      .clear();
  }

  async clearPhoneNumber() {
    await this.page
      .locator(
        ".uni-forms-item__content > .uni-easyinput > .uni-easyinput__content > .uni-easyinput__content-input > .uni-input-wrapper > .uni-input-input"
      )
      .first()
      .clear();
  }

  async addFillPhone() {
    const phoneNumber = await this.page
      .locator(
        ".uni-forms-item__content > .uni-easyinput > .uni-easyinput__content > .uni-easyinput__content-input > .uni-input-wrapper > .uni-input-input"
      )
      .first();
    if (phoneNumber) {
      phoneNumber.fill("044444444");
    }
  }

  async clearTitle() {
    await this.page
      .locator(
        ".left-input > .box > .box-translate > .input-data > .uni-easyinput > .uni-easyinput__content > .uni-easyinput__content-input > .uni-input-wrapper > .uni-input-input"
      )
      .first()
      .clear();
  }

  async delBasicEntry() {
    await this.page.locator(".action-item").first().click();
  }

  async addBasicEntry() {
    await this.page
      .locator("uni-view")
      .filter({ hasText: /^追加$/ })
      .first()
      .click();
  }

  async cancelButtonDelBasicEntry() {
    await this.page.getByText("いいえ").click();
  }

  async confirmButtonDelBasicEntry() {
    await this.page.getByText("はい").click();
  }

  async localeVersion() {
    await this.page
      .locator("div")
      .filter({ hasText: /^英語版$/ })
      .nth(1)
      .click();
  }
}

export default InformationPage;
