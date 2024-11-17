import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation.tsx";
import ScorePage from "./score/ScorePage.tsx";
import {TablePage} from "./timeTable/tablePage.tsx";
import EmptyClassroomPage from "./emptyClassroom/EmptyClassroomPage.tsx";
import {useEffect} from "react";
import {fetchTable} from "../app/slice/scheduleSlice.ts";
import {fetchExamData} from "../app/slice/agendaSlice.ts";
import {getFirstDate, resetCurrentTime} from "../app/slice/globalSlice.ts";
import {getScoreOverview} from "../app/slice/scoreSlice.ts";
import {useAppDispatch} from "../app/hooks.ts";
import {getInfo} from "../app/slice/infoSlice.ts";
import SpecificationPage from "./info/SpecificationPage.tsx";
import {getTodayEmptyClassroomStatus, getTomorrowEmptyClassroomStatus} from "../app/slice/classroomSlice.ts";
import {useQuery} from "@realm/react";
import GongUser from "../dao/object/User.ts";

const HomeNavigation = () => {
    const user = useQuery<GongUser>('GongUser')[0];

    const dispatch = useAppDispatch();

    const Stack = createNativeStackNavigator();

    useEffect(() => {
        if(user) {
            dispatch(fetchTable(user.token));
            dispatch(fetchExamData(user.token));
            dispatch(getFirstDate(user.token));
            dispatch(getScoreOverview(user.token));
            dispatch(getInfo(user.token));
            dispatch(getTodayEmptyClassroomStatus(user.token));
            dispatch(getTomorrowEmptyClassroomStatus(user.token));
        }

        const intervalID = setInterval(() => {
            dispatch(resetCurrentTime());
        }, 8000);

        return () => {
            clearInterval(intervalID);
        }
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
