import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation.tsx";
import ScorePage from "./score/ScorePage.tsx";
import {TablePage} from "./timeTable/tablePage.tsx";
import EmptyClassroomPage from "./emptyClassroom/EmptyClassroomPage.tsx";
import React, {useEffect} from "react";
import {initTable} from "../app/slice/scheduleSlice.ts";
import {
    examChangedCountIncrement,
    initExam,
    selectExamChangedCount,
    selectExamList,
    selectSelfChangedCount,
    selectSelfList,
    writeExamAgendaList,
    writeSelfAgendaList
} from "../app/slice/agendaSlice.ts";
import {resetCurrentTime, setDate} from "../app/slice/globalSlice.ts";
import {initMinorScoreList, initScoreList, setMinorScoreOverview, setScoreOverview} from "../app/slice/scoreSlice.ts";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {initInfo} from "../app/slice/infoSlice.ts";
import SpecificationPage from "./info/SpecificationPage.tsx";
import {setTodayEmptyClassroomStatus, setTomorrowEmptyClassroomStatus} from "../app/slice/classroomSlice.ts";
import {useQuery, useRealm} from "@realm/react";
import GongUser from "../dao/object/User.ts";
import Resources, {ResourceMessage} from "../basic/Resources.ts";
import {ResourceCode} from "../utils/enum.ts";
import notifee from "../../node_modules/@notifee/react-native";
import {AndroidImportance} from "@notifee/react-native";
import UserAgreePage from "./info/UserAgreePage.tsx";
import PrivacyPolicyPage from "./info/PrivacyPolicyPage.tsx";
import FeedbackPage from "./info/FeedbackPage.tsx";
import {View} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const HomeNavigation = () => {
    const realm = useRealm();
    const user = useQuery<GongUser>('GongUser')[0];

    const dispatch = useAppDispatch();

    // 更新数据库selfList和examList需要的依赖项
    const selfList = useAppSelector(selectSelfList);
    const examList = useAppSelector(selectExamList);
    const selfChangedCount = useAppSelector(selectSelfChangedCount);
    const examChangedCount = useAppSelector(selectExamChangedCount);

    const Stack = createNativeStackNavigator();

    // 首次挂载创建通知通道
    const createChannel = async () => {
        await notifee.createChannel({
            id: 'exam-notification',
            name: 'exam-notification',
            importance: AndroidImportance.HIGH
        });
    }

    // 首次挂载获取全局数据
    const fetchAllData = async () => {
        if(user) {
            console.log('fetch data begin.......');
            if(!user.courses) {
                const msg: ResourceMessage = await Resources.getClassData(user.token);
                if(msg.code === ResourceCode.Successful) {
                    dispatch(initTable(msg.data));
                    console.log('writing courses in realm...');
                    realm.write(() => {
                        user.courses = JSON.stringify(msg.data);
                    });
                    console.log('courses is written!')
                } else {
                    console.log('get courses failed!');
                }
            } else {
                dispatch(initTable(JSON.parse(user.courses)));
            }

            if(!user.info) {
                const msg: ResourceMessage = await Resources.getInfo(user.token);
                if(msg.code === ResourceCode.Successful) {
                    dispatch(initInfo(msg.data));
                    console.log('writing userInfo in realm...');
                    realm.write(() => {
                        user.info = JSON.stringify(msg.data);
                    })
                    console.log('userInfo is written!')
                } else {
                    console.log('get info failed!');
                }
            } else {
                dispatch(initInfo(JSON.parse(user.info)));
            }

            if(!user.todayClassroom) {
                const msg: ResourceMessage = await Resources.getTodayClassroomStatus(user.token);
                if(msg.code === ResourceCode.Successful) {
                    dispatch(setTodayEmptyClassroomStatus(msg.data));
                    console.log('writing todayClassroom in realm...');
                    realm.write(() => {
                        user.todayClassroom = JSON.stringify(msg.data);
                    })
                    console.log('todayClassroom is written!');
                } else {
                    console.log('get todayClassroom failed!');
                }
            } else {
                dispatch(setTodayEmptyClassroomStatus(JSON.parse(user.todayClassroom)));
            }

            if(!user.tomorrowClassroom) {
                const msg: ResourceMessage = await Resources.getTomorrowClassroomStatus(user.token);
                if(msg.code === ResourceCode.Successful) {
                    dispatch(setTomorrowEmptyClassroomStatus(msg.data));
                    console.log('writing tomorrowClassroom in realm...');
                    realm.write(() => {
                        user.tomorrowClassroom = JSON.stringify(msg.data);
                    })
                    console.log('tomorrowClassroom is written!');
                } else {
                    console.log('get tomorrowClassroom failed!');
                }
            } else {
                dispatch(setTomorrowEmptyClassroomStatus(JSON.parse(user.tomorrowClassroom)));
            }

            if(!user.examAgendaList) {
                const msg: ResourceMessage = await Resources.getExam(user.token);
                if(msg.code === ResourceCode.Successful) {
                    dispatch(examChangedCountIncrement());
                    dispatch(initExam(msg.data))
                } else {
                    console.log('get examAgendaList failed!');
                }
            } else {
                dispatch(writeExamAgendaList(JSON.parse(user.examAgendaList)));
            }

            if(!user.scoreOverview) {
                const msg: ResourceMessage = await Resources.getScoreOverview(user.token);
                if(msg.code === ResourceCode.Successful) {
                    dispatch(setScoreOverview(msg.data));
                    console.log('writing scoreOverview in realm...');
                    realm.write(() => {
                        user.scoreOverview = JSON.stringify(msg.data);
                    })
                    console.log('scoreOverview is written!');
                } else {
                    console.log('get scoreOverview failed!');
                }
            } else {
                dispatch(setScoreOverview(JSON.parse(user.scoreOverview)));
            }

            if(!user.scoreList) {
                const msg: ResourceMessage = await Resources.getScore(user.token);
                if(msg.code === ResourceCode.Successful) {
                    dispatch(initScoreList(msg.data));
                    console.log('writing scoreList in realm...');
                    realm.write(() => {
                        user.scoreList = JSON.stringify(msg.data);
                    })
                    console.log('scoreList is written!');
                } else {
                    console.log('get scoreList failed!');
                }
            } else {
                dispatch(initScoreList(JSON.parse(user.scoreList)));
            }

            if(!user.minorScoreList) {
                const msg: ResourceMessage = await Resources.getMinorScore(user.token);
                if(msg.code === ResourceCode.Successful) {
                    dispatch(initMinorScoreList(msg.data.scoreList));
                    dispatch(setMinorScoreOverview(msg.data.totalCredit));
                    console.log('writing minorScore in realm...');
                    realm.write(() => {
                        user.minorScoreList = JSON.stringify(msg.data.scoreList);
                        user.minorScoreOverview = JSON.stringify(msg.data.totalCredit);
                    })
                    console.log('minorScore is written!');
                } else {
                    console.log('get minorScore failed!');
                }
            } else {
                dispatch(initMinorScoreList(JSON.parse(user.minorScoreList)));
                dispatch(setMinorScoreOverview(JSON.parse(user.minorScoreOverview!)));
            }

            if(!user.firstDate) {
                const msg: ResourceMessage = await Resources.getFirstDate(user.token);
                if(msg.code === ResourceCode.Successful)  {
                    dispatch(setDate(msg.data));
                    console.log('writing firstDate in realm...');
                    realm.write(() => {
                        user.firstDate = new Date(msg.data.start);
                        user.termID = msg.data.termID;
                    })
                    console.log('firstDate is written!');
                } else {
                    console.log('get firstDate failed!');
                }
            } else {
                dispatch(setDate({
                    start: user.firstDate.toString(),
                    termID: user.termID,
                }));
            }

            if(user.selfAgendaList) {
                console.log('initializing selfAgendaList..............');
                dispatch(writeSelfAgendaList(JSON.parse(user.selfAgendaList)));
                console.log('selfAgendaList is initialized!');
            }

            console.log('fetch successful!');
        }
    }

    useEffect(() => {
        dispatch(resetCurrentTime());
        createChannel()
            .then(() => {
                fetchAllData().then();
            })
    }, []);

    // 错误案例: 这样的话会在组件刚挂载时执行，导致空的selfList表格会先写覆盖user.selfAgendaList。
    // useEffect(() => {
    //     if(selfList.length === 0) return;
    //     console.log('start to write selfAgendaList into realm!');
    //     realm.write(() => {
    //         user.selfAgendaList = JSON.stringify(selfList);
    //     })
    //     console.log('write selfAgendaList into realm!');
    //     console.log('result:')
    //     console.log(user.selfAgendaList);
    // }, [selfList]);

    useEffect(() => {
        if(selfChangedCount === 0) return;
        realm.write(() => {
            user.selfAgendaList = JSON.stringify(selfList);
        })
    }, [selfList]);

    useEffect(() => {
        if(examChangedCount === 0) return;
        realm.write(() => {
            user.examAgendaList = JSON.stringify(examList);
        })
    }, [examList]);

    return (
        <View style={{flex: 1, paddingTop: 10}}>
            <GestureHandlerRootView style={{width: '100%', flex: 1}}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: true,
                        animationDuration: 400,
                        animation: 'default',
                        animationTypeForReplace: 'push',
                    }}
                >
                    <Stack.Screen name={'TabNavigation'} component={TabNavigation}/>
                    <Stack.Screen name={'EmptyClassroomPage'} component={EmptyClassroomPage}/>
                    <Stack.Screen name={'ScorePage'} component={ScorePage}/>
                    <Stack.Screen name={'TablePage'} component={TablePage}/>
                    <Stack.Screen name={'SpecificationPage'} component={SpecificationPage}/>
                    <Stack.Screen name={'UserAgreementPage'} component={UserAgreePage}/>
                    <Stack.Screen name={'PrivacyPolicyPage'} component={PrivacyPolicyPage}/>
                    <Stack.Screen name={'FeedbackPage'} component={FeedbackPage}/>
                </Stack.Navigator>
            </GestureHandlerRootView>
        </View>
    )
}

export default HomeNavigation;
