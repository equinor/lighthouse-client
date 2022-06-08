import { httpClient } from '@equinor/lighthouse-portal-client';
import { generateExpressions, generateFamRequest } from '../../../functions/FAM/generateFAMRequest';
import { throwOnError } from '../../../functions/throwError';
import { PunchListItem } from '../../../types/FAM/punchListItem';

export async function getBatchPunch(
    punchIds: string[],
    signal?: AbortSignal
): Promise<PunchListItem[]> {
    const { FAM } = httpClient();

    const columnNames: string[] = ['PunchItemNo', 'Description'];

    const expressions = generateExpressions('PunchItemNo', 'Equals', punchIds);

    const requestArgs = generateFamRequest(columnNames, 'Or', expressions);

    const res = await FAM.fetch('v0.1/dynamic/completion/completionPunchItem/JCA', {
        method: 'POST',
        body: JSON.stringify(requestArgs),
        signal,
    });

    await throwOnError(res, 'Failed to fetch punch');
    const punchListItems: PunchListItem[] = await res.json();

    if (!Array.isArray(punchListItems)) {
        throw 'Invalid response';
    }

    return punchListItems;
}
