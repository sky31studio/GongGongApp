import axios from "axios";
import {getToken, setToken} from "../storage.ts";

const rootUrl = 'http://175.178.63.53:8000';

class Resources {
    /**
     * 获取课表数据
     */
    public static async fetchClassData() {
        try {
            const response = await axios.get('rootUrl/courses', {
                params: {
                    token: getToken()
                }
            });

            return await response.data;
        } catch(error) {
            console.log(error);
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

        } catch(error) {
            console.log(error);
        }
    }

}

export default Resources;
