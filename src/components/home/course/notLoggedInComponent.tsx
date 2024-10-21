import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {SvgXml} from "react-native-svg";
import {FontColor} from "../../../config/globalStyleSheetConfig.ts";

const notLoggedInXML = `
<svg width="205" height="128" viewBox="0 0 205 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="39.3467" y="70.9186" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(-30 39.3467 70.9186)" fill="#FFC75A"/>
<rect x="45.6758" y="81.8807" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(-30 45.6758 81.8807)" fill="#FFC75A"/>
<rect x="35.0618" y="80.3743" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(-90 35.0618 80.3743)" fill="#FFC75A"/>
<rect width="2.04311" height="6.81037" rx="1.02156" transform="matrix(-0.866025 -0.5 -0.5 0.866025 51.3787 70.8872)" fill="#FFC75A"/>
<rect x="42.5869" y="81.228" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(30 42.5869 81.228)" fill="#FFC75A"/>
<rect width="2.04311" height="6.81037" rx="1.02155" transform="matrix(2.58096e-08 1 1 -2.58096e-08 48.4508 77.6119)" fill="#FFC75A"/>
<circle cx="191.5" cy="95" r="8.5" fill="#FFCBF7"/>
<circle cx="12" cy="42.5" r="6" fill="#FFDABF"/>
<path d="M76.3737 8.5C76.3737 13.1944 72.5681 17 67.8737 17C63.1792 17 59.3737 13.1944 59.3737 8.5C59.3737 3.80558 63.1792 0 67.8737 0C72.5681 0 76.3737 3.80558 76.3737 8.5Z" fill="#B4C0FF"/>
<rect x="184.389" y="10.5" width="2.34727" height="7.82422" rx="1.17363" fill="#A1CDF7"/>
<rect x="184.389" y="24.5836" width="2.34727" height="7.82422" rx="1.17363" fill="#A1CDF7"/>
<rect x="175" y="17.2273" width="2.34727" height="7.82422" rx="1.17363" transform="rotate(-60 175 17.2273)" fill="#A1CDF7"/>
<rect width="2.27321" height="7.57736" rx="1.1366" transform="matrix(-0.5 -0.866025 -0.866025 0.5 196 17.1632)" fill="#A1CDF7"/>
<rect x="181.776" y="22.2363" width="2.34727" height="7.82422" rx="1.17363" transform="rotate(60 181.776 22.2363)" fill="#A1CDF7"/>
<rect width="2.27321" height="7.57736" rx="1.1366" transform="matrix(-0.5 0.866025 0.866025 0.5 189.438 22.0142)" fill="#A1CDF7"/>
<ellipse cx="134" cy="50.5" rx="68" ry="10" fill="url(#paint0_linear_1_702)"/>
<ellipse cx="110.531" cy="15.6068" rx="9.23558" ry="11.7953" transform="rotate(-20.8355 110.531 15.6068)" fill="#FFA5A5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M101.497 17.6874C101.294 12.4475 103.793 7.75239 108.163 6.08944C110.133 5.33953 112.23 5.3031 114.243 5.8605C111.788 4.1665 108.918 3.59981 106.335 4.58276C101.882 6.27765 99.8556 11.9803 101.497 17.6874Z" fill="#FFD8D8"/>
<ellipse cx="111.871" cy="17.9802" rx="6.4851" ry="8.28249" transform="rotate(-20.8355 111.871 17.9802)" fill="#FFCCCC"/>
<circle cx="133.827" cy="40.4438" r="36.8603" fill="#FFBABA"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M166.405 23.1847C159.331 13.9568 148.196 8.00673 135.67 8.00673C115.363 8.00673 98.708 23.6468 97.0948 43.5386C97.0099 42.5182 96.9667 41.486 96.9667 40.4438C96.9667 20.0864 113.47 3.5835 133.827 3.5835C147.948 3.5835 160.215 11.5246 166.405 23.1847Z" fill="#FFD8D8"/>
<ellipse cx="115.028" cy="26.3628" rx="3.31743" ry="5.16044" fill="black"/>
<ellipse cx="115.028" cy="26.3628" rx="3.31743" ry="5.16044" fill="url(#paint1_linear_1_702)"/>
<ellipse cx="136.776" cy="26.3629" rx="3.68603" ry="5.89764" fill="#111111"/>
<ellipse cx="136.776" cy="26.3629" rx="3.68603" ry="5.89764" fill="url(#paint2_linear_1_702)"/>
<ellipse cx="127.152" cy="41.1412" rx="15.8499" ry="11.4267" fill="#FF7F7F"/>
<ellipse cx="125.349" cy="39.3379" rx="15.8499" ry="11.4267" fill="#FF9494"/>
<circle cx="119.083" cy="39.6325" r="1.47441" fill="#FFBABA" stroke="#F76464" stroke-width="2.94882"/>
<path d="M167.37 29.017C165.601 25.4784 161.472 23.3651 159.629 22.7508C159.138 19.6791 159.039 14.3466 162.578 17.5903C167.001 21.645 169.581 33.4402 167.37 29.017Z" fill="#FF9393"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M130.141 69.1947C150.498 69.1947 167.001 52.6918 167.001 32.3345C167.001 28.4765 166.409 24.757 165.309 21.262C168.721 26.85 170.687 33.4172 170.687 40.4437C170.687 60.8011 154.184 77.304 133.827 77.304C117.328 77.304 103.36 66.4634 98.6587 51.5162C105.132 62.118 116.81 69.1947 130.141 69.1947Z" fill="#FF9393"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M159.854 22.8273C161.017 22.0038 162.102 20.9642 163.043 19.7262C166.983 14.5389 166.885 7.83248 162.824 4.74699C158.762 1.6615 152.275 3.36536 148.334 8.55266C147.336 9.86668 146.597 11.2782 146.116 12.7036C148.732 14.1027 151.408 15.8144 154.039 17.8131C156.158 19.4229 158.105 21.1107 159.854 22.8273Z" fill="#FFA5A5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M158.586 21.62C159.019 22.0204 159.442 22.423 159.853 22.8272C161.016 22.0038 162.102 20.9642 163.043 19.7262C166.385 15.3258 166.822 9.83219 164.398 6.38318C165.131 10.3325 163.991 15.0379 160.958 19.0309C160.23 19.9898 159.432 20.8546 158.586 21.62Z" fill="#FF8787"/>
<circle cx="130.51" cy="40.0011" r="1.84301" fill="#F66464" stroke="#F76464" stroke-width="2.94882"/>
<circle cx="113.554" cy="23.7826" r="1.10581" fill="white"/>
<circle cx="134.933" cy="23.7826" r="1.10581" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M157.717 20.8337C157.938 20.6012 158.151 20.3542 158.353 20.0931C160.909 16.7941 160.887 12.4971 158.304 10.4955C155.721 8.49398 151.555 9.54579 148.999 12.8448C148.728 13.1938 148.487 13.554 148.274 13.9215C150.192 15.0607 152.127 16.3612 154.039 17.8131C155.331 18.7946 156.559 19.8052 157.717 20.8337Z" fill="url(#paint3_linear_1_702)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M66.3358 51.5H64C70.2547 84.4949 99.242 109.445 134.057 109.445C168.871 109.445 197.858 84.4949 204.113 51.5H201.664C198.253 56.5533 169.26 60.5 134 60.5C98.7396 60.5 69.7475 56.5533 66.3358 51.5Z" fill="url(#paint4_linear_1_702)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M114.848 60.0979C109.118 59.851 103.701 59.4961 98.7065 59.0493C100.077 62.2987 103.292 64.5795 107.04 64.5795C110.37 64.5795 113.28 62.7788 114.848 60.0979Z" fill="#98ADF9"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M159.784 59.7561C153.655 60.1257 147.078 60.3675 140.206 60.4589C141.141 64.9759 145.142 68.3711 149.936 68.3711C154.975 68.3711 159.138 64.6191 159.784 59.7561Z" fill="#849FFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M97.0405 42.1047C78.3585 43.887 66 46.9813 66 50.5C66 56.0229 96.4446 60.5 134 60.5C171.555 60.5 202 56.0229 202 50.5C202 46.9638 189.519 43.8563 170.681 42.0783C170.695 41.7866 170.705 41.4941 170.711 41.2008C190.718 43.225 204.057 46.8566 204.057 51C204.057 57.3513 172.716 62.5 134.057 62.5C95.3966 62.5 64.0565 57.3513 64.0565 51C64.0565 46.8837 77.2208 43.2725 97.0103 41.2407C97.0171 41.5295 97.0272 41.8175 97.0405 42.1047Z" fill="url(#paint5_linear_1_702)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M159.312 61.7287C153.492 62.0988 147.296 62.3447 140.843 62.4467C140.564 61.8158 140.349 61.1505 140.206 60.4589C147.078 60.3675 153.655 60.1257 159.784 59.7561C159.694 60.4379 159.534 61.0979 159.312 61.7287Z" fill="url(#paint6_linear_1_702)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M113.373 61.9897C108.635 61.7493 104.112 61.4285 99.863 61.037C99.3977 60.4305 99.0076 59.7633 98.7065 59.0493C103.701 59.4962 109.118 59.851 114.848 60.0979C114.441 60.793 113.944 61.429 113.373 61.9897Z" fill="url(#paint7_linear_1_702)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M198.275 69.1702C181.482 73.4341 157.555 76.1 131 76.1C107.898 76.1 86.7848 74.0823 70.6277 70.75C69.9917 69.5155 69.3907 68.26 68.8259 66.9849C84.9051 70.2808 106.799 72.3087 130.926 72.3087C158.736 72.3087 183.579 69.6144 199.971 65.3893C199.441 66.6688 198.875 67.9295 198.275 69.1702Z" fill="url(#paint8_linear_1_702)"/>
<circle cx="146.574" cy="57.4505" r="9.93556" fill="url(#paint9_linear_1_702)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M136.833 59.2856C137.922 52.931 143.458 48.0949 150.123 48.0949C150.172 48.0949 150.222 48.0952 150.271 48.0957C149.128 47.6374 147.881 47.3853 146.574 47.3853C141.087 47.3853 136.639 51.8336 136.639 57.3208C136.639 57.9935 136.706 58.6505 136.833 59.2856Z" fill="#FFE3E3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M143.381 66.6762C149.848 66.6762 155.091 61.4336 155.091 54.9665C155.091 53.791 154.917 52.6559 154.595 51.5854C155.799 53.2292 156.51 55.2567 156.51 57.4504C156.51 62.9376 152.062 67.3859 146.574 67.3859C145.257 67.3859 144 67.1297 142.85 66.6644C143.026 66.6723 143.203 66.6762 143.381 66.6762Z" fill="#F87A7A"/>
<circle cx="102.4" cy="53.838" r="9.03976" fill="url(#paint10_linear_1_702)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M93.3757 54.3737C95.2481 49.7473 99.7836 46.4836 105.081 46.4836C106.138 46.4836 107.164 46.6133 108.144 46.8577C106.583 45.571 104.581 44.7982 102.4 44.7982C97.4073 44.7982 93.3601 48.8455 93.3601 53.838C93.3601 54.0178 93.3654 54.1965 93.3757 54.3737Z" fill="#FFE3E3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M99.4943 62.232C105.378 62.232 110.148 57.462 110.148 51.578C110.148 50.5085 109.991 49.4758 109.697 48.5018C110.793 49.9974 111.44 51.8421 111.44 53.8379C111.44 58.8305 107.392 62.8777 102.4 62.8777C101.202 62.8777 100.058 62.6446 99.0116 62.2213C99.1716 62.2284 99.3325 62.232 99.4943 62.232Z" fill="#F87A7A"/>
<path d="M70 104.5V109.5L35 104.5H70Z" fill="#E3E3E3"/>
<rect x="35" y="102.5" width="35" height="2" fill="#E3E3E3"/>
<path d="M70 104.5V109.5L105 104.5H70Z" fill="#AFAFAF"/>
<rect width="35" height="2" transform="matrix(-1 0 0 1 105 102.5)" fill="#AFAFAF"/>
<rect width="35.3553" height="35.3553" transform="matrix(0.989949 -0.141421 0.989949 0.141421 35 102.5)" fill="#FBFBFB"/>
<path d="M105 109.5V114.5L70 109.5H105Z" fill="#E3E3E3"/>
<rect x="70" y="107.5" width="35" height="2" fill="#E3E3E3"/>
<path d="M105 109.5V114.5L140 109.5H105Z" fill="#AFAFAF"/>
<rect width="35" height="2" transform="matrix(-1 0 0 1 140 107.5)" fill="#AFAFAF"/>
<rect width="35.3553" height="35.3553" transform="matrix(0.989949 -0.141421 0.989949 0.141421 70 107.5)" fill="#FBFBFB"/>
<path d="M140 114.5V119.5L105 114.5H140Z" fill="#E3E3E3"/>
<rect x="105" y="112.5" width="35" height="2" fill="#E3E3E3"/>
<path d="M140 114.5V119.5L175 114.5H140Z" fill="#AFAFAF"/>
<rect width="35" height="2" transform="matrix(-1 0 0 1 175 112.5)" fill="#AFAFAF"/>
<rect width="35.3553" height="35.3553" transform="matrix(0.989949 -0.141421 0.989949 0.141421 105 112.5)" fill="#FBFBFB"/>
<path d="M35 109.5V114.5L0 109.5H35Z" fill="#E3E3E3"/>
<rect y="107.5" width="35" height="2" fill="#E3E3E3"/>
<path d="M35 109.5V114.5L70 109.5H35Z" fill="#AFAFAF"/>
<rect width="35" height="2" transform="matrix(-1 0 0 1 70 107.5)" fill="#AFAFAF"/>
<rect width="35.3553" height="35.3553" transform="matrix(0.989949 -0.141421 0.989949 0.141421 0 107.5)" fill="#FBFBFB"/>
<path d="M70 114.5V119.5L35 114.5H70Z" fill="#E3E3E3"/>
<rect x="35" y="112.5" width="35" height="2" fill="#E3E3E3"/>
<path d="M70 114.5V119.5L105 114.5H70Z" fill="#AFAFAF"/>
<rect width="35" height="2" transform="matrix(-1 0 0 1 105 112.5)" fill="#AFAFAF"/>
<rect width="35.3553" height="35.3553" transform="matrix(0.989949 -0.141421 0.989949 0.141421 35 112.5)" fill="#FBFBFB"/>
<path d="M105 119.5V124.5L70 119.5H105Z" fill="#E3E3E3"/>
<rect x="70" y="117.5" width="35" height="2" fill="#E3E3E3"/>
<path d="M105 119.5V124.5L140 119.5H105Z" fill="#AFAFAF"/>
<rect width="35" height="2" transform="matrix(-1 0 0 1 140 117.5)" fill="#AFAFAF"/>
<rect width="35.3553" height="35.3553" transform="matrix(0.989949 -0.141421 0.989949 0.141421 70 117.5)" fill="#FBFBFB"/>
<g opacity="0.6" filter="url(#filter0_d_1_702)">
<path d="M50 103.5V108.5L15 103.5H50Z" fill="#FFD3D3"/>
<rect x="15" y="101.5" width="35" height="2" fill="#FFD3D3"/>
<path d="M50 103.5V108.5L85 103.5H50Z" fill="#FFAAAA"/>
<rect width="35" height="2" transform="matrix(-1 0 0 1 85 101.5)" fill="#FFAAAA"/>
<rect width="35.3553" height="35.3553" transform="matrix(0.989949 -0.141421 0.989949 0.141421 15 101.5)" fill="#FFE1E1"/>
</g>
<g opacity="0.6" filter="url(#filter1_d_1_702)">
<path d="M112 108.5V113.5L77 108.5H112Z" fill="#FFF0B8"/>
<rect x="77" y="106.5" width="35" height="2" fill="#FFF0B8"/>
<path d="M112 108.5V113.5L147 108.5H112Z" fill="#F7DF8C"/>
<rect width="35" height="2" transform="matrix(-1 0 0 1 147 106.5)" fill="#F7DF8C"/>
<rect width="35.3553" height="35.3553" transform="matrix(0.989949 -0.141421 0.989949 0.141421 77 106.5)" fill="#FFFCE4"/>
</g>
<defs>
<filter id="filter0_d_1_702" x="15" y="96.5" width="78" height="21" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="7" dy="5"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.780833 0 0 0 0 0.780833 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_702"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_702" result="shape"/>
</filter>
<filter id="filter1_d_1_702" x="77" y="101.5" width="78" height="21" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="7" dy="5"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.975 0 0 0 0 0.92586 0 0 0 0 0.667875 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_702"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_702" result="shape"/>
</filter>
<linearGradient id="paint0_linear_1_702" x1="73" y1="40.5" x2="185" y2="64" gradientUnits="userSpaceOnUse">
<stop stop-color="#BCCBFF"/>
<stop offset="1" stop-color="#809BFA"/>
</linearGradient>
<linearGradient id="paint1_linear_1_702" x1="112.448" y1="20.8338" x2="116.871" y2="31.8919" gradientUnits="userSpaceOnUse">
<stop stop-color="#9E9E9E"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint2_linear_1_702" x1="133.909" y1="20.0439" x2="139.067" y2="32.5815" gradientUnits="userSpaceOnUse">
<stop stop-color="#9E9E9E"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint3_linear_1_702" x1="152.994" y1="8.00667" x2="157.418" y2="22.7508" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFE5E5"/>
<stop offset="1" stop-color="#FFCCCC" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint4_linear_1_702" x1="88.5" y1="47" x2="183.5" y2="95" gradientUnits="userSpaceOnUse">
<stop stop-color="#DEEAFF"/>
<stop offset="1" stop-color="#A2C2FC"/>
</linearGradient>
<linearGradient id="paint5_linear_1_702" x1="70" y1="45" x2="198.5" y2="62.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#FAFAFF"/>
<stop offset="1" stop-color="#C7C9FF"/>
</linearGradient>
<linearGradient id="paint6_linear_1_702" x1="70" y1="45.0001" x2="198.5" y2="62.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#D0D2FF"/>
<stop offset="0.492708" stop-color="#AFB2FF"/>
<stop offset="1" stop-color="#C7C9FF"/>
</linearGradient>
<linearGradient id="paint7_linear_1_702" x1="70" y1="45" x2="198.5" y2="62.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#FAFAFF"/>
<stop offset="0.544792" stop-color="#A1A5FF"/>
<stop offset="1" stop-color="#C7C9FF"/>
</linearGradient>
<linearGradient id="paint8_linear_1_702" x1="71" y1="68.5" x2="195.947" y2="57.9865" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#C6C8FF"/>
</linearGradient>
<linearGradient id="paint9_linear_1_702" x1="141.961" y1="49.6439" x2="150.832" y2="64.9021" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFC8C8"/>
<stop offset="1" stop-color="#FF8686"/>
</linearGradient>
<linearGradient id="paint10_linear_1_702" x1="98.2028" y1="46.7353" x2="106.274" y2="60.6178" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFE3E3"/>
<stop offset="1" stop-color="#FF8686"/>
</linearGradient>
</defs>
</svg>

`;

const NotLoggedInComponent = () => {

    return (
        <View style={styleSheet.notLoggedContainer}>
            <View style={{display: 'flex', alignItems: 'center', paddingVertical: 20}}>
                <Text style={{fontSize: 18, color: '#000', fontWeight: '600'}}>课程表</Text>
            </View>
            <View style={{width: 205, height: 128}}>
                <SvgXml xml={notLoggedInXML} width="100%" />
            </View>
            <View style={{display: 'flex', alignItems: 'center', paddingVertical: 20}}>
                <Text style={{color: FontColor.primary}}>登录后才能查看课表哟~</Text>
            </View>
        </View>
    );
}

const styleSheet = StyleSheet.create({
    notLoggedContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default NotLoggedInComponent;
