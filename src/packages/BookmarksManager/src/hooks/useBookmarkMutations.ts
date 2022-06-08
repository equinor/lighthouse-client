import { useMutation, useQueryClient } from 'react-query';

export const useBookmarkMutations = (
    mutation: (arg: string) => Promise<void>,
    cacheKey = 'my-bookmarks'
) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation(mutation, {
        onSuccess: () => queryClient.invalidateQueries(cacheKey),
    });

    return mutate;
};
