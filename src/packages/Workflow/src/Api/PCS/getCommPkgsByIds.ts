import { httpClient } from '@equinor/lighthouse-portal-client';
import { CommissioningPackage } from '../../Types/ProCoSys/CommissioningPackage';

export async function getCommPkgsByIds(commPkgNumbers: string[]): Promise<CommissioningPackage[]> {
  const { procosys } = httpClient();

  const res = await procosys.fetch(
    `/api/CommPkg/ByCommPkgNos?plantId=PCS%24JOHAN_CASTBERG${commPkgNumbers.map(
      (x) => `&commPkgNos=${x}`
    )}&projectName=L.O532C.002&api-version=4.1`
  );

  if (!res.ok) {
    throw 'Failed to get commissioning packages';
  }

  return await res.json();
}
