import { useQuery } from 'react-query';
import { getBookmarkById } from '../utils/api/getBookmarkById';

export const useGetBookmarkById = (bookmarkId: string) => {
    const { data } = useQuery(['my-bookmarks'], ({ signal }) => getBookmarkById(bookmarkId));
    return { bookmark: data };
};
