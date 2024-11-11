export default class XMLResources {

    // global
    static backArrow = `
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0001 16.4375L8.95459 17.5L1.28098 9.70137C0.898041 9.31219 0.898042 8.68781 1.28098 8.29863L8.95459 0.5L10.0001 1.5625L2.68179 9L10.0001 16.4375Z" fill="white"/>
</svg>

    `;

    // LoginPage
    static alert = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_25_16076)">
<path d="M8.00004 14.6666C11.6819 14.6666 14.6667 11.6818 14.6667 7.99992C14.6667 4.31802 11.6819 1.33325 8.00004 1.33325C4.31814 1.33325 1.33337 4.31802 1.33337 7.99992C1.33337 11.6818 4.31814 14.6666 8.00004 14.6666Z" stroke="white" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 5.33325V7.99992" stroke="white" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 10.6667H8.00625" stroke="white" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_25_16076">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
    `;
    static logo = `
    <svg width="180" height="94" viewBox="0 0 180 94" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="180" height="94" fill="url(#pattern0_25_16079)"/>
<defs>
<pattern id="pattern0_25_16079" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_25_16079" transform="matrix(0.00101402 0 0 0.00194175 -0.0359115 0)"/>
</pattern>
<image id="image0_25_16079" width="1057" height="515" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
    `;
    static passwordHide = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_25_16073)">
<path d="M9.41329 9.41343C9.23019 9.60993 9.00939 9.76754 8.76406 9.87685C8.51873 9.98616 8.25389 10.0449 7.98535 10.0497C7.71681 10.0544 7.45007 10.005 7.20103 9.90443C6.952 9.80384 6.72577 9.65412 6.53586 9.4642C6.34594 9.27428 6.19622 9.04806 6.09563 8.79902C5.99504 8.54999 5.94564 8.28325 5.95038 8.0147C5.95512 7.74616 6.0139 7.48133 6.12321 7.236C6.23252 6.99067 6.39013 6.76986 6.58663 6.58677M11.96 11.9601C10.8204 12.8288 9.4327 13.31 7.99996 13.3334C3.33329 13.3334 0.666626 8.0001 0.666626 8.0001C1.49589 6.4547 2.64605 5.1045 4.03996 4.0401L11.96 11.9601ZM6.59996 2.82676C7.05885 2.71935 7.52867 2.66566 7.99996 2.66676C12.6666 2.66676 15.3333 8.0001 15.3333 8.0001C14.9286 8.75717 14.446 9.46992 13.8933 10.1268L6.59996 2.82676Z" stroke="#B7B7B7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M0.666626 0.666748L15.3333 15.3334" stroke="#B7B7B7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_25_16073">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
    `;
    static passwordShow = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_25_16099)">
