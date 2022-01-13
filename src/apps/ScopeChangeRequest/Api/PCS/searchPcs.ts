import { searchCommPkg } from './searchCommPkg';
import { searchTags } from './searchTags';
import { searchSystem } from './searchSystem';

/**
 *
 */

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
export const searchPcs = async (
    searchString: string,
    searchItem: string
): Promise<SelectOption[]> => {
    switch (searchItem.toLowerCase()) {
        case 'tag':
            console.log('Searching for pcs tags');
            return await searchTags(searchString);

        case 'commpkg':
            console.log('Searching for comm pkgs');
            return await searchCommPkg(searchString);

        case 'system':
            console.log('Searching for Pcs system');
            return await searchSystem(searchString);
        default:
            console.warn('unknown searchItem');
            return [];
    }
};
