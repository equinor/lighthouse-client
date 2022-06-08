import { useMutation, useQueryClient } from 'react-query';
import { unFavouriteBookmark } from '../utils/api/unfavouriteBookmark';

export const useUnfavouriteBookmark = (cacheKey = 'my-bookmarks') => {
    const queryClient = useQueryClient();
    const { mutate: unfavouriteBookmark } = useMutation(unFavouriteBookmark, {
        onSuccess: () => queryClient.invalidateQueries(cacheKey),
    });

    return unfavouriteBookmark;
};
