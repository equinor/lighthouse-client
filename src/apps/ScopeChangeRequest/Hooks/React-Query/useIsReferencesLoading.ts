import { useIsFetching } from 'react-query';
import { useScopeChangeContext } from '../../Components/Sidesheet/Context/useScopeChangeAccessContext';
import { useScopechangeQueryKeyGen } from './useScopechangeQueryKeyGen';

export function useIsReferencesLoading(): boolean {
    const { request } = useScopeChangeContext();
    const { referencesKeys } = useScopechangeQueryKeyGen(request.id);

    const referencesFetching = useIsFetching(referencesKeys.baseKey);

    return referencesFetching > 0;
}
