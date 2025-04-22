Feature: QR Code Scanning Functionality

  Scenario: Successful QR code scan
    Given the app is launched on the home screen
    When I navigate to the QR Code Scanner section
    And I grant camera permissions
    And I scan a valid QR code containing a URL
    Then the URL should open in the default browser

  Scenario: Scan without camera permission
    Given the app is launched on the home screen
    When I navigate to the QR Code Scanner section
    And I deny camera permissions
    Then I should see a permission error message

  Scenario: Scan invalid QR code
    Given the app is launched on the home screen
    When I navigate to the QR Code Scanner section
    And I grant camera permissions
    And I scan an invalid QR code
    Then I should see an invalid code error message

  Scenario: Scan QR code without URL
    Given the app is launched on the home screen
    When I navigate to the QR Code Scanner section
    And I grant camera permissions
    And I scan a QR code without a URL
    Then I should see a "no URL found" message