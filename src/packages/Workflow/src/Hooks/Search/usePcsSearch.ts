import Fuse from 'fuse.js';

import { useQuery } from 'react-query';
import { System } from '../../Types/ProCoSys/system';
import { Discipline } from '../../Types/ProCoSys/discipline';
import { ProcoSysTypes } from '../../Types/ProCoSys/ProCoSysTypes';
import { proCoSysQueries, searchPerson, TypedSelectOption } from '@equinor/Workflow';
import { httpClient, useFacility } from '@equinor/lighthouse-portal-client';
import { searchNCR } from '../../Api/Search/PCS/searchNcr';
import { searchQueryOrigin } from '../../Api/Search/PCS/searchQuery';
import { searchSWCR } from '../../Api/Search/PCS/searchSWCR';
import { searchAreas } from '../../Api/Search/PCS/searchArea';
import { searchCommPkg } from '../../Api/Search/PCS/searchCommPkg';
import { searchMcPkg } from '../../Api/Search/PCS/searchMcPkg';
import { searchTags } from '../../Api/Search/PCS/searchTags';
import { FunctionalRole } from '../../Types/ProCoSys/functionalRole';

interface PCSSearch {
    searchPCS: (
        searchValue: string,
        type: ProcoSysTypes,
        signal?: AbortSignal
    ) => Promise<TypedSelectOption[]>;
}

interface PCSOptions {
    functionalRoleClassification?: string;
}

/**
 * Hook for searching in ProCoSys
 * Utilizes caching for some lists
 * @returns
 */
export function usePcsSearch(options?: PCSOptions): PCSSearch {
    const { procosysPlantId } = useFacility();

    const { getDisciplinesQuery, getFunctionalRolesQuery, getSystemsQuery } = proCoSysQueries;

    const { data: disciplines, refetch: refetchDisciplines } = useQuery<
        unknown,
        unknown,
        Discipline[]
    >(getDisciplinesQuery(procosysPlantId));
    const { data: systems, refetch: refetchSystems } = useQuery<unknown, unknown, System[]>(
        getSystemsQuery(procosysPlantId)
    );
    const { data: functionalRoles, refetch: refetchFunctionalRoles } = useQuery<
        unknown,
        unknown,
        FunctionalRole[]
    >(getFunctionalRolesQuery(procosysPlantId, options?.functionalRoleClassification));

    const { procosys } = httpClient();

    async function search(
        searchValue: string,
        type: ProcoSysTypes,
        signal?: AbortSignal
    ): Promise<TypedSelectOption[]> {
        switch (type) {
            case 'NCR': {
                return await searchNCR(searchValue, procosysPlantId, procosys, signal);
            }
            case 'Query': {
                return await searchQueryOrigin(searchValue, procosysPlantId, procosys, signal);
            }

            case 'SWCR': {
                return await searchSWCR(searchValue, procosysPlantId, procosys, signal);
            }

            case 'area': {
                return await searchAreas(searchValue, procosysPlantId, procosys, signal);
            }

            case 'commpkg': {
                return await searchCommPkg(searchValue, procosysPlantId, procosys, signal);
            }

            case 'mcpkg': {
                return await searchMcPkg(searchValue, procosysPlantId, procosys, signal);
            }

            case 'discipline': {
                return await searchDiscipline(searchValue);
            }

            case 'functionalRole': {
                return await searchFunctionalRole(searchValue);
            }

            case 'person': {
                return await searchPerson(searchValue, procosysPlantId, procosys, signal);
            }

            case 'system': {
                return await searchSystem(searchValue);
            }

            case 'tag': {
                return await searchTags(searchValue, procosysPlantId, procosys, signal);
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
