import { TypedSelectOption } from '../searchType';
import { searchDocuments } from './searchDocuments';
import { searchTags } from './searchTags';

export type StidTypes = 'document' | 'stidtag';

/**
 *
 * @param searchString
 * @param searchItem
 * @param stidClient
 * @returns
 */
export const searchStid = async (
    searchString: string,
    searchItem: StidTypes
): Promise<TypedSelectOption[]> => {
    switch (searchItem.toLowerCase()) {
        case 'document':
            return await searchDocuments(searchString);

        case 'stidtag':
            return await searchTags(searchString);

        default:
            // eslint-disable-next-line no-console
            console.error('unknown searchItem');
            return [];
    }
};
