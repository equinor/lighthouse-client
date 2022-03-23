import { httpClient } from '../../../../Core/Client/Functions';
import { throwOnError } from '../../Functions/throwError';
import { BaseMechanicalCompletionPackage } from '../../Types/ProCoSys/mcPkg';

export async function getMcPkgsFromCommPkg(
    commPkgNo: string
): Promise<BaseMechanicalCompletionPackage[]> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/CommPkg/McPkgs?plantId=PCS%24JOHAN_CASTBERG&projectName=L.O532C.002&commPkgNo=${commPkgNo}&api-version=4.1`
    );
    throwOnError(res);

    return await res.json();
}
