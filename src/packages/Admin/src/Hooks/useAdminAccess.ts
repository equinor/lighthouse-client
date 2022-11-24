import { swap } from '@dbeining/react-atom';
import { OptionRequestResult } from '@equinor/Workflow';
import { useQuery } from 'react-query';
import { adminAtom } from '../Atoms/adminAtom';
import { useAdminContext } from './useAdminContext';
import { adminQueries } from './../Queries/queries';

export interface AdminAccess extends OptionRequestResult {
    canDelete: boolean;
}

export function useAdminAccess(id: string): void {
    const { canDeleteQuery, permissionsQuery } = adminQueries.permissionQueries;
    const app = useAdminContext((s) => s.app);

    useQuery({
        ...canDeleteQuery(id, app),
        onSuccess: (canDelete) => {
            swap(adminAtom, (old) => ({
                ...old,
                requestAccess: { ...old.requestAccess, canDelete: canDelete },
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
