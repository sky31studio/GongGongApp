import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "./home/homePage.tsx";
import InfoPage from "./info/infoPage.tsx";

const TabNavigation = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator detachInactiveScreens={false} initialRouteName={'homePage'}>
            <Tab.Screen name={'homePage'} component={HomePage} options={{
                headerShown: false
            }}/>
            <Tab.Screen name={'infoPage'} component={InfoPage} options={{
                headerShown: false
            }}/>
        </Tab.Navigator>
    )
}

export default TabNavigation;