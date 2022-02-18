import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { CommissioningPackage } from '../../Types/ProCoSys/CommissioningPackage';

export async function getCommPkgById(commPkgNo: number): Promise<CommissioningPackage> {
    const { procosys } = httpClient();

    const responseData: CommissioningPackage = await procosys
        .fetch(`api/CommPkg?plantId=PCS%24JOHAN_CASTBERG&commPkgId=${commPkgNo}&api-version=4.1`)
        .then((x) => x.json());

    return responseData;
}
