# Mobile Automation

## Project Overview

This project automates native Android scenarios in WebdriverIO Native Demo App v2.2.0. WebdriverIO drives the app through Appium and UiAutomator2, while Mocha organizes the tests and `expect-webdriverio` provides assertions.

## Technology Stack

- **Node.js and TypeScript:** use the project’s JavaScript ecosystem with static checks for test and page-object code.
- **WebdriverIO 10:** provides the test runner, async element APIs, and Mocha integration.
- **Appium 3 with UiAutomator2:** drives the Android emulator and exposes native accessibility/resource attributes.
- **Mocha:** provides descriptive scenario tests and hooks.
- **Spec reporter:** prints per-test outcomes directly to the terminal.

## Prerequisites

- Windows with Node.js and npm installed.
- Android SDK and Android Studio emulator tools installed.
- An Android emulator available through `adb`, or a connected Android device.
- The assignment-provided demo APK, placed at `app/android.wdio.native.app.v2.2.0.apk`.

The APK is not included in this public repository. Obtain it from the assignment materials and place it at the path above before running tests.

Confirm the device is available before running the suite:

```powershell
adb devices
```

## Installation

From the project directory, install the pinned project dependencies:

```powershell
npm install
```

The Appium service is started by the WebdriverIO configuration during a test run. The UiAutomator2 driver is included in the project dependencies.

## Emulator, Device, and APK Configuration

The current configuration targets Android with UiAutomator2 and uses the device UDID `emulator-5554`. The APK path is resolved from the project directory in `wdio.conf.ts`:

```ts
path.resolve(process.cwd(), 'app', 'android.wdio.native.app.v2.2.0.apk')
```

To use a different emulator or APK, update the corresponding `appium:udid` or APK path in `wdio.conf.ts`. Keep the emulator running and listed by `adb devices` before starting tests.

## Running Tests

Run the complete suite:

```powershell
npm run wdio
```

Run one spec while developing:

```powershell
npm run wdio -- --spec ./test/specs/signup.spec.ts
```

Run the strict TypeScript check:

```powershell
npx tsc --noEmit -p tsconfig.json
```

## Project Structure

```text
app/
  android.wdio.native.app.v2.2.0.apk  # supplied locally; excluded from Git
test/
  data/
    testdata.ts
  pageobjects/
    base.page.ts
    forms.page.ts
    login.page.ts
    signup.page.ts
  specs/
    app-launch.spec.ts
    forms.spec.ts
    login.spec.ts
    signup.spec.ts
wdio.conf.ts
tsconfig.json
package.json
```

The root `tsconfig.json` is the single TypeScript configuration used by both WDIO and the compiler check.

## Page Object Model

Page objects own verified screen selectors and reusable UI actions. `BasePage` contains only shared navigation. Login, Sign-up, and Forms page objects encapsulate their native controls, input operations, and dialog handling. Specs describe scenarios and assertions; `test/data/testdata.ts` holds their input data. There is no separate helper module because the current reusable operations are already owned by the relevant page objects.

## Test Coverage

- **Sign-up:** successful registration and confirmation dialog, invalid-email validation, and mismatched-password validation.
- **Login:** successful login and confirmation dialog, invalid-email validation, and rejection of passwords shorter than eight characters.
- **Forms:** typed-text echo, switch state and associated label update, and the Active button’s native alert.
- **Smoke:** application launch and visibility of the Home, Login, and Forms navigation tabs.

Successful account scenarios generate unique email addresses. The Login success scenario creates its account as part of that test, so it does not depend on Sign-up test order.

## Reporting and Execution Details

The configured Spec reporter writes results to the console; no persistent HTML or JUnit report is configured. Tests use one Android instance at a time. Native dialogs are verified and dismissed within their scenarios.

## Known Limitations

- Device UDID and APK path are configured directly in `wdio.conf.ts`; environment-specific overrides are not currently provided.
- Successful authentication scenarios require the demo app’s registration/login service to be reachable.
- The app does not expose a test cleanup API, so successfully registered test accounts may remain in its backend.
- The suite currently targets Android and the inspected UiAutomator2 hierarchy only.

## Future Improvements

- Support device and APK selection through environment variables or a local configuration file.
- Add persistent CI-friendly reports and attach failure screenshots/page sources.
- Add a supported backend cleanup strategy if one becomes available.
- Run against a small Android API/device matrix in CI.

## AI Assistance Disclosure

AI assistance was used to inspect the existing project and live Android UI hierarchy, implement and review the Page Object Model and scenario tests, and draft this README. Appium-based tests and the TypeScript compiler were run during implementation; results are reported separately from this documentation. The AI did not create the APK or the existing emulator/Appium environment.