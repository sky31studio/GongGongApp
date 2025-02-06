package com.mymodule

import android.app.DownloadManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.core.content.FileProvider
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.util.zip.ZipEntry
import java.util.zip.ZipInputStream

class ApkDownloaderModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ApkDownloader"
    }

    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    @ReactMethod
    fun downloadApk(downloadUrl: String, promise: Promise) {
        // 判断目标文件是否存在
        val downloadDirectory = File(reactApplicationContext.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), "updateGong.zip")
        if(downloadDirectory.exists()) {
            downloadDirectory.delete()
        }

        val request = DownloadManager.Request(Uri.parse(downloadUrl))
        request.setTitle("gonggong")
        request.setDescription("正在下载新版本应用")
        request.setDestinationInExternalFilesDir(reactApplicationContext, Environment.DIRECTORY_DOWNLOADS, "updateGong.zip")
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)

        val downloadManager = reactApplicationContext.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
        val downloadId = downloadManager.enqueue(request)

        val downloadCompleteReceiver = object: BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                val id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1)

                if(id == downloadId) {
                    extractAndInstallApk(promise)
                }
            }
        }

        reactApplicationContext.registerReceiver(
            downloadCompleteReceiver,
            IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE),
            Context.RECEIVER_NOT_EXPORTED,
        )
    }

    private fun extractAndInstallApk(promise: Promise) {
        try {
            val zipFile = File(reactApplicationContext.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), "updateGong.zip")
            val unzipDir = reactApplicationContext.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS)

            unzip(zipFile, unzipDir)

            val apkFile = File(unzipDir, "app-release.apk")
            if (apkFile.exists()) {
                installApk(apkFile, promise)
            } else {
                promise.reject("APK not found", "解压后未找到 APK 文件")
            }

        } catch (e: Exception) {
            promise.reject("Error extracting apk", e)
        }
    }

    private fun unzip(zipFile: File, destDir: File?) {
        ZipInputStream(FileInputStream(zipFile)).use { zis ->
            var entry: ZipEntry?
            while (zis.nextEntry.also { entry = it } != null) {
                val file = File(destDir, entry!!.name)
                if (entry!!.isDirectory) {
                    file.mkdirs()
                } else {
                    file.parentFile?.mkdirs()
                    FileOutputStream(file).use { fos ->
                        val buffer = ByteArray(1024)
                        var length: Int
                        while (zis.read(buffer).also { length = it } != -1) {
                            fos.write(buffer, 0, length)
                        }
                    }
                }
                zis.closeEntry()
            }
        }
    }

    private fun installApk(apkFile: File, promise: Promise) {
            try {
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
                Log.i("upgrade", e.toString())
                promise.reject("Error install apk", e)
            }
    }

}