import { httpClient } from '@equinor/lighthouse-portal-client';
import { CommPkgProperty } from '../../../Components/Form/Inputs/ScopeChangeReferences/ScopeChangeReferences';
import { Tag } from '../../../types/ProCoSys/Tag';
import { TypedSelectOption } from '../../../types/search/searchType';

export async function fetchBatchTags(
    tagNos: string[],
    signal?: AbortSignal
): Promise<TypedSelectOption[]> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/tag/bytagnos?plantId=PCS%24JOHAN_CASTBERG&projectName=L.O532C.002&api-version=4.1${tagNos
            .map((x) => `&tagNos=${encodeURIComponent(x)}`)
            .toString()
            .replaceAll(',', '')}`,
        { signal }
    );

    const data: TypedSelectOption[] = (await res.json()).map(
        (value: Tag): TypedSelectOption => ({
            type: 'tag',
            label: `${value.TagNo} - ${value.Description}`,
            object: { ...value, [CommPkgProperty]: value.CommPkgNo },
            searchValue: value.TagNo,
            value: value.TagNo,
            metadata: value.Description,
        })
    );
    return data;
}
