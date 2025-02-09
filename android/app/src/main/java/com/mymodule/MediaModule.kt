package com.mymodule

import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.util.Log
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.gonggongapp.ui.screens.picSelect.PicSelectActivity

class MediaModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    private lateinit var successCallback: Callback
    private lateinit var errorCallback: Callback

    override fun getName(): String {
        return "MediaModule"
    }


    private fun navigateToPicSelectActivity() {
        val intent = Intent(reactApplicationContext, PicSelectActivity::class.java)
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

        reactApplicationContext.startActivity(intent)
    }

    @ReactMethod
    fun navigateToPicSelectScreen(successCallback: Callback, errorCallback: Callback) {
        this.successCallback = successCallback
        this.errorCallback = errorCallback

        if(ContextCompat.checkSelfPermission(reactApplicationContext, android.Manifest.permission.READ_EXTERNAL_STORAGE) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(currentActivity as Activity, arrayOf(android.Manifest.permission.READ_EXTERNAL_STORAGE), 1)
        } else {
            navigateToPicSelectActivity()
            successCallback.invoke("Permission already granted")
        }
    }

    fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        if (requestCode == 1) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                if(::successCallback.isInitialized) {
                    successCallback.invoke("Permission granted")
                }
                navigateToPicSelectActivity()
            } else {
                if(::errorCallback.isInitialized) {
                    errorCallback.invoke("Permission denied")
                }
                Log.i("mediaModule", "permission denied")
            }
        }
    }
}
