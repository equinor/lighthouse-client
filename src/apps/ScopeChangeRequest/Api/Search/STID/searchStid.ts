import { BaseClient } from '../../../../../../packages/httpClient/src';
import { searchDocuments } from './searchDocuments';
import { TypedSelectOption } from '../searchType';

export type StidTypes = 'document';

/**
 *
 * @param searchString
 * @param searchItem
 * @param procosysClient
 * @returns
 */
export const searchPcs = async (
    searchString: string,
    searchItem: StidTypes,
    procosysClient: BaseClient
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
