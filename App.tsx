import React, {createContext, useEffect, useLayoutEffect} from 'react';
import {Dimensions, SafeAreaView, StatusBar, StyleSheet, useColorScheme, View,} from 'react-native';
import {Colors,} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import {store} from "./src/app/store.ts";
import HomeNavigation from "./src/components/HomeNavigation.tsx";
import {useAppDispatch, useAppSelector} from "./src/app/hooks.ts";
import {loginSuccessful, selectIsLogin} from "./src/app/slice/globalSlice.ts";
import LoginNavigation from "./src/components/LoginNavigation.tsx";
import {RealmProvider, useQuery} from "@realm/react";
import GongUser from "./src/dao/object/User.ts";
import {configureReanimatedLogger, ReanimatedLogLevel,} from 'react-native-reanimated';

configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
});

const {height: screenHeight} = Dimensions.get('window');

function App(): React.JSX.Element {

    const isDarkMode = useColorScheme() === 'dark';

    const safeArea = () => <SafeArea/>

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <View style={{flex: 1}}>
            <NavigationContainer>
                <Provider store={store}>
                    <RealmProvider schema={[GongUser]}>
                        <SafeAreaView style={[backgroundStyle, styles.fullScreen]}>
                            <StatusBar translucent backgroundColor="#ff6275"/>
                            {safeArea()}
                        </SafeAreaView>
                    </RealmProvider>
                </Provider>
            </NavigationContainer>
        </View>

    );
}

export const CurrentTimeContext = createContext<{currentTime: Date}>({currentTime: new Date(Date.now())});

const SafeArea = () => {
    const user = useQuery<GongUser>('GongUser')[0];
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(selectIsLogin);

    const [currentTime, setCurrentTime] = React.useState<Date>(new Date(Date.now()));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date(Date.now()));
        }, 8000);

        return () => clearInterval(timer);
    }, []);

    // 使用useLayoutEffect防止登录界面一闪而过
    useLayoutEffect(() => {
        const checkIsLogin = async () => {
            console.log('check whether login');
            if(user) {
                dispatch(loginSuccessful());
                console.log('isLogin = true');
            }
        }

        checkIsLogin().then();
    }, []);

    return (
        <View style={{flex: 1}}>
            <CurrentTimeContext.Provider value={{currentTime}}>
                {isLogin ? <HomeNavigation/> : <LoginNavigation/>}
            </CurrentTimeContext.Provider>
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
