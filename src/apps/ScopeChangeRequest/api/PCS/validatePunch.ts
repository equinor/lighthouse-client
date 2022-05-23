import { httpClient } from '@equinor/lighthouse-portal-client';

export async function validatePunch(plNumber: string, signal?: AbortSignal): Promise<boolean> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/PunchListItem?plantId=PCS%24JOHAN_CASTBERG&punchItemId=${plNumber}&api-version=4.1`,
        { signal }
    );

    if (res.status === 404) {
        return false;
    }
    if (!res.ok) {
        throw 'Failed to validate punch';
    }
    return true;
}
