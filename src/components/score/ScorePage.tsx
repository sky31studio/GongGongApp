import {Animated, Pressable, StyleSheet, Text, View} from "react-native";
import {BackgroundColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import React, {useEffect, useState} from "react";
import {NavigationProps} from "../home/homePage.tsx";
import Resources from "../../basic/Resources.ts";
import {dealScore, SingleScoreList} from "../../utils/scoreUtils.ts";
import SingleScore from "./SingleScore.tsx";
import ScrollView = Animated.ScrollView;


const ScorePage = ({navigation}: NavigationProps) => {
    const [scoreList, setScoreList] = useState<SingleScoreList[]>([]);
    const [averageScore, setAverageScore] = useState<string>('');
    const [gpa, setGpa] = useState<string>('');
    const [classRank, setClassRank] = useState<number>(0);
    const [majorRank, setMajorRank] = useState<number>(0);


    useEffect(() => {
        Resources.getScore().then((data) => {
            setScoreList(dealScore(data));
        })

        Resources.getRank().then((data) => {
            setAverageScore(data.average_score);
            setGpa(data.gpa);
            setClassRank(data.class_rank);
            setMajorRank(data.major_rank);
        })
    }, []);

    const renderList = scoreList.map((singleScore, index) => {
        return (
            <SingleScore key={index} scoreList={singleScore} term={singleScore.term}/>
        )
    })

    const handleBack = () => {
        navigation.navigate('HomePage');
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
                    <ScoreBox score={classRank.toString()} text={'班级排名'}/>
                    <ScoreBox score={majorRank.toString()} text={'年级排名'}/>
                    <ScoreBox score={averageScore} text={'平均成绩'}/>
                </View>
                <ScrollView style={ss.scoreListContainer}>
                    {renderList}
                </ScrollView>
            </View>
        </View>
    )
}

const ScoreBox = ({score, text}: { score: string, text: string }) => {

    return (
        <View style={ss.scoreBoxContainer}>
            <Text style={{color: FontColor.primary, fontSize: FontSize.xxl, fontWeight: '400'}}>{score}</Text>
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
