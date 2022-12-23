import { httpClient } from '@equinor/lighthouse-portal-client';
import { McPkg } from '../../Types/ProCoSys/McPkg';

export async function getMcPkgById(
    plantId: string,
    mcPkgNo: number,
    signal?: AbortSignal
): Promise<McPkg> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/McPkg?plantId=${plantId}&mcPkgId=${mcPkgNo}&api-version=4.1`,
        { signal }
    );
    if (!res.ok) {
        throw 'Failed to get mc package';
    }

    return await res.json();
}
