export const storage = {
    setItem<T>(key: string, data: T): void {
        if (typeof data === 'string') {
            localStorage.setItem(key, data);
        } else {
            localStorage.setItem(key, JSON.stringify(data));
        }
    },

    getItem<T>(key: string): string | T | undefined {
        const data = localStorage.getItem(key);
        if (!data) return undefined;

        try {
            return JSON.parse(data) as T;
        } catch {
            return data;
        }
    },

    removeItem(key: string): void {
        localStorage.removeItem(key);
    },
};
