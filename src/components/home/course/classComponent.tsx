import {StyleSheet, View} from "react-native";
import CircularProcess from "./circularProcess";


const ClassComponent = () => {

    return (
        <View style={styleSheet.classContainer}>
            <View style={styleSheet.statusContainer}>
                <View style={styleSheet.circle}>
                    <CircularProcess done={2} todo={4} />
                </View>
            </View>
            <View style={styleSheet.timelineContainer}>

            </View>
        </View>
    );
}

const styleSheet = StyleSheet.create({
    classContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },

    statusContainer: {
        display: 'flex',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    timelineContainer: {

    },

    circle: {
        height: '100%',
        width: 70,
    }
})

export default ClassComponent;
