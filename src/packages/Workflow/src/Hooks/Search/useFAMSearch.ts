import { FamTag, FAMTypes, TypedSelectOption } from '@equinor/Workflow';
import { searchHtCable } from '../../Api/FAM/searchHtCable';
import { searchHtCableTagNo } from '../../Api/FAM/searchHtCableTagNo';
import { searchPunchListItems } from '../../Api/FAM/searchPunchListItems';
import { searchTag } from '../../Api/FAM/searchTag';
import { searchTagNo } from '../../Api/FAM/searchTagNo';

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
                const items = await searchTag(searchValue);
                items.map((tag: FamTag) => {
                    tag.relatedHTCables =
                        (tag.heatTracingCableTagNos !== null ? tag.heatTracingCableTagNos : '') +
                        (tag.heatTracingCableTagNos !== null ? ', ' : '') +
                        (tag.mountedOnHeatTracingCableTagNos !== null
                            ? tag.mountedOnHeatTracingCableTagNos
                            : '');
                    return tag;
                });
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
                const items = await searchHtCable(searchValue);
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
