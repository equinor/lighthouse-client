import { swap } from '@dbeining/react-atom';
import { OptionRequestResult } from '@equinor/Workflow';
import { useQuery } from 'react-query';
import { adminAtom } from '../Atoms/adminAtom';
import { useAdminContext } from './useAdminContext';
import { adminQueries } from './../Queries/queries';

export interface AdminAccess extends OptionRequestResult {
    canVoid: boolean;
    canUnVoid: boolean;
}

export function useAdminAccess(id: string): void {
    const { canUnvoidQuery, canVoidQuery, permissionsQuery } = adminQueries.permissionQueries;
    const app = useAdminContext((s) => s.app);

    useQuery({
        ...canVoidQuery(id, app),
        onSuccess: (canVoid) => {
            swap(adminAtom, (old) => ({
                ...old,
                requestAccess: { ...old.requestAccess, canVoid: canVoid },
            }));
        },
    });
    useQuery({
        ...canUnvoidQuery(id, app),
        onSuccess: (canUnVoid) => {
            swap(adminAtom, (old) => ({
                ...old,
                requestAccess: { ...old.requestAccess, canUnVoid: canUnVoid },
            }));
        },
    });

    useQuery({
        ...permissionsQuery(id, app),
        onSuccess: (data) => {
            swap(adminAtom, (old) => ({
                ...old,
                requestAccess: { ...old.requestAccess, ...data },
            }));
        },
    });
}
