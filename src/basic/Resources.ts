import axios from "axios";
import {hostUrl} from "../config/UrlConfig.ts";
import {sleep} from "../utils/globalUtils.ts";
import {ResourceCode} from "../utils/enum.ts";

const rootUrl = hostUrl;
const MAX_ATTEMPTS = 5;

export interface ResourceMessage {
    code: number,
    data?: any,
    message?: string,
}

class Resources {
    /**
     * 获取课表数据
     */
    private static async getData(url: string, token: string, interval: number): Promise<ResourceMessage> {
        try {
            let count = 0;
            while(true) {
                const response = await axios.get(url, {
                    headers: {
                        'token': token
                    }
                });

                if(response.status === 200) {
                    if(response.data.code === -1) {
                        return {
                            code: ResourceCode.PermissionDenied,
                        };
                    }

                    if(response.data.data) {
                        return {
                            code: ResourceCode.Successful,
                            data: response.data.data
                        }
                    }
                }

                count++;
                if(count >= MAX_ATTEMPTS) return {
                    code: ResourceCode.LocalFailed,
                    message: '网络连接超时'
                }

                await sleep(interval);
            }

        } catch(error) {
            return {
                code: ResourceCode.LocalFailed,
                data: error
            }
        }
    }

    public static async getClassData(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/courses`, token, 1500);

        if (response.code === ResourceCode.Successful) {
            return {
                code: ResourceCode.Successful,
                data: response.data.courses
            };
        }

        return {
            code: response.code,
            message: '获取课表失败'
        }
    }

    /**
     * 处理登录请求，将返回的token存入user中
     * @param username 用户名(学号)
     * @param password 密码
     */
    public static async login(username: string, password: string) {
        try {
            const response = await axios.post(`${rootUrl}/login`, {
                username: username,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // response状态码
            const code = response.status;
            let token;
            if (code === 200) {
                const status = response.data.code;
                if (status === 1) {
                    token = response.data.data['token'];
                }

                return {
                    token: token,
                    code: status,
                    message: response.data.message,
                }
            }

            return {
                code: 0,
                message: '网络连接超时'
            };

        } catch (error) {
            console.log(error);
            return {
                code: 0,
                message: '网络连接超时'
            }
        }
    }

    public static async getExam(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/exams`, token, 1500);

        if (response.code === ResourceCode.Successful) {
            return {
                code: ResourceCode.Successful,
                data: response.data.exams,
            };
        }

        return {
            code: response.code,
            message: '获取考试列表失败'
        }
    }

    public static async getScore(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/scores`, token, 1500);

        if (response.code === ResourceCode.Successful) {
            return {
                code: ResourceCode.Successful,
                data: response.data.scores
            };
        }

        return {
            code: response.code,
            message: '获取成绩表单失败'
        }
    }

    public static async getMinorScore(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/minor/scores`, token, 1500);

        if(response.code === ResourceCode.Successful) {
            return {
                code: ResourceCode.Successful,
                data: {
                    scoreList: response.data.scores,
                    totalCredit: response.data.total_credit,
                }
            };
        }

        return {
            code: response.code,
            message: '获取辅修成绩失败'
        }
    }


    public static async getScoreOverview(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/rank`, token, 2000);

        if (response.code === ResourceCode.Successful) {
            return {
                code: ResourceCode.Successful,
                data: response.data
            };
        }

        return {
            code: response.code,
            message: '获取成绩总概失败'
        }
    }

    public static async getFirstDate(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/calendar`, token, 1500);

        if (response.code === ResourceCode.Successful) {
            return {
                code: ResourceCode.Successful,
                data: response.data
            };
        }

        return {
            code: response.code,
            message: '获取学期初时间失败'
        }
    }

    public static async getInfo(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/info`, token, 1500);

        if (response.code === ResourceCode.Successful) {
            return {
                code: ResourceCode.Successful,
                data: response.data
            };
        }

        return {
            code: response.code,
            message: '获取个人信息失败'
        }
    }

    public static async getTodayClassroomStatus(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/classroom/today`, token, 1500);

        if (response.code === ResourceCode.Successful) {
            return {
                code: ResourceCode.Successful,
                data: response.data.classrooms
            };
        }

        return {
            code: response.code,
            message: '获取今日空教室失败'
        }
    }

    public static async getTomorrowClassroomStatus(token: string) {
        const response = await this.getData(`${rootUrl}/classroom/tomorrow`, token, 1500);

        if (response.code === ResourceCode.Successful) {
            return {
                code: ResourceCode.Successful,
                data: response.data.classrooms
            };
        }

        return {
            code: response.code,
            message: '获取明日空教室失败'
        }
    }
}

export default Resources;
