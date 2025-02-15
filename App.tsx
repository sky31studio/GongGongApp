import React, {createContext, useEffect} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/app/store.ts';
import HomeNavigation from './src/components/HomeNavigation.tsx';
import {useAppSelector} from './src/app/hooks.ts';
import {selectIsLogin} from './src/app/slice/globalSlice.ts';
import LoginNavigation from './src/components/LoginNavigation.tsx';
import {RealmProvider} from '@realm/react';
import GongUser from './src/dao/object/User.ts';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {BackgroundColor} from "./src/config/globalStyleSheetConfig.ts";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const {height: screenHeight} = Dimensions.get('window');

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const safeArea = () => <SafeArea/>

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Provider store={store}>
                    <RealmProvider schema={[GongUser]} deleteRealmIfMigrationNeeded={true}>
                        <View style={[styles.fullScreen]}>
                            <StatusBar translucent backgroundColor="#ff6275"/>
                            {safeArea()}
                        </View>
                    </RealmProvider>
                </Provider>
            </NavigationContainer>
        </SafeAreaProvider>

    );
}

export const CurrentTimeContext = createContext<{currentTime: Date}>({currentTime: new Date(Date.now())});

const SafeArea = () => {
    const isLogin = useAppSelector(selectIsLogin);

    const [currentTime, setCurrentTime] = React.useState<Date>(new Date(Date.now()));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date(Date.now()));
        }, 8000);

        return () => clearInterval(timer);
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <CurrentTimeContext.Provider value={{currentTime}}>
                {isLogin ? <HomeNavigation/> : <LoginNavigation/>}
            </CurrentTimeContext.Provider>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    fullScreen: {
        backgroundColor: BackgroundColor.primary,
        height: screenHeight,
        flex: 1,
    }
});

export default App;
