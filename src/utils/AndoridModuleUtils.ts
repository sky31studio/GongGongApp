import {NativeModules} from "react-native";

const { ApkDownloader } = NativeModules;

// 下载并安装 APK
export const downloadAndInstallApk = (url: string) => {
    ApkDownloader.downloadApk(url)
};