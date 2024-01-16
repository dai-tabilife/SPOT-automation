class PasswordForgetPage {
  constructor(page) {
    this.page = page;
  }

  async clickCancelButton() {
    await this.page.getByText("キャンセル").click();
  }

  async inputEmailAndSubmit(email) {
    await this.page.getByRole("textbox").fill(email);
    await this.page.getByText("確定").click();
  }

  async clickToLoginPageButton() {
    await this.page.getByText("ログインへ").click();
    const currentUrl = this.page.url();
    return currentUrl;
  }
}

export default PasswordForgetPage;
