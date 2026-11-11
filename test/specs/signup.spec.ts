import { expect } from '@wdio/globals';
import signupPage from '../pageobjects/signup.page.ts';
import { testData } from '../data/testdata.js';

describe('Sign-up', () => {
    beforeEach(async () => {
        await signupPage.open();
    });

    it('registers successfully and displays the confirmation dialog', async () => {
        await signupPage.submit(
            testData.signup.validEmail(),
            testData.signup.password,
            testData.signup.password
        );

        await signupPage.successDialogMessage.waitForDisplayed({ timeout: 30000 });
        await expect(signupPage.successDialogTitle).toHaveText('Signed Up!');
        await expect(signupPage.successDialogMessage).toHaveText('You successfully signed up!');
        await signupPage.dismissSuccessDialog();
    });

    it('rejects an invalid email address', async () => {
        await signupPage.submit(
            testData.signup.invalidEmail,
            testData.signup.password,
            testData.signup.password
        );

        await expect(signupPage.emailValidationMessage).toBeDisplayed();
        await expect(signupPage.emailValidationMessage).toHaveText('Please enter a valid email address');
    });

    it('rejects mismatched password values', async () => {
        await signupPage.submit(
            testData.signup.validEmail(),
            testData.signup.password,
            testData.signup.mismatchedPassword
        );

        await expect(signupPage.passwordMismatchMessage).toBeDisplayed();
        await expect(signupPage.passwordMismatchMessage).toHaveText('Please enter the same password');
    });
});