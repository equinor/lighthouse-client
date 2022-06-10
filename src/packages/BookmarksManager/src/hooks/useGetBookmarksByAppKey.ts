import { useQuery } from 'react-query';
import { getBookmarks } from '..';
import { BookmarkError, BookmarkResponse } from '../types';
import { bookmarkKeys } from '../utils/bookmarkKeys';

export const useGetBookmarksByAppKey = (appKey: string) => {
    const { data, isFetching, isError, isLoading, error } = useQuery<
        BookmarkResponse[],
        BookmarkError
    >(bookmarkKeys.getByAppKey(appKey), ({ signal }) => getBookmarks(appKey, signal));

    return { bookmarks: data, isFetching, isError, isLoading, error };
};
