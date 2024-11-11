import React, {useEffect} from 'react';
import {Dimensions, SafeAreaView, StatusBar, StyleSheet, useColorScheme, View,} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import {store} from "./src/app/store.ts";
import {getToken} from "./src/storage.ts";
import HomeNavigation from "./src/components/HomeNavigation.tsx";
import {useAppDispatch, useAppSelector} from "./src/app/hooks.ts";
import {loginSuccessful, selectIsLogin} from "./src/app/slice/globalSlice.ts";
import LoginNavigation from "./src/components/LoginNavigation.tsx";

const {height: screenHeight} = Dimensions.get('window');

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const safeArea = () => <SafeArea/>

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <NavigationContainer>
            <Provider store={store}>
                <SafeAreaView style={[backgroundStyle, styles.fullScreen]}>
                    <StatusBar translucent backgroundColor="#ff6275"/>
                    {safeArea()}
                </SafeAreaView>
            </Provider>
        </NavigationContainer>
    );
}

const SafeArea = () => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(selectIsLogin);

    useEffect(() => {
        const checkIsLogin = async () => {
            if(getToken() !== '') {
                dispatch(loginSuccessful());
            }
        }

        checkIsLogin().then();
    }, []);

    return (
        <View style={{flex: 1}}>
            {isLogin ? <HomeNavigation/> : <LoginNavigation/>}
        </View>
    )
}


const styles = StyleSheet.create({
    fullScreen: {
        height: screenHeight,
        flex: 1,
    }
});

export default App;
