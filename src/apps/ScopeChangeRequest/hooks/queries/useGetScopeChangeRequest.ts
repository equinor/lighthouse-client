import { useQuery } from 'react-query';
import { scopeChangeQueries } from '../../keys/queries';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';

export function useGetScopeChangeRequest(
    id: string,
    initialData?: ScopeChangeRequest
): ScopeChangeRequest | undefined {
    const { baseQuery } = scopeChangeQueries;
    const { data: request } = useQuery<ScopeChangeRequest>({
        ...baseQuery(id),
        initialData: initialData,
    });

    return request;
}
