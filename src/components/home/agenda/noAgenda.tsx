import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {SvgXml} from "react-native-svg";
import {FontColor} from "../../../config/globalStyleSheetConfig.ts";

const noAgendaXml = `
<svg width="207" height="139" viewBox="0 0 207 139" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="68.5" cy="8.5" r="8.5" fill="#B4C0FF"/>
<rect x="137.389" y="23" width="2.34727" height="7.82422" rx="1.17363" fill="#A1CDF7"/>
<rect x="137.389" y="37.0836" width="2.34727" height="7.82422" rx="1.17363" fill="#A1CDF7"/>
<rect x="128" y="29.7273" width="2.34727" height="7.82422" rx="1.17363" transform="rotate(-60 128 29.7273)" fill="#A1CDF7"/>
<rect width="2.27321" height="7.57736" rx="1.1366" transform="matrix(-0.5 -0.866025 -0.866025 0.5 149 29.6632)" fill="#A1CDF7"/>
<rect x="134.776" y="34.7363" width="2.34727" height="7.82422" rx="1.17363" transform="rotate(60 134.776 34.7363)" fill="#A1CDF7"/>
<rect width="2.27321" height="7.57736" rx="1.1366" transform="matrix(-0.5 0.866025 0.866025 0.5 142.438 34.5142)" fill="#A1CDF7"/>
<circle cx="196.5" cy="22.5" r="8.5" fill="#FFCBF7"/>
<rect x="81.3081" y="110.218" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(-30 81.3081 110.218)" fill="#FFC75A"/>
<rect x="87.6372" y="121.18" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(-30 87.6372 121.18)" fill="#FFC75A"/>
<rect x="77.0232" y="119.673" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(-90 77.0232 119.673)" fill="#FFC75A"/>
<rect width="2.04311" height="6.81037" rx="1.02156" transform="matrix(-0.866025 -0.5 -0.5 0.866025 93.3401 110.186)" fill="#FFC75A"/>
<rect x="84.5483" y="120.527" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(30 84.5483 120.527)" fill="#FFC75A"/>
<rect width="2.04311" height="6.81037" rx="1.02155" transform="matrix(2.58096e-08 1 1 -2.58096e-08 90.4121 116.911)" fill="#FFC75A"/>
<circle cx="11" cy="59" r="6" fill="#FFDABF"/>
<circle cx="170" cy="106" r="6" fill="#D7F8CF"/>
<path d="M132.924 76.4674C124.37 80.3372 114.408 80.9656 104.916 77.387C86.0721 70.2824 76.5499 49.2349 83.6545 30.3907C83.9177 29.6927 84.1545 29.0646 84.4874 28.393L13.7001 60.534C13.3671 61.2056 13.1303 61.8337 12.8672 62.5317C5.76258 81.3759 15.2847 102.423 34.129 109.528C43.3418 113.001 53.1116 112.46 61.4901 108.843L132.924 76.4674Z" fill="url(#paint0_linear_1_1248)"/>
<line x1="30.6388" y1="69.9771" x2="52.9771" y2="58.3612" stroke="#7F8FE4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="22" cy="73" r="2" fill="#FF7676"/>
<circle cx="25" cy="85" r="2" fill="#FF7676"/>
<circle cx="34" cy="95" r="2" fill="#FF7676"/>
<circle cx="47" cy="102" r="2" fill="#FF7676"/>
<circle cx="67" cy="103" r="2" fill="#FFBCBC"/>
<circle cx="42.062" cy="74.062" r="9.06204" fill="#FF7D7D"/>
<ellipse cx="50.987" cy="32.1477" rx="9.87196" ry="12.6081" transform="rotate(-20.8355 50.987 32.1477)" fill="#FFA5A5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M41.331 34.3713C41.1139 28.7705 43.7852 23.7521 48.4557 21.9746C50.562 21.173 52.8029 21.1341 54.9552 21.73C52.3303 19.9192 49.2633 19.3135 46.5025 20.3641C41.7423 22.1758 39.5762 28.2711 41.331 34.3713Z" fill="#FFD8D8"/>
<ellipse cx="52.4198" cy="34.6846" rx="6.93196" ry="8.8532" transform="rotate(-20.8355 52.4198 34.6846)" fill="#FFCCCC"/>
<circle cx="75.8882" cy="58.6961" r="39.4002" fill="#FFBABA"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M110.711 40.2476C103.15 30.384 91.2469 24.0239 77.8583 24.0239C56.1514 24.0239 38.3493 40.7418 36.625 62.0044C36.5343 60.9136 36.488 59.8102 36.488 58.6961C36.488 36.936 54.1281 19.2959 75.8882 19.2959C90.9827 19.2959 104.095 27.7841 110.711 40.2476Z" fill="#FFD8D8"/>
<ellipse cx="55.7942" cy="43.6449" rx="3.54601" ry="5.51602" fill="black"/>
<ellipse cx="55.7942" cy="43.6449" rx="3.54601" ry="5.51602" fill="url(#paint1_linear_1_1248)"/>
<ellipse cx="79.0402" cy="43.6449" rx="3.94002" ry="6.30403" fill="#111111"/>
<ellipse cx="79.0402" cy="43.6449" rx="3.94002" ry="6.30403" fill="url(#paint2_linear_1_1248)"/>
<ellipse cx="69.1902" cy="59.0901" rx="16.9421" ry="12.2141" fill="#FF7F7F"/>
<ellipse cx="66.8262" cy="57.5141" rx="16.9421" ry="12.2141" fill="#FF9494"/>
<circle cx="60.1282" cy="57.829" r="1.57601" fill="#FFBABA" stroke="#F76464" stroke-width="3.15201"/>
<path d="M111.742 46.482C109.851 42.6996 105.438 40.4407 103.468 39.784C102.943 36.5007 102.838 30.8008 106.62 34.268C111.348 38.602 114.106 51.21 111.742 46.482Z" fill="#FF9393"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M71.9482 89.4282C93.7083 89.4282 111.348 71.7882 111.348 50.028C111.348 45.9042 110.715 41.9284 109.54 38.1926C113.187 44.1656 115.288 51.1854 115.288 58.6961C115.288 80.4562 97.6483 98.0962 75.8882 98.0962C58.2519 98.0962 43.322 86.5087 38.2966 70.5316C45.216 81.8638 57.6987 89.4282 71.9482 89.4282Z" fill="#FF9393"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M103.708 39.8658C104.951 38.9856 106.112 37.8744 107.117 36.551C111.329 31.0063 111.224 23.8377 106.883 20.5396C102.541 17.2415 95.6073 19.0628 91.3951 24.6075C90.3281 26.0121 89.5381 27.5209 89.0238 29.0446C91.8199 30.5401 94.6802 32.3698 97.4924 34.5061C99.7575 36.2268 101.839 38.0309 103.708 39.8658Z" fill="#FFA5A5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M102.353 38.5753C102.816 39.0033 103.268 39.4337 103.708 39.8658C104.951 38.9856 106.112 37.8744 107.117 36.551C110.69 31.8473 111.157 25.975 108.566 22.2884C109.349 26.5099 108.131 31.5396 104.889 35.8078C104.11 36.8328 103.258 37.7572 102.353 38.5753Z" fill="#FF8787"/>
<circle cx="72.3423" cy="58.223" r="1.97001" fill="#F66464" stroke="#F76464" stroke-width="3.15201"/>
<circle cx="54.2181" cy="40.8869" r="1.182" fill="white"/>
<circle cx="77.0702" cy="40.8869" r="1.182" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M101.425 37.7349C101.661 37.4863 101.888 37.2223 102.104 36.9432C104.837 33.4168 104.813 28.8238 102.052 26.6843C99.2913 24.5448 94.8379 25.6691 92.1054 29.1955C91.8163 29.5685 91.5581 29.9536 91.3307 30.3463C93.3813 31.564 95.4496 32.9541 97.4924 34.506C98.8736 35.5553 100.187 36.6355 101.425 37.7349Z" fill="url(#paint3_linear_1_1248)"/>
<ellipse cx="42.9766" cy="89.697" rx="15.5493" ry="10.1669" transform="rotate(40.2896 42.9766 89.697)" fill="url(#paint4_linear_1_1248)"/>
<path d="M48.3794 100.241C47.8014 100.923 46.4624 101.266 44.2857 100.689C42.1945 100.134 39.6879 98.8011 37.3066 96.7823C34.9253 94.7636 33.1999 92.509 32.3105 90.5368C31.3847 88.4839 31.5042 87.1068 32.0822 86.425C32.6601 85.7433 33.9991 85.4 36.1759 85.9773C38.2671 86.5319 40.7737 87.8649 43.1549 89.8837C45.5362 91.9024 47.2616 94.157 48.151 96.1292C49.0768 98.1821 48.9573 99.5592 48.3794 100.241Z" fill="#FF8383" stroke="#FF8383" stroke-width="2.13124"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M51.9412 84.2746C50.4671 83.2078 48.7927 82.2623 46.9562 81.4948C40.3945 78.7526 33.6708 79.0785 29.8433 81.9058C30.1247 81.0762 30.5466 80.3138 31.116 79.6421C34.747 75.3591 43.0007 76.3887 49.5512 81.9419C50.4235 82.6814 51.2216 83.4638 51.9412 84.2746Z" fill="#FFD2D2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M78.1416 101.006L67.1474 106.146C63.4871 105.417 59.5212 103.295 56.1196 99.9534C49.3243 93.278 47.3539 84.2647 51.7186 79.8217C56.0832 75.3786 65.1301 77.1882 71.9254 83.8636C77.4262 89.2673 79.7653 96.203 78.1416 101.006Z" fill="url(#paint5_linear_1_1248)"/>
<path d="M68.8518 103.726C68.1501 104.44 66.6487 104.716 64.3225 103.928C62.0833 103.17 59.4574 101.529 57.029 99.1431C54.6007 96.7576 52.9126 94.1614 52.1148 91.936C51.2861 89.6241 51.5347 88.1181 52.2364 87.4038C52.938 86.6896 54.4394 86.4142 56.7657 87.2016C59.0049 87.9596 61.6308 89.6012 64.0591 91.9867C66.4875 94.3722 68.1756 96.9685 68.9733 99.1938C69.8021 101.506 69.5534 103.012 68.8518 103.726Z" fill="#FF8383" stroke="#FF8383" stroke-width="2.36401"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M74.379 86.6377C72.8352 85.3379 71.06 84.1562 69.091 83.1581C62.0549 79.5914 54.5903 79.4057 50.1265 82.2225C50.5052 81.3276 51.0339 80.5185 51.7183 79.8217C56.083 75.3787 65.1299 77.1883 71.9252 83.8636C72.8299 84.7523 73.649 85.6824 74.379 86.6377Z" fill="#FFD2D2"/>
<path d="M123.963 80.4904C121.297 77.4127 117.853 74.9186 113.736 73.3661C100.894 68.5244 86.5564 74.8371 81.3658 87.5475C81.3395 87.6173 81.3395 87.6173 81.3132 87.6871C81.2606 87.8267 81.2079 87.9663 81.1553 88.1059C81.1027 88.2454 81.0501 88.385 80.9974 88.5246C77.4806 97.6413 70.6502 104.552 62.3587 108.361L79.7541 100.491L123.963 80.4904Z" fill="#B5C5FD"/>
<path d="M61.59 108.709L61.7822 108.622C61.7124 108.596 61.6861 108.665 61.59 108.709Z" fill="#B5C5FD"/>
<path d="M129.945 98.0337L200.776 65.9888C201.065 55.4958 194.771 45.5499 184.441 41.6556C178.16 39.2873 171.516 39.5724 165.828 41.9719L165.348 42.1893C165.156 42.2762 165.06 42.3197 164.867 42.4067L94.4209 74.2776C100.283 71.6253 107.12 71.2533 113.61 73.7005C123.94 77.5948 130.234 87.5407 129.945 98.0337Z" fill="url(#paint6_linear_1_1248)"/>
<circle cx="112.032" cy="60.032" r="11.032" fill="url(#paint7_linear_1_1248)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M101.216 62.2137C102.425 55.1577 108.571 49.788 115.972 49.788C116.027 49.788 116.082 49.7883 116.137 49.7889C114.868 49.28 113.483 49 112.032 49C105.939 49 101 53.9392 101 60.032C101 60.7789 101.074 61.5085 101.216 62.2137Z" fill="#FFE3E3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M108.486 70.2761C115.667 70.2761 121.488 64.4549 121.488 57.274C121.488 55.9688 121.296 54.7085 120.938 53.5199C122.275 55.345 123.064 57.5963 123.064 60.0321C123.064 66.1249 118.125 71.0641 112.032 71.0641C110.57 71.0641 109.174 70.7796 107.897 70.263C108.092 70.2717 108.289 70.2761 108.486 70.2761Z" fill="#F87A7A"/>
<defs>
<linearGradient id="paint0_linear_1_1248" x1="19" y1="59.5" x2="75" y2="103" gradientUnits="userSpaceOnUse">
<stop stop-color="#D9E1FF"/>
<stop stop-color="#D9E1FF"/>
<stop offset="1" stop-color="#D8E1FF"/>
</linearGradient>
<linearGradient id="paint1_linear_1_1248" x1="53.0362" y1="37.7349" x2="57.7642" y2="49.5549" gradientUnits="userSpaceOnUse">
<stop stop-color="#9E9E9E"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint2_linear_1_1248" x1="75.9758" y1="36.8906" x2="81.4895" y2="50.2921" gradientUnits="userSpaceOnUse">
<stop stop-color="#9E9E9E"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint3_linear_1_1248" x1="96.3763" y1="24.0239" x2="101.104" y2="39.784" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFE5E5"/>
<stop offset="1" stop-color="#FFCCCC" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint4_linear_1_1248" x1="28.5074" y1="87.2841" x2="55.9915" y2="89.5487" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFA7A7"/>
<stop offset="1" stop-color="#FF8B8B"/>
</linearGradient>
<linearGradient id="paint5_linear_1_1248" x1="51" y1="80" x2="78" y2="102" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFA7A7"/>
<stop offset="0.9875" stop-color="#FF8282"/>
</linearGradient>
<linearGradient id="paint6_linear_1_1248" x1="143.5" y1="43.5" x2="173.5" y2="93.5" gradientUnits="userSpaceOnUse">
<stop offset="0.0837395" stop-color="#F1F2FF"/>
<stop offset="1" stop-color="#BCBFFF"/>
</linearGradient>
<linearGradient id="paint7_linear_1_1248" x1="106.91" y1="51.364" x2="116.76" y2="68.3061" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFC8C8"/>
<stop offset="1" stop-color="#FF8686"/>
</linearGradient>
</defs>
</svg>

`;

const NoAgendaComponent = () => {

    return (
        <View style={ss.noAgendaContainer}>
            <View style={{display: 'flex', alignItems: 'center', paddingVertical: 20}}>
                <Text style={{fontSize: 18, color: '#000', fontWeight: '600'}}>倒计时</Text>
            </View>
            <View style={{width: 205, height: 128}}>
                <SvgXml xml={noAgendaXml} width="100%" />
            </View>
            <View style={{display: 'flex', alignItems: 'center', paddingVertical: 20}}>
                <Text style={{color: FontColor.grey}}>闲时无计划，忙时多费力</Text>
            </View>
        </View>
    )
}

const ss = StyleSheet.create({
    noAgendaContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
