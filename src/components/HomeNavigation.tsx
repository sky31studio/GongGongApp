import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation.tsx';
import ScorePage from './score/ScorePage.tsx';
import {TablePage} from './timeTable/tablePage.tsx';
import EmptyClassroomPage from './emptyClassroom/EmptyClassroomPage.tsx';
import React, {useEffect} from 'react';
import {initTable} from '../app/slice/scheduleSlice.ts';
import {
  examChangedCountIncrement,
  initExam,
  selectExamChangedCount,
  selectExamList,
  selectSelfChangedCount,
  selectSelfList,
  writeExamAgendaList,
  writeSelfAgendaList,
} from '../app/slice/agendaSlice.ts';
import {resetCurrentTime, setCalendar} from '../app/slice/globalSlice.ts';
import {
  initMinorScoreList,
  initScoreList,
  setCompulsoryScoreOverview,
  setMinorScoreOverview,
  setScoreOverview,
} from '../app/slice/scoreSlice.ts';
import {useAppDispatch, useAppSelector} from '../app/hooks.ts';
import {initInfo} from '../app/slice/infoSlice.ts';
import SpecificationPage from './info/SpecificationPage.tsx';
import {
  setTodayEmptyClassroomStatus,
  setTomorrowEmptyClassroomStatus,
} from '../app/slice/classroomSlice.ts';
import {useQuery, useRealm} from '@realm/react';
import GongUser from '../dao/object/User.ts';
import Resources, {ResourceMessage} from '../basic/Resources.ts';
import {ResourceCode} from '../utils/enum.ts';
import UserAgreePage from './info/UserAgreePage.tsx';
import PrivacyPolicyPage from './info/PrivacyPolicyPage.tsx';
import FeedbackPage from './info/FeedbackPage.tsx';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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

    // 首次挂载获取全局数据
    const fetchAllData = () => {
        if(user) {
            console.log('fetch data begin.......');
            if(!user.courses) {
                Resources.getClassData(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful || ResourceCode.DataExpired) {
                            dispatch(initTable(msg.data));
                            console.log('writing courses in realm...');
                            realm.write(() => {
                                user.courses = JSON.stringify(msg.data);
                            });
                            console.log('courses is written!')
                        } else {
                            console.log('get courses failed!');
                        }
                    })
            } else {
                dispatch(initTable(JSON.parse(user.courses)));
            }

            if(!user.info) {
                Resources.getInfo(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful || ResourceCode.DataExpired) {
                            dispatch(initInfo(msg.data));
                            console.log('writing userInfo in realm...');
                            realm.write(() => {
                                user.info = JSON.stringify(msg.data);
                            })
                            console.log('userInfo is written!');
                        } else {
                            console.log('get info failed!');
                        }
                    })
            } else {
                dispatch(initInfo(JSON.parse(user.info)));
            }

            if(!user.todayClassroom) {
                Resources.getTodayClassroomStatus(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful || ResourceCode.DataExpired) {
                            dispatch(setTodayEmptyClassroomStatus(msg.data));
                            console.log('writing todayClassroom in realm...');
                            realm.write(() => {
                                user.todayClassroom = JSON.stringify(msg.data);
                            })
                            console.log('todayClassroom is written!');
                        } else {
                            console.log('get todayClassroom failed!');
                        }
                    })
            } else {
                dispatch(setTodayEmptyClassroomStatus(JSON.parse(user.todayClassroom)));
            }

            if(!user.tomorrowClassroom) {
                Resources.getTomorrowClassroomStatus(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful || ResourceCode.DataExpired) {
                            dispatch(setTomorrowEmptyClassroomStatus(msg.data));
                            console.log('writing tomorrowClassroom in realm...');
                            realm.write(() => {
                                user.tomorrowClassroom = JSON.stringify(msg.data);
                            })
                            console.log('tomorrowClassroom is written!');
                        } else {
                            console.log('get tomorrowClassroom failed!');
                        }
                    })

                console.log("no tomorrowClassroom...");
            } else {
                console.log("have tomorrowClassroom...")
                dispatch(setTomorrowEmptyClassroomStatus(JSON.parse(user.tomorrowClassroom)));
            }

            if(!user.examAgendaList) {
                Resources.getExam(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful || ResourceCode.DataExpired) {
                            dispatch(examChangedCountIncrement());
                            dispatch(initExam(msg.data))
                        } else {
                            console.log('get examAgendaList failed!');
                        }
                    })
            } else {
                dispatch(writeExamAgendaList(JSON.parse(user.examAgendaList)));
            }

            if(!user.scoreOverview) {
                Resources.getScoreOverview(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful || ResourceCode.DataExpired) {
                            dispatch(setScoreOverview(msg.data));
                            console.log('writing scoreOverview in realm...');
                            realm.write(() => {
                                user.scoreOverview = JSON.stringify(msg.data);
                            })
                            console.log('scoreOverview is written!');
                        } else {
                            console.log('get scoreOverview failed!');
                        }
                    })
            } else {
                dispatch(setScoreOverview(JSON.parse(user.scoreOverview)));
            }

            if(!user.compulsoryScoreOverview) {
                Resources.getCompulsoryScoreOverview(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful || ResourceCode.DataExpired) {
                            dispatch(setCompulsoryScoreOverview(msg.data));
                            console.log(' writing compulsoryScoreOverview...');
                            realm.write(() => {
                                user.compulsoryScoreOverview = JSON.stringify(msg.data);
                            })
                            console.log('compulsoryScoreOverview is written!');
                        } else {
                            console.log('get compulsoryScoreOverview failed!');
                        }
                    });
            } else {
                dispatch(setCompulsoryScoreOverview(JSON.parse(user.compulsoryScoreOverview)));
            }

            if(!user.scoreList) {
                Resources.getScore(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful || ResourceCode.DataExpired) {
                            dispatch(initScoreList(msg.data));
                            console.log('writing scoreList in realm...');
                            realm.write(() => {
                                user.scoreList = JSON.stringify(msg.data);
                            })
                            console.log('scoreList is written!');
                        } else {
                            console.log('get scoreList failed!');
                        }
                    })
            } else {
                dispatch(initScoreList(JSON.parse(user.scoreList)));
            }

            if(!user.minorScoreList) {
                Resources.getMinorScore(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful || ResourceCode.DataExpired) {
                            dispatch(initMinorScoreList(msg.data.scoreList));
                            dispatch(setMinorScoreOverview({
                                totalCredit: msg.data.totalCredit,
                                minorGpa: msg.data.gpa,
                                minorAverageScore: msg.data.averageScore
                            }));
                            console.log('writing minorScore in realm...');
                            realm.write(() => {
                                user.minorScoreList = JSON.stringify(msg.data.scoreList);
                                user.minorScoreOverview = JSON.stringify({
                                    totalCredit: msg.data.totalCredit,
                                    minorGpa: msg.data.gpa,
                                    minorAverageScore: msg.data.averageScore
                                });
                            })
                            console.log('minorScore is written!');
                        } else {
                            console.log('get minorScore failed!');
                        }
                    })
            } else {
                dispatch(initMinorScoreList(JSON.parse(user.minorScoreList)));
                dispatch(setMinorScoreOverview(JSON.parse(user.minorScoreOverview!)));
            }

            if(!user.firstDate) {
                Resources.getCalendar(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful || ResourceCode.DataExpired)  {
                            dispatch(setCalendar(msg.data));
                            console.log('writing firstDate in realm...');
                            realm.write(() => {
                                user.firstDate = new Date(msg.data.start);
                                user.termID = msg.data.termID;
                                user.totalWeeks = msg.data.weeks;
                            })
                            console.log('firstDate is written!');
                        } else {
                            console.log('get firstDate failed!');
                        }
                    })
            } else {
                dispatch(setCalendar({
                    start: user.firstDate.toString(),
                    termID: user.termID,
                    totalWeeks: user.totalWeeks
                }));
            }

            if(user.selfAgendaList) {
                console.log('initializing selfAgendaList..............');
                dispatch(writeSelfAgendaList(JSON.parse(user.selfAgendaList)));
                console.log('selfAgendaList is initialized!');
            }
        }
    }

    useEffect(() => {
        dispatch(resetCurrentTime());
        fetchAllData();
    }, []);

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
