import { HttpClient } from '../../../../../Core/httpClient/src';
import { TypedSelectOption } from '../searchType';
import { DCN } from './Types/dcn';
import { PCSStructure } from './Types/searchStructure';

export const searchDCN = async (
    searchString: string,
    client: HttpClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const searchIdDev = 103746;
    const searchIdProd = 105598;

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
                data.map((x: DCN) => {
                    selectOptions.push({
                        label: x.DocumentNo,
                        value: x.DocumentNo,
                        type: 'dcn',
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
