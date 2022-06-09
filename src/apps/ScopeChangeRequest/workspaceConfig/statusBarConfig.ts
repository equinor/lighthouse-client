import { StatusItem } from '../../../packages/StatusBar';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';

export function numberFormat(number: number): string {
    return parseFloat(Math.round(number).toString()).toLocaleString('no');
}

export function statusBarConfig(data: ScopeChangeRequest[]): StatusItem[] {
    return [
        {
            title: 'Requests',
            value: () => numberFormat(data.length),
        },
        {
            title: 'Mhrs',
            value: () => {
                const totalMhrs = data.reduce(
                    (count, { disciplineGuesstimates }) =>
                        count +
                        disciplineGuesstimates.reduce((count, curr) => curr.guesstimate + count, 0),
                    0
                );
                return numberFormat(totalMhrs);
            },
        },
        {
            title: 'Pending requests',
            value: () => {
                const pendingRequests = data.reduce(
                    (count, { state }) => (state === 'Open' ? count + 1 : count),
                    0
                );
                return numberFormat(pendingRequests);
            },
        },
        {
            title: 'Pending mhrs',
            value: () =>
                numberFormat(accPendingMhr(data) - accPendingMhr(filterApprovedRequests(data))),
        },
        {
            title: 'Approved requests',
            value: () => numberFormat(filterApprovedRequests(data).length),
        },

        {
            title: 'Approved Mhrs',
            value: () =>
                numberFormat(
                    filterApprovedRequests(data).reduce(
                        (acc, { disciplineGuesstimates }) =>
                            acc +
                            disciplineGuesstimates.reduce(
                                (count, curr) => curr.guesstimate + count,
                                0
                            ),
                        0
                    )
                ),
        },
    ];
}

/**
 * Accumulates pending mhrs
 * @param requests
 * @returns
 */
const accPendingMhr = (requests: ScopeChangeRequest[]) =>
    requests
        .filter(({ state }) => state === 'Open')
        .reduce(
            (count, { disciplineGuesstimates }) =>
                count + disciplineGuesstimates.reduce((count, curr) => curr.guesstimate + count, 0),
            0
        );

/**
 * Returns all approved requests
 * @param requests
 * @returns
 */
const filterApprovedRequests = (requests: ScopeChangeRequest[]) =>
    requests.filter(
        //Magic string
        ({ workflowSteps }) => workflowSteps?.find((s) => s.name === 'Approval')?.isCompleted
    );
