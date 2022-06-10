import { useMutation, useQueryClient } from 'react-query';
import { bookmarkKeys } from '../utils/bookmarkKeys';

export const useBookmarkMutations = <TArgs extends unknown, TReturn extends unknown>(
    mutation: (args: TArgs) => Promise<TReturn>
) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation(mutation, {
        onSuccess: () => queryClient.invalidateQueries(bookmarkKeys.baseKey),
    });

    return mutate;
};
