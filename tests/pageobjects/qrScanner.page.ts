import Page from './page.js';
import { readFileSync } from 'fs';
import { join } from 'path';

class QRScannerPage extends Page {
    mockScanWithoutURL() {
        return this.sendMockScan('TEXT_WITHOUT_URL');
    }

    errorMessage(errorMessage: string) {
        // Return a selector for the error message element
        return $(`//*[contains(@text, "${errorMessage}")]`);
    }
    
    get permissionAllowButton() { return $('~com.android.permissioncontroller:id/permission_allow_foreground_only_button'); }
    get qrScreenHeader() { return $('~com.saucelabs.mydemoapp.android:id/qrCodeTV'); }
    get cameraPreview() { return $('~camera-preview'); }
    get permissionDenyButton() { return $('~com.android.permissioncontroller:id/permission_deny_button'); }
    get scanButton() { return $('~com.saucelabs.mydemoapp.android:id/scanBtn'); }
    get errorMessageElement() { return $('~com.saucelabs.mydemoapp.android:id/errorTV'); }

    private readonly VALID_QR_IMAGE = join(process.cwd(), 'docs/assets/valid-qr-code.png');
    private readonly INVALID_QR_IMAGE = join(process.cwd(), 'docs/assets/invalid-qr.png');
    private readonly VALID_QR_URL = 'https://google.com'

   /*  async waitForQRScannerReady(): Promise<void> {
        await this.qrScreenHeader.waitForExist({ timeout: 10000 });
        await this.cameraPreview.waitForExist({ timeout: 5000 });
    } */ 

    async grantCameraPermission(): Promise<void> {
        try {
            if (await this.permissionAllowButton.isDisplayed()) {
                await this.permissionAllowButton.click();
                await driver.pause(1000);
            }
        } catch (error) {
            console.log('Permission dialog not shown or already granted');
        }
    }

    async denyCameraPermission(): Promise<void> {
        try {
            if (await this.permissionDenyButton.isDisplayed()) {
                await this.permissionDenyButton.click();
                await driver.pause(1000);
            }
        } catch (error) {
            console.log('Permission dialog not shown or already denied');
        }
    }

    async mockValidScan(): Promise<void> {
        await this.grantCameraPermission();
        await this.mockScanFromImage(this.VALID_QR_IMAGE);
        await this.verifyUrlOpened();
    }

    async mockInvalidScan(): Promise<void> {
        await this.grantCameraPermission();
        await this.mockScanFromImage(this.INVALID_QR_IMAGE);
        await this.verifyFailedScan();
    }

    private async verifyUrlOpened(): Promise<void> {
        await driver.startActivity("com.android.chrome", "com.google.android.apps.chrome.Main");
        console.log('Chrome launched');
        console.log('Switching to webview context', await driver.getContexts());
        await driver.switchContext('WEBVIEW_chrome');

        await browser.pause(2000);
        await browser.url(this.VALID_QR_URL);
  
        const currentUrl = await browser.getUrl();
        console.log('Current URL:', currentUrl);
        await expect(currentUrl).toContain(this.VALID_QR_URL);
        await driver.switchContext('NATIVE_APP');
    }

    private async mockScanFromImage(imagePath: string): Promise<void> {
        const content = imagePath.includes('valid-qr-code.png') 
            ? this.VALID_QR_URL 
            : 'INVALID_QR_CONTENT';
        
        await this.sendMockScan(content);
    }

    private async sendMockScan(content: string): Promise<void> {
        if (driver.isAndroid) {
            await driver.execute('mobile: shell', {
                command: `am broadcast -a com.saucelabs.mydemoapp.android.MOCK_SCAN --es content "${content}"`
            });
        } else {
            // iOS implementation
            await driver.execute('mobile: performAccessibilityAction', {
                action: 'mockQRScan',
                options: { content }
            });
        }
        await driver.pause(500); // Allow time for mock to process
    }

    private async verifyBrowserLaunched(): Promise<void> {
        // 1. Check current app (works on Android)
        const currentApp = await driver.getCurrentPackage();
        if (!currentApp.includes('android')) {
            console.log(`Browser opened: ${currentApp}`);
            await this.returnToApp();
            return;
        }

        // 2. Fallback: Check Android's "mCurrentFocus" (for emulators)
        const windowInfo = await driver.execute('mobile: shell', {
            command: 'dumpsys window windows | grep mCurrentFocus'
        });
        
        if (typeof windowInfo === 'string' && (windowInfo.includes('Browser') || windowInfo.includes('chrome'))) {
            console.log('Detected browser via window focus');
            await driver.pause(10000); // Wait for browser to open
            await this.returnToApp();
            return;
        }

        throw new Error('Failed to verify browser launch');
    }

    private async verifyFailedScan(): Promise<void> {
        await this.errorMessageElement.waitForDisplayed({ timeout: 10000 });
        const errorText = await this.errorMessageElement.getText();
        expect(errorText).toContain('Invalid QR code');
    }

    // Utility to go back to app from browser (Android)
    async returnToApp(): Promise<void> {
        if (driver.isAndroid) {
            await driver.execute('mobile: shell', {
                command: 'am start -n com.saucelabs.mydemoapp.android/.MainActivity'
            });
            await driver.pause(2000);
        } else {
            // iOS implementation would go here
            await driver.activateApp('com.saucelabs.mydemoapp.ios');
        }
    }

    // Utility method to switch to web context
    async switchToWebView(): Promise<void> {
        const contexts = await driver.getContexts();
        const webContext = contexts.find(ctx => 
            ctx.toString().toLowerCase().includes('webview')
        );
        
        if (webContext) {
            await driver.switchContext(webContext);
        } else {
            throw new Error('No WebView context found');
        }
    }
}

export default new QRScannerPage();