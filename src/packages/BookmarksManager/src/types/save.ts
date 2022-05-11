export type SaveArgs<T> = {
    /** The object that you want to save */
    capturedBookmark: T;

    bookmarkTitle: string;

    /** The current app this bookmark is for (e.g. 'scope-change') */
    appKey: string;

    /** The current subsystem this bookmark is for (e.g. 'ConstructionAndCommissioning') */
    subSystem: string;
};
