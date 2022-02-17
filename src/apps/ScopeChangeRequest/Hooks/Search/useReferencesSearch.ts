import { useSTIDSearch } from './useStidSearch';
import { usePcsSearch } from './usePcsSearch';
import { StidTypes } from '../../Api/Search/STID/searchStid';
import { ProcoSysTypes } from '../../Types/ProCoSys/ProCoSysTypes';
import { TypedSelectOption } from '../../Api/Search/searchType';

interface ReferenceSearch {
    search: (
        searchValue: string,
        type: ProcoSysTypes | StidTypes,
        signal?: AbortSignal
    ) => Promise<TypedSelectOption[]>;
}

export function useReferencesSearch(): ReferenceSearch {
    const { searchPCS } = usePcsSearch();
    const { searchSTID } = useSTIDSearch();

    async function search(
        searchValue: string,
        type: ProcoSysTypes | StidTypes,
        signal?: AbortSignal
    ): Promise<TypedSelectOption[]> {
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
    }

    return {
        search,
    };
}
