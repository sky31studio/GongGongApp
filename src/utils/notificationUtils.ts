import {diffHour} from "./globalUtils.ts";
import {AndroidImportance, TimestampTrigger, TriggerType} from "@notifee/react-native";
import notifee from "../../node_modules/@notifee/react-native";

/**
 * 如果和现在的间隔时间超过3小时，添加或更新考试通知
 * @param date 考试时间
 * @param config 配置项
 */
export const addExamNotification = async (date: Date, config: any) => {
    const {id, title} = config;
    const currentTime = new Date(Date.now());

    // 只剩3小时，则不再更新通知
    if(diffHour(currentTime, date) > 3) {
        const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(),
        }

        try {
            await notifee.createTriggerNotification(
                {
                    id: id,
                    title: title,
                    body: `at ${hour}:${minute}`,
                    android: {
                        channelId: 'exam-channel',
                    }
                },
                trigger
            );
        } catch(error) {
            console.log(error);
        }
    }
}

export const removeNotification = async (id: string) => {
    await notifee.cancelNotification(id);
}

export const createTestChannel = async () => {
    const existingChannels = await notifee.getChannels();
    const isChannelExists = existingChannels.some(channel => channel.id === 'test-channel');

    if(!isChannelExists) {
        await notifee.createChannel(
            {
                id: 'test-channel',
                name: 'test-channel',
                importance: AndroidImportance.HIGH
            }
        )
        console.log('...test-channel now created...')
    } else {
        console.log('...test-channel already exists...')
    }
}

export const createTestNotificationWithDelay = async (delay: number) => {
    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: Date.now() + delay,
    }

    try {
        await notifee.createTriggerNotification(
            {
                id: 'test',
                title: 'Test Of Notification',
                body: 'This is a simple test of notification',
                android: {
                    channelId: 'test-channel',
                }
            },
            trigger
        )
    } catch(error) {
        console.log(error);
    }
}
