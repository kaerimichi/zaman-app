# Zaman

An Android/iOS app written in JavaScript (using the React Native library) to interact with many punch clock services with a simple yet effective interface that should cover most use cases.

## The main purpose

Zaman aims to be a very simple app to deal with punch clock time management integrated with a service (the one that your company is using, for example). The app offers a simple interface so you can register and verify the punches, check your hour bank, remaining time of day, week and month.

## How it works

To link the app with a service, you'll need to scan a QR code provided by your company. The app can also be used offline with limited functionality.

## Installation and configuration

Being a JavaScript/RN project, the installation is pretty straightforward. First, you'll need to download the dependencies.

```
$ yarn install
```

Then you'll have to provide the credentials for the Zaman Service by editing the `src/config.json` (which can be copied and renamed from `src/config.json.sample`).

```
$ cp src/config.json.sample src/config.json
```

Zaman is backed by a service built with Parse. It consists of a REST API to manage configurations and preferences across many providers. For example, if a new provider is willing to join the Zaman community to allow their users to use the app, they just need to submit a request for the service administrator to include a new configuration pointing to the service endpoints and then a QR code will be generated to be scanned within the app. The **application form is not available yet** and will be linked here soon.

For now, you just need to provide the `PARSE_APP_KEY` value, which is `dd5e8d70-3de4-42aa-9a96-412ef6943c53`. At this point you should be connected to the service and you should be able to scan a QR code to start developing. For example, to start the RN server for the Android app, execute this:

```
$ yarn start
$ yarn run android
```

## Building for Android

To build a production release for Android you should place your keystore file in the `android/app` folder, make a copy of the `android/gradle.properties.sample` file to `android/gradle.properties` and edit the details of your keystore. After that, you can run one of these commands (inside the `android` folder) to build the APK/AAB:

```
# apk
./gradlew assembleRelease
# aab
./gradlew bundleRelease
```

The build will be located at the `android/app/build/outputs`.

## How to contribute

This project is being managed using the Github board. You can check out the milestones and releases on the platform, throw me a PR and, of course you can always open an issue here on Github if you find out some nasty bug or want something new on app that can be useful for everyone.