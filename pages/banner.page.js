class BannerPage {
  constructor(page) {
    this.page = page;
  }

  async clickBannerPencilIcon() {
    if (!this.page.isClosed()) {
      await this.page
        .locator("uni-view")
        .filter({ hasText: /^広告$/ })
        .locator("svg")
        .click();
    } else {
      console.error("Page is closed. Cannot perform actions on a closed page.");
    }
  }

  async clickCancelButton() {
    await this.page.getByText("キャンセル").click();
  }
  async clickAddButton() {
    await this.page.getByText("追加").first().click();
  }

  async clickConfirmButton() {
    await this.page.getByText("確定").nth(1).click();
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

  async windowForm() {
    await this.page.locator(".ad-window", { exact: true }).first();
  }

  async localeVersion() {
     await this.page
    .locator("div")
    .filter({ hasText: /^英語版$/ })
    .nth(1)
    .click();
  }
}

export default BannerPage;
