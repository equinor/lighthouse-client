import { BaseClient } from '../../../../../../packages/httpClient/src';
import { searchDocuments } from './searchDocuments';
import { TypedSelectOption } from '../searchType';
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
    searchItem: StidTypes,
    stidClient: BaseClient
): Promise<TypedSelectOption[]> => {
    switch (searchItem.toLowerCase()) {
        case 'document':
            return await searchDocuments(searchString, stidClient);

        case 'stidtag':
            return await searchTags(searchString, stidClient);

        default:
            // eslint-disable-next-line no-console
            console.error('unknown searchItem');
            return [];
    }
};
