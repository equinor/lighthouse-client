import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { PunchListItem } from '../../Types/FAMTypes';
import { throwOnError } from '../throwOnError';

export async function getPunchListItemByNo(
    id: number,
    signal?: AbortSignal
): Promise<PunchListItem> {
    const { FAM } = httpClient();

    const columnNames: string[] = ['PunchItemNo', 'Description'];

    const expressions = generateExpressions('PunchItemNo', 'Equals', [id.toString()]);

    const requestArgs = generateFamRequest(columnNames, 'Or', expressions);

    const res = await FAM.fetch(
        'v1/typed/completion/completionPunchItem/facility/JCA?view-version=v1',
        {
            method: 'POST',
            body: JSON.stringify(requestArgs),
            signal,
        }
    );

    await throwOnError(res, 'Failed to fetch punch');
    const punchListItems: PunchListItem[] = await res.json();

    if (!Array.isArray(punchListItems)) {
        throw 'Invalid response';
    }

    if (punchListItems.length !== 1) {
        throw 'More or less than one item returned';
    }

    return punchListItems[0];
}
