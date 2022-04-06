import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Mutation } from 'react-query/types/core/mutation';

interface useGlobalMutationListenerParams {
    onMutationError?: (mutationEvent: Mutation<unknown, unknown, void, unknown>) => void;
    onMutationSettled?: (mutationEvent: Mutation<unknown, unknown, void, unknown>) => void;
}

/**
 * Subscribes to the mutation cache and fires an event on every failed mutation
 * @param callback onMutationError
 */
export const useGlobalMutationListener = ({
    onMutationError,
    onMutationSettled,
}: useGlobalMutationListenerParams): void => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const unsubscribe = queryClient.getMutationCache().subscribe((mutationEvent) => {
            /** Any mutation change has happened */
            if (!mutationEvent) return;
            if (
                mutationEvent.state.status === 'error' ||
                mutationEvent.state.status === 'success'
            ) {
                onMutationSettled && onMutationSettled(mutationEvent);
            }
            if (mutationEvent.state.error) {
                /** A mutation has failed */
                onMutationError && onMutationError(mutationEvent);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);
};
