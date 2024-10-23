import sha256 from 'crypto-js/sha256'

/**
 * type数组内是否存在置顶type
 * @param types 标签数组
 */
export const containPinToTop = (types: number[]) => {
    for (let i of types) {
        if (i === 1) {
            return true;
        }
    }
    return false;
}

export const generateID = (name: string, time: Date) => {
    const input = time.toString() + ':' + name;

    return sha256(input).toString();
}

export const dealExam = (data: any[]) => {

}
