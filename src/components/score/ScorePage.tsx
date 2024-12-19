import {Animated, Pressable, RefreshControl, StyleSheet, Text, ToastAndroid, View} from "react-native";
import {BackgroundColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import React, {useState} from "react";
import {NavigationProps} from "../home/homePage.tsx";
import {MinorScore, SingleScore} from "./SingleScore.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
    initMinorScoreList,
    initScoreList,
    selectAverageScore,
    selectClassRank,
    selectGpa,
    selectMajorRank,
    selectMinorCredit,
    selectMinorScoreList,
    selectMinorTotalCredit,
    selectScoreList, setMinorScoreOverview,
    setScoreOverview
} from "../../app/slice/scoreSlice.ts";
import {useQuery, useRealm} from "@realm/react";
import GongUser from "../../dao/object/User.ts";
import Resources, {ResourceMessage} from "../../basic/Resources.ts";
import {ResourceCode} from "../../utils/enum.ts";
import ScalingNotAllowedText from "../global/ScalingNotAllowedText.tsx";
import ScrollView = Animated.ScrollView;

const ScorePage = ({navigation}: NavigationProps) => {
    const dispatch = useAppDispatch();

    const realm = useRealm();
    const user = useQuery<GongUser>('GongUser')[0];

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [listIndex, setListIndex] = useState<number>(0);

    const scoreList = useAppSelector(selectScoreList);
    const minorScoreList = useAppSelector(selectMinorScoreList);
    const averageScore = useAppSelector(selectAverageScore)
    const gpa = useAppSelector(selectGpa);
    const classRank = useAppSelector(selectClassRank);
    const majorRank = useAppSelector(selectMajorRank);
    const totalMinorCredit = useAppSelector(selectMinorTotalCredit)
    const minorCredit = useAppSelector(selectMinorCredit);

    const onRefresh = () => {
        setRefreshing(true);

        if(!user) {
            ToastAndroid.showWithGravity('暂未登录！', 1500, ToastAndroid.BOTTOM);
            setRefreshing(false);
            return;
        }

        const getData = async () => {
            let msg: ResourceMessage = await Resources.getScoreOverview(user.token);
            if(msg.code === ResourceCode.Successful) {
                dispatch(setScoreOverview(msg.data));
                realm.write(() => {
                    user.scoreOverview = JSON.stringify(msg.data);
                })
            } else {
                ToastAndroid.showWithGravity('总成绩获取失败', 1500, ToastAndroid.BOTTOM);
                return;
            }

            msg = await Resources.getScore(user.token);
            if(msg.code === ResourceCode.Successful) {
                dispatch(initScoreList(msg.data));
                realm.write(() => {
                    user.scoreList = JSON.stringify(msg.data);
                })
            } else if(msg.code === ResourceCode.PermissionDenied) {
                ToastAndroid.showWithGravity('身份失效，请重新登录！', 1500, ToastAndroid.BOTTOM);
            } else {
                ToastAndroid.showWithGravity('成绩表单获取失败！', 1500, ToastAndroid.BOTTOM);
            }

            msg = await Resources.getMinorScore(user.token);
            if(msg.code === ResourceCode.Successful) {
                dispatch(initMinorScoreList(msg.data.scoreList));
                dispatch(setMinorScoreOverview(msg.data.totalCredit));
                realm.write(() => {
                    user.minorScoreList = JSON.stringify(msg.data.scoreList);
                    user.minorScoreOverview = JSON.stringify(msg.data.totalCredit);
                })
            } else if(msg.code === ResourceCode.PermissionDenied) {
                ToastAndroid.showWithGravity('身份失效，请重新登录！', 1500, ToastAndroid.BOTTOM);
            } else {
                ToastAndroid.showWithGravity('辅修表单获取失败！', 1500, ToastAndroid.BOTTOM);
            }
        }

        getData().then(() => setRefreshing(false));
    }

    const handleBack = () => {
        navigation.navigate('TabNavigation');
    }

    return (
        <ScrollView
            contentContainerStyle={{flex: 1}}
            nestedScrollEnabled={true}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[BackgroundColor.primary]}/>
            }
        >
            <View style={{height: '100%'}}>
                <View style={ss.titleBar}>
                    <Pressable onPress={handleBack} style={ss.backButton} hitSlop={{top: 5, bottom: 5, right: 10, left: 10}}>
                        <SvgXml xml={XMLResources.backArrow} width={10} height={18}/>
                    </Pressable>

                    <Text style={ss.titleText}>查成绩</Text>
                </View>
                <View style={ss.mainContainer}>
                    <View style={ss.totalContainer}>
                        {listIndex === 0 ? (
                            <>
                                <ScoreBox score={gpa} text={'平均绩点'}/>
                                <ScoreBox score={classRank} text={'班级排名'}/>
                                <ScoreBox score={majorRank} text={'年级排名'}/>
                                <ScoreBox score={averageScore} text={'平均成绩'}/>
                            </>
                        ) : (
                            <>
                                <ScoreBox score={totalMinorCredit} text={'总学分'}/>
                                <ScoreBox score={minorCredit} text={'已修学分'}/>
                            </>
                        )}
                    </View>
                    <View style={ss.buttonContainer}>
                        <Pressable hitSlop={{top: 5, bottom: 5, left: 20, right: 20}} onPress={() => {
                            if(listIndex !== 0) setListIndex(0)
                        }}>
                            <ScalingNotAllowedText style={{color: listIndex === 0 ? FontColor.dark : FontColor.grey}}>主修</ScalingNotAllowedText>
                        </Pressable>
                        <Pressable hitSlop={{top: 5, bottom: 5, left: 20, right: 20}}  onPress={() => {
                            if(listIndex !== 1) setListIndex(1)
                        }}>
                            <ScalingNotAllowedText style={{color: listIndex === 1 ? FontColor.dark : FontColor.grey}}>辅修</ScalingNotAllowedText>
                        </Pressable>
                    </View>
                    <ScrollView style={[ss.scoreListContainer, {display: listIndex === 0 ? 'flex' : 'none'}]} nestedScrollEnabled={true}>
                        {
                            scoreList.map((singleScore, index) => {
                                return <SingleScore scoreList={singleScore} term={singleScore.term} key={index}/>
                            })
                        }
                    </ScrollView>
                    <ScrollView style={[ss.scoreListContainer, {display: listIndex === 1 ? 'flex' : 'none'}]} nestedScrollEnabled={true}>
                        {
                            minorScoreList.map((singleScore, index) => {
                                return <MinorScore scoreList={singleScore} term={singleScore.term} key={index}/>
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
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
        borderRadius: 20,
    },

    buttonContainer: {
        width: '86%',
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
})

export default ScorePage;
