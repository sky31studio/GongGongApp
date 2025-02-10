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
import Resources, {ResourceMessage} from '../basic/Resources.ts';
import {ResourceCode} from '../utils/enum.ts';
import UserAgreePage from './info/UserAgreePage.tsx';
import PrivacyPolicyPage from './info/PrivacyPolicyPage.tsx';
import FeedbackPage from './info/FeedbackPage.tsx';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useSafeWrite} from '../utils/ResourceUtils.ts';

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
        if (user) {
            console.log('fetch data begin.......');
            if (!user.info) {
                Resources.getInfo(user.token).then((msg: ResourceMessage) => {
                    if (
                        msg.code === ResourceCode.Successful ||
                        msg.code === ResourceCode.DataExpired
                    ) {
                        dispatch(initInfo(msg.data));
                        console.log('writing userInfo in realm...');
                        safeWrite(() => {
                            user.info = JSON.stringify(msg.data);
                        });
                        console.log('userInfo is written!');
                    } else {
                        console.log('get info failed!');
                    }
                });
            } else {
                dispatch(initInfo(JSON.parse(user.info)));
            }

            if (!user.examAgendaList) {
                Resources.getExam(user.token).then((msg: ResourceMessage) => {
                    if (
                        msg.code === ResourceCode.Successful ||
                        msg.code === ResourceCode.DataExpired
                    ) {
                        dispatch(examChangedCountIncrement());
                        dispatch(initExam(msg.data));
                        safeWrite(() => {
                            user.examAgendaList = JSON.stringify(msg.data);
                        });
                    } else {
                        console.log('get examAgendaList failed!');
                    }
                });
            } else {
                dispatch(writeExamAgendaList(JSON.parse(user.examAgendaList)));
            }

            if (!user.firstDate) {
                Resources.getCalendar(user.token).then(
                    (msg: ResourceMessage) => {
                        if (
                            msg.code === ResourceCode.Successful ||
                            ResourceCode.DataExpired
                        ) {
                            dispatch(setCalendar(msg.data));
                            console.log('writing firstDate in realm...');
                            safeWrite(() => {
                                user.firstDate = new Date(msg.data.start);
                                user.termID = msg.data.termID;
                                user.totalWeeks = msg.data.weeks;
                            });
                            console.log('firstDate is written!');
                        } else {
                            console.log('get firstDate failed!');
                        }
                    },
                );
            } else {
                dispatch(
                    setCalendar({
                        start: user.firstDate.toString(),
                        termID: user.termID,
                        totalWeeks: user.totalWeeks,
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
