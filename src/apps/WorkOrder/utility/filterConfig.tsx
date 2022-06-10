import { FollowUpStatuses } from '@equinor/GardenUtils';
import { FilterOptions } from '../../../packages/Filter/Types';
import { daysDiff } from '../../Handover/utility/helpers/daysDiff';
import { getFilterDateValues } from '../../Handover/utility/helpers/getFilterDateValues';
import { FollowUpStatusFilter } from '../components';
import { WorkOrder } from '../Garden/models';
import { getFollowUpStatus, followUpStatusPriorityMap } from '../Garden/utility';

type Progress = 'Not Started' | '0-25%' | '25-50%' | '50-75%' | '75-95%' | '95-99%' | '100%';
const progressPriMap: Record<Progress, number> = {
    'Not Started': 1,
    '0-25%': 2,
    '25-50%': 3,
    '50-75%': 4,
    '75-95%': 5,
    '95-99%': 6,
    '100%': 7,
};

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
        name: 'Start date',
        valueFormatter: ({ plannedStartupDate, actualStartupDate }) => {
            const plannedDate = new Date(plannedStartupDate || '');
            const actualDate = new Date(actualStartupDate || '');
            const dateDiffs = daysDiff(plannedDate);

            // If planned start date is a date that has already been
            // and the actual date happened later than the planned or that there is no actual date
            if (
                dateDiffs.days <= 0 &&
                (actualDate.getTime() > plannedDate.getTime() || !actualStartupDate)
            ) {
                return 'Overdue';
            }
            //If actual start date happened before planned start date
            else if (actualDate.getTime() < plannedDate.getTime()) {
                return 'Other';
            } else {
                return getFilterDateValues(dateDiffs.days);
            }
        },
    },
    {
        name: 'Finish date',
        valueFormatter: ({ plannedFinishDate, actualFinishDate }) => {
            const plannedDate = new Date(plannedFinishDate || '');
            const actualDate = new Date(actualFinishDate || '');
            const dateDiffs = daysDiff(plannedDate);

            if (
                dateDiffs.days <= 0 &&
                (actualDate.getTime() > plannedDate.getDate() || !actualFinishDate)
            ) {
                return 'Overdue';
            } else if (actualDate.getTime() < plannedDate.getTime()) {
                return 'Other';
            } else {
                return getFilterDateValues(dateDiffs.days);
            }
        },
    },
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
    {
        name: 'Progress',
        valueFormatter: ({ projectProgress }): Progress => {
            const progress = parseFloat(projectProgress || '');
            if (progress >= 100) {
                return '100%';
            } else if (progress >= 95) {
                return '95-99%';
            } else if (progress >= 75) {
                return '75-95%';
            } else if (progress >= 50) {
                return '50-75%';
            } else if (progress >= 25) {
                return '25-50%';
            } else if (progress > 0) {
                return '0-25%';
            } else {
                return 'Not Started';
            }
        },
        sort: (filterValues) =>
            filterValues.sort(
                (a, b) => progressPriMap[a as Progress] - progressPriMap[b as Progress]
            ),
        defaultHidden: true,
    },
];
