import { HttpClient } from '../../../../../../packages/httpClient/src';
import { TypedSelectOption } from '../searchType';
import { searchDocuments } from './searchDocuments';

export type StidTypes = 'document';

/**
 *
 * @param searchString
 * @param searchItem
 * @param procosysClient
 * @returns
 */
export const searchStid = async (
    searchString: string,
    searchItem: StidTypes,
    procosysClient: HttpClient
): Promise<TypedSelectOption[]> => {
    switch (searchItem.toLowerCase()) {
        case 'document':
            return await searchDocuments(searchString, procosysClient);

        default:
            // eslint-disable-next-line no-console
            console.error('unknown searchItem');
            return [];
    }
};
