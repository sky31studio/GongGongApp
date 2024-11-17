import axios from "axios";
import {hostUrl} from "../config/UrlConfig.ts";
import {sleep} from "../utils/globalUtils.ts";

const rootUrl = hostUrl;
const MAX_ATTEMPTS = 5;

class Resources {
    /**
     * 获取课表数据
     */
    public static async fetchClassData(token: string) {
        try {
            let count = 0;
            while (true) {
                const response = await axios(`${rootUrl}/courses`, {
                    headers: {
                        'token': token
                    }
                })

                if (response.data.data) {
                    return response.data.data;
                }

                count++;
                if (count >= MAX_ATTEMPTS) return [];

                await sleep(1000);
            }
        } catch (error) {
            console.log(`请求失败: ${error}`);
        }
    }

    /**
     * 处理登录请求，将返回的token存入MMKV中
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

    public static async getExam(token: string) {
        try {
            let count = 0;
            while (true) {
                const response = await axios.get(`${rootUrl}/exams`, {
                    headers: {
                        'token': token
                    }
                });

                if (response.data.data) {
                    return response.data.data.exams;
                }

                count++;
                if (count >= MAX_ATTEMPTS) return [];

                await sleep(1000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public static async getScore(token: string) {
        try {
            let count = 0;
            while (true) {
                const response = await axios.get(`${rootUrl}/scores`, {
                    headers: {
                        'token': token
                    }
                })

                if (response.data.data) {
                    return response.data.data.scores;
                }

                count++;
                if (count >= MAX_ATTEMPTS) return [];

                await sleep(1000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public static async getScoreOverview(token: string) {
        try {
            let count = 0;
            while (true) {
                const response = await axios.get(`${rootUrl}/rank`, {
                    headers: {
                        'token': token
                    }
                })

                if (response.data.data) {
                    return response.data.data;
                }

                count++;
                if (count >= MAX_ATTEMPTS) return null;

                await sleep(1000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public static async getFirstDate(token: string) {
        try {
            let count = 0;
            while (true) {
                const response = await axios.get(`${rootUrl}/calendar`, {
                    headers: {
                        'token': token
                    }
                })

                if (response.data.data) {
                    return response.data.data;
                }

                count++;
                if (count >= MAX_ATTEMPTS) return null;

                await sleep(1000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public static async getInfo(token: string) {
        try {
            let count = 0;

            while (true) {
                const response = await axios.get(`${rootUrl}/info`, {
                    headers: {
                        'token': token
                    }
                })

                if (response.data.data) {
                    return response.data.data;
                }

                count++;
                if (count >= MAX_ATTEMPTS) return null;

                await sleep(1000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public static async getTodayClassroomStatus(token: string) {
        try {
            let count = 0;
            while (true) {
                const response = await axios.get(`${rootUrl}/classroom/today`, {
                    headers: {
                        'token': token
                    }
                })

                if (response.data.data) {
                    return response.data.data.classrooms;
                }

                count++;
                if (count >= MAX_ATTEMPTS) return null;

                await sleep(1000);

            }
        } catch (error) {
            console.log(error);
        }
    }

    public static async getTomorrowClassroomStatus(token: string) {
        try {
            let count = 0;
            while (true) {
                const response = await axios.get(`${rootUrl}/classroom/tomorrow`, {
                    headers: {
                        'token': token
                    }
                })

                if (response.data.data) {
                    return response.data.data.classrooms;
                }

                count++;
                if (count >= MAX_ATTEMPTS) return null;

                await sleep(1000);

            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default Resources;
