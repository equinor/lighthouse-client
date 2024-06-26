import { FamTag, FAMTypes, TypedSelectOption } from '@equinor/Workflow';
import { searchHtCable } from '../../Api/FAM/searchHtCable';
import { searchHtCableTagNo } from '../../Api/FAM/searchHtCableTagNo';
import { searchPunchListItemsV2 } from '../../Api/FAM/searchPunchListItems';
import { searchTag } from '../../Api/FAM/searchTag';
import { searchTagNo } from '../../Api/FAM/searchTagNo';
import { getScopeTag } from '../../Api/Backend/getScopeTag';

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
export function useCompletionSearch(): FAMSearch {
  async function search(
    searchValue: string,
    type: FAMTypes,
    signal?: AbortSignal
  ): Promise<TypedSelectOption[]> {
    switch (type) {
      case 'scopetag': {
        const item = await getScopeTag(searchValue, signal);
        return [
          {
            label: `${item.tagNo}`,
            value: item.tagNo,
            type: 'scopetag',
            searchValue: item.tagNo,
            object: item,
          },
        ];
      }
      case 'punch': {
        const items = await searchPunchListItemsV2(searchValue, signal);
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
      // search to get the tag
      case 'famtag': {
        const items = await searchTag(searchValue);
        items.map((tag) => {
          tag.relatedHTCables = [tag.heatTracingCableTagNos, tag.mountedOnHeatTracingCableTagNos]
            .filter((x) => x != null)
            .join(',');
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
          (x): TypedSelectOption => ({
            label: `${x.tagNo}`,
            value: x.tagNo,
            type: 'htcable',
            searchValue: x.tagNo,
            object: x,
          })
        );
      }
      // search to get the options
      case 'famtagno': {
        const items = await searchTagNo(searchValue, signal);
        return items.map(
          (x): TypedSelectOption => ({
            label: `${x.tagNo}`,
            value: x.tagNo,
            type: 'scopetag',
            searchValue: x.tagNo,
            object: x,
          })
        );
      }

      case 'htcabletagno': {
        const items = await searchHtCableTagNo(searchValue, signal);
        return items.map(
          (x): TypedSelectOption => ({
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
