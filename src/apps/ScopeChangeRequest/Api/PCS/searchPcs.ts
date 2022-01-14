import { searchCommPkg } from './searchCommPkg';
import { searchTags } from './searchTags';
import { searchSystem } from './searchSystem';
import { BaseClient } from '../../../../../packages/httpClient/src';
import { searchQueryOrigin } from './searchQuery';
import { searchPerson } from './searchPerson';
/**
 * Lets you search for PCS tags, commpkgs or system
 * @param searchString
 * @param searchItem
 * @returns
 */
interface SelectOption {
    value: string;
    label: string;
}
/**
 *
 * @param searchString
 * @param searchItem tag | commpkg | system | query | person
 * @param procosysClient
 * @returns
 */
export const searchPcs = async (
    searchString: string,
    searchItem: string,
    procosysClient: BaseClient
): Promise<SelectOption[]> => {
    switch (searchItem.toLowerCase()) {
        case 'tag':
            console.log('Searching for pcs tags');
            return await searchTags(searchString, procosysClient);

        case 'commpkg':
            console.log('Searching for comm pkgs');
            return await searchCommPkg(searchString, procosysClient);

        case 'system':
            console.log('Searching for Pcs system');
            return await searchSystem(searchString, procosysClient);

        case 'query':
            console.log('Searching pcs for query');
            return await searchQueryOrigin(searchString, procosysClient);

        case 'person':
            console.log('Searching pcs for person');
            return await searchPerson(searchString, procosysClient);

        default:
            console.warn('unknown searchItem');
            return [];
    }
};
