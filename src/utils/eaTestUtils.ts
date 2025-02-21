
export enum ImageSize {
    Large,
    Medium,
    Small,
}

export const getDiffTimeString = (current: Date, contrast: Date) => {
    const diffMinutes = (current.getTime() - contrast.getTime()) / (1000 * 60);

    if(diffMinutes < 1) {
        return "刚刚";
    }

    if(diffMinutes < 60) {
        return `${Math.floor(diffMinutes)}分钟前`;
    }

    if(diffMinutes < 60 * 24) {
        return `${Math.floor(diffMinutes / 60)}小时前`;
    }

    if(diffMinutes < 60 * 24 * 30) {
        return `${Math.floor(diffMinutes / (60 * 24))}天前`;
    }

    if(diffMinutes < 60 * 24 * 30 * 12) {
        return `${Math.floor(diffMinutes / (60 * 24 * 30))}月前`;
    }

    return `${Math.floor(diffMinutes / (60 * 24 * 30 * 12))}年前`;
}

export const getNumberString = (num: number) => {
    if(num < 1000) {
        return `${num}`;
    }

    if(num < 1000000) {
        return `${(num / 1000).toFixed(2)}K`;
    }

    return `${(num / 1000000).toFixed(2)}M`;
}