<path d="M0.666687 8.00008C0.666687 8.00008 3.33335 2.66675 8.00002 2.66675C12.6667 2.66675 15.3334 8.00008 15.3334 8.00008C15.3334 8.00008 12.6667 13.3334 8.00002 13.3334C3.33335 13.3334 0.666687 8.00008 0.666687 8.00008Z" stroke="#B7B7B7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#B7B7B7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_25_16099">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
    `;

    // NotLoginComponent
    static notLogin = `
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

    //ClassComponent
    static noCourse = `
<svg width="191" height="128" viewBox="0 0 191 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="24.3467" y="73.4186" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(-30 24.3467 73.4186)" fill="#FFC75A"/>
<rect x="30.6757" y="84.3807" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(-30 30.6757 84.3807)" fill="#FFC75A"/>
<rect x="20.0618" y="82.8743" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(-90 20.0618 82.8743)" fill="#FFC75A"/>
<rect width="2.04311" height="6.81037" rx="1.02156" transform="matrix(-0.866025 -0.5 -0.5 0.866025 36.3786 73.3872)" fill="#FFC75A"/>
<rect x="27.5869" y="83.728" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(30 27.5869 83.728)" fill="#FFC75A"/>
<rect width="2.04311" height="6.81037" rx="1.02155" transform="matrix(2.58096e-08 1 1 -2.58096e-08 33.4508 80.1119)" fill="#FFC75A"/>
<circle cx="182.5" cy="65.5" r="8.5" fill="#FFCBF7"/>
<circle cx="6" cy="42" r="6" fill="#FFDABF"/>
<circle cx="69.5" cy="8.5" r="8.5" fill="#B4C0FF"/>
<rect x="157.389" width="2.34727" height="7.82422" rx="1.17363" fill="#A1CDF7"/>
<rect x="157.389" y="14.0836" width="2.34727" height="7.82422" rx="1.17363" fill="#A1CDF7"/>
<rect x="148" y="6.72729" width="2.34727" height="7.82422" rx="1.17363" transform="rotate(-60 148 6.72729)" fill="#A1CDF7"/>
<rect width="2.27321" height="7.57736" rx="1.1366" transform="matrix(-0.5 -0.866025 -0.866025 0.5 169 6.66321)" fill="#A1CDF7"/>
<rect x="154.776" y="11.7363" width="2.34727" height="7.82422" rx="1.17363" transform="rotate(60 154.776 11.7363)" fill="#A1CDF7"/>
<rect width="2.27321" height="7.57736" rx="1.1366" transform="matrix(-0.5 0.866025 0.866025 0.5 162.438 11.5142)" fill="#A1CDF7"/>
<circle cx="66.5" cy="75.5" r="11.5" fill="#FEB0B0"/>
<ellipse cx="75.3996" cy="30.3092" rx="12.5278" ry="16" transform="rotate(-20.8355 75.3996 30.3092)" fill="#FFA5A5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M63.1459 33.1317C62.8702 26.0238 66.2602 19.6551 72.1874 17.3993C74.8603 16.3821 77.7039 16.3327 80.4351 17.0888C77.1041 14.7909 73.2121 14.0222 69.7086 15.3555C63.6675 17.6546 60.9187 25.3902 63.1459 33.1317Z" fill="#FFD8D8"/>
<ellipse cx="77.2177" cy="33.5288" rx="8.79686" ry="11.235" transform="rotate(-20.8355 77.2177 33.5288)" fill="#FFCCCC"/>
<circle cx="107" cy="64" r="50" fill="#FFBABA"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M151.192 40.5886C141.596 28.0712 126.491 20 109.5 20C81.9535 20 59.3621 41.2153 57.1737 68.1979C57.0587 66.8139 57 65.4138 57 64C57 36.3858 79.3858 14 107 14C126.155 14 142.795 24.7719 151.192 40.5886Z" fill="#FFD8D8"/>
<ellipse cx="81.5" cy="44.8997" rx="4.5" ry="7" fill="black"/>
<ellipse cx="81.5" cy="44.8997" rx="4.5" ry="7" fill="url(#paint0_linear_1_852)"/>
<ellipse cx="111" cy="44.8997" rx="5" ry="8" fill="#111111"/>
<ellipse cx="111" cy="44.8997" rx="5" ry="8" fill="url(#paint1_linear_1_852)"/>
<ellipse cx="98.5" cy="64.5" rx="21.5" ry="15.5" fill="#FF7F7F"/>
<ellipse cx="95.5" cy="62.5" rx="21.5" ry="15.5" fill="#FF9494"/>
<circle cx="87" cy="62.8997" r="2" fill="#FFBABA" stroke="#F76464" stroke-width="4"/>
<path d="M152.5 48.5C150.1 43.7 144.5 40.8334 142 40C141.333 35.8334 141.2 28.6 146 33C152 38.5 155.5 54.5 152.5 48.5Z" fill="#FF9393"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M102 103C129.614 103 152 80.6143 152 53C152 47.7668 151.196 42.7214 149.705 37.9805C154.333 45.5604 157 54.4688 157 64C157 91.6143 134.614 114 107 114C84.619 114 65.6725 99.295 59.2952 79.0196C68.0761 93.4006 83.917 103 102 103Z" fill="#FF9393"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M142.304 40.1037C143.882 38.9868 145.354 37.5766 146.63 35.8972C151.976 28.8608 151.843 19.7637 146.333 15.5783C140.824 11.3929 132.024 13.7042 126.679 20.7406C125.325 22.523 124.322 24.4377 123.669 26.3713C127.218 28.2691 130.848 30.591 134.416 33.3021C137.291 35.4857 139.933 37.7753 142.304 40.1037Z" fill="#FFA5A5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M140.584 38.4661C141.172 39.0093 141.746 39.5554 142.304 40.1037C143.882 38.9868 145.354 37.5766 146.63 35.8972C151.165 29.9282 151.757 22.4762 148.469 17.7977C149.463 23.1549 147.917 29.5376 143.803 34.954C142.814 36.2549 141.733 37.4279 140.584 38.4661Z" fill="#FF8787"/>
<circle cx="102.5" cy="63.3997" r="2.5" fill="#F66464" stroke="#F76464" stroke-width="4"/>
<circle cx="79.5" cy="41.3997" r="1.5" fill="white"/>
<circle cx="108.5" cy="41.3997" r="1.5" fill="white"/>
<circle cx="120" cy="96" r="14" fill="url(#paint2_linear_1_852)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M106.274 98.7685C107.808 89.8143 115.608 83 125 83C125.07 83 125.139 83.0004 125.209 83.0011C123.599 82.3553 121.841 82 120 82C112.268 82 106 88.268 106 96C106 96.9478 106.094 97.8736 106.274 98.7685Z" fill="#FFE3E3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M115.5 109C124.613 109 132 101.613 132 92.5C132 90.8436 131.756 89.2442 131.302 87.7358C132.998 90.052 134 92.909 134 96C134 103.732 127.732 110 120 110C118.144 110 116.373 109.639 114.753 108.983C115 108.994 115.25 109 115.5 109Z" fill="#F87A7A"/>
<ellipse cx="57.0923" cy="100.199" rx="21.8877" ry="14.3112" transform="rotate(29.3347 57.0923 100.199)" fill="#FFA7A7"/>
<ellipse cx="142.79" cy="113.872" rx="13.2733" ry="8.67869" transform="rotate(-27.8326 142.79 113.872)" fill="#FFA7A7"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M136.781 123.613C135.628 117.198 140.544 109.229 149.058 104.171C146.04 103.669 142.3 104.316 138.738 106.197C132.255 109.62 128.814 115.83 131.052 120.069C132.095 122.044 134.188 123.243 136.781 123.613Z" fill="#FF8888"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M139.407 37.3996C139.706 37.0841 139.994 36.7491 140.269 36.3949C143.736 31.9199 143.707 26.0911 140.203 23.3761C136.699 20.661 131.048 22.0878 127.58 26.5628C127.213 27.0363 126.886 27.5248 126.597 28.0233C129.199 29.5686 131.824 31.3327 134.416 33.3021C136.169 34.6336 137.835 36.0045 139.407 37.3996Z" fill="url(#paint3_linear_1_852)"/>
<path d="M67.3791 113.325C66.7628 114.422 65.0041 115.255 61.8415 115.039C58.8031 114.832 54.9825 113.661 51.1516 111.508C47.3207 109.355 44.3332 106.701 42.5764 104.213C40.7479 101.624 40.5446 99.6884 41.161 98.5916C41.7773 97.4949 43.536 96.6623 46.6986 96.8778C49.737 97.0848 53.5576 98.2566 57.3885 100.409C61.2194 102.562 64.2069 105.217 65.9637 107.704C67.7922 110.294 67.9955 112.229 67.3791 113.325Z" fill="#FF8383" stroke="#FF8383" stroke-width="3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M68.0303 90.3074C65.7078 89.2273 63.1409 88.3687 60.3975 87.7992C50.5959 85.7648 41.3911 88.0137 36.8579 92.9448C37.0249 91.7231 37.404 90.5566 38.0112 89.4761C41.8834 82.5857 53.5653 81.8009 64.1035 87.723C65.5067 88.5116 66.8189 89.3793 68.0303 90.3074Z" fill="#FFD2D2"/>
<defs>
<linearGradient id="paint0_linear_1_852" x1="78" y1="37.3997" x2="84" y2="52.3997" gradientUnits="userSpaceOnUse">
<stop stop-color="#9E9E9E"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint1_linear_1_852" x1="107.111" y1="36.3282" x2="114.108" y2="53.3351" gradientUnits="userSpaceOnUse">
<stop stop-color="#9E9E9E"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint2_linear_1_852" x1="113.5" y1="85" x2="126" y2="106.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFC8C8"/>
<stop offset="1" stop-color="#FF8686"/>
</linearGradient>
<linearGradient id="paint3_linear_1_852" x1="133" y1="20" x2="139" y2="40" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFE5E5"/>
<stop offset="1" stop-color="#FFCCCC" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>
`;

    static noAgenda = `
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
</svg>`;
    static noAgendaOnlyExams = `
    <svg width="193" height="127" viewBox="0 0 193 127" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="12.3081" y="88.2178" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(-30 12.3081 88.2178)" fill="#FFC75A"/>
<rect x="18.6372" y="99.1799" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(-30 18.6372 99.1799)" fill="#FFC75A"/>
<rect x="8.02319" y="97.6735" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(-90 8.02319 97.6735)" fill="#FFC75A"/>
<rect width="2.04311" height="6.81037" rx="1.02156" transform="matrix(-0.866025 -0.5 -0.5 0.866025 24.3401 88.1864)" fill="#FFC75A"/>
<rect x="15.5483" y="98.5272" width="2.10967" height="7.03224" rx="1.05484" transform="rotate(30 15.5483 98.5272)" fill="#FFC75A"/>
<rect width="2.04311" height="6.81037" rx="1.02155" transform="matrix(2.58096e-08 1 1 -2.58096e-08 21.4122 94.9111)" fill="#FFC75A"/>
<circle cx="184.5" cy="17.5" r="8.5" fill="#FFCBF7"/>
<circle cx="6" cy="43" r="6" fill="#FFDABF"/>
<circle cx="187" cy="102" r="6" fill="#D7F8CF"/>
<circle cx="55.5" cy="8.5" r="8.5" fill="#B4C0FF"/>
<rect x="158.389" y="44" width="2.34727" height="7.82422" rx="1.17363" fill="#A1CDF7"/>
<rect x="158.389" y="58.0836" width="2.34727" height="7.82422" rx="1.17363" fill="#A1CDF7"/>
<rect x="149" y="50.7273" width="2.34727" height="7.82422" rx="1.17363" transform="rotate(-60 149 50.7273)" fill="#A1CDF7"/>
<rect width="2.27321" height="7.57736" rx="1.1366" transform="matrix(-0.5 -0.866025 -0.866025 0.5 170 50.6632)" fill="#A1CDF7"/>
<rect x="155.776" y="55.7363" width="2.34727" height="7.82422" rx="1.17363" transform="rotate(60 155.776 55.7363)" fill="#A1CDF7"/>
<rect width="2.27321" height="7.57736" rx="1.1366" transform="matrix(-0.5 0.866025 0.866025 0.5 163.438 55.5142)" fill="#A1CDF7"/>
<rect x="88" y="29" width="46" height="29" rx="5" fill="#F8CB7B"/>
<path d="M133 56L130 59L129 57L133 53V56Z" fill="#F8CB7B"/>
<rect x="86" y="31" width="46" height="29" rx="5" fill="#FFDDA1"/>
<ellipse cx="56.8773" cy="26.0866" rx="11.0285" ry="14.0851" transform="rotate(-20.8355 56.8773 26.0866)" fill="#FFA5A5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M46.0902 28.5713C45.8475 22.3141 48.8318 16.7076 54.0496 14.7218C56.4026 13.8264 58.9059 13.7829 61.3102 14.4485C58.3779 12.4256 54.9516 11.7489 51.8675 12.9227C46.5494 14.9466 44.1296 21.7563 46.0902 28.5713Z" fill="#FFD8D8"/>
<ellipse cx="58.4779" cy="28.9209" rx="7.74403" ry="9.89035" transform="rotate(-20.8355 58.4779 28.9209)" fill="#FFCCCC"/>
<ellipse cx="11.0285" cy="14.0851" rx="11.0285" ry="14.0851" transform="matrix(-0.934605 -0.355687 -0.355687 0.934605 132.056 16.8453)" fill="#FFA5A5"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M127.526 28.5713C127.769 22.3141 124.784 16.7076 119.567 14.7218C117.214 13.8264 114.71 13.7829 112.306 14.4485C115.238 12.4256 118.665 11.7489 121.749 12.9227C127.067 14.9466 129.487 21.7563 127.526 28.5713Z" fill="#FFD8D8"/>
<ellipse cx="7.74403" cy="9.89035" rx="7.74403" ry="9.89035" transform="matrix(-0.934605 -0.355687 -0.355687 0.934605 125.894 22.4318)" fill="#FFCCCC"/>
<circle cx="85.576" cy="58.2978" r="44.0159" fill="#FFBABA"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M124.479 37.6883C116.032 26.669 102.734 19.5638 87.7768 19.5638C63.5272 19.5638 43.6396 38.24 41.7131 61.9933C41.6118 60.7749 41.5602 59.5424 41.5602 58.2978C41.5602 33.9885 61.2668 14.2819 85.576 14.2819C102.439 14.2819 117.087 23.7646 124.479 37.6883Z" fill="#FFD8D8"/>
<ellipse cx="88.6571" cy="60.4986" rx="18.9268" ry="13.6449" fill="#FF7F7F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M81.1745 92.6302C105.484 92.6302 125.19 72.9236 125.19 48.6143C125.19 44.0074 124.483 39.5658 123.17 35.3923C127.244 42.0651 129.592 49.9073 129.592 58.2978C129.592 82.6071 109.885 102.314 85.5761 102.314C65.8737 102.314 49.1948 89.3686 43.5807 71.5198C51.3107 84.1796 65.2557 92.6302 81.1745 92.6302Z" fill="#FF9393"/>
<ellipse cx="97.9005" cy="43.3324" rx="4.40159" ry="7.04254" fill="#111111"/>
<ellipse cx="97.9005" cy="43.3324" rx="4.40159" ry="7.04254" fill="url(#paint0_linear_1_1076)"/>
<circle cx="95.6996" cy="44.7483" r="1.32048" fill="white"/>
<ellipse cx="75.0122" cy="43.3324" rx="4.40159" ry="7.04254" fill="#111111"/>
<ellipse cx="75.0122" cy="43.3324" rx="4.40159" ry="7.04254" fill="url(#paint1_linear_1_1076)"/>
<circle cx="72.8114" cy="44.7483" r="1.32048" fill="white"/>
<ellipse cx="86.0162" cy="58.7379" rx="18.9268" ry="13.6449" fill="#FF9494"/>
<circle cx="93.0586" cy="58.7379" r="2.20079" fill="#F66464" stroke="#F76464" stroke-width="3.52127"/>
<circle cx="78.9736" cy="58.8252" r="2.20079" fill="#F66464" stroke="#F76464" stroke-width="3.52127"/>
<circle cx="131.79" cy="78.7446" r="12.3244" fill="url(#paint2_linear_1_1076)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M119.524 77.5381C123.317 71.8943 129.761 68.1808 137.072 68.1808C137.447 68.1808 137.82 68.1905 138.19 68.2098C136.324 67.0742 134.134 66.4201 131.79 66.4201C125.391 66.4201 120.13 71.2977 119.524 77.5381Z" fill="#FFE6E6"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M127.829 90.1887C135.851 90.1887 142.354 83.6855 142.354 75.6635C142.354 74.2053 142.139 72.7973 141.739 71.4695C143.233 73.5084 144.114 76.0235 144.114 78.7446C144.114 85.5512 138.597 91.069 131.79 91.069C130.156 91.069 128.597 90.7512 127.171 90.1741C127.389 90.1838 127.608 90.1887 127.829 90.1887Z" fill="#F87A7A"/>
<path d="M41.2759 81.4201L18 121.765H180.931L157.655 81.4201H41.2759Z" fill="url(#paint3_linear_1_1076)"/>
<path d="M18 126.42V121.765H180.931V126.42H18Z" fill="#FFC887"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M58.4655 86.4201C59.7988 85.4201 63.8655 83.4201 69.4655 83.4201C75.0655 83.4201 79.7988 85.4201 81.4655 86.4201V106.92L66.4655 102.42L51.4655 106.92L58.4655 86.4201Z" fill="url(#paint4_linear_1_1076)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M104.466 86.4201C103.132 85.4201 99.0655 83.4201 93.4655 83.4201C87.8655 83.4201 83.1322 85.4201 81.4655 86.4201V106.92L96.4655 102.42L111.466 106.92L104.466 86.4201Z" fill="url(#paint5_linear_1_1076)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M81.4766 106.92C82.9957 104.944 85.1806 103.303 87.8117 102.162C90.4428 101.021 93.4274 100.42 96.4655 100.42C99.5037 100.42 102.488 101.021 105.119 102.162C107.75 103.303 109.935 104.944 111.454 106.92L111.454 106.92H111.466V111.42H111.454L111.454 111.42C109.935 109.444 107.75 107.803 105.119 106.662C102.488 105.521 99.5037 104.92 96.4655 104.92C93.4274 104.92 90.4428 105.521 87.8117 106.662C85.1806 107.803 82.9957 109.444 81.4766 111.42H81.4655V106.92H81.4766Z" fill="#A0CBFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M51.4766 106.92C52.9957 104.944 55.1806 103.303 57.8117 102.162C60.4428 101.021 63.4274 100.42 66.4655 100.42C69.5037 100.42 72.4883 101.021 75.1194 102.162C77.7505 103.303 79.9354 104.944 81.4544 106.92L81.4544 106.92H81.4655V111.42H81.4544L81.4544 111.42C79.9354 109.444 77.7505 107.803 75.1194 106.662C72.4883 105.521 69.5037 104.92 66.4655 104.92C63.4274 104.92 60.4428 105.521 57.8117 106.662C55.1806 107.803 52.9957 109.444 51.4766 111.42H51.4655V106.92H51.4766Z" fill="#B7D8FF"/>
<path d="M65.4655 97.1455C66.0527 97.7367 67.9919 98.6108 71.0509 97.3768C74.8746 95.8342 78.1909 97.8962 78.329 98.8866" stroke="#A2ABFF" stroke-linecap="round"/>
<ellipse cx="48.8719" cy="60.5326" rx="2.75663" ry="2.12049" transform="rotate(-25.9309 48.8719 60.5326)" fill="#FFE3AE"/>
<rect x="46.3928" y="61.738" width="5.51326" height="32.2314" transform="rotate(-25.9309 46.3928 61.738)" fill="#538EFF"/>
<rect x="46.3928" y="61.738" width="4.24097" height="32.2314" transform="rotate(-25.9309 46.3928 61.738)" fill="#7DA8FC"/>
<rect x="46.3928" y="61.738" width="1.69639" height="32.2314" transform="rotate(-25.9309 46.3928 61.738)" fill="#AEC9FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M66.1799 95.2159C66.2217 95.6105 65.7468 95.8413 65.4624 95.5644L63.0739 93.2394L63.0738 93.2394L60.4891 90.7235L61.0284 90.4613C61.0297 90.4607 61.031 90.4601 61.0322 90.4594L64.9006 88.5785C64.9019 88.5779 64.9032 88.5772 64.9045 88.5766L65.4437 88.3144L65.5074 88.9118C65.5075 88.9128 65.5076 88.9137 65.5077 88.9146L65.5077 88.9149L66.1799 95.2155L66.1799 95.2159Z" fill="url(#paint6_linear_1_1076)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M64.3661 94.4972L65.4624 95.5643C65.7468 95.8412 66.2217 95.6105 66.1799 95.2159L66.1799 95.2154L66.0176 93.6942L64.3661 94.4972Z" fill="#333333"/>
<circle cx="54.79" cy="77.7446" r="12.3244" fill="url(#paint7_linear_1_1076)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M42.5239 76.5381C46.317 70.8943 52.7607 67.1808 60.0718 67.1808C60.4468 67.1808 60.8195 67.1905 61.1897 67.2098C59.3243 66.0742 57.1336 65.4201 54.7901 65.4201C48.3905 65.4201 43.1302 70.2977 42.5239 76.5381Z" fill="#FFE6E6"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M50.8285 89.1887C58.8506 89.1887 65.3538 82.6855 65.3538 74.6635C65.3538 73.2053 65.1389 71.7973 64.7391 70.4695C66.2326 72.5084 67.1144 75.0235 67.1144 77.7446C67.1144 84.5512 61.5966 90.069 54.79 90.069C53.1564 90.069 51.5971 89.7512 50.1705 89.1741C50.3886 89.1838 50.608 89.1887 50.8285 89.1887Z" fill="#F87A7A"/>
<path d="M131.5 90.5L126.5 92V95L131.5 93.5V90.5Z" fill="#CECECE"/>
<path d="M126.5 92V94V95L124 92.5V89.5L126.5 92Z" fill="#F4F4F4"/>
<path d="M156 85.5H134.5L141 105H166L156 85.5Z" fill="#A6B4FF"/>
<path d="M166 108C167.2 106.8 166.5 105.5 166 105H141V108H166Z" fill="#D0D7FF"/>
<path d="M134.5 88V85.5L141 105V108L134.5 88Z" fill="#D9E8FF"/>
<path d="M143 101H160" stroke="#7884F3" stroke-linecap="round"/>
<path d="M142 97H157" stroke="#7884F3" stroke-linecap="round"/>
<ellipse cx="2" cy="1.53846" rx="2" ry="1.53846" transform="matrix(-0.768876 0.639398 0.639398 0.768876 114.991 85.1722)" fill="white"/>
<rect width="4" height="23.3846" transform="matrix(-0.768876 0.639398 0.639398 0.768876 115.974 86.3551)" fill="#BBFAEE"/>
<rect width="3.07692" height="23.3846" transform="matrix(-0.768876 0.639398 0.639398 0.768876 115.974 86.3551)" fill="#78EED9"/>
<rect width="1.23077" height="23.3846" transform="matrix(-0.768876 0.639398 0.639398 0.768876 115.974 86.3551)" fill="#5EE1BA"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M131.816 106.797L130.925 104.336L127.852 106.892L128.228 107.112C128.228 107.112 128.229 107.113 128.23 107.113L128.23 107.113L132.195 109.441L132.195 109.441C132.443 109.586 132.738 109.341 132.64 109.071L132.64 109.07L131.816 106.797Z" fill="#EDEDED"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M132.262 108.027L132.64 109.07L132.64 109.071C132.738 109.341 132.443 109.586 132.195 109.441L132.195 109.441L131.237 108.879L132.262 108.027Z" fill="#333333"/>
<path d="M126.5 92L124 89.5L129 88L131.5 90.5L126.5 92Z" fill="#E4E4E4"/>
<defs>
<linearGradient id="paint0_linear_1_1076" x1="94.477" y1="35.7868" x2="100.637" y2="50.7582" gradientUnits="userSpaceOnUse">
<stop stop-color="#9E9E9E"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint1_linear_1_1076" x1="71.5887" y1="35.7868" x2="77.7484" y2="50.7582" gradientUnits="userSpaceOnUse">
<stop stop-color="#9E9E9E"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint2_linear_1_1076" x1="126.068" y1="69.0611" x2="137.072" y2="87.9879" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFC8C8"/>
<stop offset="1" stop-color="#FF8686"/>
</linearGradient>
<linearGradient id="paint3_linear_1_1076" x1="45.5431" y1="77.9287" x2="153.388" y2="115.17" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFEAA0"/>
<stop offset="1" stop-color="#FFD5A3"/>
</linearGradient>
<linearGradient id="paint4_linear_1_1076" x1="52.4655" y1="94.9201" x2="83.9655" y2="94.9201" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#CBE6FF"/>
</linearGradient>
<linearGradient id="paint5_linear_1_1076" x1="79.4655" y1="95.9201" x2="109.466" y2="96.9201" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="#D0E8FF"/>
</linearGradient>
<linearGradient id="paint6_linear_1_1076" x1="60.4656" y1="91.4201" x2="68.4656" y2="93.4201" gradientUnits="userSpaceOnUse">
<stop stop-color="#B3C4FF"/>
<stop offset="1" stop-color="#CBD7FF" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint7_linear_1_1076" x1="49.0679" y1="68.0611" x2="60.0719" y2="86.9879" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFC8C8"/>
<stop offset="1" stop-color="#FF8686"/>
</linearGradient>
</defs>
</svg>

    `;
    static clock = `
<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_324_19674)">
<path d="M4.00013 7.33329C5.84108 7.33329 7.33346 5.84091 7.33346 3.99996C7.33346 2.15901 5.84108 0.666626 4.00013 0.666626C2.15918 0.666626 0.666798 2.15901 0.666798 3.99996C0.666798 5.84091 2.15918 7.33329 4.00013 7.33329Z" stroke="#B7B7B7" stroke-width="0.67" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 2V4L5.33333 4.66667" stroke="#B7B7B7" stroke-width="0.67" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_324_19674">
<rect width="8" height="8" fill="white"/>
</clipPath>
</defs>
</svg>
`;
    static location = `
<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_324_3658)">
<path d="M7 3.33337C7 5.66671 4 7.66671 4 7.66671C4 7.66671 1 5.66671 1 3.33337C1 2.53772 1.31607 1.77466 1.87868 1.21205C2.44129 0.649445 3.20435 0.333374 4 0.333374C4.79565 0.333374 5.55871 0.649445 6.12132 1.21205C6.68393 1.77466 7 2.53772 7 3.33337Z" stroke="#B7B7B7" stroke-width="0.666667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 4.33337C4.55228 4.33337 5 3.88566 5 3.33337C5 2.78109 4.55228 2.33337 4 2.33337C3.44772 2.33337 3 2.78109 3 3.33337C3 3.88566 3.44772 4.33337 4 4.33337Z" stroke="#B7B7B7" stroke-width="0.666667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_324_3658">
<rect width="8" height="8" fill="white"/>
</clipPath>
</defs>
</svg>
`;
    static pinToTop = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_374_6747)">
