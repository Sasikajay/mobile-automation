import { $ } from '@wdio/globals';

export default class BasePage {
    protected get loginTab() {
        return $('~Login');
    }

    protected get formsTab() {
        return $('~Forms');
    }

    protected async openLoginTab() {
        await this.loginTab.waitForDisplayed({ timeout: 10000 });
        await this.loginTab.click();
    }

    protected async openFormsTab() {
        await this.formsTab.waitForDisplayed({ timeout: 10000 });
        await this.formsTab.click();
    }
}