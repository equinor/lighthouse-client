import { useQuery } from 'react-query';
import { BookmarkError, BookmarkResponse } from '../types';
import { getAllBookmarks } from '../utils';
import { bookmarkKeys } from '../utils/bookmarkKeys';

export const useGetAllBookmarks = () => {
  const { data, isLoading, error, refetch } = useQuery<BookmarkResponse[], BookmarkError>(
    bookmarkKeys.getAll(),
    ({ signal }) => getAllBookmarks(signal)
  );

  return { bookmarks: data, isLoading, error, refetch };
};
