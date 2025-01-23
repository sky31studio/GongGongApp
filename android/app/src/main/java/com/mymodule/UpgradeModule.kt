package com.mymodule

import android.app.DownloadManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import android.os.Build
import android.os.Environment
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File

class ApkDownloaderModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ApkDownloader"
    }


    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    @ReactMethod
    fun downloadApk(downloadUrl: String, promise: Promise) {
        val request = DownloadManager.Request(Uri.parse(downloadUrl))
        request.setTitle("gonggong")
        request.setDescription("正在下载新版本应用")
        request.setDestinationInExternalFilesDir(reactApplicationContext, Environment.DIRECTORY_DOWNLOADS, "updateGong.apk")
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)

        val downloadManager = reactApplicationContext.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
        val downloadId = downloadManager.enqueue(request)

        val downloadCompleteReceiver = object: BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                val id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1)

                if(id == downloadId) {
                    installApk(reactApplicationContext, promise)
                }
            }
        }

        reactApplicationContext.registerReceiver(
            downloadCompleteReceiver,
            IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE),
            Context.RECEIVER_NOT_EXPORTED,
        )

    }

    private fun installApk(context: Context, promise: Promise) {
            try {
                val apkFile = File(context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), "updateGong.apk")
                val intent = Intent(Intent.ACTION_VIEW).apply {
                    flags = Intent.FLAG_ACTIVITY_NEW_TASK
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                        val apkUri = FileProvider.getUriForFile(
                            reactApplicationContext,
                            "${reactApplicationContext.packageName}.fileprovider",
                            apkFile
                        )
                        setDataAndType(apkUri, "application/vnd.android.package-archive")
                        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                    } else {
                        setDataAndType(Uri.fromFile(apkFile), "application/vnd.android.package-archive")
                    }
                }
                reactApplicationContext.startActivity(intent)
                promise.resolve("APK installation triggered")
            } catch (e: Exception) {
                promise.reject("Error install apk", e)
            }
    }

}