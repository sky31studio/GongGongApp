import axios, {CancelToken} from 'axios';
import {checkUrl, hostUrl} from '../config/UrlConfig.ts';
import {LoginCode, ResourceCode} from '../utils/enum.ts';

const rootUrl = hostUrl;
const MAX_ATTEMPTS = 5;

const LOGIN_MSG: { [key: number]: string } = {
        200: '登录成功',
        401: '账号或密码错误',
        409: '账号未初始化',
        503: '教务系统超时',
        504: '请求超时',
};

const GET_MSG: { [key: number]: string } = {
    200: '请求成功',
    203: '数据过期或无效',
    401: 'token无效',
    404: '请求资源不存在',
    423: '账户锁定',
    503: '教务系统超时',
    504: '请求超时',
};

export interface ResourceMessage {
    code: number,
    data?: any,
    message?: string,
}

class Resources {

    /**
     * 获取数据
     * @param url       请求url
     * @param token     内存中的token
     * @private
     */
    private static async getData(
        url: string,
        token: string,
    ): Promise<ResourceMessage> {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': token,
                },
            });
            const status: number = response.status;
            if(status === 200) {
                return {
                    code: ResourceCode.Successful,
                    data: response.data.data,
                };
            }

            if(status === 203) {
                return {
                    code: ResourceCode.DataExpired,
                    data: response.data.data,
                    message: GET_MSG[status],
                }
            }

            return {
                code: status,
                message: GET_MSG[status] || '未知错误',
            };
        } catch(error: any) {
            if(error.status === 401) {
                return {
                    code: ResourceCode.InvalidToken,
                    message: GET_MSG[401],
                }
            }

            if(error.status === 404) {
                return {
                    code: ResourceCode.NotFound,
                    message: GET_MSG[404],
                }
            }

            return {
                code: ResourceCode.LocalFailed,
                data: error,
            };
        }
    }

    /**
     * 获取课表信息
     * @param token
     */
    public static async getClassData(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/courses`, token);

        if(response.data) {
            return {
                code: response.code,
                data: response.data.courses,
                message: response.message,
            };
        }

        return {
            code: response.code,
            message: response.message,
        };
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
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            // response状态码
            const status = response.status;
            if (status === 200) {
                return {
                    token: `${response.data.token_type} ${response.data.access_token}`,
                    code: LoginCode.Successful,
                    message: LOGIN_MSG[status],
                };
            }

            return {
                code: LoginCode[status],
                message: LOGIN_MSG[status],
            };

        } catch (error) {
            console.log(error);
            return {
                code: -1,
                message: 'axios error',
            };
        }
    }

    /**
     * 获取考试信息
     * @param token
     */
    public static async getExam(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/exams`, token);

        if(response.data) {
            return {
                code: response.code,
                data: response.data.exams,
                message: response.message,
            };
        }

        return {
            code: response.code,
            message: response.message,
        };
    }

    /**
     * 获取成绩数据
     * @param token
     */
    public static async getScore(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/scores`, token);

        if(response.data) {
            return {
                code: response.code,
                data: response.data.scores,
                message: response.message,
            };
        }

        return {
            code: response.code,
            message: response.message,
        };
    }

    /**
     * 获取辅修成绩数据
     * @param token
     */
    public static async getMinorScore(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/minor/scores`, token);

        if(response.data) {
            return {
                code: response.code,
                data: {
                    scoreList: response.data.scores,
                    totalCredit: response.data.total_credit,
                    gpa: response.data.gpa,
                    averageScore: response.data.average_score,
                },
                message: response.message,
            };
        }

        return {
            code: response.code,
            message: response.message,
        };
    }

    /**
     * 获取成绩总览
     * @param token
     */
    public static async getScoreOverview(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/rank`, token);

        if(response.data) {
            return {
                code: response.code,
                data: response.data,
                message: response.message,
            };
        }

        return {
            code: response.code,
            message: response.message,
        };
    }

    /**
     * 获取必修成绩总览
     * @param token
     */
    public static async getCompulsoryScoreOverview(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/compulsory/rank`, token);

        if(response.data) {
            return {
                code: response.code,
                data: response.data,
                message: response.message,
            }
        }

        return {
            code: response.code,
            message: response.message,
        }
    }

    /**
     * 获取学期初数据
     * @param token
     */
    public static async getCalendar(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/calendar`, token);

        if(response.data) {
            return {
                code: response.code,
                data: response.data,
                message: response.message,
            };
        }

        return {
            code: response.code,
            message: response.message,
        };
    }

    /**
     * 获取个人信息
     * @param token
     */
    public static async getInfo(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/info`, token);

        if(response.data) {
            return {
                code: response.code,
                data: response.data,
                message: response.message,
            };
        }

        return {
            code: response.code,
            message: response.message,
        };
    }

    /**
     * 获取今日空教室数据
     * @param token
     */
    public static async getTodayClassroomStatus(token: string): Promise<ResourceMessage> {
        const response = await this.getData(`${rootUrl}/classroom/today`, token);

        if(response.data) {
            return {
                code: response.code,
                data: response.data.classrooms,
                message: response.message,
            };
        }

        return {
            code: response.code,
            message: response.message,
        };
    }

    /**
     * 获取明日空教室数据
     * @param token
     */
    public static async getTomorrowClassroomStatus(token: string) {
        const response = await this.getData(`${rootUrl}/classroom/tomorrow`, token);

        if(response.data) {
            return {
                code: response.code,
                data: response.data.classrooms,
                message: response.message,
            };
        }

        return {
            code: response.code,
            message: response.message,
        };
    }

    /**
     * 获取最新版本数据
     * @param cancelToken 外部用于中断请求
     */
    public static async getUpdateInfo(cancelToken: CancelToken) {
        try {
            let count = MAX_ATTEMPTS;
            let status: number = 0;
            while(count--) {
                const response = await axios.get(checkUrl, {cancelToken: cancelToken});
                status = response.status;

                if(status === 200) {
                    return {
                        code: 200,
                        data: response.data,
                    }
                }
            }

            return {
                code: status,
                message: GET_MSG[status] || '未知错误',
            }
        } catch(error) {
            return {
                code: ResourceCode.LocalFailed,
                data: error
            }
        }
    }
}

export default Resources;
