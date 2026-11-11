import { expect } from '@wdio/globals';
import loginPage from '../pageobjects/login.page.js';
import signupPage from '../pageobjects/signup.page.js';
import { testData } from '../data/testdata.js';

describe('Login', () => {
    beforeEach(async () => {
        await loginPage.open();
    });

    it('logs in successfully and displays the confirmation dialog', async () => {
        const email = testData.signup.validEmail();

        await signupPage.open();
        await signupPage.submit(email, testData.signup.password, testData.signup.password);
        await signupPage.successDialogMessage.waitForDisplayed({ timeout: 30000 });
        await signupPage.dismissSuccessDialog();

        await loginPage.open();
        await loginPage.submit(email, testData.signup.password);

        await loginPage.successDialogMessage.waitForDisplayed({ timeout: 30000 });
        await expect(loginPage.successDialogTitle).toHaveText('Success');
        await expect(loginPage.successDialogMessage).toHaveText('You are logged in!');
        await loginPage.dismissSuccessDialog();
    });

    it('rejects an invalid email address', async () => {
        await loginPage.submit(testData.login.invalidEmail, testData.signup.password);

        await expect(loginPage.emailValidationMessage).toBeDisplayed();
        await expect(loginPage.emailValidationMessage).toHaveText('Please enter a valid email address');
    });

    it('rejects passwords shorter than eight characters', async () => {
        await loginPage.submit('qa.login.short@example.com', testData.login.shortPassword);

        await expect(loginPage.passwordValidationMessage).toBeDisplayed();
        await expect(loginPage.passwordValidationMessage).toHaveText('Please enter at least 8 characters');
    });
});