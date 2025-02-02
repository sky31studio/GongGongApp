package com.gonggongapp.ui.screens.picSelect

import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.gestures.detectTransformGestures
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.BlendMode
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.layout.onGloballyPositioned
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.dp
import coil3.compose.AsyncImage
import kotlin.math.min

class ImageAdjustmentActivity: ComponentActivity() {
    private val _tag = "adjust"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val uri = if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            intent.getParcelableExtra("uri", Uri::class.java)
        } else {
            intent.getParcelableExtra("uri")
        }

        setContent {
            ImageAdjustmentScreen(uri)
        }
    }

    @Composable
    fun ImageAdjustmentScreen(uri: Uri?) {
        val density = LocalDensity.current
        val radiusPx = with(density){ 150.dp.toPx()}

        var width by remember { mutableFloatStateOf(0f) }
        var height by remember { mutableFloatStateOf(0f) }
        var scale by remember { mutableFloatStateOf(1f) }
        var minScale by remember { mutableFloatStateOf(1f) }

        var offset by remember { mutableStateOf(Offset.Zero) }
        var centerOffset by remember { mutableStateOf(Offset.Zero) }

        LaunchedEffect(width, height) {
            if(width != 0f && height != 0f) {
                if(width < 2 * radiusPx || height < 2 * radiusPx) {
                    scale = 2 * radiusPx / min(width, height)
                    minScale = scale
                } else {
                    minScale = radiusPx * 2 / min(width, height)
                }
            }
        }

        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.Black)
        ) {
            /* 图片调整Box */
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .pointerInput(Unit) {
                        detectTransformGestures {_, pan, zoom, _ ->
                            if(zoom != 1f) {
                                val oldScale = scale
                                val originX = centerOffset.x
                                val originY = centerOffset.y
                                scale = (scale * zoom).coerceIn(minScale, 8f)
                                val offsetX = centerOffset.x * scale / oldScale
                                val offsetY = centerOffset.y * scale / oldScale

                                centerOffset = if(offsetX - radiusPx < -width * scale / 2) {
                                    Offset(-width * scale / 2 + radiusPx, centerOffset.y)
                                } else if (offsetX + radiusPx > width * scale / 2) {
                                    Offset(width * scale / 2 - radiusPx, centerOffset.y)
                                } else {
                                    Offset(offsetX, centerOffset.y)
                                }

                                centerOffset = if(offsetY - radiusPx < -height * scale / 2) {
                                    Offset(centerOffset.x, -height * scale / 2 + radiusPx)
                                } else if (offsetY + radiusPx > height * scale / 2) {
                                    Offset(centerOffset.x, height * scale / 2 - radiusPx)
                                } else {
                                    Offset(centerOffset.x, offsetY)
                                }

                                offset = Offset(offset.x - (centerOffset.x - originX), offset.y - (centerOffset.y - originY))

                            } else {
                                val originX = centerOffset.x
                                val originY = centerOffset.y
                                val offsetX = centerOffset.x - pan.x
                                val offsetY = centerOffset.y - pan.y

                                Log.i(_tag, "${centerOffset.x * 2 + radiusPx * 2}")
                                Log.i(_tag, "${width * scale / 2}")

                                Log.i(_tag, offset.toString())
                                Log.i(_tag, centerOffset.toString())

                                centerOffset = if(offsetX - radiusPx < -width * scale / 2) {
                                    Offset(-width * scale / 2 + radiusPx, centerOffset.y)
                                } else if(offsetX + radiusPx > width * scale / 2) {
                                    Offset(width * scale / 2 - radiusPx, centerOffset.y)
                                } else {
                                    Offset(offsetX, centerOffset.y)
                                }

                                centerOffset = if(offsetY - radiusPx < -height * scale / 2) {
                                    Offset(centerOffset.x, -height * scale / 2 + radiusPx)
                                } else if(offsetY + radiusPx > height * scale / 2) {
                                    Offset(centerOffset.x, height * scale / 2 - radiusPx)
                                } else {
                                    Offset(centerOffset.x, offsetY)
                                }

                                offset = Offset(offset.x - (centerOffset.x - originX), offset.y - (centerOffset.y - originY))
                            }
                        }
                    }
            ) {
                AsyncImage(
                    model = uri,
                    contentDescription = "Selected Image",
                    modifier = Modifier
                        .align(Alignment.Center)
                        .graphicsLayer(
                            scaleX = scale,
                            scaleY = scale,
                            translationX = offset.x,
                            translationY = offset.y
                        )
                        .onGloballyPositioned { layoutCoordinates ->
                            val size = layoutCoordinates.size
                            if(size.width > 0 && size.height > 0) {
                                width = size.width.toFloat()
                                height = size.height.toFloat()
                            }
                        },
                )

                Canvas(
                    modifier = Modifier
                        .fillMaxSize()
                        .alpha(.6f)
                ) {
                    val centerX = size.width / 2
                    val centerY = size.height / 2

                    drawRect(
                        color = Color.Black,
                        size = Size(size.width, size.height),
                        blendMode = BlendMode.Src
                    )

                    drawCircle(
                        color = Color.Blue,
                        radius = radiusPx,
                        center = Offset(centerX, centerY),
                        blendMode = BlendMode.DstOut
                    )
                }

                Box(
                    modifier = Modifier
                        .size(300.dp)
                        .clip(CircleShape)
                        .align(Alignment.Center)
                        .border(width = 2.dp, color = Color.White, shape = RoundedCornerShape(150.dp))
                )
            }

            /* 确认按钮Box */
            Box(
                modifier = Modifier
                    .fillMaxWidth()
            ) {

            }
        }
    }
}