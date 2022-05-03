import { SourceSystem } from '.';

export type BookmarkRequest = {
    /** Title for bookmark. Max x amount of characters? */
    name: string;
    /** Longer description than title */
    description?: string;
    /** If it's shared then other people are able to use it */
    isShared: boolean;
    /** Can be used when having bookmarks globally available from portal */
    appKey?: `jc-${string}`;
    /** Not relevant at the moment */
    contextId?: string;
    /** Can be anything. For now, only FilterToSave */
    payload: unknown;
    /** Specific for JC portal */
    sourceSystem?: SourceSystem;
};
