package com.mymodule

import android.content.Intent
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
import okhttp3.Call
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.BufferedInputStream
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.IOException
import java.util.zip.ZipEntry
import java.util.zip.ZipInputStream

class ApkDownloaderModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    private val TAG = "ApkDownloaderModule"
    private val client = OkHttpClient()

    override fun getName(): String {
        return "ApkDownloader"
    }

    private fun installApk(apkFile: File, promise: Promise) {
        try {
            val intent = Intent(Intent.ACTION_VIEW).apply {
                Log.d(TAG, "installApk: ${apkFile.absolutePath}")
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                    val apkUri = FileProvider.getUriForFile(
                        reactApplicationContext,
                        "${reactApplicationContext.packageName}.provider",
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
            Log.e(TAG, "Error installing apk", e)
            promise.reject("Error install apk", e)
        }
    }


    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    @ReactMethod
    private fun downloadApk(downloadUrl: String, promise: Promise) {
        Log.d(TAG, "downloadAndUnzip: $downloadUrl")
        val request = Request.Builder().url(downloadUrl).build()
        client.newCall(request).enqueue(object : okhttp3.Callback {
            override fun onFailure(call: Call, e: IOException) {
                promise.reject("Error downloading apk", e)
            }

            override fun onResponse(call: okhttp3.Call, response: okhttp3.Response) {
                try {
                    if (response.isSuccessful) {
                        Log.d(TAG, "downloadAndUnzip: down load successfully")
                        val zipInputStream = if (response.body != null) {
                            ZipInputStream(BufferedInputStream(response.body?.byteStream()))
                        } else {
                            throw Exception("Download failed: ${response.code}")
                        }
                        val entries = unzipFile(zipInputStream)
                        // 将 entries 中的app-release.apk 对象保存到 release.apk 文件中
                        val apkFile = File(
                            reactApplicationContext.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS),
                            "release.apk"
                        )
                        val apkBytes = entries["app-release.apk"]
                        if (apkBytes != null) {
                            apkFile.writeBytes(apkBytes)
                        }
                        zipInputStream.close()
                        Log.d(TAG, "downloadAndUnzip: save file to ${apkFile.absolutePath}")
                        Log.d(TAG, "downloadAndUnzip: ${apkFile.exists()}")
                        if (apkFile.exists()) {
                            Log.d(TAG, "downloadAndUnzip: file exists")
                            installApk(apkFile, promise)
                        }
                    } else {
                        throw Exception("Download failed: ${response.code}")
                    }
                } catch (e: Exception) {
                    Log.e(TAG, "Error downloading apk", e)
                    promise.reject("Error download apk", e)
                }
            }
        })

    }

    private fun unzipFile(zipInputStream: ZipInputStream): MutableMap<String, ByteArray> {
        val entries = mutableMapOf<String, ByteArray>()

        var entry: ZipEntry?
        while (zipInputStream.nextEntry.also { entry = it } != null) {
            val entryName = entry!!.name
            if (!entry!!.isDirectory) {
                val byteArrayOutputStream = ByteArrayOutputStream()
                val buffer = ByteArray(1024)
                var bytesRead: Int

                while (zipInputStream.read(buffer).also { bytesRead = it } != -1) {
                    byteArrayOutputStream.write(buffer, 0, bytesRead)
                }

                entries[entryName] = byteArrayOutputStream.toByteArray()
                byteArrayOutputStream.close()
            }
            zipInputStream.closeEntry()
        }
        zipInputStream.close()

        return entries
    }


}
