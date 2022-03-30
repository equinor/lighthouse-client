import { useSTIDSearch } from './useStidSearch';
import { usePcsSearch } from './usePcsSearch';
import { StidTypes } from '../../Types/STID/STIDTypes';
import { ProcoSysTypes } from '../../Types/ProCoSys/ProCoSysTypes';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { useState } from 'react';

interface ReferenceSearch {
    search: (
        searchValue: string,
        type: ProcoSysTypes | StidTypes,
        signal?: AbortSignal
    ) => Promise<TypedSelectOption[]>;
    error: string | null;
}

export function useReferencesSearch(): ReferenceSearch {
    const { searchPCS } = usePcsSearch();
    const { searchSTID } = useSTIDSearch();
    const [error, setError] = useState<string | null>(null);

    async function search(
        searchValue: string,
        type: ProcoSysTypes | StidTypes,
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
