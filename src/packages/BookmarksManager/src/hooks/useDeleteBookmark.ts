import { useMutation, useQueryClient } from 'react-query';
import { deleteBookmark } from '..';

export const useDeleteBookmark = () => {
    const queryClient = useQueryClient();
    const { mutate: deleteMutate } = useMutation(deleteBookmark, {
        onSuccess: () => queryClient.invalidateQueries('bookmarks'),
    });

    return deleteMutate;
};
