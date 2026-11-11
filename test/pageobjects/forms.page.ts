import { $, $$ } from '@wdio/globals';
import BasePage from './base.page.js';

class FormsPage extends BasePage {
    private get textInput() {
        return $('~text-input');
    }

    private get toggleSwitch() {
        return $('~switch');
    }

    public get switchLabel() {
        return $('~switch-text');
    }

    private get activeButton() {
        return $('~button-Active');
    }

    public get activeAlertTitle() {
        return $('id=com.wdiodemoapp:id/alert_title');
    }

    public get activeAlertMessage() {
        return $('id=android:id/message');
    }

    private get alertOkButton() {
        return $('id=android:id/button1');
    }

    public async open() {
        await this.openFormsTab();
        await this.textInput.waitForDisplayed({ timeout: 10000 });
        await this.textInput.clearValue();

        if (await this.toggleSwitch.getAttribute('checked') === 'true') {
            await this.toggleSwitch.click();
        }
    }

    public async typeText(value: string) {
        await this.textInput.setValue(value);
    }

    public async echoedText(value: string) {
        const matchingText = await $$(`android=new UiSelector().text("${value}")`);
        return matchingText[0];
    }

    public async getSwitchState() {
        return this.toggleSwitch.getAttribute('checked');
    }

    public async toggle() {
        await this.toggleSwitch.click();
    }

    public async activateButton() {
        await this.activeButton.click();
    }

    public async dismissActiveAlert() {
        await this.alertOkButton.waitForDisplayed({ timeout: 10000 });
        await this.alertOkButton.click();
    }
}

export default new FormsPage();