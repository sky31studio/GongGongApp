import {Animated, Pressable, RefreshControl, StyleSheet, Text, ToastAndroid, View} from "react-native";
import {BackgroundColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import React, {useState} from "react";
import {NavigationProps} from "../home/homePage.tsx";
import SingleScore from "./SingleScore.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
    initScoreList,
    selectAverageScore,
    selectClassRank,
    selectGpa,
    selectMajorRank,
    selectScoreList, setScoreOverview
} from "../../app/slice/scoreSlice.ts";
import ScrollView = Animated.ScrollView;
import {useQuery, useRealm} from "@realm/react";
import GongUser from "../../dao/object/User.ts";
import Resources, {ResourceMessage} from "../../basic/Resources.ts";
import {ResourceCode} from "../../utils/enum.ts";

const ScorePage = ({navigation}: NavigationProps) => {
    const dispatch = useAppDispatch();

    const realm = useRealm();
    const user = useQuery<GongUser>('GongUser')[0];

    const [refreshing, setRefreshing] = useState<boolean>(false);

    const onRefresh = () => {
        setRefreshing(true);

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
        }

        getData().then(() => setRefreshing(false));
    }

    const scoreList = useAppSelector(selectScoreList);
    const averageScore = useAppSelector(selectAverageScore)
    const gpa = useAppSelector(selectGpa);
    const classRank = useAppSelector(selectClassRank);
    const majorRank = useAppSelector(selectMajorRank);

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
                        <ScoreBox score={gpa} text={'平均绩点'}/>
                        <ScoreBox score={classRank} text={'班级排名'}/>
                        <ScoreBox score={majorRank} text={'年级排名'}/>
                        <ScoreBox score={averageScore} text={'平均成绩'}/>
                    </View>
                    <ScrollView style={ss.scoreListContainer} nestedScrollEnabled={true}>
                        {
                            scoreList.map((singleScore, index) => {
                                return <SingleScore scoreList={singleScore} term={singleScore.term} key={index}/>
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
    }
})

export default ScorePage;
