import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomePage from "./home/homePage.tsx";
import InfoPage from "./info/infoPage.tsx";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {getFirstDate, resetCurrentTime, selectBottomTabVisibility} from "../app/slice/globalSlice.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../basic/XMLResources.ts";
import {Text} from "react-native";
import {FontColor, FontSize} from "../config/globalStyleSheetConfig.ts";
import {useEffect} from "react";
import {getToken} from "../storage.ts";
import {fetchTable} from "../app/slice/scheduleSlice.ts";
import {fetchExamData} from "../app/slice/agendaSlice.ts";
import {getScoreOverview} from "../app/slice/scoreSlice.ts";

const TabNavigation = () => {
    const dispatch = useAppDispatch();
    const tabVisibility = useAppSelector(selectBottomTabVisibility);

    const Tab = createBottomTabNavigator();

    useEffect(() => {
        dispatch(fetchTable());
        dispatch(fetchExamData());
        dispatch(getFirstDate());
        dispatch(getScoreOverview());

        const intervalID = setInterval(() => {
            dispatch(resetCurrentTime());
        }, 8000);

        return () => {
            clearInterval(intervalID);
        }
    }, []);

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
