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
                    (count, { guesstimateHours }) => count + guesstimateHours,
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
            value: () => numberFormat(accPendingMhr(data)),
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
                        (acc, { guesstimateHours }) => acc + guesstimateHours,
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
        .reduce((count, { guesstimateHours }) => count + guesstimateHours, 0);

/**
 * Returns all approved requests
 * @param requests
 * @returns
 */
const filterApprovedRequests = (requests: ScopeChangeRequest[]) =>
    requests
        .filter(({ workflowSteps }) => workflowSteps !== null)
        .filter(({ workflowSteps }) =>
            workflowSteps[workflowSteps.length - 1].criterias.every(
                ({ signedState }) => signedState === 'Approved'
            )
        );
