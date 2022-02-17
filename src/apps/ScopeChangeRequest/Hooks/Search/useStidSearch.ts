import { TypedSelectOption } from '../../Api/Search/searchType';
import { StidTypes } from '../../Api/Search/STID/searchStid';
import { searchTags } from '../../Api/Search/STID/searchTags';
import { searchDocuments } from '../../Api/Search/STID/searchDocuments';

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
    async function searchSTID(
        searchValue: string,
        type: StidTypes,
        signal?: AbortSignal
    ): Promise<TypedSelectOption[]> {
        switch (type) {
            case 'stidtag': {
                return await searchTags(searchValue, signal);
            }
            case 'document': {
                return await searchDocuments(searchValue, signal);
            }
        }
    }

    return {
        searchSTID,
    };
}
