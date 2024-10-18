
class Resources {

    /**
     * 获取课表数据
     */
    public static async fetchClassData() {
        try {
            // TODO: 后续会修改url
            const response = await fetch('http://192.168.1.105:8000/courses');

            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch(error) {
            console.log(error);
        }
    }
}

export default Resources;