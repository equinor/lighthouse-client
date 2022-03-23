import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { MechanicalCompletionPackage } from '../../Types/ProCoSys/mcPkg';

export async function getMcPkgById(mcPkgId: number): Promise<MechanicalCompletionPackage> {
    const { procosys } = httpClient();

    const responseData: MechanicalCompletionPackage = await procosys
        .fetch(`api/McPkg?plantId=PCS%24JOHAN_CASTBERG&mcPkgId=${mcPkgId}&api-version=4.1`)
        .then((x) => x.json());

    return responseData;
}
