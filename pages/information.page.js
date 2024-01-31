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
    const { isElement1Checked, isElement3Checked } = await this.checkbox();
    if (isElement1Checked) {
      await this.localeVersion();
      await this.page.getByRole("combobox").first().selectOption("ビデオ");
    } else if (isElement3Checked) {
      await this.page.getByRole("combobox").selectOption("ビデオ");
    }
  }

  async changeTypeURL() {
    const { isElement1Checked, isElement3Checked } = await this.checkbox();
    if (isElement1Checked) {
      await this.localeVersion();
      await this.page.getByRole("combobox").first().selectOption("URL");
    } else if (isElement3Checked) {
      await this.page.getByRole("combobox").selectOption("URL");
    }
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
    const { isElement1Checked, isElement3Checked } = await this.checkbox();
    if (isElement1Checked) {
      await this.page
        .locator("uni-view")
        .filter({
          hasText:
            /^\* \.gif, \.png, \.jpg, \.jpeg, \.webpの画像形式をアップロードしてください$/,
        })
        .locator("svg")
        .first()
        .click();
    } else if (isElement3Checked) {
      await this.page
        .locator("uni-view")
        .filter({
          hasText:
            /^\* \.gif, \.png, \.jpg, \.jpeg, \.webpの画像形式をアップロードしてください$/,
        })
        .locator("svg")
        .click();
    }
  }

  async selectImage() {
    const filePath = "../images/image.jpg";
    await this.page.on("filechooser", async (filechooser) => {
      await filechooser.setFiles([filePath]);
    });
    await this.page.click(".file-picker__box-content > svg");
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

  async selectVideo() {
    const filePath = "../videos/video.mov";
    await this.page.on("filechooser", async (filechooser) => {
      await filechooser.setFiles([filePath]);
    });
    await this.page.click(".file-picker__box-content > svg");
  }

  async addUrl() {
    const url = await this.page.locator(".uni-input-input").first();
    if (url) {
      url.fill(
        "https://media.techz.vn/resize_x650x/media2019/upload2019/2020/06/14/file-tiff-la-gi_14062020005200.jpg"
      );
    }
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

  async addFillFacilityName() {
    const facilityName = await this.page
      .locator(
        ".input-data > .uni-easyinput > .uni-easyinput__content > .uni-easyinput__content-input > .uni-input-wrapper > .uni-input-input"
      )
      .first();
    if (facilityName) {
      facilityName.fill("tabilife EN");
    }
  }

  async clearAddressEempty() {
    await this.page
      .locator(
        "uni-view:nth-child(2) > .uni-forms-item__box > .uni-forms-item__inner > .uni-forms-item__content > .box > .box-translate > .input-data > .uni-easyinput > .uni-easyinput__content > .uni-easyinput__content-input > .uni-input-wrapper > .uni-input-input"
      )
      .first()
      .clear();
  }

  async addAddressEempty() {
    const addressEempty = await this.page
      .locator(
        "uni-view:nth-child(2) > .uni-forms-item__box > .uni-forms-item__inner > .uni-forms-item__content > .box > .box-translate > .input-data > .uni-easyinput > .uni-easyinput__content > .uni-easyinput__content-input > .uni-input-wrapper > .uni-input-input"
      )
      .first();
    if (addressEempty) {
      addressEempty.fill("EN 〒108-0023東京都港区西麻布十番10-12-22 永順番");
    }
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

  async addFillPhoneCorrect() {
    const phoneNumber = await this.page
      .locator(
        ".uni-forms-item__content > .uni-easyinput > .uni-easyinput__content > .uni-easyinput__content-input > .uni-input-wrapper > .uni-input-input"
      )
      .first();
    if (phoneNumber) {
      phoneNumber.fill("00056666664");
    }
  }

  async clearEditor() {
    await this.page.locator(".ql-editor").first().clear();
  }

  async addEditor() {
    const editor = await this.page.locator(".ql-editor").first();
    if (editor) {
      editor.fill("Hello! this editor");
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
