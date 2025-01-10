/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';

notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;

    console.log('类型 ', type);
    console.log('通知数据 ', detail);

    if(type === EventType.PRESS && pressAction.id === 'exam-notification') {
        console.log('默认按钮被按下');                                                                                                                        cc

        await notifee.cancelNotification(notification.id);
    }

    if(type === EventType.DISMISSED && notification.android.channelId === 'test-channel') {
        console.log('...test notification dismissed...');
    }
})

AppRegistry.registerComponent(appName, () => App);


