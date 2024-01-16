class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goToLoginPage() {
    await this.page.goto(`${process.env.BASE_URL}pages/login/login`);
    await this.page.waitForLoadState("networkidle");
  }

  async loginWithCredentials(email, password) {
    await this.goToLoginPage();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async fillEmail(email) {
    await this.page.locator('input:not([type="password"])').fill(email);
  }

  async fillPassword(password) {
    await this.page.locator('input[type="password"]').fill(password);
  }

  async clickLoginButton() {
    this.page.getByText("ログイン", { exact: true }).click();
  }

  async clickForgottenPasswordLink() {
    await this.page.getByText("パスワードをお忘れですか？").click();
  }

  async getCurrentUrl() {
    return this.page.url();
  }
}

export default LoginPage;
