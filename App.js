import React, { Component } from "react";
import { View, Text } from "react-native";
import OneSignal from "react-native-onesignal"; // Import package from node modules

export default class App extends Component {
  constructor(properties) {
    super(properties);
    OneSignal.init("YOUR_ONESIGNAL_APP_ID", {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2
    });

    //Remove this method to stop OneSignal Debugging
    OneSignal.setLogLevel(6, 0);

    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  }

  onIds(device) {
    console.log("Device info: ", device);
  }

  render() {
    return (
      <View>
        <Text>Sample push onesignal react!</Text>
      </View>
    );
  }
}
