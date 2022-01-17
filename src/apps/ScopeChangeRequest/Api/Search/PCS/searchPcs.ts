import { searchCommPkg } from './searchCommPkg';
import { searchTags } from './searchTags';
import { searchSystem } from './searchSystem';
import { BaseClient } from '../../../../../../packages/httpClient/src';
import { searchQueryOrigin } from './searchQuery';
import { searchPerson } from './searchPerson';
import { TypedSelectOption } from '../searchType';

export type ProcoSysTypes = 'tag' | 'commpkg' | 'system' | 'query' | 'person';

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
            return await searchSystem(searchString, procosysClient);

        case 'query':
            return await searchQueryOrigin(searchString, procosysClient);

        case 'person':
            return await searchPerson(searchString, procosysClient);

        default:
            // eslint-disable-next-line no-console
            console.error('unknown searchItem');
            return [];
    }
};
