import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "./home/homePage.tsx";
import InfoPage from "./info/infoPage.tsx";
import {useAppSelector} from "../app/hooks.ts";
import {selectBottomTabVisibility} from "../app/slice/globalSlice.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../basic/XMLResources.ts";
import {Text} from "react-native";
import {FontColor, FontSize} from "../config/globalStyleSheetConfig.ts";

const TabNavigation = () => {
    const tabVisibility = useAppSelector(selectBottomTabVisibility);

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            detachInactiveScreens={false}
            initialRouteName={'homePage'}
            screenOptions={{
                tabBarStyle: {
                    display: tabVisibility ? 'flex' : 'none',
                }
            }}
        >
            <Tab.Screen name={'homePage'} component={HomePage} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => {
                    const xml = focused ? XMLResources.activateHome : XMLResources.inactivateHome;
                    return (
                        <SvgXml xml={xml} width={32} height={32}/>
                    )
                },
                tabBarLabel: ({color}) => {
                    return (
                        <Text
                            style={{
                                fontSize: FontSize.s,
                                fontWeight: '500',
                                color: color,
                                transform: [{translateY: -3}]
                            }}
                        >首页</Text>
                    )
                },
                tabBarActiveTintColor: FontColor.primary,
                tabBarInactiveTintColor: FontColor.grey,
            }}/>
            <Tab.Screen name={'infoPage'} component={InfoPage} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => {
                    const xml = focused ? XMLResources.activateInfo : XMLResources.inactivateInfo;
                    return (
                        <SvgXml xml={xml} width={32} height={32}/>
                    )
                },
                tabBarLabel: ({color}) => {
                    return (
                        <Text
                            style={{
                                fontSize: FontSize.s,
                                fontWeight: '500',
                                color: color,
                                transform: [{translateY: -3}]
                            }}
                        >我的</Text>
                    )
                },
                tabBarActiveTintColor: FontColor.primary,
                tabBarInactiveTintColor: FontColor.grey,
            }}/>
        </Tab.Navigator>
    )
}

export default TabNavigation;