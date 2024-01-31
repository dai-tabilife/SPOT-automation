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

  async clickAddButton() {
    const { isElement1Checked, isElement3Checked } = await this.checkbox();

    if (isElement1Checked) {
      await this.localeVersion();
      await this.page.getByText("追加").first().click();
    } else if (isElement3Checked) {
      await this.page.getByText("追加").first().click();
    }
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

  async addFillBannerName() {
    const bannerName = await this.page
      .locator("uni-view")
      .filter({ hasText: /^入力してください。\*必須な項目$/ })
      .getByRole("textbox");
    if (bannerName) {
      bannerName.fill("Banner name");
    }
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
