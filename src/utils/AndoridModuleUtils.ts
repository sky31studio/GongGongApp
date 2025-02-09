import {NativeModules, ToastAndroid} from "react-native";

const { ApkDownloader, MediaModule } = NativeModules;

// 下载并安装 APK
export const downloadAndInstallApk = (url: string) => {
    ApkDownloader.downloadApk(url)
};

export const navigateToPicSelectScreen = () => {
    MediaModule.navigateToPicSelectScreen(
        (msg: string) => {
            console.log(msg);
        },
        (msg: string) => {
            console.log(msg);
            ToastAndroid.showWithGravity("权限被拒绝", 1500, ToastAndroid.BOTTOM)
        }
    )
}