<path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#8FB5FB" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3333 5.33333L7.99998 1.99999L4.66665 5.33333" stroke="#8FB5FB" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 2L8 10" stroke="#8FB5FB" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_374_6747">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
`;
    static unPinToTop = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_374_17418)">
<path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#8FB5FB" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.66669 6.66669L8.00002 10L11.3334 6.66669" stroke="#8FB5FB" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00003 10L8.00003 2" stroke="#8FB5FB" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_374_17418">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

    `;
    static deleteAgenda = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_374_17412)">
<path d="M2 4H3.33333H14" stroke="#FE2741" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.33334 3.99999V2.66666C5.33334 2.31304 5.47382 1.9739 5.72387 1.72385C5.97392 1.4738 6.31305 1.33333 6.66668 1.33333H9.33334C9.68697 1.33333 10.0261 1.4738 10.2762 1.72385C10.5262 1.9739 10.6667 2.31304 10.6667 2.66666V3.99999M12.6667 3.99999V13.3333C12.6667 13.6869 12.5262 14.0261 12.2762 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66668C4.31305 14.6667 3.97392 14.5262 3.72387 14.2761C3.47382 14.0261 3.33334 13.6869 3.33334 13.3333V3.99999H12.6667Z" stroke="#FE2741" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66666 7.33333V11.3333" stroke="#FE2741" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.33334 7.33333V11.3333" stroke="#FE2741" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_374_17412">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

    `;
    static exam = `
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8" cy="8.5" r="8" fill="#FF6275"/>
<path d="M12 6.10001L7.19999 10.9L4.79999 8.50001" stroke="white" stroke-width="0.893333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `
    static notExam = `
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="8.5" cy="8.5" r="7.66667" stroke="#B7B7B7" stroke-width="0.666667"/>
</svg>
    `;
    static addCountdown = `
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 1.17645V7.17645" stroke="white" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 4.17642H1" stroke="white" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `;

    // HomePage
    static emptyClassroomIcon = `
<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_223_8348)">
<path d="M13 11C13 8.23858 15.2386 6 18 6H26C28.7614 6 31 8.23858 31 11V37H13V11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M31 37V22H32C34.7614 22 37 24.2386 37 27V34C37 35.6569 35.6569 37 34 37H31Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 37V17C10.2386 17 8 19.2386 8 22V34C8 35.6569 9.34315 37 11 37H13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.2778 15.7778L23.8889 15.7778" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M17.2778 22.8889L23.8889 22.8889" stroke="white" stroke-width="2" stroke-linecap="round"/>
</g>
<defs>
<clipPath id="clip0_223_8348">
<rect width="44" height="44" fill="white"/>
</clipPath>
</defs>
</svg>
    `;
    static scoreIcon = `
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_223_8355)">
<path d="M12 10C12 8.34315 13.3431 7 15 7H29C30.6569 7 32 8.34315 32 10V18C32 23.5228 27.5228 28 22 28C16.4772 28 12 23.5228 12 18V10Z" stroke="white" stroke-width="2"/>
<path d="M22 27V33" stroke="white" stroke-width="2"/>
<path d="M11.2857 13H7C7.35714 16 8.85714 22 12 22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.7143 13H37C36.6429 16 35.1429 22 32 22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<mask id="path-5-inside-1_223_8355" fill="white">
<path d="M12 35C12 33.3431 13.3431 32 15 32H29C30.6569 32 32 33.3431 32 35V37C32 37.5523 31.5523 38 31 38H13C12.4477 38 12 37.5523 12 37V35Z"/>
</mask>
<path d="M12 35C12 33.3431 13.3431 32 15 32H29C30.6569 32 32 33.3431 32 35V37C32 37.5523 31.5523 38 31 38H13C12.4477 38 12 37.5523 12 37V35Z" stroke="white" stroke-width="4" mask="url(#path-5-inside-1_223_8355)"/>
</g>
<defs>
<clipPath id="clip0_223_8355">
<rect width="44" height="44" fill="white"/>
</clipPath>
</defs>
</svg>
    `;
    static courseIcon = `
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_223_8362)">
<rect x="7" y="8.77783" width="30" height="28.2222" rx="5" stroke="white" stroke-width="2"/>
<path d="M7.77783 17.5555H36.2223" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M14.8889 6V8.66667" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M29.1111 6V8.66667" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M18.4445 25.6445L21.9461 29.1112L27.3333 23.7778" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_223_8362">
<rect width="44" height="44" fill="white"/>
</clipPath>
</defs>
</svg>
    `;
    static emptyScoreIcon = `
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_236_108)">
        <rect x="7" y="8.77783" width="30" height="28.2222" rx="5" stroke="white" stroke-width="2"/>
        <path d="M7.7778 17.5555H36.2222" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <path d="M14.8889 6V8.66667" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <path d="M29.1111 6V8.66667" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <path d="M18.4445 25.6445L21.9461 29.1112L27.3333 23.7778" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_236_108">
        <rect width="44" height="44" fill="white"/>
        </clipPath>
        </defs>
    </svg>
    `;

    // addBoard
    static closeAddBoard = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_74_9876)">
