import Realm, {ObjectSchema} from "realm";

class GongUser extends Realm.Object<GongUser>{
    token!: string;
    name?: string;
    id?: string;

    static schema: ObjectSchema = {
        name: 'GongUser',
        properties: {
            token: 'string',
            name: 'string?',
            id: 'string?'
        },
        primaryKey: 'token'
    }
}

export default GongUser;
