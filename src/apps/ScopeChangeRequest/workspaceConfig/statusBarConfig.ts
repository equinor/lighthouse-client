import { DateTime } from 'luxon';
import { StatusItem } from '../../../packages/StatusBar';
import { kFormatter } from '../functions/kFormatter';
import { ScopeChangeRequest } from '../types/scopeChangeRequest';

export function statusBarConfig(data: ScopeChangeRequest[]): StatusItem[] {
    const requestsMadeLastWeek = data.filter(
        ({ createdAtUtc }) =>
            DateTime.now()
                .diff(DateTime.fromJSDate(new Date(createdAtUtc)))
                .as('days') <= 7
    );

    const requestsApprovedLastSevenDays = filterApprovedRequests(data).filter(
        ({ workflowSteps = [] }) =>
            workflowSteps[workflowSteps.length - 1]?.criterias.every(
                ({ signedAtUtc }) =>
                    signedAtUtc &&
                    DateTime.now()
                        .diff(DateTime.fromJSDate(new Date(signedAtUtc)))
                        .as('days') <= 7
            )
    );

    return [
        {
            title: 'Requests',
            value: () => `${kFormatter(data.length)} (+${kFormatter(requestsMadeLastWeek.length)})`,
        },
        {
            title: 'Mhrs',
            value: () => {
                const manhrsLastWeek = kFormatter(
                    requestsMadeLastWeek.reduce(
                        (count, { guesstimateHours }) => count + guesstimateHours,
                        0
                    )
                );

                const totalMhrs = kFormatter(
                    data.reduce((count, { guesstimateHours }) => count + guesstimateHours, 0)
                );

                return `${totalMhrs} (+${manhrsLastWeek})`;
            },
        },
        {
            title: 'Pending requests',
            value: () => {
                const pendingRequests = kFormatter(
                    data.reduce((count, { state }) => (state === 'Open' ? count + 1 : count), 0)
                );

                const pendingRequestMadeLastWeek = kFormatter(
                    requestsMadeLastWeek.filter(({ state }) => state === 'Open').length
                );

                return `${pendingRequests} (+${pendingRequestMadeLastWeek})`;
            },
        },
        {
            title: 'Pending mhrs',
            value: () => {
                const pendingRequestsMhr = kFormatter(accPendingMhr(data));

                const pendingRequestMhrMadeLastWeek = kFormatter(
                    accPendingMhr(requestsMadeLastWeek)
                );

                return `${pendingRequestsMhr} (+${pendingRequestMhrMadeLastWeek})`;
            },
        },
        {
            title: 'Approved requests',
            value: () => {
                const requestsApprovedCount = kFormatter(filterApprovedRequests(data).length);

                return `${requestsApprovedCount} (+${kFormatter(
                    requestsApprovedLastSevenDays.length
                )})`;
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

                const approvedMhrsLastSevenDays = kFormatter(
                    requestsApprovedLastSevenDays.reduce(
                        (count, { guesstimateHours }) => count + guesstimateHours,
                        0
                    )
                );

                return `${approvedMhrs} (+${approvedMhrsLastSevenDays})`;
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
