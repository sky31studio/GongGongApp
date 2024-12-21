import React from "react";
import {StyleSheet, View} from "react-native";
import {SingleScoreList} from "../../utils/scoreUtils.ts";
import {Term} from "../../utils/enum.ts";
import {FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import ScalingNotAllowedText from "../global/ScalingNotAllowedText.tsx";

/**
 * 单学期成绩表组件
 * @param scoreList 单学期成绩表数据
 * @param term 学期
 */
export const SingleScore = ({scoreList, term}: { scoreList: SingleScoreList, term: number }) => {

    const requiredList = <InfoBoard infos={scoreList.required}/>
    const electiveList = <InfoBoard infos={scoreList.elective}/>

    return (
        <View style={ss.singleScoreContainer}>
            <ScalingNotAllowedText style={ss.termText}>{Term[term]}</ScalingNotAllowedText>
            <View style={[ss.infoContainer, {marginBottom: 20}]}>
                <ScalingNotAllowedText style={[ss.columnText, {width: '64%', textAlign: 'left'}]}>课程名称</ScalingNotAllowedText>
                <ScalingNotAllowedText style={[ss.columnText, {width: '18%', textAlign: 'center'}]}>学分</ScalingNotAllowedText>
                <ScalingNotAllowedText style={[ss.columnText, {width: '18%', textAlign: 'center'}]}>成绩</ScalingNotAllowedText>
            </View>
            <ScalingNotAllowedText style={ss.tagText}>必修</ScalingNotAllowedText>
            {requiredList}
            <ScalingNotAllowedText style={[ss.tagText, {marginTop: 10}]}>选修</ScalingNotAllowedText>
            {electiveList}
        </View>
    )
}

export const MinorScore = ({scoreList, term}: {scoreList: SingleScoreList, term: number}) => {

    return (
        <View style={ss.singleScoreContainer}>
            <ScalingNotAllowedText style={ss.termText}>{Term[term]}</ScalingNotAllowedText>
            <View style={[ss.infoContainer, {marginBottom: 20}]}>
                <ScalingNotAllowedText style={[ss.columnText, {width: '64%', textAlign: 'left'}]}>课程名称</ScalingNotAllowedText>
                <ScalingNotAllowedText style={[ss.columnText, {width: '18%', textAlign: 'center'}]}>学分</ScalingNotAllowedText>
                <ScalingNotAllowedText style={[ss.columnText, {width: '18%', textAlign: 'center'}]}>成绩</ScalingNotAllowedText>
            </View>
            <InfoBoard infos={scoreList.required}/>
        </View>
    )
}

/**
 * scoreList单模块数据
 * @param infos 单学科数据列表
 */
const InfoBoard = ({infos}: { infos: any[] }) => {

    return (
        <View style={ss.mainInfoContainer}>
            {
                infos.map((info, index) => {
                    return (
                        <View style={[ss.infoContainer]} key={index}>
                            <ScalingNotAllowedText style={[ss.infoText, {textAlign: 'left', width: '64%'}]}>{info.name}</ScalingNotAllowedText>
                            <ScalingNotAllowedText style={[ss.infoText, {textAlign: 'center', width: '18%'}]}>{info.credit}</ScalingNotAllowedText>
                            <ScalingNotAllowedText style={[ss.infoText, {textAlign: 'center', width: '18%'}]}>{info.score}</ScalingNotAllowedText>
                        </View>
                    )
                })
            }
        </View>
    )
}

const ss = StyleSheet.create({
    singleScoreContainer: {
        width: '100%',
        paddingHorizontal: 25,
        paddingVertical: 20,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 20,
    },

    termText: {
        fontSize: FontSize.xxl,
        fontWeight: '800',
        color: FontColor.dark,
        marginBottom: 25,
    },

    mainInfoContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },

    infoContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 3,
    },

    infoText: {
        color: FontColor.darkLight,
        fontSize: FontSize.s,
    },

    columnText: {
        color: FontColor.grey,
        fontSize: FontSize.s,
    },

    tagText: {
        color: FontColor.darkLight,
        fontSize: FontSize.ll,
        fontWeight: '600',
        marginBottom: 10,
    }
})
