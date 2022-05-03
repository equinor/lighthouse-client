import { useQuery } from 'react-query';
import { getBookmarks } from '..';
import { BookmarkResponse } from '../types';

export const useGetBookmarks = (appKey: string) => {
    const { data, isFetching, error } = useQuery<BookmarkResponse[]>('bookmarks', () =>
        getBookmarks(appKey)
    );

    return { bookmarks: data, isFetching, error };
};
