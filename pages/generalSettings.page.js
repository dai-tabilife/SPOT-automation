const { expect } = require("@playwright/test");

class GeneralSettingsPage {
  constructor(page) {
    this.page = page;
  }

  async openGeneralSettings() {
    await this.page
      .locator("uni-view")
      .filter({ hasText: /^全般設定$/ })
      .locator("svg")
      .click();
  }

  async clickCancelButtonAtPopupContent() {
    await this.openGeneralSettings();
    await this.page.getByText("キャンセル").click();
    await expect(
      this.page.locator(".uni-popup > uni-view:nth-child(2)")
    ).toBeHidden();
  }

  async updateBannerTransitionTimeInterval(value) {
    await this.openGeneralSettings();
    await this.page.getByRole("spinbutton").fill(value);
    await this.page.getByText("確定").click();
    await expect(
      this.page.locator(".uni-popup > uni-view:nth-child(2)")
    ).toBeHidden();
  }

  async clickInformationPencilIcon() {
    await this.page
      .locator("uni-view")
      .filter({ hasText: /^インフォーメーション>$/ })
      .locator("svg")
      .click();
    await expect(this.page.getByText("詳細", { exact: true }).first()).toBeVisible();
  }
}

export default GeneralSettingsPage;
