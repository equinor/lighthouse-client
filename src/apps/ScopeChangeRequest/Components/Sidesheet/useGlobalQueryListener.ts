import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Query } from 'react-query/types/core/query';

interface useGlobalQueryListenerParams {
    onQueryError: (state: Query<any, any, any, any>) => void;
}

/**
 * Listens to all queries being made using react query
 * Will fire the callback on every failed query
 * @param param0 Callback to be fired on failed query
 */
export const useGlobalQueryListener = ({ onQueryError }: useGlobalQueryListenerParams): void => {
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.getQueryCache().subscribe((event) => {
            if (!event) return;
            /** Any query change has happened */
            if (event?.type === 'queryAdded' || event?.type === 'queryUpdated') {
                if (event.query.state.error) {
                    /** A query has failed */
                    onQueryError(event.query);
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
