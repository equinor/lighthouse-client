import { ProCoSysBaseKey } from '@equinor/Workflow';
import { useIsFetching } from 'react-query';

export function useIsReferencesLoading(): boolean {
    const referencesFetching = useIsFetching(ProCoSysBaseKey, { active: true });

    return referencesFetching > 0;
}
