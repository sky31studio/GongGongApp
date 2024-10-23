import React from 'react';
import {Dimensions, SafeAreaView, StatusBar, StyleSheet, useColorScheme,} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';
import HomePage from "./src/components/home/homePage";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {Provider} from "react-redux";
import {store} from "./src/app/store.ts";
import {TablePage} from "./src/components/timeTable/tablePage.tsx";
import LoginPage from "./src/components/login/loginPage.tsx";

const { height: screenHeight } = Dimensions.get('window');

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
          <Provider store={store}>
              <SafeAreaView style={[backgroundStyle, styles.fullScreen]}>
                  <StatusBar translucent backgroundColor="#ff6275" />
                  <Stack.Navigator initialRouteName="LoginPage" screenOptions={{headerShown: false}}>
                      <Stack.Screen name="LoginPage" component={LoginPage} />
                      <Stack.Screen name="HomePage" component={HomePage} />
                      <Stack.Screen name="TablePage" component={TablePage} />
                  </Stack.Navigator>
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
