import { useQuery } from 'react-query';
import { getBookmarks } from '..';
import { BookmarkResponse } from '../types';

export const useGetBookmarks = (appKey: string) => {
    const { data, isFetching, error, isLoading } = useQuery<BookmarkResponse[]>(
        ['bookmarks', appKey],
        ({ signal }) => getBookmarks(appKey, signal)
    );

    return { bookmarks: data, isFetching, error, isLoading };
};
