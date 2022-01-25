import { BaseClient } from '../../../../../../packages/httpClient/src';
import { TypedSelectOption } from '../searchType';
import { Tag } from '../../STID/Types/Tag';

export const searchTags = async (
    searchString: string,
    stidClient: BaseClient
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];

    //Test https://stidapitest.equinor.com
    const baseUrl = 'https://stidapitest.equinor.com';
    const uri = 'JCA/tags';
    const queryParameters = `tagNo=${encodeURI(searchString)}&skip=0&take=7&noContentAs200=true`;
    const url = `${baseUrl}/${uri}?${queryParameters}`;
    await stidClient
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
