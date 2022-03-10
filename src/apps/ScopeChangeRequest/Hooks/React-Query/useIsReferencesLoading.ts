import { useIsFetching } from 'react-query';
import { proCoSysQueryKeys } from '../../Keys/proCoSysQueryKeys';

export function useIsReferencesLoading(): boolean {
    const { baseKey } = proCoSysQueryKeys();

    const referencesFetching = useIsFetching(baseKey);

    return referencesFetching > 0;
}
