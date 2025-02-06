package com.gonggongapp.ui.screens.picSelect

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import coil3.compose.AsyncImage
import com.gonggongapp.R
import com.gonggongapp.utils.loadGalleryImages

class PicSelectActivity: ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if(ContextCompat.checkSelfPermission(this@PicSelectActivity, android.Manifest.permission.READ_EXTERNAL_STORAGE) != android.content.pm.PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this@PicSelectActivity, arrayOf(android.Manifest.permission.READ_EXTERNAL_STORAGE), 1)
        }

        setContent {
            PicSelectPage()
        }
    }

    @Composable
    fun PicSelectPage() {
        val imageList = remember { mutableStateListOf<Uri>() }

        LaunchedEffect(Unit) {
            val context: Context = this@PicSelectActivity
            imageList.addAll(loadGalleryImages(context))
        }

        GalleryScreen(imageList)
    }

    @Composable
    fun GalleryScreen(imageList: List<Uri>) {
        val testList = remember { mutableStateListOf<Uri>() }

        LaunchedEffect(imageList) {
            if(imageList.isNotEmpty()) {
                testList.add(imageList[0])
            }
        }

        Box(
            modifier = Modifier
                .fillMaxSize()
        ) {
            LazyVerticalGrid(
                columns = GridCells.Fixed(4),
                modifier = Modifier
                    .fillMaxSize()
                    .padding(start = 5.dp, end = 5.dp)
            ) {
                items(imageList) {uri ->
                    ImageItem(uri)
                }
            }
        }
    }

    @Composable
    fun ImageItem(uri: Uri) {

        AsyncImage(
            model = uri,
            contentDescription = null,
            modifier = Modifier
                .background(Color.Black)
                .width(100.dp)
                .height(100.dp)
                .padding(1.dp)
                .clickable {
                    val intent = Intent(this@PicSelectActivity, ImageAdjustmentActivity::class.java)
                    intent.putExtra("uri", uri)
                    startActivity(intent)
                },
            contentScale = ContentScale.Crop
        )
    }
}