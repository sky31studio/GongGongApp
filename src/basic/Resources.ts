import axios from "axios";
import {getToken, setToken} from "../storage.ts";
import {hostUrl} from "../config/UrlConfig.ts";

const rootUrl = hostUrl;

class Resources {
    /**
     * 获取课表数据
     */
    public static async fetchClassData() {
        try {
            const response = await axios(`${rootUrl}/courses`, {
                headers: {
                    'token': getToken()
                }
            })

            return response.data;
        } catch(error) {
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
            console.log(username);
            console.log(password);
            const response = await axios.post(`${rootUrl}/login`, {
                username: username,
                password: password,
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // response状态码
            const code = response.status;
            if(code === 200) {
                setToken(response.data['session_id']);
            }

            return code;

        } catch (error) {
            console.log(error);
        }
    }

    public static async getExam() {
        try {
            const response = await axios.get(`${rootUrl}/exams`, {
                headers: {
                    'token': getToken()
                }
            });

            return response.data;
        } catch(error) {
            console.log(error);
        }
    }

}

export default Resources;
