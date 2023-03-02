import { httpClient } from '@equinor/lighthouse-portal-client';
import { TypedSelectOption } from '@equinor/Workflow';
import { McPkg } from '../../../Types/ProCoSys/McPkg';

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
            metadata: `Comm pkg: ${value.CommPkgNo}`,
        })
    );
    return data;
}
