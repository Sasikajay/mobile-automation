import { $ } from '@wdio/globals';
import BasePage from './base.page.js';

class SignupPage extends BasePage {
    private get signupTab() {
        return $('~button-sign-up-container');
    }

    private get emailInput() {
        return $('~input-email');
    }

    private get passwordInput() {
        return $('~input-password');
    }

    private get confirmPasswordInput() {
        return $('~input-repeat-password');
    }

    private get submitButton() {
        return $('~button-SIGN UP');
    }

    public get emailValidationMessage() {
        return $('android=new UiSelector().text("Please enter a valid email address")');
    }

    public get passwordMismatchMessage() {
        return $('android=new UiSelector().text("Please enter the same password")');
    }

    public get successDialogTitle() {
        return $('id=com.wdiodemoapp:id/alert_title');
    }

    public get successDialogMessage() {
        return $('id=android:id/message');
    }

    private get successDialogOkButton() {
        return $('id=android:id/button1');
    }

    public async open() {
        await this.openLoginTab();
        await this.signupTab.waitForDisplayed({ timeout: 10000 });
        await this.signupTab.click();
        await this.emailInput.waitForDisplayed({ timeout: 10000 });
        await this.emailInput.clearValue();
        await this.passwordInput.clearValue();
        await this.confirmPasswordInput.clearValue();
    }

    public async submit(email: string, password: string, confirmPassword: string) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.confirmPasswordInput.setValue(confirmPassword);
        await this.submitButton.waitForEnabled({ timeout: 10000 });
        await this.submitButton.click();
    }

    public async dismissSuccessDialog() {
        await this.successDialogOkButton.waitForDisplayed({ timeout: 10000 });
        await this.successDialogOkButton.click();
    }
}

export default new SignupPage();