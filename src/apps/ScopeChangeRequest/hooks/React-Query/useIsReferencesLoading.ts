import { useIsFetching } from 'react-query';
import { proCoSysQueryKeys } from '../../sKeys/proCoSysQueryKeys';

export function useIsReferencesLoading(): boolean {
    const { baseKey } = proCoSysQueryKeys();

    const referencesFetching = useIsFetching(baseKey, { active: true });

    return referencesFetching > 0;
}