<path d="M18 6L6 18" stroke="#B7B7B7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 6L18 18" stroke="#B7B7B7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_74_9876">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
    `;

    // TabNavigation
    static activateHome = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.03961 14.1849L15.0849 6.04776C15.8344 5.44064 16.9104 5.45494 17.6435 6.08176L27.4796 14.492C28.3442 15.2312 27.8214 16.6471 26.6839 16.6471C26.0077 16.6471 25.4595 17.1953 25.4595 17.8715V25C25.4595 26.1046 24.564 27 23.4595 27H9.2973C8.19273 27 7.2973 26.1046 7.2973 25V18.0326C7.2973 17.2674 6.67696 16.6471 5.91174 16.6471C4.60622 16.6471 4.02516 15.0066 5.03961 14.1849Z" fill="url(#paint0_linear_161_43419)"/>
<path d="M13.0151 23.1177H20.0151" stroke="white" stroke-opacity="0.65" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_161_43419" x1="16" y1="5" x2="37.7412" y2="30.3647" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF6275"/>
<stop offset="1" stop-color="white"/>
</linearGradient>
</defs>
</svg>
    `;
    static inactivateHome = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.03961 14.1849L15.0849 6.04776C15.8344 5.44064 16.9104 5.45494 17.6435 6.08176L27.4796 14.492C28.3442 15.2312 27.8214 16.6471 26.6839 16.6471C26.0077 16.6471 25.4595 17.1953 25.4595 17.8715V25C25.4595 26.1046 24.564 27 23.4595 27H9.2973C8.19273 27 7.2973 26.1046 7.2973 25V18.0326C7.2973 17.2674 6.67696 16.6471 5.91174 16.6471C4.60622 16.6471 4.02516 15.0066 5.03961 14.1849Z" stroke="#B7B7B7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="19" cy="17" r="2.25" stroke="#B7B7B7" stroke-width="1.5"/>
