class CMSPage {
  constructor(page) {
    this.page = page;
    this.logoutButtonSelector = "uni-view.uni-menu-item .title span";
    this.btnCancelLogout = ".uni-modal__btn.uni-modal__btn_default";
    this.acceptButtonLogout = ".uni-modal__btn.uni-modal__btn_primary";
  }

  async clickLogoutButtonByText() {
    await this.page.getByText("ログアウト", { exact: true }).click();
  }

  async clickCancelButton() {
    await this.page.getByText("いいえ").click();
  }

  async clickAcceptButton() {
    await this.page.getByText("はい").click();
  }

  async waitForPageLoad() {
    await new Promise((resolve) => setTimeout(resolve, 7000));
  }

  // change hotelID
  createHotelId() {
    return Math.random().toString(36).substring(7);
  }

  async changeHotelIdToDifferentId() {
    await this.waitForPageLoad();
    const url = this.page.url();
    const id = this.createHotelId();
    const newUrl = url.replace(/(h=)[^\&]+/, `$1${id}`);
    await this.page.goto(newUrl);
    await this.waitForPageLoad();
  }

  async clickLogoutButtonOnErrorDialog() {
    await this.waitForPageLoad();
    await this.changeHotelIdToDifferentId();
    await this.page.getByText("ログアウト", { exact: true }).click();
  }

  async clickRefreshButtonOnErrorDialog() {
    await this.waitForPageLoad();
    await this.changeHotelIdToDifferentId();

    await this.page.getByText("再試行", { exact: true }).click();
  }

  // change language
  async clickLanguageDropdown() {
    await this.page.getByText("日本語", { exact: true }).first().click();
  }

  async verifyGroupItemVisibility() {
    await this.waitForPageLoad();
    await this.clickLanguageDropdown();

    const groupItem = await this.page.waitForSelector(".group-item");

    if (groupItem) {
      const displayStyle = await groupItem.getAttribute("style");
      const isVisible = !(
        displayStyle && displayStyle.includes("display: none;")
      );
      return isVisible;
    } else {
      throw new Error("Group-item not found.");
    }
  }

  async selectRandomLanguage() {
    await this.waitForPageLoad();
    await this.clickLanguageDropdown();

    const groupItem = await this.page.waitForSelector(".group-item");

    if (groupItem) {
      const items = await groupItem.$$(".item");
      const inactiveItems = [];

      for (let i = 0; i < items.length; i++) {
        const isActive = await items[i].getAttribute("class");
        if (!isActive.includes("active")) {
          inactiveItems.push(i);
        }
      }

      const randomIndex = Math.floor(Math.random() * inactiveItems.length);
      await items[inactiveItems[randomIndex]].click();

      const isActiveAfterClick = await items[
        inactiveItems[randomIndex]
      ].getAttribute("class");
      const isItemActive = isActiveAfterClick.includes("active");
      return isItemActive;
    } else {
      throw new Error("Group-item not found.");
    }
  }
}

export default CMSPage;
