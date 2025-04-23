export default class Page {
    qrCodeScannerButtonIdnetifier = '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemTV" and @text="QR Code Scanner"]';
    get qrCodeScannerButton() { return $(`//*[@content-desc="${this.qrCodeScannerButtonIdnetifier}"]`) }
    get qrScreenHeader() { return $(`~${'com.saucelabs.mydemoapp.android:id/qrCodeTV'} `) }
    
    
    async navigateTo(screenIdentifier: string): Promise<void> {
        await $(`~${screenIdentifier}`).click();
        await this.qrCodeScannerButton.click();
        await this.qrScreenHeader.waitForExist({ timeout: 10000 });
        
        // Example 2: Using XPath
        // await $(`//*[@content-desc="${screenIdentifier}"]`).click();
        
        // Example 3: Using text
        // await $(`*//android.widget.TextView[@text="${screenIdentifier}"]`).click();
        
        // Add appropriate wait for the screen to load
        await this.waitForScreenToLoad(screenIdentifier);
    }

    /**
     * Wait for a specific screen to load
     */
    async waitForScreenToLoad(screenIdentifier: string): Promise<void> {
        await $(`~${screenIdentifier}`).waitForExist({ timeout: 10000 });
    }

    async homePage(): Promise<void> {
     //   await this.welcomeText.waitForExist({ timeout: 10000 });
    }

    
}