</svg>
    `;
    static activateInfo = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="16" cy="16" r="11" fill="url(#paint0_linear_161_43796)"/>
<path opacity="0.8" d="M11.1111 11.1111V14.1666M18.4444 11.1111V14.1666" stroke="white" stroke-opacity="0.85" stroke-width="1.5" stroke-linecap="round"/>
<path d="M16.5284 17.2222H13.027C12.6857 17.2222 12.4334 17.5601 12.5479 17.8816C12.839 18.6986 13.3646 19.6667 14.7777 19.6667C16.1908 19.6667 16.7164 18.6986 17.0075 17.8816C17.122 17.5601 16.8697 17.2222 16.5284 17.2222Z" fill="white" fill-opacity="0.65"/>
<defs>
<linearGradient id="paint0_linear_161_43796" x1="16" y1="5" x2="43.5" y2="38.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF6275"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>
    `;
    static inactivateInfo = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.3333 12.3333V15.3889M19.6666 12.3333V15.3889" stroke="#C4C4C4" stroke-width="1.5" stroke-linecap="round"/>
<circle cx="16" cy="16" r="10.25" stroke="#C4C4C4" stroke-width="1.5"/>
</svg>
    `;

    // InfoPage
    static more = `
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="38" height="38" fill="url(#pattern0_19_22352)"/>
<defs>
<pattern id="pattern0_19_22352" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_19_22352" transform="scale(0.005)"/>
</pattern>
<image id="image0_19_22352" width="200" height="200" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
    `;
    static infoArrow = `
    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_19_22374)">
