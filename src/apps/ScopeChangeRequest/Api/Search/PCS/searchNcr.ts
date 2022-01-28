import { HttpClient } from '../../../../../Core/httpClient/src';
import { TypedSelectOption } from '../searchType';
import { NCR } from './Types/ncr';
import { PCSStructure } from './Types/searchStructure';

export const searchNCR = async (
    searchString: string,
    client: HttpClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

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
                `api/Search?plantId=PCS%24JOHAN_CASTBERG&savedSearchId=105600&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`,
                requestOptions
            )
            .then((response) => response.json())
            .then((data) => {
                data.map((x: NCR) => {
                    selectOptions.push({
                        label: `NCR-${x.DocumentNo}`,
                        value: x.DocumentNo,
                        type: 'ncr',
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
