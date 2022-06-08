import { useMutation, useQueryClient } from 'react-query';
import { deleteBookmark } from '..';

export const useDeleteBookmark = (cacheKey = 'bookmarks') => {
    const queryClient = useQueryClient();
    const { mutate: deleteMutate } = useMutation(deleteBookmark, {
        onSuccess: () => queryClient.invalidateQueries(cacheKey),
    });
    return deleteMutate;
};
