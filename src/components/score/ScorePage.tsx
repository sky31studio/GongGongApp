import {Animated, Pressable, StyleSheet, Text, View} from "react-native";
import {BackgroundColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import React, {useEffect, useState} from "react";
import {NavigationProps} from "../home/homePage.tsx";
import Resources from "../../basic/Resources.ts";
import {dealScore, SingleScoreList} from "../../utils/scoreUtils.ts";
import SingleScore from "./SingleScore.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {setBottomTabVisibility} from "../../app/slice/globalSlice.ts";
import {selectAverageScore, selectClassRank, selectGpa, selectMajorRank} from "../../app/slice/scoreSlice.ts";
import ScrollView = Animated.ScrollView;
import MyPager from "../timeTable/MyPager.tsx";


const ScorePage = ({navigation}: NavigationProps) => {
    const dispatch = useAppDispatch();
    const [scoreList, setScoreList] = useState<SingleScoreList[]>([]);
    const averageScore = useAppSelector(selectAverageScore)
    const gpa = useAppSelector(selectGpa);
    const classRank = useAppSelector(selectClassRank);
    const majorRank = useAppSelector(selectMajorRank);

    useEffect(() => {
        dispatch(setBottomTabVisibility(false));
        Resources.getScore().then((data) => {
            setScoreList(dealScore(data));
        })

    }, []);

    const handleBack = () => {
        navigation.navigate('Home');
        dispatch(setBottomTabVisibility(true));
    }
    return (
        <View style={{height: '100%'}}>
            <View style={ss.titleBar}>
                <Pressable onPress={handleBack} style={ss.backButton}>
                    <SvgXml xml={XMLResources.backArrow} width={10} height={18}/>
                </Pressable>

                <Text style={ss.titleText}>查成绩</Text>
            </View>
            <View style={ss.mainContainer}>
                <View style={ss.totalContainer}>
                    <ScoreBox score={gpa} text={'平均绩点'}/>
                    <ScoreBox score={classRank} text={'班级排名'}/>
                    <ScoreBox score={majorRank} text={'年级排名'}/>
                    <ScoreBox score={averageScore} text={'平均成绩'}/>
                </View>
                <ScrollView style={ss.scoreListContainer}>
                    {
                        scoreList.map((singleScore, index) => {
                            return <SingleScore scoreList={singleScore} term={singleScore.term} key={index}/>
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

/**
 * 总概中的单个内容框
 * @param score 对应分数
 * @param text 底部文字
 * @constructor
 */
const ScoreBox = ({score, text}: { score: number, text: string }) => {
    const currentScore = score === -1 ? '--' : score;

    return (
        <View style={ss.scoreBoxContainer}>
            <Text style={{color: FontColor.primary, fontSize: FontSize.xxl, fontWeight: '400'}}>{currentScore}</Text>
            <Text style={{color: FontColor.dark, fontSize: FontSize.xxs}}>{text}</Text>
        </View>
    )

}

const ss = StyleSheet.create({
    titleBar: {
        width: '100%',
        height: 140,
        paddingTop: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: BackgroundColor.primary,
        position: 'relative',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    backButton: {
        height: 24,
        width: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 50,
        left: 20,
    },

    titleText: {
        fontSize: FontSize.ll,
        color: FontColor.light,
        fontWeight: '600',
    },

    mainContainer: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: [{translateY: -20}],
    },

    totalContainer: {
        width: '86%',
        height: 70,
        borderRadius: 13,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    scoreBoxContainer: {
        width: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    scoreListContainer: {
        width: '86%',
        marginTop: 15,
        display: 'flex',
        flexDirection: 'column',
    }
})

export default ScorePage;
