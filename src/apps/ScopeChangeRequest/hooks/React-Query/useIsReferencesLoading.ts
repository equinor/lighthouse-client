import { useIsFetching } from 'react-query';
import { ProCoSysBaseKey } from '../../keys/ProCoSysQueries';

export function useIsReferencesLoading(): boolean {
    const referencesFetching = useIsFetching(ProCoSysBaseKey, { active: true });

    return referencesFetching > 0;
}
