import { httpClient } from '@equinor/lighthouse-portal-client';
import { TypedSelectOption } from '@equinor/Workflow';
import { CommissioningPackage } from '../../../Types/ProCoSys/CommissioningPackage';

export async function fetchBatchCommPkg(
  commPkgNo: string[],
  signal?: AbortSignal
): Promise<TypedSelectOption[]> {
  const { procosys } = httpClient();

  const res = await procosys.fetch(
    `api/commpkg/BycommpkgNos?plantId=PCS%24JOHAN_CASTBERG&projectName=L.O532C.002&api-version=4.1${commPkgNo
      .map((x) => `&commPkgNos=${encodeURIComponent(x)}`)
      .toString()
      .replaceAll(',', '')}`,
    { signal }
  );

  const data: TypedSelectOption[] = (await res.json()).map(
    (value: CommissioningPackage): TypedSelectOption => ({
      type: 'commpkg',
      label: `${value.CommPkgNo} - ${value.Description}`,
      object: value,
      searchValue: value.CommPkgNo,
      value: value.CommPkgNo,
      metadata: value.Description,
    })
  );
  return data;
}
