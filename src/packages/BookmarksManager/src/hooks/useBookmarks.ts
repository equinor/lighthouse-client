import { useMutation, useQueryClient } from 'react-query';
import { BookmarkRequest } from '../types';
import { applyBookmark, saveBookmark } from '../utils';
type ApplyBookmarkReturn<T> = {
    payload: T;
    appKey: string;
    groupName: string;
};
type UseBookmarkReturn<TPayload, TBookmark> = {
    handleSaveBookmarks: (
        capturedBookmark: TPayload,
        bookmarkTitle: string,
        appKey: string
    ) => Promise<void>;

    handleApplyBookmark: (
        bookmarkId: string,
        appKey: string,
        groupName: string
    ) => Promise<ApplyBookmarkReturn<TBookmark>>;
};
/**
 * Hook that handles API calls to bookmark service. Use together with your own functions to handle capturing and applying bookmarks.
 * @returns  handleSaveBookmarks - Function that accepts the capturedBookmark, a bookmark title and app key. Will send a POST request to the bookmark API.
 * @returns handleApplyBookmark - Function that accepts one bookmark id and returns the specific bookmark payload after a GET request.
 */
export const useBookmarks = <
    TPayload extends unknown = unknown,
    TBookmark extends unknown = unknown
>(): UseBookmarkReturn<TPayload, TBookmark> => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(saveBookmark, {
        onSuccess: () => queryClient.invalidateQueries('bookmarks'),
    });
    const { mutateAsync: bookmarkApplyAsync } = useMutation(applyBookmark);

    const handleSaveBookmarks = async (
        capturedBookmark: TPayload,
        bookmarkTitle: string,
        appKey = 'installation',
        subSystem = 'ConstructionAndCommissioning'
    ) => {
        const appKeyWithPrefix: `jc-${string}` = `jc-${appKey}`;
        // POST CALL /bookmarks
        const bookmarkRequest: BookmarkRequest = {
            name: bookmarkTitle,
            isShared: false,
            appKey: appKeyWithPrefix,
            payload: capturedBookmark,
            sourceSystem: {
                name: 'Castberg-portal',
                identifier: 'cst-portal',
                subSystem,
            },
        };
        mutate(bookmarkRequest);
    };

    const handleApplyBookmark = async (
        bookmarkId: string,
        appKey: string,
        groupName: string
    ): Promise<TBookmark> => {
        const bookmark = await bookmarkApplyAsync(bookmarkId);
        //TODO typing
        return bookmark.payload as TBookmark;
    };

    return { handleSaveBookmarks, handleApplyBookmark };
};
