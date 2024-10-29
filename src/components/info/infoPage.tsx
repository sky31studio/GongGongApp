import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import Resources from "../../basic/Resources.ts";
import {FontSize} from "../../config/globalStyleSheetConfig.ts";

const InfoPage = () => {
    const [info, setInfo] = useState<{ student_id: string, name: string, major: string }>();

    useEffect(() => {
        Resources.getInfo().then((data) => {
            setInfo(data);
        })
    }, []);

    return (
        <View style={{flex: 1}}>
            {info !== undefined &&
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: FontSize.xxl, marginTop: 200}}>{info.student_id}</Text>
                    <Text style={{fontSize: FontSize.xxl}}>{info.name}</Text>
                    <Text style={{fontSize: FontSize.xxl}}>{info.major}</Text>
                </View>}

        </View>
    )
}

export default InfoPage;