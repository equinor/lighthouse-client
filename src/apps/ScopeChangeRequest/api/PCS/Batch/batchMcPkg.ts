import { httpClient } from '@equinor/lighthouse-portal-client';
import { McPkg } from '../../../types/ProCoSys/McPkg';
import { TypedSelectOption } from '../../Search/searchType';

export async function fetchBatchMcPkg(
    mcPkgNo: string[],
    signal?: AbortSignal
): Promise<TypedSelectOption[]> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/McPkgs/ByMcPkgNos?plantId=PCS%24JOHAN_CASTBERG&projectName=L.O532C.002&api-version=4.1${mcPkgNo
            .map((x) => `&mcPkgNos=${encodeURIComponent(x)}`)
            .toString()
            .replaceAll(',', '')}`,
        { signal }
    );

    const data: TypedSelectOption[] = (await res.json()).map(
        (value: McPkg): TypedSelectOption => ({
            type: 'mcpkg',
            label: `${value.McPkgNo} - ${value.Description}`,
            object: value,
            searchValue: value.McPkgNo,
            value: value.McPkgNo,
            metadata: value.Description,
        })
    );
    return data;
}
