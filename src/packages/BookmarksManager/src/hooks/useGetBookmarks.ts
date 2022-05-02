import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getBookmarks } from '..';
import { BookmarkResponse } from '../types';

export const useGetBookmarks = (appKey = 'installation') => {
    const [bookmarks, setBookmarks] = useState<BookmarkResponse[] | null>(null);
    const { data, isFetching, error } = useQuery<BookmarkResponse[]>('bookmarks', () =>
        getBookmarks(appKey)
    );

    useEffect(() => {
        if (!isFetching && data && !error) {
            setBookmarks(data);
        }
    }, [isFetching, data, error]);
    return { bookmarks, isFetching, error };
};
