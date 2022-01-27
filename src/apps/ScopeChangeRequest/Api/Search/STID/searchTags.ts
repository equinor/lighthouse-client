import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { Tag } from '../../STID/Types/Tag';
import { TypedSelectOption } from '../searchType';

export const searchTags = async (searchString: string): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];
    const { customHttpClient } = httpClient({
        scope: 'b827c278-12de-47a0-b789-c8d11e3b9571/.default',
    });
    //Test https://stidapitest.equinor.com
    const baseUrl = 'https://stidapitest.equinor.com';
    customHttpClient.setBaseUrl(baseUrl);
    const uri = 'JCA/tags';
    const queryParameters = `tagNo=${encodeURI(searchString)}&skip=0&take=10&noContentAs200=true`;
    const url = `/${uri}?${queryParameters}`;
    await customHttpClient
        .fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.map((x: Tag) => {
                selectOptions.push({
                    label: `TAG_${x.tagNo}`,
                    value: x.tagNo,
                    type: 'stidtag',
                    searchValue: x.tagNo,
                    object: x,
                });
            });
        });

    return selectOptions || [];
};
