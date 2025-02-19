import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation.tsx';
import ScorePage from './score/ScorePage.tsx';
import {TablePage} from './timeTable/tablePage.tsx';
import EmptyClassroomPage from './emptyClassroom/EmptyClassroomPage.tsx';
import React, {useEffect} from 'react';
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
import {useAppDispatch, useAppSelector} from '../app/hooks.ts';
import {initInfo} from '../app/slice/infoSlice.ts';
import SpecificationPage from './info/SpecificationPage.tsx';
import {useQuery} from '@realm/react';
import GongUser from '../dao/object/User.ts';
import Resources from '../basic/Resources.ts';
import UserAgreePage from './info/UserAgreePage.tsx';
import PrivacyPolicyPage from './info/PrivacyPolicyPage.tsx';
import FeedbackPage from './info/FeedbackPage.tsx';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {getPromise, useSafeWrite} from '../utils/ResourceUtils.ts';

const HomeNavigation = () => {
    const safeWrite = useSafeWrite();
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
        console.log('fetch data begin.......');
        if (user) {
            if(!user.info) {
                const userInfoPromise = getPromise(
                    () => Resources.getInfo(user.token),
                    data => {
                        dispatch(initInfo(data));
                        safeWrite(() => {
                            user.info = JSON.stringify(data);
                        });
                    },
                    '个人信息获取失败',
                );

                userInfoPromise.then(() => {
                    console.log('user info is written!');
                })
            } else {
                dispatch(initInfo(JSON.parse(user.info)));
            }

            if (!user.examAgendaList) {
                const examPromise = getPromise(
                    () => Resources.getExam(user.token),
                    data => {
                        dispatch(examChangedCountIncrement());
                        dispatch(initExam(data));
                        safeWrite(() => {
                            user.examAgendaList = JSON.stringify(data);
                        });
                    },
                    '考试表单获取失败',
                );

                examPromise.then(() => {
                    console.log('exam list is written!');
                })
            } else {
                dispatch(writeExamAgendaList(JSON.parse(user.examAgendaList)));
            }

            if (!user.firstDate) {
                const calendarPromise = getPromise(
                    () => Resources.getCalendar(user.token),
                    data => {
                        dispatch(setCalendar(data));
                        safeWrite(() => {
                            user.firstDate = new Date(data.start);
                            user.termID = data.termID;
                            user.totalWeeks = data.weeks;
                        });
                    },
                    '校历获取失败'
                );

                calendarPromise.then(() => {
                   console.log('firstDate is written!');
                });
            } else {
                dispatch(
                    setCalendar({
                        start: user.firstDate.toString(),
                        termID: user.termID,
                        weeks: user.totalWeeks,
                    }),
                );
            }

            if (user.selfAgendaList) {
                console.log('initializing selfAgendaList..............');
                dispatch(writeSelfAgendaList(JSON.parse(user.selfAgendaList)));
                console.log('selfAgendaList is initialized!');
            }
        }
    };

    useEffect(() => {
        dispatch(resetCurrentTime());
        fetchAllData();
    }, []);

    useEffect(() => {
        if (selfChangedCount === 0) return;
        safeWrite(() => {
            user.selfAgendaList = JSON.stringify(selfList);
        });
    }, [selfList]);

    useEffect(() => {
        if (examChangedCount === 0) return;
        safeWrite(() => {
            user.examAgendaList = JSON.stringify(examList);
        });
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
                    }}>
                    <Stack.Screen
                        name={'TabNavigation'}
                        component={TabNavigation}
                    />
                    <Stack.Screen
                        name={'EmptyClassroomPage'}
                        component={EmptyClassroomPage}
                    />
                    <Stack.Screen name={'ScorePage'} component={ScorePage} />
                    <Stack.Screen name={'TablePage'} component={TablePage} />
                    <Stack.Screen
                        name={'SpecificationPage'}
                        component={SpecificationPage}
                    />
                    <Stack.Screen
                        name={'UserAgreementPage'}
                        component={UserAgreePage}
                    />
                    <Stack.Screen
                        name={'PrivacyPolicyPage'}
                        component={PrivacyPolicyPage}
                    />
                    <Stack.Screen
                        name={'FeedbackPage'}
                        component={FeedbackPage}
                    />
                </Stack.Navigator>
            </GestureHandlerRootView>
        </View>
    );
};

export default HomeNavigation;
