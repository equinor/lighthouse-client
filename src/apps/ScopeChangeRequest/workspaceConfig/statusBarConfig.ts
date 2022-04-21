import { StatusItem } from '../../../packages/StatusBar';
import { kFormatter } from '../functions/kFormatter';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';

export function statusBarConfig(data: ScopeChangeRequest[]): StatusItem[] {
    return [
        {
            title: 'Requests',
            value: () => `${kFormatter(data.length)}`,
        },
        {
            title: 'Mhrs',
            value: () => {
                const totalMhrs = kFormatter(
                    data.reduce((count, { guesstimateHours }) => count + guesstimateHours, 0)
                );

                return `${totalMhrs}`;
            },
        },
        {
            title: 'Pending requests',
            value: () => {
                const pendingRequests = kFormatter(
                    data.reduce((count, { state }) => (state === 'Open' ? count + 1 : count), 0)
                );

                return `${pendingRequests}`;
            },
        },
        {
            title: 'Pending mhrs',
            value: () => {
                const pendingRequestsMhr = kFormatter(accPendingMhr(data));

                return `${pendingRequestsMhr}`;
            },
        },
        {
            title: 'Approved requests',
            value: () => {
                const requestsApprovedCount = kFormatter(filterApprovedRequests(data).length);

                return `${requestsApprovedCount}`;
            },
        },

        {
            title: 'Approved Mhrs',
            value: () => {
                const approvedMhrs = kFormatter(
                    filterApprovedRequests(data).reduce(
                        (acc, { guesstimateHours }) => acc + guesstimateHours,
                        0
                    )
                );

                return `${approvedMhrs}`;
            },
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
