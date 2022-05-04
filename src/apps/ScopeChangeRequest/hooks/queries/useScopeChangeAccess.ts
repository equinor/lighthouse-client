import { swap } from '@dbeining/react-atom';
import { useQuery } from 'react-query';
import { OptionRequestResult } from '../../api/ScopeChange/Access/optionsRequestChecker';
import { scopeChangeAtom } from '../../Atoms/scopeChangeAtom';
import { scopeChangeQueries } from '../../keys/queries';

export interface ScopeChangeAccess extends OptionRequestResult {
    canVoid: boolean;
    canUnVoid: boolean;
}

export function useScopeChangeAccess(requestId: string): void {
    const { canUnvoidQuery, canVoidQuery, permissionsQuery } = scopeChangeQueries.permissionQueries;

    useQuery({
        ...canVoidQuery(requestId),
        onSuccess: (canVoid) => {
            swap(scopeChangeAtom, (old) => ({
                ...old,
                requestAccess: { ...old.requestAccess, canVoid: canVoid },
            }));
        },
    });
    useQuery({
        ...canUnvoidQuery(requestId),
        onSuccess: (canUnVoid) => {
            swap(scopeChangeAtom, (old) => ({
                ...old,
                requestAccess: { ...old.requestAccess, canUnVoid: canUnVoid },
            }));
        },
    });

    useQuery({
        ...permissionsQuery(requestId),
        onSuccess: (data) => {
            swap(scopeChangeAtom, (old) => ({
                ...old,
                requestAccess: { ...old.requestAccess, ...data },
            }));
        },
    });
}
