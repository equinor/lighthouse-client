import { searchCommPkg } from './searchCommPkg';
import { searchAreas } from './searchArea';
import { searchTags } from './searchTags';
import { searchSystems } from './searchSystem';
import { BaseClient } from '../../../../../../packages/httpClient/src';
import { searchQueryOrigin } from './searchQuery';
import { searchDCN } from './searchDCN';
import { searchNCR } from './searchNcr';
import { searchDiscipline } from './searchDiscipline';
import { searchPerson } from './searchPerson';
import { TypedSelectOption } from '../searchType';

export type ProcoSysTypes =
    | 'tag'
    | 'commpkg'
    | 'system'
    | 'query'
    | 'person'
    | 'dcn'
    | 'ncr'
    | 'area'
    | 'discipline';

/**
 * TODO: convert to hook
 * @param searchString
 * @param searchItem
 * @param procosysClient
 * @returns
 */
export const searchPcs = async (
    searchString: string,
    searchItem: ProcoSysTypes,
    procosysClient: BaseClient
): Promise<TypedSelectOption[]> => {
    switch (searchItem.toLowerCase()) {
        case 'tag':
            return await searchTags(searchString, procosysClient);

        case 'commpkg':
            return await searchCommPkg(searchString, procosysClient);

        case 'system':
            return await searchSystems(searchString, procosysClient);

        case 'query':
            return await searchQueryOrigin(searchString, procosysClient);

        case 'dcn':
            return await searchDCN(searchString, procosysClient);

        case 'ncr':
            return await searchNCR(searchString, procosysClient);

        case 'person':
            return await searchPerson(searchString, procosysClient);

        case 'area':
            return await searchAreas(searchString, procosysClient);

        case 'discipline':
            return await searchDiscipline(searchString, procosysClient);

        default:
            // eslint-disable-next-line no-console
            console.error('unknown searchItem');
            return [];
    }
};
