import { isProduction } from '../../../../../Core/Client/Functions';
import { HttpClient } from '../../../../../Core/httpClient/src';
import { TypedSelectOption } from '../searchType';
import { NCR } from '../../../Types/ProCoSys/ncr';
import { PCSStructure } from './searchStructure';

export const searchNCR = async (
    searchString: string,
    plantId: string,
    client: HttpClient,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];
    const searchIdDev = 105217;
    const searchIdProd = 106826;

    const search: PCSStructure[] = [
        {
            Key: 'DocumentDocumentNo',
            Value: searchString,
        },
    ];

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(search),
        signal,
    };
    try {
        await client
            .fetch(
                `api/Search?plantId=${encodeURIComponent(plantId)}&savedSearchId=${isProduction() ? searchIdProd : searchIdDev
                }&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`,
                requestOptions
            )
            .then((response) => response.json())
            .then((data) => {
                data.map((x: NCR) => {
                    selectOptions.push({
                        label: `NCR-${x.DocumentNo}`,
                        value: x.DocumentNo,
                        type: 'NCR',
                        searchValue: x.DocumentNo,
                        object: x,
                    });
                });
            });
    } catch (e) {
        console.warn(e);
    }
    return selectOptions || [];
};
