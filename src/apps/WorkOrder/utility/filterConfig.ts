import { FilterOptions } from '../../../packages/Filter/Types';
import { WorkOrder } from '../Garden/models';

export const filterConfig: FilterOptions<WorkOrder> = [
    {
        name: 'Work order',
        valueFormatter: ({ workOrderNumber }) => workOrderNumber,
        defaultHidden: true,
    },

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
    {
        name: 'Planned start',
        valueFormatter: ({ plannedStartDate }) => plannedStartDate,
    },
    {
        name: 'Planned Finish',
        valueFormatter: ({ plannedFinishDate }) => plannedFinishDate,
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
];
