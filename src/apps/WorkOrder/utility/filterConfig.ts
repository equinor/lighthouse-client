import { FilterOptions } from '../../../packages/Filter/Types';
import { WorkOrder } from '../Garden/models';
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
    {
        name: 'Progress',
        valueFormatter: ({ projectProgress }): Progress => {
            const progress = parseFloat(projectProgress);
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
