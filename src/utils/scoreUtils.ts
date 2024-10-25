/**
 * 但学期成绩表数据
 */
export interface SingleScoreList {
    term: number;
    required: CourseScore[];
    elective: CourseScore[];
}

/**
 * 但学科成绩数据
 */
export interface CourseScore {
    name: string;
    score: string;
    credit: number;
}

/**
 * 将接口数据转为可以被存入ScoreSlice的数据
 * @param data 原始接口数据
 */
export const dealScore = (data: any[]) => {
    const singleScoreList: SingleScoreList[] = [];

    for (let originScore of data) {
        const term = originScore.term;
        const type = originScore.type;
        const scoreInfo = {
            name: originScore.name,
            score: originScore.score,
            credit: originScore.credit,
        }

        if (singleScoreList[term] === undefined) {
            singleScoreList[term] = {
                term: term,
                required: [],
                elective: [],
            }
        }

        if (type === '必修') {
            singleScoreList[term].required.push(scoreInfo);
        } else {
            singleScoreList[term].elective.push(scoreInfo);
        }
    }

    return singleScoreList.reverse();
}