import { useQuery } from 'react-query';
import { getFunctionalRoles } from '../Api/PCS/getFunctionalRoles';
import { getSystems } from '../Api/PCS/getSystems';
import { TypedSelectOption } from '../Api/Search/searchType';
import { QueryKeys } from '../Api/ScopeChange/queryKeys';
import { ProcoSysTypes } from '../Api/Search/PCS/searchPcs';
import { searchTags } from '../Api/Search/PCS/searchTags';
import { httpClient } from '../../../Core/Client/Functions';
import { searchCommPkg } from '../Api/Search/PCS/searchCommPkg';
import { searchQueryOrigin } from '../Api/Search/PCS/searchQuery';
import { searchDCN } from '../Api/Search/PCS/searchDCN';
import { searchSWCR } from '../Api/Search/PCS/searchSWCR';
import { searchAreas } from '../Api/Search/PCS/searchArea';
import { searchPerson } from '../Api/Search/PCS/searchPerson';
import { searchDiscipline } from '../Api/Search/PCS/searchDiscipline';
import { searchNCR } from '../Api/Search/PCS/searchNcr';
import Fuse from 'fuse.js';

interface PCSSearch {
    search: (searchValue: string, type: ProcoSysTypes) => Promise<TypedSelectOption[]>;
}

/**
 * Hook for searching in ProCoSys
 * Utilizes caching for some lists
 * @returns
 */
export function usePcsSearch(): PCSSearch {
    const { data: systems, refetch: refetchSystems } = useQuery([QueryKeys.Systems], getSystems, {
        staleTime: 10 * 1000 * 60 * 60,
        cacheTime: 10 * 1000 * 60 * 60,
    });

    const { data: functionalRoles, refetch: refetchFunctionalRoles } = useQuery(
        [QueryKeys.FunctionalRole],
        getFunctionalRoles,
        {
            staleTime: 10 * 1000 * 60 * 60,
            cacheTime: 10 * 1000 * 60 * 60,
        }
    );

    const { procosys } = httpClient();

    async function search(
        searchValue: string,
        type: ProcoSysTypes,
        signal?: AbortSignal
    ): Promise<TypedSelectOption[]> {
        switch (type) {
            case 'DCN': {
                return await searchDCN(searchValue, procosys, signal);
            }
            case 'NCR': {
                return await searchNCR(searchValue, procosys, signal);
            }
            case 'Query': {
                return await searchQueryOrigin(searchValue, procosys, signal);
            }

            case 'SWCR': {
                return await searchSWCR(searchValue, procosys, signal);
            }

            case 'area': {
                return await searchAreas(searchValue, procosys, signal);
            }

            case 'commpkg': {
                return await searchCommPkg(searchValue, procosys, signal);
            }

            case 'discipline': {
                return await searchDiscipline(searchValue, procosys, signal);
            }

            case 'functionalRole': {
                return await searchFunctionalRole(searchValue);
            }

            case 'person': {
                return await searchPerson(searchValue, procosys, signal);
            }

            case 'system': {
                return await searchSystem(searchValue);
            }

            case 'tag': {
                return await searchTags(searchValue, procosys, signal);
            }
        }
    }

    async function searchFunctionalRole(searchValue: string) {
        if (!functionalRoles) {
            await refetchFunctionalRoles();
        }

        const options = {
            keys: ['Code'],
        };

        const fuse = new Fuse(functionalRoles || [], options);

        return fuse.search(searchValue).map((x): TypedSelectOption => {
            return {
                label: x.Code,
                object: x,
                searchValue: x.Code,
                type: 'functionalRole',
                value: x.Code,
            };
        });
    }

    async function searchSystem(searchValue: string) {
        if (!systems) {
            await refetchSystems();
        }
        const options = {
            keys: ['Code'],
        };

        const fuse = new Fuse(systems || [], options);

        return fuse.search(searchValue).map((x): TypedSelectOption => {
            return {
                label: `SYS_${x.Code} - ${x.Description}`,
                object: x,
                searchValue: x.Code,
                type: 'system',
                value: x.Id.toString(),
            };
        });
    }

    return {
        search: search,
    };
}
