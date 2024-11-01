import React, {useState} from 'react';
import {Dimensions, SafeAreaView, StatusBar, StyleSheet, useColorScheme,} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import {store} from "./src/app/store.ts";
import LoginPage from "./src/components/login/loginPage.tsx";
import TabNavigation from "./src/components/tabNavigation.tsx";
import {MMKV} from "react-native-mmkv";
import {userDirectory} from "./src/utils/globalUtils.ts";

const {height: screenHeight} = Dimensions.get('window');

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const handleLogin = (data: boolean) => {
        if (data) {
            const storage = new MMKV({
                id: 'user-storage',
                path: `${userDirectory}/mmkvStorage`
            })

            setIsLogin(data);
        }
    }

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <NavigationContainer>
            <Provider store={store}>
                <SafeAreaView style={[backgroundStyle, styles.fullScreen]}>
                    <StatusBar translucent backgroundColor="#ff6275"/>
                    {isLogin ? <TabNavigation/> : <LoginPage sendData={handleLogin}/>}
                </SafeAreaView>
            </Provider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        height: screenHeight,
        flex: 1,
    }
});

export default App;
