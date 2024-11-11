import {Platform} from "react-native";

export const userDirectory = Platform.select({
    ios: 'path/to/ios/user/directory',
    android: 'path/to/android/user/directory',
});

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

