import { useQuery } from 'react-query';
import { BookmarkError, BookmarkResponse } from '../types';
import { getAllBookmarks } from '../utils';

export const useGetAllBookmarks = () => {
    const { data, isLoading, error } = useQuery<BookmarkResponse[], BookmarkError>(
        ['my-bookmarks'],
        ({ signal }) => getAllBookmarks(signal)
    );

    return { bookmarks: data, isLoading, error };
};
