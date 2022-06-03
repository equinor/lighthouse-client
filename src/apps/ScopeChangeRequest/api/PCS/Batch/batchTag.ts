import { httpClient } from '../../../../../Core/Client/Functions';
import { Tag } from '../../../types/ProCoSys/Tag';
import { TypedSelectOption } from '../../Search/searchType';

export async function fetchBatchTags(
    tagNos: string[],
    signal: AbortSignal
): Promise<TypedSelectOption[]> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/tag/ByTagNos?plantId=PCS%24JOHAN_CASTBERG&projectName=L.O532C.002&api-version=4.1${tagNos
            .map((x) => `&tagNos=${x}`)
            .toString()
            .replaceAll(',', '')}`,
        { signal }
    );

    const data: TypedSelectOption[] = (await res.json()).map(
        (value: Tag): TypedSelectOption => ({
            type: 'tag',
            label: `${value.TagNo} - ${value.Description}`,
            object: value,
            searchValue: value.TagNo,
            value: value.TagNo,
            metadata: value.Description,
        })
    );
    return data;
}
