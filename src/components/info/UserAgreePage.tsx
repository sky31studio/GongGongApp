import {NavigationProps} from "../home/homePage.tsx";
import {TextConfig} from "../../config/TextConfig.ts";
import MoreInfoPage from "./MoreInfoPage.tsx";
import React from "react";

const UserAgreePage = ({navigation}: NavigationProps) => {
    const props: any = {
        wholeTitle: '用户协议',
        title: {
            main: '用户协议',
            sub: 'User agreement',
        },
        content: TextConfig.userAgreement,
    }

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <MoreInfoPage props={props} handleNavigation={handleGoBack}/>
    )
}

export default UserAgreePage;
