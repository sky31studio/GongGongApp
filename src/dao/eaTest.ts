
export interface Uploader {
    avatarUri: string,
    nickname: string,
}

export interface Blog {
    uploadDate: Date,
    uploader: Uploader,
    content: {
        text: string,
        images: string[]
    },
    numberOfComments?: number,
    numberOfLikes?: number,
    tags: string[]
}
