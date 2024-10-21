import {MMKV} from "react-native-mmkv";

export const storage = new MMKV();

export const setToken = (sessionID: string) => {
    storage.set("sessionID", sessionID);
}

export const getToken = () => {
    return storage.getString("sessionID");
}

export const clearToken = () => {
    storage.delete("sessionID");
}

export const clearStorage = () => {
    storage.clearAll();
}

export const addOnValueChangedListener = (handler: (changedKey: any) => void) => {
    return storage.addOnValueChangedListener(handler);
}
