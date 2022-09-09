import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { Tag } from '../../../types/STID/tag';
import { TypedSelectOption } from '../../../types/search/searchType';

export const searchTags = async (
    searchString: string,
    facilityId: string,
    signal?: AbortSignal
): Promise<TypedSelectOption[]> => {
    const selectOptions: TypedSelectOption[] = [];
    const { STID } = httpClient();

    const uri = `${facilityId}/tags`;
    const queryParameters = `tagNo=${encodeURI(searchString)}&skip=0&take=10&noContentAs200=true`;
    const url = `/${uri}?${queryParameters}`;
    await STID.fetch(url, { signal })
        .then((response) => response.json())
        .then((data) => {
            data.map((x: Tag) => {
                selectOptions.push({
                    label: `${x.tagNo}`,
                    value: x.tagNo,
                    type: 'stidtag',
                    searchValue: x.tagNo,
                    object: x,
                });
            });
        });

    return selectOptions || [];
};
