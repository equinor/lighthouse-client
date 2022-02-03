import { TypedSelectOption } from '../searchType';
import { searchCommPkg } from './searchCommPkg';
import { searchAreas } from './searchArea';
import { searchTags } from './searchTags';
import { searchSystems } from './searchSystem';
import { searchQueryOrigin } from './searchQuery';
import { searchDCN } from './searchDCN';
import { searchNCR } from './searchNcr';
import { searchDiscipline } from './searchDiscipline';
import { searchPerson } from './searchPerson';
import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';

export type ProcoSysTypes =
    | 'tag'
    | 'commpkg'
    | 'system'
    | 'Query'
    | 'person'
    | 'DCN'
    | 'NCR'
    | 'area'
    | 'discipline';

/**
 * TODO: convert to hook
 * @param searchString
 * @param searchItem
 * @param procosysClient
 * @returns
 */
export const searchPcs = async (
    searchString: string,
    searchItem: ProcoSysTypes,
    abortSignal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const { procosys } = httpClient();
    switch (searchItem.toLowerCase()) {
        case 'tag':
            return await searchTags(searchString, procosys, abortSignal);

        case 'commpkg':
            return await searchCommPkg(searchString, procosys, abortSignal);

        case 'system':
            return await searchSystems(searchString, procosys, abortSignal);

        case 'query':
            return await searchQueryOrigin(searchString, procosys, abortSignal);

        case 'dcn':
            return await searchDCN(searchString, procosys, abortSignal);

        case 'ncr':
            return await searchNCR(searchString, procosys, abortSignal);

        case 'person':
            return await searchPerson(searchString, procosys, abortSignal);

        case 'area':
            return await searchAreas(searchString, procosys, abortSignal);

        case 'discipline':
            return await searchDiscipline(searchString, procosys, abortSignal);

        default:
            // eslint-disable-next-line no-console
            console.error('unknown searchItem');
            return [];
    }
};
