import { getFunctionalRoles } from '../../Api/PCS/getFunctionalRoles';
import { getSystems } from '../../Api/PCS/getSystems';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { QueryKeys } from '../../Api/ScopeChange/queryKeys';
import { ProcoSysTypes } from '../../Types/ProCoSys/ProCoSysTypes';
import { searchTags } from '../../Api/Search/PCS/searchTags';
import { httpClient } from '../../../../Core/Client/Functions';
import { searchCommPkg } from '../../Api/Search/PCS/searchCommPkg';
import { searchQueryOrigin } from '../../Api/Search/PCS/searchQuery';
import { searchDCN } from '../../Api/Search/PCS/searchDCN';
import { searchSWCR } from '../../Api/Search/PCS/searchSWCR';
import { searchAreas } from '../../Api/Search/PCS/searchArea';
import { searchPerson } from '../../Api/Search/PCS/searchPerson';
import { searchNCR } from '../../Api/Search/PCS/searchNcr';
import { useInfiniteCachedQuery } from '../React-Query/useInfiniteCachedQuery';
import Fuse from 'fuse.js';
import { getDisciplines } from '../../Api/PCS/getDisciplines';

interface PCSSearch {
    searchPCS: (
        searchValue: string,
        type: ProcoSysTypes,
        signal?: AbortSignal
    ) => Promise<TypedSelectOption[]>;
}

/**
 * Hook for searching in ProCoSys
 * Utilizes caching for some lists
 * @returns
 */
export function usePcsSearch(): PCSSearch {
    const { data: systems, refetch: refetchSystems } = useInfiniteCachedQuery(
        [QueryKeys.Systems],
        getSystems
    );

    const { data: functionalRoles, refetch: refetchFunctionalRoles } = useInfiniteCachedQuery(
        [QueryKeys.FunctionalRole],
        getFunctionalRoles
    );

    const { data: disciplines, refetch: refetchDisciplines } = useInfiniteCachedQuery(
        [QueryKeys.Discipline],
        getDisciplines
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
                return await searchDiscipline(searchValue);
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

            default: {
                throw new Error('Unknown searchItem');
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
                label: x.item.Code,
                object: x,
                searchValue: x.item.Code,
                type: 'functionalRole',
                value: x.item.Code,
            };
        });
    }

    async function searchDiscipline(searchValue: string) {
        if (!disciplines) {
            await refetchDisciplines();
        }

        const options = {
            keys: ['Code'],
        };

        const fuse = new Fuse(disciplines || [], options);

        return fuse.search(searchValue).map((x): TypedSelectOption => {
            return {
                label: `${x.item.Code} - ${x.item.Description}`,
                object: x,
                searchValue: x.item.Code,
                type: 'discipline',
                value: x.item.Code,
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
                label: `${x.item.Code} - ${x.item.Description}`,
                object: x,
                searchValue: x.item.Code,
                type: 'system',
                value: x.item.Id.toString(),
            };
        });
    }

    return {
        searchPCS: search,
    };
}
