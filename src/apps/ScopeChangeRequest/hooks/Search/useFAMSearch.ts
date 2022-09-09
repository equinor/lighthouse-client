import { TypedSelectOption } from '../../types/search/searchType';
import { searchPunchListItems } from '../../api/FAM/searchPunchListItems';
import { FamTag } from '../../../ReleaseControl/types/releaseControl';
import { searchTagNo } from '../../api/FAM/searchTagNo';
import { searchHtCableTagNo } from '../../api/FAM/searchHtCableTagNo';
import { searchTag } from '../../api/FAM/searchTag';
import { searchHtCable } from '../../api/FAM/searchHtCable';
import { FAMTypes } from '../../types/FAM/famTypes';

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
            case 'famtagno': {
                const items = await searchTagNo(searchValue, signal);
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

            case 'htcabletagno': {
                const items = await searchHtCableTagNo(searchValue, signal);
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
