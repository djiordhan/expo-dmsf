import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFromStorage = async (key: string): Promise<any> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log('Error parsing retrieved value for key' + key, e);
    }
}

export const setToStorage = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log('Error parsing value for key' + key, e);
    }
}