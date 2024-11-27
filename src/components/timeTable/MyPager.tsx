import PagerView from "react-native-pager-view";
import {StyleSheet, View} from "react-native";
import React from "react";
import Schedule from "./schedule.tsx";

const MyPager = ({currentWeek, sendCurrentWeek}: {currentWeek: number, sendCurrentWeek: any}) => {

    const weekData = Array.from({length: 21}, (_, index) => {
        return {
            week: index + 1,
        }
    });

    const handlePageSelected = (e: any) => {
        const index= e.nativeEvent.position;
        sendCurrentWeek(index + 1);
    }

    return (
        <PagerView
            style={{flex: 1}}
            initialPage={currentWeek - 1}
            onPageSelected={handlePageSelected}
            offscreenPageLimit={2}
        >
            {weekData.map((item, index) => {
               return (
                   <View key={index} style={{width: '100%', height: '100%'}}>
                       <Schedule week={item.week}></Schedule>
                   </View>
               )
            })}
        </PagerView>
    )
}

const ss = StyleSheet.create({
    tableWrapper: {
        flex: 1,
    },
})

export default MyPager;
