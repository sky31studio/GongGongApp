import {NavigationProps} from "../home/homePage.tsx";
import MoreInfoPage from "./MoreInfoPage.tsx";
import React from "react";
import {TextConfig} from "../../config/TextConfig.ts";

const SpecificationPage = ({navigation}: NavigationProps) => {
    const props: any = {
        wholeTitle: '社区规范',
        title: {
            main: '社区规范',
            sub: 'Community specification',
        },
        content: TextConfig.specs,
    }

    const handleGoBack = () => {
        navigation.navigate('TabNavigation');
    }

    return (
        <MoreInfoPage props={props} handleNavigation={handleGoBack}/>
    )
}

export default SpecificationPage;
