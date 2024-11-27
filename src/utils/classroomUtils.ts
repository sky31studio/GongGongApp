/**
 * 将后端数据处理成适于渲染和存储的类型
 * @param data
 */
export const dealClassroomData = (data: any) => {
    const entries = Object.entries(data);

    return entries.map((item: any) => {
        return {
            name: item[0],
            classroom: item[1].map((location: any) => {
                return {
                    name: location.name,
                    status: location.status.map((status: string) => status !== '满'),
                }
            })
        }
    })
}
