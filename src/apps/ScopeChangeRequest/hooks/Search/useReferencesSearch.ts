import { useSTIDSearch } from './useStidSearch';
import { usePcsSearch } from './usePcsSearch';
import { StidTypes } from '../../types/STID/STIDTypes';
import { ProcoSysTypes } from '../../types/ProCoSys/ProCoSysTypes';
import { TypedSelectOption } from '../../api/Search/searchType';
import { useState } from 'react';
import { FAMTypes, useFAMSearch } from './useFAMSearch';

export type ReferenceType = ProcoSysTypes | StidTypes | FAMTypes;

interface ReferenceSearch {
    search: (
        searchValue: string,
        type: ReferenceType,
        signal?: AbortSignal
    ) => Promise<TypedSelectOption[]>;
    error: string | null;
}

export function useReferencesSearch(): ReferenceSearch {
    const { searchPCS } = usePcsSearch();
    const { searchSTID } = useSTIDSearch();
    const { searchFAM } = useFAMSearch();
    const [error, setError] = useState<string | null>(null);

    async function search(
        searchValue: string,
        type: ReferenceType,
        signal?: AbortSignal
    ): Promise<TypedSelectOption[]> {
        try {
            switch (type) {
                case 'document': {
                    return await searchSTID(searchValue, type, signal);
                }

                case 'stidtag': {
                    return await searchSTID(searchValue, type, signal);
                }

                case 'punch': {
                    return await searchFAM(searchValue, type, signal);
                }

                case 'famtag': {
                    return await searchFAM(searchValue, type, signal);
                }

                case 'ht cable': {
                    return await searchFAM(searchValue, type, signal);
                }

                default: {
                    return await searchPCS(searchValue, type, signal);
                }
            }
        } catch (e) {
            if (typeof e === 'string') {
                setError(e);
            }
            return [];
        }
    }

    return {
        search,
        error,
    };
}
