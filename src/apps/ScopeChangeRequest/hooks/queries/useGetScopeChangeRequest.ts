import { swap } from '@dbeining/react-atom';
import { useQuery } from 'react-query';
import { scopeChangeAtom } from '../../Atoms/scopeChangeAtom';
import { scopeChangeQueries } from '../../keys/queries';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';

export function useGetScopeChangeRequest(id: string, initialData?: ScopeChangeRequest): void {
    const { baseQuery } = scopeChangeQueries;
    useQuery<ScopeChangeRequest>({
        ...baseQuery(id),
        initialData: initialData,
        onSuccess: (s) => {
            swap(scopeChangeAtom, (old) => ({ ...old, request: s }));
        },
    });
}
