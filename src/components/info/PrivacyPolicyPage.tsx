import {TextConfig} from "../../config/TextConfig.ts";
import MoreInfoPage from "./MoreInfoPage.tsx";
import React from "react";
import {NavigationProps} from "../home/homePage.tsx";

const PrivacyPolicyPage = ({navigation}: NavigationProps) => {
    const props: any = {
        wholeTitle: '隐私条款',
        title: {
            main: '隐私条跨',
            sub: 'Privacy policy',
        },
        content: TextConfig.specs,
    }

    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <MoreInfoPage props={props} handleNavigation={handleGoBack}/>
    )
}

export default PrivacyPolicyPage;
