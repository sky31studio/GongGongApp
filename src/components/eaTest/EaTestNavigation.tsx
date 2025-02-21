import {createNativeStackNavigator, NativeStackHeaderProps} from "@react-navigation/native-stack";
import {EaTestHeader, EaTestScreen} from "./EaTestScreen.tsx";

const EaTestNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator

        >
            <Stack.Screen
                name={'EaTest'}
                component={EaTestScreen}
                options={{
                    header: (props: NativeStackHeaderProps) => <EaTestHeader />
                }}/>
        </Stack.Navigator>
    )
}

export default EaTestNavigation;
