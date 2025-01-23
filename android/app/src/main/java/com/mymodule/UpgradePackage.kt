package com.mymodule

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class UpgradePackage: ReactPackage {

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        val modulesArr = mutableListOf<NativeModule>()
        modulesArr.add(ApkDownloaderModule(reactContext)) // 在这里添加原生服务
        return modulesArr
    }

    /**
     * 创建原生 View，提供原生 View 供 React Native 调用
     * @param reactContext
     * @return
     */
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, ReactShadowNode<*>>> {
        return emptyList()
    }
}