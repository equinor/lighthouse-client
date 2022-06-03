import { swap } from '@dbeining/react-atom';
import { useQuery } from 'react-query';
import { OptionRequestResult } from '../api/releaseControl/Access/optionsRequestChecker';
import { releaseControlAtom } from '../Atoms/releaseControlAtom';
import { releaseControlQueries } from '../queries/queries';

export interface ReleaseControlAccess extends OptionRequestResult {
    canVoid: boolean;
    canUnVoid: boolean;
}

export function useReleaseControlAccess(releaseControlId: string): void {
    const { canUnvoidQuery, canVoidQuery, permissionsQuery } =
        releaseControlQueries.permissionQueries;

    useQuery({
        ...canVoidQuery(releaseControlId),
        onSuccess: (canVoid) => {
            swap(releaseControlAtom, (old) => ({
                ...old,
                requestAccess: { ...old.requestAccess, canVoid: canVoid },
            }));
        },
    });
    useQuery({
        ...canUnvoidQuery(releaseControlId),
        onSuccess: (canUnVoid) => {
            swap(releaseControlAtom, (old) => ({
                ...old,
                requestAccess: { ...old.requestAccess, canUnVoid: canUnVoid },
            }));
        },
    });

    useQuery({
        ...permissionsQuery(releaseControlId),
        onSuccess: (data) => {
            swap(releaseControlAtom, (old) => ({
                ...old,
                requestAccess: { ...old.requestAccess, ...data },
            }));
        },
    });
}
