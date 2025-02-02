package com.mymodule

import android.content.Intent
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.gonggongapp.ui.screens.picSelect.PicSelectActivity

class MediaModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "MediaModule"
    }

    @ReactMethod
    fun navigateToPicSelectPage() {
        val intent = Intent(reactApplicationContext, PicSelectActivity::class.java)
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK)

        reactApplicationContext.startActivity(intent)
    }
}