import { join } from "node:path";
import { config as baseConfig } from "./wdio.shared.local.appium.conf.js";

export const config: WebdriverIO.Config = {
    ...baseConfig,

    // ============
    // Specs
    // ============
    specs: ["../tests/specs/**/qrCodeScanning*.spec.ts"],

    // ============
    // Capabilities
    // ============
    // For all capabilities please check
    // https://github.com/appium/appium-uiautomator2-driver
    capabilities: [
        {
            // The defaults you need to have in your config
            platformName: "Android",
            "wdio:maxInstances": 1,
            // For W3C the appium capabilities need to have an extension prefix
            // This is `appium:` for all Appium Capabilities which can be found here

            //
            // NOTE: Change this name according to the Emulator you have created on your local machine
            "appium:deviceName": "Pixel_8_Pro_Android_15_API_35",
            //
            // NOTE: Change this version according to the Emulator you have created on your local machine
            "appium:platformVersion": "16.0",
            "appium:orientation": "PORTRAIT",
            "appium:automationName": "UiAutomator2",
            "appium:autoGrantPermissions": true,
            "appium:app": join(
                process.cwd(),
                "apps",
                //
                // NOTE: Change this name according to the app version you downloaded
                "mda-2.2.0-25.apk"
            ),
            "appium:newCommandTimeout": 240,
        },
        {
            "browserName": "chrome",
            "appium:automationName": "UiAutomator2",
            "platformName": "Android"
        }
    ],
    before: function (capabilities, specs) {
        // Add mock camera command for Android
        driver.addCommand('mockScan', async function (params) {
            if (driver.isAndroid) {
                await driver.executeScript('mobile: shell', {
                    command: 'am broadcast -a com.example.app.MOCK_SCAN --es content "' + params.content + '"'
                });
            } else {
                // iOS implementation would be different
            }
        });
    }
    

};
