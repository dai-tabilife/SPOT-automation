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

  async clickCancelButton() {
    await this.page.getByText("キャンセル").click();
  }

  async changeTypeImage() {
    await this.page.getByRole("combobox").selectOption("画像/GIF");
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
}

export default InformationPage;
