import { HttpClient } from '@equinor/http-client';
import { isProduction } from '../../../../../Core/Client/Functions';
import { TypedSelectOption } from '../searchType';
import { PCSStructure } from './searchStructure';
import { SWCR } from '../../../Types/ProCoSys/swcr';

export const searchSWCR = async (
    searchString: string,
    client: HttpClient,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    const searchIdDev = 105222;
    const searchIdProd = 106827;

    const search: PCSStructure[] = [
        {
            Key: 'SwcrHeader',
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
                `api/Search?plantId=PCS%24JOHAN_CASTBERG&savedSearchId=${isProduction() ? searchIdProd : searchIdDev
                }&itemsPerPage=7&paging=true&sortColumns=false&api-version=4.1`,
                requestOptions
            )
            .then((response) => response.json())
            .then((data) => {
                data.map((x: SWCR) => {
                    selectOptions.push({
                        label: x.Header,
                        value: x.SwcrNo.toString(),
                        type: 'SWCR',
                        searchValue: x.Id.toString(),
                        object: x,
                    });
                });
            });
    } catch (e) {
        console.warn(e);
    }
    return selectOptions || [];
};
