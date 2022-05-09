import { useQuery } from 'react-query';
import { getBookmarks } from '..';
import { BookmarkErrorResponse, BookmarkResponse } from '../types';

export const useGetBookmarks = (appKey: string) => {
    const { data, isFetching, isError, isLoading } = useQuery<
        BookmarkResponse[] | BookmarkErrorResponse
    >(['bookmarks', appKey], ({ signal }) => getBookmarks(appKey, signal));

    return { bookmarks: data, isFetching, isError, isLoading };
};
