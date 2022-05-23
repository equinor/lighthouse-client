import { FollowUpStatuses } from '@equinor/GardenUtils';
import { FilterOptions } from '../../../packages/Filter/Types';
import { FollowUpStatusFilter } from '../components';
import { WorkOrder } from '../Garden/models';
import { getFollowUpStatus, followUpStatusPriorityMap } from '../Garden/utility';

export const filterConfig: FilterOptions<WorkOrder> = [
    // {
    //     name: 'Work order',
    //     valueFormatter: ({ workOrderNumber }) => workOrderNumber,
    //     defaultHidden: true,
    // },

    {
        name: 'Discipline',
        valueFormatter: ({ disciplineCode }) => disciplineCode,
    },
    {
        name: 'Job status',
        valueFormatter: ({ jobStatus }) => jobStatus,
    },
    {
        name: 'Status',
        valueFormatter: (workOrder) => getFollowUpStatus(workOrder),
        sort: (filterValues) =>
            filterValues.sort(
                (a, b) =>
                    followUpStatusPriorityMap[b as FollowUpStatuses] -
                    followUpStatusPriorityMap[a as FollowUpStatuses]
            ),
        customValueRender: (filterValue) => {
            return <FollowUpStatusFilter status={filterValue as FollowUpStatuses} />;
        },
    },
    {
        name: 'Responsible',
        valueFormatter: ({ responsibleCode }) => responsibleCode,
    },
    {
        name: 'Milestone',
        valueFormatter: ({ milestoneCode }) => milestoneCode,
    },
    // {
    //     name: 'Planned start',
    //     valueFormatter: ({ plannedStartDate,   }) => plannedStartDate,

    // },
    // {
    //     name: 'Planned Finish',
    //     valueFormatter: ({ plannedFinishDate }) => plannedFinishDate,
    // },
    {
        name: 'Material',
        valueFormatter: ({ materialStatus }) => materialStatus,
    },
    {
        name: 'Hold',
        valueFormatter: ({ holdBy }) => holdBy,
    },
    {
        name: 'MC',
        valueFormatter: ({ mccrStatus }) => mccrStatus,
        defaultHidden: true,
    },
];
