import LoginPage from "../pages/login.page";
import PasswordForgetPage from "../pages/passwordForget.page";
const { test, expect } = require("@playwright/test");
require("dotenv").config();

test("login with incorrect credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  try {
    await loginPage.loginWithCredentials(
      "example@lynked.co.jp",
      process.env.PASSWORD
    );
    await expect(
      page.getByText(
        " Eメールアドレスまたはパスワードが正しくありません。もう一度お試しください。 "
      )
    ).toBeVisible();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

test("click forgotten your password", async ({ page }) => {
  const loginPage = new LoginPage(page);
  try {
    await loginPage.goToLoginPage();
    await loginPage.clickForgottenPasswordLink();
    await page.waitForURL(
      `${process.env.BASE_URL}pages/resetpassword/resetpassword`
    );

    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toBe(
      `${process.env.BASE_URL}pages/resetpassword/resetpassword`
    );
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

test("click cancel button at password forget page", async ({ page }) => {
  try {
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.clickForgottenPasswordLink();
    const passwordForgetPage = new PasswordForgetPage(page);
    await passwordForgetPage.clickCancelButton();

    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toBe(`${process.env.BASE_URL}pages/login/login`);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

test("input wrong email address at password forget page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const passwordForgetPage = new PasswordForgetPage(page);
  try {
    await loginPage.goToLoginPage();
    await loginPage.clickForgottenPasswordLink();
    await passwordForgetPage.inputEmailAndSubmit("invalid_email@example.com");

    const errorMessage = "*入力内容と一致するE";
    await expect(page.getByText(errorMessage)).toBeVisible();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

test("input correct email address at password forget page", async ({
  page,
}) => {
  try {
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.clickForgottenPasswordLink();
    const passwordForgetPage = new PasswordForgetPage(page);

    await passwordForgetPage.inputEmailAndSubmit(process.env.EMAIL);

    await expect(page.getByText("ログインへ")).toBeVisible();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

test("click to login page button at confirmation page", async ({ page }) => {
  try {
    const loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.clickForgottenPasswordLink();
    const passwordForgetPage = new PasswordForgetPage(page);

    await passwordForgetPage.inputEmailAndSubmit(process.env.EMAIL);
    const currentUrl = await passwordForgetPage.clickToLoginPageButton();

    expect(currentUrl).toBe(`${process.env.BASE_URL}pages/login/login`);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});
