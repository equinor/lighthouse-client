import { useQuery } from 'react-query';
import { getBookmarks } from '..';
import { BookmarkError, BookmarkResponse } from '../types';

export const useGetBookmarks = (appKey: string) => {
    const { data, isFetching, isError, isLoading, error } = useQuery<
        BookmarkResponse[],
        BookmarkError
    >(['bookmarks', appKey], ({ signal }) => getBookmarks(appKey, signal));

    return { bookmarks: data, isFetching, isError, isLoading, error };
};
