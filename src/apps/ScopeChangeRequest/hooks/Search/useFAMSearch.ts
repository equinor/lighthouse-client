import { TypedSelectOption } from '../../api/Search/searchType';
import { searchPunchListItems } from '../../api/FAM/searchPunchListItems';
import { searchTag } from '../../api/FAM/searchTag';
import { FamTag } from '../../../ReleaseControl/types/releaseControl';
import { searchHtCable } from '../../api/FAM/searchHtCable';

export type FAMTypes = 'punch' | 'famtag' | 'htcable';

interface FAMSearch {
    searchFAM: (
        searchValue: string,
        type: FAMTypes,
        signal?: AbortSignal
    ) => Promise<TypedSelectOption[]>;
}

/**
 * Hook for searching in FAM
 */
export function useFAMSearch(): FAMSearch {
    async function search(
        searchValue: string,
        type: FAMTypes,
        signal?: AbortSignal
    ): Promise<TypedSelectOption[]> {
        switch (type) {
            case 'punch': {
                const items = await searchPunchListItems(searchValue, signal);
                return items.map(
                    ({ description, punchItemNo }): TypedSelectOption => ({
                        label: `${punchItemNo} - ${description}`,
                        object: { description, punchItemNo },
                        searchValue: punchItemNo.toString(),
                        type: 'punch',
                        value: punchItemNo.toString(),
                    })
                );
            }
            case 'famtag': {
                const items = await searchTag(searchValue, signal);
                return items.map(
                    (x: FamTag): TypedSelectOption => ({
                        label: `${x.tagNo}`,
                        value: x.tagNo,
                        type: 'famtag',
                        searchValue: x.tagNo,
                        object: x,
                    })
                );
            }

            case 'htcable': {
                const items = await searchHtCable(searchValue, signal);
                return items.map(
                    (x: FamTag): TypedSelectOption => ({
                        label: `${x.tagNo}`,
                        value: x.tagNo,
                        type: 'htcable',
                        searchValue: x.tagNo,
                        object: x,
                    })
                );
            }

            default: {
                throw new Error('Unknown searchItem');
            }
        }
    }

    return {
        searchFAM: search,
    };
}
