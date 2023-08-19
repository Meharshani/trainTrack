import { AppRegistry, Text } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import PushNotification, { Importance } from "react-native-push-notification";

PushNotification.createChannel(
  {
    channelId: "channel-id", // (required)
    channelName: "My channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
