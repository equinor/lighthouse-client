import { useMutation, useQueryClient } from 'react-query';
import { Fields, patchBookmark } from '..';
type Bla = Fields & {
    bookmarkId: string;
};
export const useEditBookmark = (cacheKey = 'my-bookmarks') => {
    const queryClient = useQueryClient();
    const { mutate: editBookmark } = useMutation<unknown, unknown, Bla>(patchBookmark, {
        onSuccess: () => queryClient.invalidateQueries(cacheKey),
    });
    return editBookmark;
};
