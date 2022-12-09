import { useFacility } from '@equinor/lighthouse-portal-client';
import { TypedSelectOption } from '../../api/Search/searchType';
import { searchDocuments } from '../../api/Search/STID/searchDocuments';
import { searchTags } from '../../api/Search/STID/searchTags';
import { Document } from '../../types/STID/document';
import { StidTypes } from '../../types/STID/STIDTypes';

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
                return await (
                    await searchDocuments(searchValue, facilityId, signal)
                ).filter((doc) => (doc.object as Document).revStatus === 'OF-P'); //filter by OF-P to avoid duplicate documents (OF-P has full dataset)
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
