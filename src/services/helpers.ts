export const retrieveLocalStorage = <T>(key: string): T | null => {
    const object = localStorage.getItem(key);

    if (!object) return null;

    try {
        return JSON.parse(object) as T;
    } catch (error) {
        return object as T;
    }
};