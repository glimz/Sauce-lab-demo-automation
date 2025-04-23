import Page from './page.js';

class HomePage extends Page {
    get menuButton() { return $('~View menu'); }
    qrCodeScannerButtonIdnetifier = '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemTV" and @text="QR Code Scanner"]';
    // get welcomeText() { return $('~App logo and name') }
    get qrCodeScannerButton() { return $(`//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemTV" and @text="QR Code Scanner"]`) }
    get qrScreenHeader() { return $('~com.saucelabs.mydemoapp.android:id/qrCodeTV') }
    
    async navigateToQRScanner() {
        await this.menuButton.click();
        await this.qrCodeScannerButton.click();
        // await this.qrScreenHeader.waitForExist({ timeout: 10000 });

    }
    
    async open() {
        return super.homePage();
    }
}

export default new HomePage();

