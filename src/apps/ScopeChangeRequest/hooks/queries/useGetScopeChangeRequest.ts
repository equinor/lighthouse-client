import { swap } from '@dbeining/react-atom';
import { useQuery } from 'react-query';
import { scopeChangeAtom } from '../../Atoms/scopeChangeAtom';
import { updateContext } from '../../Components/Sidesheet/SidesheetWrapper/Utils/updateContext';
import { scopeChangeQueries } from '../../keys/queries';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';

export function useGetScopeChangeRequest(id: string, initialData?: ScopeChangeRequest): void {
    const { baseQuery } = scopeChangeQueries;
    useQuery({
        ...baseQuery(id),
        initialData: initialData,
        onSuccess: (s) => {
            updateContext(s);
        },
    });
}
