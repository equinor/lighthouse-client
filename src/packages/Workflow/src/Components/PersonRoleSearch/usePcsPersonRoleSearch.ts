import Fuse from 'fuse.js';
import { useQuery } from 'react-query';
import { httpClient, useFacility } from '@equinor/lighthouse-portal-client';
import { ProcoSysTypes, TypedSelectOption } from './typedSelectOption';
import { FunctionalRole, proCoSysQueries } from '@equinor/Workflow';
import { searchPerson } from '../../Api/searchPerson';

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
export function usePcsPersonRoleSearch(options?: PCSOptions): PCSSearch {
    const { procosysPlantId } = useFacility();

    const { getFunctionalRolesQuery } = proCoSysQueries;

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
            case 'functionalRole': {
                return await searchFunctionalRole(searchValue);
            }

            case 'person': {
                return await searchPerson(searchValue, procosysPlantId, procosys, signal);
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
    return {
        searchPCS: search,
    };
}
