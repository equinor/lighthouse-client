import { useFacility } from '@equinor/lighthouse-portal-client';
import { TypedSelectOption, Document } from '@equinor/Workflow';
import { searchDocuments } from '../../Api/Search/STID/searchDocuments';
import { searchTags } from '../../Api/Search/STID/searchTags';
import { StidTypes } from '../../Types/STID/STIDTypes';

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
        const documents = await searchDocuments(searchValue, facilityId, signal);
        //We have to filter out only the OF-P documents if there are two documents with same docNo
        const uniqueDocs = documents.reduce((unique: TypedSelectOption[], o) => {
          {
            if (
              documents.some(
                (x) =>
                  (x.object as Document).docNo === (o.object as Document).docNo &&
                  (o.object as Document).revStatus === 'OF-P'
              ) ||
              documents.filter((x) => (x.object as Document).docNo === (o.object as Document).docNo)
                .length <= 1
            ) {
              unique.push(o);
            }
          }
          return unique;
        }, []);

        return uniqueDocs;
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
