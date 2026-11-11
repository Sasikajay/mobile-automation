describe('Native Demo App - Smoke Test', () => {
    it('should launch the Android application and display the home screen', async () => {
        const homeScreen = await $('~Home-screen');
        const loginTab = await $('~Login');
        const formsTab = await $('~Forms');

        await homeScreen.waitForDisplayed({ timeout: 10000 });

        await expect(homeScreen).toBeDisplayed();
        await expect(loginTab).toBeDisplayed();
        await expect(formsTab).toBeDisplayed();

        console.log('Native Demo App home screen verified successfully');
    });
});