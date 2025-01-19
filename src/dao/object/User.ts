import Realm, {ObjectSchema} from "realm";

class GongUser extends Realm.Object<GongUser>{
    token!: string;
    name?: string;
    id?: string;
    courses?: string;
    info?: string;
    todayClassroom?: string;
    tomorrowClassroom?: string;
    examAgendaList?: string;
    selfAgendaList?: string;
    scoreOverview?: string;
    compulsoryScoreOverview?: string;
    minorScoreOverview?: string;
    minorScoreList?: string;
    scoreList?: string;
    firstDate?: Date;
    termID?: string;

    static schema: ObjectSchema = {
        name: 'GongUser',
        properties: {
            token: 'string',
            name: 'string?',
            id: 'string?',
            courses: 'string?',
            info: 'string?',
            todayClassroom: 'string?',
            tomorrowClassroom: 'string?',
            examAgendaList: 'string?',
            selfAgendaList: 'string?',
            scoreOverview: 'string?',
            compulsoryScoreOverview: 'string?',
            minorScoreOverview: 'string?',
            minorScoreList: 'string?',
            scoreList: 'string?',
            firstDate: 'date?',
            termID: 'string?',
        },
        primaryKey: 'token'
    }
}

export default GongUser;
