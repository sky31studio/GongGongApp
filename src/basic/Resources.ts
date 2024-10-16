
class Resources {

    /**
     * 获取课表数据
     * @param handleRes 处理接口数据的函数
     */
    public static async fetchClassData(handleRes: (response: any) => void) {
        try {
            // TODO: 后续会修改url
            const response = await fetch('http://192.168.1.105:8000/courses');

            if(!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            handleRes(data);
        } catch(error) {
            console.log(error);
        }
    }
}

export default Resources;