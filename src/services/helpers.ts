export const retrieveLocalStorage = <T>(key: string): T | null => {
    const object = localStorage.getItem(key);

    if (!object) return null;

    try {
        return JSON.parse(object) as T;
    } catch (error) {
        return object as T;
    }
};

// Збереження токенів у localStorage
export const setTokenToStorage = (key: string, token: string) => {
    localStorage.setItem(key, token);
};

// Видалення токенів з localStorage
export const removeTokenFromStorage = (key: string) => {
    localStorage.removeItem(key);
};

// Додаткова функція для видалення всіх даних, пов'язаних з авторизацією
export const clearAuthData = (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
};