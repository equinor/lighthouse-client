import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { Tag } from '../../STID/Types/Tag';
import { TypedSelectOption } from '../searchType';

export const searchTags = async (searchString: string): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];
    const { STID } = httpClient();

    //Test https://stidapitest.equinor.com
    const baseUrl = 'https://stidapi.equinor.com';
    STID.setBaseUrl(baseUrl);
    const uri = 'JCA/tags';
    const queryParameters = `tagNo=${encodeURI(searchString)}&skip=0&take=8&noContentAs200=true`;
    const url = `/${uri}?${queryParameters}`;
    await STID.fetch(url)
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
