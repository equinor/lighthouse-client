import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { CommissioningPackage } from './Types/CommissioningPackage';

export async function getCommPkgsByIds(commPkgNumbers: string[]): Promise<CommissioningPackage[]> {
    const { procosys } = httpClient();

    return await procosys
        .fetch(
            `/api/CommPkg/ByCommPkgNos?plantId=PCS%24JOHAN_CASTBERG${commPkgNumbers.map(
                (x) => `&commPkgNos=${x}`
            )}&api-version=4.1`
        )
        .then((x) => x.json());
}
