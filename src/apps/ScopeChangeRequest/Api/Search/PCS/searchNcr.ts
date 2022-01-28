import { HttpClient } from '../../../../../Core/httpClient/src';
import { TypedSelectOption } from '../searchType';
import { NCR } from './Types/ncr';
import { PCSStructure } from './Types/searchStructure';

export const searchNCR = async (
    searchString: string,
    client: HttpClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];
    const searchIdDev = 103747;
    const searchIdProd = 105600;

    const search: PCSStructure[] = [
        {
            Key: 'DocumentDocumentNo',
            Value: searchString,
        },
    ];

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(search),
    };
    try {
        await client
            .fetch(
                `https://procosyswebapi.equinor.com/api/Search?plantId=PCS%24JOHAN_CASTBERG&savedSearchId=${searchIdProd}&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`,
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
