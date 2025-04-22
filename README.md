# E2E Testing Challenge - Deliverables

## Overview
This document provides the deliverables for the E2E Testing Challenge. It outlines the required setup instructions, project structure, and test execution details.

---

## Deliverables

1. **WebdriverIO + Appium Setup Instructions:**
   - Detailed guidance to set up WebdriverIO and Appium for both Android and iOS testing.
   
2. **Page Object Model Structure:**
   - A clear and reusable structure for page objects to ensure maintainability and scalability of test scripts.

3. **Executable Test Code for Android and iOS:**
   - Fully implemented and functional test scripts for both Android and iOS platforms.

4. **Screenshots or Test Reports:**
   - Screenshots and test reports for at least one successful and one failed test execution.

---

## Setup Instructions

### Prerequisites

1. **Node.js**: Ensure Node.js (v14 or higher) is installed.
2. **Appium**: Install Appium globally using the `appium-installer` package:

   ```sh
   npm install -g appium
   ```

3. **Android Studio**: For Android Emulator setup.
4. **Xcode**: For iOS Simulator setup.
5. **WebdriverIO CLI**: Install the WebdriverIO CLI tool:

   ```sh
   npm install -g @wdio/cli
   ```

### Project Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/glimz/sample-e2e-automation-qr-scanner.git
   ```

2. Navigate to the project folder:

   ```sh
   cd appium-webdriverio-qr-scanner
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Set up the required mobile apps by creating an `apps` directory and downloading the latest app files (`.apk` / `.zip`) from [here](https://github.com/webdriverio/native-demo-app/releases).

5. Update the configuration files in `config/` for the devices and emulators you have set up locally:
   - [`wdio.android.app.conf.ts`](./config/wdio.android.app.conf.ts)
   - [`wdio.ios.app.conf.ts`](./config/wdio.ios.app.conf.ts)

---

## Page Object Model Structure
The Page Object Model (POM) structure implemented in this project separates test logic from UI interactions. Each screen/page has:

- **Selectors**: Defined as private variables to maintain encapsulation.
- **Interaction Methods**: Public methods for interacting with the page.

Example:
```typescript
class LoginPage {
  private usernameField = $("#username");
  private passwordField = $("#password");
  private loginButton = $("#loginBtn");

  public async login(username: string, password: string): Promise<void> {
    await this.usernameField.setValue(username);
    await this.passwordField.setValue(password);
    await this.loginButton.click();
  }
}
export default new LoginPage();
```

---

## Executable Test Code
### Running Tests

- **Android App Tests:**

  ```sh
  npm run android.app
  ```

- **iOS App Tests:**

  ```sh
  npm run ios.app
  ```

### Test Execution Examples

- **Successful Test Example:**
  - Test: User login functionality works as expected.
  - Screenshot: `screenshots/successful_login.png`

- **Failed Test Example:**
  - Test: Invalid login credentials.
  - Screenshot: `screenshots/failed_login.png`

---

## Test Reports
Test reports are generated automatically and stored in the `./reports` directory. Each report includes:

- Test case execution status (Pass/Fail).
- Logs for debugging.
- Screenshots for visual reference.

Example Report Path:
```sh
./reports/test-report.html
