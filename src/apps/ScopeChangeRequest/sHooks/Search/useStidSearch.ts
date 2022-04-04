import { TypedSelectOption } from '../../api/Search/searchType';
import { StidTypes } from '../../sTypes/STID/STIDTypes';
import { searchTags } from '../../api/Search/STID/searchTags';
import { searchDocuments } from '../../api/Search/STID/searchDocuments';
import { useFacility } from '@equinor/portal-client';

interface StidSearch {
    searchSTID: (
        searchValue: string,
        type: StidTypes,
        signal?: AbortSignal
    ) => Promise<TypedSelectOption[]>;
}

/**
 * Hook for searching in STID
 * Utilizes caching for some lists
 * @returns
 */
export function useSTIDSearch(): StidSearch {
    const { facilityId } = useFacility();
    async function searchSTID(
        searchValue: string,
        type: StidTypes,
        signal?: AbortSignal
    ): Promise<TypedSelectOption[]> {
        switch (type) {
            case 'stidtag': {
                return await searchTags(searchValue, facilityId, signal);
            }
            case 'document': {
                return await searchDocuments(searchValue, facilityId, signal);
            }

            default: {
                throw new Error('Unknown searchItem');
            }
        }
    }

    return {
        searchSTID,
    };
}
