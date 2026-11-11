import { expect } from '@wdio/globals';
import formsPage from '../pageobjects/forms.page.js';
import { testData } from '../data/testdata.js';

describe('Forms', () => {
    beforeEach(async () => {
        await formsPage.open();
    });

    it('echoes text entered in the input field', async () => {
        await formsPage.typeText(testData.forms.echoText);

        const echoedText = await formsPage.echoedText(testData.forms.echoText);
        await echoedText.waitForDisplayed({ timeout: 10000 });
        await expect(echoedText).toHaveText(testData.forms.echoText);
    });

    it('changes the switch state and updates its label', async () => {
        expect(await formsPage.getSwitchState()).toBe('false');
        await expect(formsPage.switchLabel).toHaveText('Click to turn the switch ON');

        await formsPage.toggle();

        expect(await formsPage.getSwitchState()).toBe('true');
        await expect(formsPage.switchLabel).toHaveText('Click to turn the switch OFF');
    });

    it('shows the native alert when the Active button is tapped', async () => {
        await formsPage.activateButton();

        await formsPage.activeAlertMessage.waitForDisplayed({ timeout: 10000 });
        await expect(formsPage.activeAlertTitle).toHaveText('This button is');
        await expect(formsPage.activeAlertMessage).toHaveText('This button is active');
        await formsPage.dismissActiveAlert();
    });
});