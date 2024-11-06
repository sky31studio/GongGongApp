import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TabNavigation from "./tabNavigation.tsx";
import ScorePage from "./score/ScorePage.tsx";
import {TablePage} from "./timeTable/tablePage.tsx";
import EmptyClassroomPage from "./emptyClassroom/EmptyClassroomPage.tsx";
import {useEffect} from "react";
import {fetchTable} from "../app/slice/scheduleSlice.ts";
import {fetchExamData} from "../app/slice/agendaSlice.ts";
import {getFirstDate, resetCurrentTime} from "../app/slice/globalSlice.ts";
import {getScoreOverview} from "../app/slice/scoreSlice.ts";
import {useAppDispatch} from "../app/hooks.ts";

const HomeNavigation = () => {
    const dispatch = useAppDispatch();

    const Stack = createNativeStackNavigator();

    useEffect(() => {
        dispatch(fetchTable());
        dispatch(fetchExamData());
        dispatch(getFirstDate());
        dispatch(getScoreOverview());

        const intervalID = setInterval(() => {
            dispatch(resetCurrentTime());
        }, 8000);

        return () => {
            clearInterval(intervalID);
        }
    }, []);

    return (
        <Stack.Navigator
            initialRouteName={'TabNavigation'}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={'TabNavigation'} component={TabNavigation}/>
            <Stack.Screen name={'EmptyClassroomPage'} component={EmptyClassroomPage}/>
            <Stack.Screen name={'ScorePage'} component={ScorePage}/>
            <Stack.Screen name={'TablePage'} component={TablePage}/>
        </Stack.Navigator>
    )
}

export default HomeNavigation;