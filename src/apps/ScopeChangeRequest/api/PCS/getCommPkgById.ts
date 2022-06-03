import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { CommissioningPackage } from '../../types/ProCoSys/CommissioningPackage';

export async function getCommPkgById(
    plantId: string,
    commPkgNo: number,
    signal?: AbortSignal
): Promise<CommissioningPackage> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/CommPkg?plantId=${plantId}&commPkgId=${commPkgNo}&api-version=4.1`,
        { signal }
    );
    if (!res.ok) {
        throw 'Failed to get commissioning package';
    }

    return await res.json();
}
