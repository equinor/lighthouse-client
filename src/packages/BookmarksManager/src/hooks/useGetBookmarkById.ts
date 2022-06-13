import { useQuery } from 'react-query';
import { getBookmarkById } from '../utils/api/getBookmarkById';
import { bookmarkKeys } from '../utils/bookmarkKeys';
export const useGetBookmarkById = (bookmarkId: string) => {
    const { data } = useQuery(bookmarkKeys.getById(bookmarkId), ({ signal }) =>
        getBookmarkById(bookmarkId)
    );
    return { bookmark: data };
};
