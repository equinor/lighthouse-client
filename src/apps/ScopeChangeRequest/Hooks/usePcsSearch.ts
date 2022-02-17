import { useQuery } from 'react-query';
import { getFunctionalRoles } from '../Api/PCS/getFunctionalRoles';
import { getSystems } from '../Api/PCS/getSystems';
import { TypedSelectOption } from '../Api/Search/searchType';
import { QueryKeys } from '../Api/ScopeChange/queryKeys';
import { ProcoSysTypes } from '../Api/Search/PCS/searchPcs';

interface PCSSearch {
    search: (searchValue: string, type: ProcoSysTypes) => TypedSelectOption;
}

export function usePcsSearch() {
    const { data: systems } = useQuery([QueryKeys.Systems], getSystems, {
        staleTime: 10 * 1000 * 60 * 60,
        cacheTime: 10 * 1000 * 60 * 60,
    });

    const { data: functionalRoles } = useQuery([QueryKeys.FunctionalRole], getFunctionalRoles, {
        staleTime: 10 * 1000 * 60 * 60,
        cacheTime: 10 * 1000 * 60 * 60,
    });
}
