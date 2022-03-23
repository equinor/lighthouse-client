import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { CommissioningPackage } from '../../Types/ProCoSys/CommissioningPackage';

export async function getCommPkgById(commPkgNo: number): Promise<CommissioningPackage> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/CommPkg?plantId=PCS%24JOHAN_CASTBERG&commPkgId=${commPkgNo}&api-version=4.1`
    );
    if (!res.ok) {
        throw 'Failed to get commissioning package';
    }

    return await res.json();
}
