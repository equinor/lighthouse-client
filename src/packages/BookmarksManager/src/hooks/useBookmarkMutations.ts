import { useMutation, useQueryClient } from 'react-query';

export const useBookmarkMutations = <TArgs extends unknown, TReturn extends unknown>(
    mutation: (args: TArgs) => Promise<TReturn>,
    cacheKeys = ['my-bookmarks']
) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation(mutation, {
        onSuccess: () => queryClient.invalidateQueries(cacheKeys),
    });

    return mutate;
};
