import {ResourceMessage} from "../basic/Resources.ts";
import {ResourceCode} from "./enum.ts";
import {ToastAndroid} from "react-native";
import {sleep} from "./globalUtils.ts";
import {useRealm} from "@realm/react";

export const getPromise = (
    getFunc: () => Promise<ResourceMessage>,
    fulfilled: (data: any) => void,
    rejectedMsg: string,
) => {
    return new Promise( async (resolve, reject) => {
        const response = await getFunc();

        if(response.code === ResourceCode.Successful ||
            response.code === ResourceCode.DataExpired) {
            fulfilled(response.data);
            resolve({
                code: response.code,
                msg: response.code === ResourceCode.DataExpired ? '数据更新中' : undefined
            });
        } else if(response.code === ResourceCode.InvalidToken) {
            reject({
                code: ResourceCode.InvalidToken,
                msg: '身份失效，请重新登录！'
            })
        } else {
            reject({
                code: response.code,
                msg: rejectedMsg
            })
        }
    })
}

export const getPromiseAllSettled = (promises: Promise<any>[], final?: () => void) => {
    Promise.allSettled(promises)
        .then( async (results: any[]) => {
            for(let result of results) {
                if(result.status === 'rejected') {
                    ToastAndroid.showWithGravity(
                        result.reason.msg,
                        1500,
                        ToastAndroid.BOTTOM,
                    );

                    if(result.reason.code === ResourceCode.InvalidToken) {
                        if (final) {
                            final();
                        }
                        return;
                    }
                    await sleep(1500);
                }
            }

            let flag = false;
            for (let result of results) {
                if(result.status === 'fulfilled' && result.value.code !== ResourceCode.Successful) {
                    ToastAndroid.showWithGravity(
                        result.value.msg,
                        1500,
                        ToastAndroid.BOTTOM,
                    );
                    flag = true;
                    await sleep(1500);
                }
            }

            if (!flag) {
                ToastAndroid.showWithGravity(
                    '数据刷新完成',
                    1500,
                    ToastAndroid.BOTTOM,
                );
            }

            if (final) {
                final();
            }
        })
}

export const useSafeWrite = () => {
    const realm = useRealm();

    return (callback: () => void) => {
        if (realm.isInTransaction) {
            console.log('is in transaction!!!'); // 已在事务中，直接执行
        } else {
            realm.write(callback);
        }
    };
};
