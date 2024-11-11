import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginPage from "./login/loginPage.tsx";
import UserAgreePage from "./info/UserAgreePage.tsx";
import PrivacyPolicyPage from "./info/PrivacyPolicyPage.tsx";

const LoginNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={'LoginPage'} component={LoginPage}/>
            <Stack.Screen name={'UserAgreementPage'} component={UserAgreePage}/>
            <Stack.Screen name={'PrivacyPolicyPage'} component={PrivacyPolicyPage}/>
        </Stack.Navigator>
    )
}

export default LoginNavigation;
