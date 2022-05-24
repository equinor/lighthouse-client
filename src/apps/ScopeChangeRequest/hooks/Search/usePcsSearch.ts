import { TypedSelectOption } from '../../api/Search/searchType';
import { ProcoSysTypes } from '../../types/ProCoSys/ProCoSysTypes';
import { searchTags } from '../../api/Search/PCS/searchTags';
import { httpClient } from '../../../../Core/Client/Functions';
import { searchCommPkg } from '../../api/Search/PCS/searchCommPkg';
import { searchQueryOrigin } from '../../api/Search/PCS/searchQuery';
import { searchSWCR } from '../../api/Search/PCS/searchSWCR';
import { searchAreas } from '../../api/Search/PCS/searchArea';
import { searchPerson } from '../../api/Search/PCS/searchPerson';
import { searchNCR } from '../../api/Search/PCS/searchNcr';
import Fuse from 'fuse.js';
import { useFacility } from '../../../../Core/Client/Hooks';
import { ProCoSysQueries } from '../../keys/ProCoSysQueries';
import { useQuery } from 'react-query';
import { FunctionalRole } from '../../types/ProCoSys/functionalRole';
import { System } from '../../types/ProCoSys/system';
import { Discipline } from '../../types/ProCoSys/discipline';

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

    const { getDisciplinesQuery, getFunctionalRolesQuery, getSystemsQuery } = ProCoSysQueries;

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
