import { $ } from '@wdio/globals';
import BasePage from './base.page.js';

class LoginPage extends BasePage {
    private get loginSubTab() {
        return $('~button-login-container');
    }

    private get emailInput() {
        return $('~input-email');
    }

    private get passwordInput() {
        return $('~input-password');
    }

    private get submitButton() {
        return $('~button-LOGIN');
    }

    public get emailValidationMessage() {
        return $('android=new UiSelector().text("Please enter a valid email address")');
    }

    public get passwordValidationMessage() {
        return $('android=new UiSelector().text("Please enter at least 8 characters")');
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
        await this.loginSubTab.waitForDisplayed({ timeout: 10000 });
        await this.loginSubTab.click();
        await this.emailInput.waitForDisplayed({ timeout: 10000 });
        await this.emailInput.clearValue();
        await this.passwordInput.clearValue();
    }

    public async submit(email: string, password: string) {
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
        await this.submitButton.waitForEnabled({ timeout: 10000 });
        await this.submitButton.click();
    }

    public async dismissSuccessDialog() {
        await this.successDialogOkButton.waitForDisplayed({ timeout: 10000 });
        await this.successDialogOkButton.click();
    }
}

export default new LoginPage();
