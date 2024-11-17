import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./home/homePage.tsx";
import InfoPage from "./info/InfoPage.tsx";
import {SvgXml} from "react-native-svg";
import XMLResources from "../basic/XMLResources.ts";
import {Pressable, Text, View} from "react-native";
import {BackgroundColor, FontColor, FontSize} from "../config/globalStyleSheetConfig.ts";
import React from "react";

const TabNavigation = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            detachInactiveScreens={false}
            tabBar={props => <MyTabBar {...props}/>}
        >
            <Tab.Screen name={'homePage'} component={Home} options={{
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
            }}/>
        </Tab.Navigator>
    )
}

const MyTabBar = ({state, descriptors, navigation}: any) => {
    return (
        <View style={{display: 'flex', flexDirection: 'row', height: 45, backgroundColor: BackgroundColor.mainLight, paddingHorizontal: '10%'}}>
            {state.routes.map((route: any, index: number) => {
                const {options} = descriptors[route.key];
                const focused = state.index === index;
                const color = state.index === index ? FontColor.primary : FontColor.grey;
                return (
                    <Pressable
                        key={index}
                        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                        onPress={() => navigation.navigate(route.name)}
                    >
                        {options.tabBarIcon({focused})}
                        {options.tabBarLabel({color})}
                    </Pressable>
                )
            })}
        </View>
    )
}

export default TabNavigation;
