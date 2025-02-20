import axios, {CancelToken} from 'axios';
import {checkUrl, hostUrl} from '../config/UrlConfig.ts';
import {LoginCode, ResourceCode} from '../utils/enum.ts';

const rootUrl = hostUrl;

// 登录状态码对应信息
const LOGIN_MSG: { [key: number]: string } = {
        200: '登录成功',
        401: '账号或密码错误',
        409: '账号未初始化',
        503: '教务系统超时',
        504: '请求超时',
};

// GET请求状态码对应信息
const GET_MSG: { [key: number]: string } = {
    200: '请求成功',
    203: '数据过期或无效',
    401: 'token无效',
    404: '请求资源不存在',
    423: '账户锁定',
    503: '教务系统超时',
    504: '请求超时',
};

// 返回体
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
     * @param dataKey   数据字段键名
     * @private
     */
    private static async getData(
        url: string,
        dataKey: string[],
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
                let data = response.data.data;
                if(dataKey.length === 1) {
                    data = response.data.data[dataKey[0]];
                } else if(dataKey.length > 1) {
                    data = dataKey.map((key: string) => response.data.data[key]);
                }

                return {
                    code: ResourceCode.Successful,
                    data: data,
                };
            }

            if(status === 203) {
                let data = response.data.data;
                if(dataKey.length === 1) {
                    data = response.data.data[dataKey[0]];
                } else if(dataKey.length > 1) {
                    data = dataKey.map((key: string) => response.data.data[key]);
                }

                return {
                    code: ResourceCode.DataExpired,
                    data: data,
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

        } catch (error: any) {
            if(error.status === 401) {
                return {
                    code: ResourceCode.InvalidToken,
                    message: LOGIN_MSG[401],
                }
            }

            if(error.status === 404) {
                return {
                    code: ResourceCode.NotFound,
                    message: LOGIN_MSG[404],
                }
            }

            return {
                code: ResourceCode.LocalFailed,
                message: LOGIN_MSG[error.status] || '未知错误',
                data: error,
            };
        }
    }

    /**
     * 获取课表信息
     * @param token
     */
    public static async getClassData(token: string): Promise<ResourceMessage> {
        return await this.getData(`${rootUrl}/courses`, ['courses'], token);
    }

    /**
     * 获取考试信息
     * @param token
     */
    public static async getExam(token: string): Promise<ResourceMessage> {
        return await this.getData(`${rootUrl}/exams`, ['exams'], token);
    }

    /**
     * 获取成绩数据
     * @param token
     */
    public static async getScore(token: string): Promise<ResourceMessage> {
        return await this.getData(`${rootUrl}/scores`, ['scores'], token);
    }

    /**
     * 获取辅修成绩数据
     * @param token
     */
    public static async getMinorScore(token: string): Promise<ResourceMessage> {
        return this.getData(`${rootUrl}/minor/scores`, ['scores', 'total_credit', 'gpa', 'average_score'], token);
    }

    /**
     * 获取成绩总览
     * @param token
     */
    public static async getScoreOverview(token: string): Promise<ResourceMessage> {
        return await this.getData(`${rootUrl}/rank`, [], token);
    }

    /**
     * 获取必修成绩总览
     * @param token
     */
    public static async getCompulsoryScoreOverview(token: string): Promise<ResourceMessage> {
        return await this.getData(`${rootUrl}/compulsory/rank`, [], token);
    }

    /**
     * 获取学期初数据
     * @param token
     */
    public static async getCalendar(token: string): Promise<ResourceMessage> {
        return await this.getData(`${rootUrl}/calendar`, [], token);
    }

    /**
     * 获取个人信息
     * @param token
     */
    public static async getInfo(token: string): Promise<ResourceMessage> {
        return await this.getData(`${rootUrl}/info`, [], token);
    }

    /**
     * 获取今日空教室数据
     * @param token
     */
    public static async getTodayClassroomStatus(token: string): Promise<ResourceMessage> {
        return await this.getData(`${rootUrl}/classroom/today`, ['classrooms'], token);
    }

    /**
     * 获取明日空教室数据
     * @param token
     */
    public static async getTomorrowClassroomStatus(token: string) {
        return await this.getData(`${rootUrl}/classroom/tomorrow`, ['classrooms'], token);
    }

    /**
     * 获取最新版本数据
     * @param cancelToken 外部用于中断请求
     */
    public static async getUpdateInfo(cancelToken: CancelToken) {
        try {
            const response = await axios.get(checkUrl, {cancelToken: cancelToken});
            const status = response.status;

            if(status === 200 || status === 203) {
                return {
                    code: status,
                    data: response.data,
                }
            }

            return {
                code: status,
                message: GET_MSG[status] || '未知错误',
            }
        } catch(error: any) {
            const status = error.status;
            if(status === 401 || status === 403) {
                return {
                    code: status,
                    message: GET_MSG[status] || '未知错误'
                }
            }

            return {
                code: status,
                message: GET_MSG[status] || '未知错误',
                data: error
            }
        }
    }
}

export default Resources;
