import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation.tsx";
import ScorePage from "./score/ScorePage.tsx";
import {TablePage} from "./timeTable/tablePage.tsx";
import EmptyClassroomPage from "./emptyClassroom/EmptyClassroomPage.tsx";
import {useEffect} from "react";
import {initTable} from "../app/slice/scheduleSlice.ts";
import {initExam} from "../app/slice/agendaSlice.ts";
import {resetCurrentTime, setDate} from "../app/slice/globalSlice.ts";
import {setScoreOverview} from "../app/slice/scoreSlice.ts";
import {useAppDispatch} from "../app/hooks.ts";
import {initInfo} from "../app/slice/infoSlice.ts";
import SpecificationPage from "./info/SpecificationPage.tsx";
import {setTodayEmptyClassroomStatus, setTomorrowEmptyClassroomStatus} from "../app/slice/classroomSlice.ts";
import {useQuery, useRealm} from "@realm/react";
import GongUser from "../dao/object/User.ts";
import Resources, {ResourceMessage} from "../basic/Resources.ts";
import {open} from "realm";
import {ResourceCode} from "../utils/enum.ts";

const HomeNavigation = () => {
    const realm = useRealm();
    const user = useQuery<GongUser>('GongUser')[0];
    open({
        schema: [GongUser],
        deleteRealmIfMigrationNeeded: true,
    })

    const dispatch = useAppDispatch();

    const Stack = createNativeStackNavigator();

    useEffect(() => {
        if(user) {
            if(!user.courses) {
                Resources.getClassData(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful) {
                            dispatch(initTable(msg.data));
                            realm.write(() => {
                                user.courses = JSON.stringify(msg.data);
                            });
                        }
                    })
            } else {
                dispatch(initTable(JSON.parse(user.courses)));
            }

            if(!user.info) {
                Resources.getInfo(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful) {
                            dispatch(initInfo(msg.data));
                            realm.write(() => {
                                user.info = JSON.stringify(msg.data);
                            })
                        }
                    })
            } else {
                dispatch(initInfo(JSON.parse(user.info)));
            }

            if(!user.todayClassroom) {
                Resources.getTodayClassroomStatus(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful) {
                            dispatch(setTodayEmptyClassroomStatus(msg.data));
                            realm.write(() => {
                                user.todayClassroom = JSON.stringify(msg.data);
                            })
                        }
                    })
            } else {
                dispatch(setTodayEmptyClassroomStatus(JSON.parse(user.todayClassroom)));
            }

            if(!user.tomorrowClassroom) {
                Resources.getTomorrowClassroomStatus(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful) {
                            dispatch(setTomorrowEmptyClassroomStatus(msg.data));
                            realm.write(() => {
                                user.tomorrowClassroom = JSON.stringify(msg.data);
                            })
                        }
                    })
            } else {
                dispatch(setTomorrowEmptyClassroomStatus(JSON.parse(user.tomorrowClassroom)));
            }

            if(!user.exam) {
                Resources.getExam(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful) {
                            dispatch(initExam(msg.data))
                            realm.write(() => {
                                user.exam = JSON.stringify(msg.data);
                            })
                        }
                    })
            } else {
                dispatch(initExam(JSON.parse(user.exam)));
            }

            if(!user.scoreOverview) {
                Resources.getScoreOverview(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful) {
                            dispatch(setScoreOverview(msg.data));
                            realm.write(() => {
                                user.scoreOverview = JSON.stringify(msg.data);
                            })
                        }
                    })
            } else {
                dispatch(setScoreOverview(JSON.parse(user.scoreOverview)));
            }

            if(!user.firstDate) {
                Resources.getFirstDate(user.token)
                    .then((msg: ResourceMessage) => {
                        if(msg.code === ResourceCode.Successful)  {
                            dispatch(setDate(msg.data));
                            realm.write(() => {
                                user.firstDate = new Date(msg.data.start);
                                user.termID = msg.data.termID;
                            })
                        }
                    })
            } else {
                dispatch(setDate({
                    start: user.firstDate.toString(),
                    termID: user.termID,
                }));
            }
        }

        dispatch(resetCurrentTime());
        // const intervalID = setInterval(() => {
        //     dispatch(resetCurrentTime());
        // }, 8000);
        //
        // return () => {
        //     clearInterval(intervalID);
        // }
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={'TabNavigation'} component={TabNavigation}/>
            <Stack.Screen name={'EmptyClassroomPage'} component={EmptyClassroomPage}/>
            <Stack.Screen name={'ScorePage'} component={ScorePage}/>
            <Stack.Screen name={'TablePage'} component={TablePage}/>
            <Stack.Screen name={'SpecificationPage'} component={SpecificationPage}/>
        </Stack.Navigator>
    )
}

export default HomeNavigation;
