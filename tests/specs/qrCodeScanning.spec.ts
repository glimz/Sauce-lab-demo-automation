
import HomePage from '../pageobjects/home.page.js';
import QRScannerPage from '../pageobjects/qrScanner.page.js';


describe('QR Code Scanning', () => {
    beforeEach(async () => {
        await HomePage.open();
    });

    it('should successfully scan a QR code and open URL', async () => {
        await HomePage.navigateToQRScanner();
        await QRScannerPage.grantCameraPermission();
        await QRScannerPage.mockValidScan();    
    });
 

/*
it('should show error when camera permission denied', async () => {
        await HomePage.navigateToQRScanner();
         await QRScannerPage.denyCameraPermission();
        
        await expect(QRScannerPage.errorMessage).toBeDisplayed();
        await expect(QRScannerPage.errorMessage).toHaveTextContaining('Camera permission');
    }); */

    /* it('should show error for invalid QR code', async () => {
        await HomePage.navigateToQRScanner();
        await QRScannerPage.grantCameraPermission();
        await QRScannerPage.mockInvalidScan();
        
        await expect(QRScannerPage.errorMessage).toBeDisplayed();
        await expect(QRScannerPage.errorMessage).toHaveTextContaining('invalid');
    }); */

    /* it('should show message when QR code has no URL', async () => {
        await HomePage.navigateToQRScanner();
        await QRScannerPage.grantCameraPermission();
        await QRScannerPage.mockScanWithoutURL();
        
        await expect(QRScannerPage.errorMessage).toBeDisplayed();
        await expect(QRScannerPage.errorMessage).toHaveTextContaining('no URL');
        }); 
        */
    })