<path d="M3 9.5L7 5.5L3 1.5" stroke="#B7B7B7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_19_22374">
<rect width="10" height="10" fill="white" transform="translate(0 10.5) rotate(-90)"/>
</clipPath>
</defs>
</svg>
    `;
    static blackBackArrow = `
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0001 16.4375L8.95459 17.5L1.28098 9.70137C0.898041 9.31219 0.898042 8.68781 1.28098 8.29863L8.95459 0.5L10.0001 1.5625L2.68179 9L10.0001 16.4375Z" fill="#3A3A3A"/>
</svg>
    `;

    // EmptyClassroomPage
    static noClassroomAvailable = `
    <svg width="248" height="176" viewBox="0 0 248 176" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="35.3564" y="137.375" width="2.83528" height="9.45095" rx="1.41764" transform="rotate(-30 35.3564 137.375)" fill="#FFC75A"/>
<rect x="43.8623" y="152.108" width="2.83528" height="9.45095" rx="1.41764" transform="rotate(-30 43.8623 152.108)" fill="#FFC75A"/>
<rect x="29.5981" y="150.083" width="2.83528" height="9.45095" rx="1.41764" transform="rotate(-90 29.5981 150.083)" fill="#FFC75A"/>
<rect width="2.74583" height="9.15276" rx="1.37291" transform="matrix(-0.866025 -0.5 -0.5 0.866025 51.5264 137.333)" fill="#FFC75A"/>
<rect x="39.7109" y="151.231" width="2.83528" height="9.45095" rx="1.41764" transform="rotate(30 39.7109 151.231)" fill="#FFC75A"/>
<rect width="2.74583" height="9.15276" rx="1.37291" transform="matrix(2.58096e-08 1 1 -2.58096e-08 47.5918 146.371)" fill="#FFC75A"/>
<circle cx="235.862" cy="57.1176" r="11.4235" fill="#FFCBF7"/>
<circle cx="8.06367" cy="71.2291" r="8.06367" fill="#FFDABF"/>
<circle cx="232.503" cy="161.273" r="8.06367" fill="#D7F8CF"/>
<circle cx="90.7163" cy="51.7419" r="11.4235" fill="#B4C0FF"/>
<rect x="165.828" width="3.1546" height="10.5153" rx="1.5773" fill="#A1CDF7"/>
<rect x="165.828" y="18.9275" width="3.1546" height="10.5153" rx="1.5773" fill="#A1CDF7"/>
<rect x="153.209" y="9.0415" width="3.1546" height="10.5153" rx="1.5773" transform="rotate(-60 153.209 9.0415)" fill="#A1CDF7"/>
<rect width="3.05507" height="10.1836" rx="1.52753" transform="matrix(-0.5 -0.866025 -0.866025 0.5 181.433 8.95459)" fill="#A1CDF7"/>
<rect x="162.316" y="15.7729" width="3.1546" height="10.5153" rx="1.5773" transform="rotate(60 162.316 15.7729)" fill="#A1CDF7"/>
<rect width="3.05507" height="10.1836" rx="1.52753" transform="matrix(-0.5 0.866025 0.866025 0.5 172.613 15.4746)" fill="#A1CDF7"/>
<path d="M224.208 79.2879C217.524 65.92 204.156 53.2946 198.214 48.8386C148.901 105.875 162.814 157.268 175.934 175.835L205.396 167.665C220.992 153.555 225.693 114.193 224.208 79.2879Z" fill="url(#paint0_linear_19_24254)"/>
<path d="M119.491 34.728C151.426 29.5294 169.993 31.7574 198.214 48.8387C165.537 94.1413 175.934 175.835 175.934 175.835L74.9316 165.437C74.9316 165.437 43.7396 80.0307 119.491 34.728Z" fill="url(#paint1_linear_19_24254)"/>
<ellipse cx="113.503" cy="75.412" rx="5.10547" ry="8.02288" transform="rotate(17.5214 113.503 75.412)" fill="url(#paint2_linear_19_24254)"/>
<circle cx="112.075" cy="72.6666" r="1.45871" transform="rotate(17.5214 112.075 72.6666)" fill="white"/>
<rect x="119.145" y="90.0441" width="14.7834" height="8.06367" transform="rotate(6.03897 119.145 90.0441)" fill="#A7DAFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M127.469 99.0336L122.06 90.3528L123.05 90.4575L128.458 99.1383L127.469 99.0336Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M127.469 99.0336L122.06 90.3528L123.05 90.4575L128.458 99.1383L127.469 99.0336Z" fill="#E3F3FF"/>
<rect x="119.145" y="90.0441" width="14.7834" height="0.250785" transform="rotate(6.03897 119.145 90.0441)" fill="#68BEFC"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M118.997 91.4405L119.085 90.6089L124.112 98.6778L123.463 98.6092L118.997 91.4405Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M118.997 91.4405L119.085 90.6089L124.112 98.6778L123.463 98.6092L118.997 91.4405Z" fill="white"/>
<rect x="119.145" y="90.0441" width="0.329827" height="8.06367" transform="rotate(6.03897 119.145 90.0441)" fill="#68BEFC"/>
<rect x="126.188" y="90.7897" width="1.08085" height="8.06367" transform="rotate(6.03897 126.188 90.7897)" fill="url(#paint3_linear_19_24254)"/>
<rect x="126.188" y="90.7897" width="1.08085" height="0.151821" transform="rotate(6.03897 126.188 90.7897)" fill="#474747"/>
<rect x="127.098" y="90.8854" width="0.165134" height="8.06367" transform="rotate(6.03897 127.098 90.8854)" fill="#474747"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M127.554 170.854L107.598 168.8L109.958 146.49L129.908 148.6L127.554 170.854Z" fill="#A7DAFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M127.554 170.854L107.598 168.8L109.958 146.49L129.908 148.6L127.554 170.854Z" fill="#A7DAFF"/>
<circle cx="142.487" cy="98.1079" r="10.7516" fill="url(#paint4_linear_19_24254)"/>
<ellipse cx="148.465" cy="80.8999" rx="5.88319" ry="9.24501" transform="rotate(17.5214 148.465 80.8999)" fill="url(#paint5_linear_19_24254)"/>
<circle cx="146.82" cy="77.7364" r="1.68091" transform="rotate(17.5214 146.82 77.7364)" fill="white"/>
<path d="M95.1211 100.796C94.6908 105.035 95.5454 114.733 102.407 119.604M102.407 119.604C101.758 120.864 100.644 123.955 101.378 126.245M102.407 119.604C103.086 121.069 104.956 124.215 106.999 125.076M102.407 119.604C103.395 119.077 106.015 118.259 108.589 119.202" stroke="#FFB775" stroke-width="2.68789" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M126.233 170.718L110.897 146.589L111.838 146.689L127.172 170.815L126.233 170.718Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M127.761 168.9L113.775 146.893L116.086 147.138L128.069 165.992L127.761 168.9Z" fill="#ECF7FF"/>
<path d="M154.412 113.562C152.608 117.423 146.905 125.313 138.517 125.98M138.517 125.98C138.429 127.394 137.801 130.619 135.998 132.209M138.517 125.98C137.183 126.89 133.965 128.633 131.77 128.325M138.517 125.98C137.939 125.021 136.108 122.976 133.414 122.467" stroke="#FFB775" stroke-width="2.68789" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M117.153 169.783L119.518 147.501L120.015 147.553L117.649 169.834L117.153 169.783Z" fill="#6AC0FF"/>
<rect width="0.782063" height="6.80591" transform="matrix(-0.994412 -0.105573 -0.105573 0.994412 117.104 154.636)" fill="#B2B3B4"/>
<rect width="0.152273" height="6.80591" transform="matrix(-0.994412 -0.105573 -0.105573 0.994412 117.104 154.636)" fill="#767676"/>
<rect width="0.821834" height="7.02264" transform="matrix(-0.994412 -0.105573 -0.105573 0.994412 121.856 155.017)" fill="#B2B3B4"/>
<rect width="0.217222" height="7.02264" transform="matrix(-0.994412 -0.105573 -0.105573 0.994412 121.856 155.017)" fill="#767676"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M118.291 169.901L109.005 155.496L109.156 154.073L119.435 170.018L118.291 169.901Z" fill="white"/>
<path d="M43.6222 43.1356C44.1022 49.0375 48.7577 61.4216 63.5393 63.7424" stroke="#FFEBD9" stroke-width="2.68789" stroke-linecap="round"/>
<g clip-path="url(#clip0_19_24254)">
<path d="M29.6222 30.8862C29.6222 29.7419 29.6134 28.5977 29.6234 27.4534C29.65 24.5928 31.6686 22.281 34.5014 21.87C34.8513 21.8189 35.209 21.7978 35.5634 21.7978C37.8297 21.7911 40.096 21.7878 42.3622 21.7967C43.7498 21.8022 45.054 22.1044 46.1616 22.9964C47.4847 24.0618 48.2501 25.4282 48.3245 27.1424C48.4334 29.6064 48.3501 32.0726 48.3656 34.5389C48.3679 34.8944 48.3023 35.2465 48.1235 35.5665C47.7391 36.2519 47.0648 36.5296 46.2438 36.3363C45.5706 36.1775 45.034 35.452 45.0273 34.6433C45.0162 33.2991 45.0229 31.9549 45.0229 30.6107C45.0229 29.6664 45.0251 28.7221 45.0229 27.7778C45.0196 26.2159 43.9342 25.0994 42.3745 25.0905C40.0971 25.0772 37.8197 25.075 35.5423 25.0916C34.047 25.1027 32.9939 26.1837 32.9905 27.6801C32.985 29.8797 32.9894 32.0793 32.9872 34.2789C32.9872 34.4667 32.9839 34.6588 32.9505 34.8422C32.7772 35.782 32.0618 36.3663 31.1775 36.2997C30.2521 36.2308 29.64 35.572 29.6267 34.5855C29.61 33.3524 29.6222 32.1193 29.6222 30.8862Z" fill="#FFDB8E"/>
<path d="M25.0283 26.7526C22.3388 26.7526 20.1536 24.5663 20.1592 21.8801C20.1636 19.2728 22.4032 17.0632 25.0383 17.0665C27.679 17.0699 29.8497 19.2706 29.8597 21.9235C29.8708 24.7241 27.3902 26.8704 25.0283 26.7526ZM27.098 21.9312C27.108 20.7781 26.1915 19.8227 25.0672 19.8127C23.9052 19.8016 22.9687 20.7126 22.9409 21.879C22.9143 23.0022 23.8597 23.9653 25.0017 23.9787C26.1526 23.9931 27.0891 23.0788 27.098 21.9312Z" fill="#FFDB8E"/>
<path d="M43.7992 15.9136C43.8858 18.6076 41.4074 20.8317 38.8945 20.7783C36.7193 20.7328 34.0875 18.8465 34.112 15.857C34.1331 13.2485 36.4038 11.0367 39.0167 11.0656C41.6607 11.0956 43.8103 13.2752 43.7992 15.9136ZM36.9171 15.9147C36.9193 17.0768 37.8236 17.9744 38.9922 17.9766C40.1254 17.9788 41.0841 17.0234 41.0785 15.8981C41.073 14.7772 40.1087 13.8151 38.9911 13.814C37.8158 13.814 36.9137 14.7272 36.9171 15.9147Z" fill="#FFDB8E"/>
<path d="M38.9373 10.0178C36.7288 10.0178 34.5192 10.0234 32.3107 10.0145C31.1331 10.01 30.3543 8.95022 30.6987 7.84819C30.8954 7.22274 31.4864 6.7806 32.204 6.72394C32.2596 6.7195 32.3151 6.7195 32.3707 6.7195C36.7554 6.7195 41.1391 6.71616 45.5239 6.72172C46.4837 6.72283 47.2114 7.33272 47.3092 8.18146C47.4025 8.99354 46.8215 9.79341 45.9927 9.97448C45.8105 10.0145 45.6183 10.0156 45.4306 10.0167C43.2665 10.0189 41.1025 10.0189 38.9373 10.0178Z" fill="#FFDB8E"/>
<path d="M38.9516 29.593C40.007 29.593 41.0612 29.5897 42.1166 29.5941C42.8509 29.5974 43.4753 29.8096 43.8174 30.5306C44.3318 31.6138 43.5597 32.8658 42.361 32.8835C41.8833 32.8902 41.4056 32.8991 40.929 32.8802C40.658 32.8702 40.5869 32.9724 40.5902 33.229C40.6024 34.1389 40.598 35.0498 40.5935 35.9608C40.588 36.9328 39.9403 37.6049 38.9894 37.6394C38.1317 37.6694 37.4263 37.0106 37.3463 36.0952C37.2652 35.1642 37.3174 34.2311 37.3163 33.299C37.3163 32.9846 37.2275 32.8613 36.9008 32.8791C36.4465 32.9035 35.991 32.8913 35.5355 32.8824C34.6901 32.8658 34.008 32.1925 33.9591 31.336C33.9103 30.4928 34.4968 29.7619 35.3256 29.6419C35.5333 29.6119 35.7455 29.5963 35.9555 29.5952C36.9531 29.5897 37.9529 29.593 38.9516 29.593Z" fill="#FFDB8E"/>
<path d="M37.197 29.0135C36.275 28.999 35.6095 28.3158 35.6206 27.3971C35.6317 26.5117 36.3249 25.8518 37.2437 25.854C38.0702 25.8551 38.7978 26.605 38.7712 27.4271C38.7434 28.2825 38.0046 29.0268 37.197 29.0135Z" fill="#FFDB8E"/>
<path d="M42.5908 27.4027C42.5886 28.2692 41.8642 29.0135 41.0199 29.0146C40.1223 29.0168 39.4358 28.3059 39.4524 27.3916C39.468 26.5395 40.189 25.8463 41.0522 25.8541C41.9098 25.8618 42.5919 26.5484 42.5908 27.4027Z" fill="#FFDB8E"/>
</g>
<defs>
<linearGradient id="paint0_linear_19_24254" x1="184.792" y1="57.7894" x2="211.671" y2="174.041" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFE8B5"/>
<stop offset="1" stop-color="#FFD780"/>
</linearGradient>
<linearGradient id="paint1_linear_19_24254" x1="147.191" y1="96.7639" x2="174.741" y2="178.073" gradientUnits="userSpaceOnUse">
<stop stop-color="#FCF4CD"/>
<stop offset="1" stop-color="#FFE2A9"/>
</linearGradient>
<linearGradient id="paint2_linear_19_24254" x1="112.044" y1="67.3891" x2="113.503" y2="83.4348" gradientUnits="userSpaceOnUse">
<stop stop-color="#878787"/>
<stop offset="1"/>
</linearGradient>
<linearGradient id="paint3_linear_19_24254" x1="125.297" y1="93.5131" x2="127.585" y2="95.974" gradientUnits="userSpaceOnUse">
<stop stop-color="#929292"/>
<stop offset="1" stop-color="#666666"/>
</linearGradient>
<linearGradient id="paint4_linear_19_24254" x1="129.719" y1="93.4041" x2="141.463" y2="96.06" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFD2B9"/>
<stop offset="1" stop-color="#FCF2C9" stop-opacity="0.82"/>
</linearGradient>
<linearGradient id="paint5_linear_19_24254" x1="146.784" y1="71.6549" x2="148.465" y2="90.1449" gradientUnits="userSpaceOnUse">
<stop stop-color="#878787"/>
<stop offset="1"/>
</linearGradient>
<clipPath id="clip0_19_24254">
<rect width="28.2228" height="30.9202" fill="white" transform="translate(20.1592 6.71973)"/>
</clipPath>
</defs>
</svg>
    `;
}
