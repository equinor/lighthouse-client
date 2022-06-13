const baseKey = ['my-bookmarks'];
export const bookmarkKeys = {
    baseKey,
    getById: (bookmarkId: string) => [...baseKey, bookmarkId],
    getByAppKey: (appKey: string) => [...baseKey, appKey],
    getAll: () => [...baseKey, 'all'],
};
