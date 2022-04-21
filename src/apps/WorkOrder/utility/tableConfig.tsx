import { tokens } from '@equinor/eds-tokens';
import { TableOptions } from '../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { WorkOrder } from '../Garden/models';
import { getMatStatusColor, getMccrStatusColor } from '../Garden/utility';
const hiddenColumns: (keyof WorkOrder)[] = [
    'projectIdentifier',
    'discipline',
    'responsible',
    'milestoneCode',
    'w1ActualDate',
    'w2ActualDate',
    'w3ActualDate',
    'w4ActualDate',
    'w5ActualDate',
    'w6ActualDate',
    'w7ActualDate',
    'w8ActualDate',
    'w9ActualDate',
    'w10ActualDate',
    'commpkgNumber',
    'workOrderId',
    'materialComments',
    'constructionComments',
    'holdByDescription',
    'projectDescription',
];
export const tableConfig: TableOptions<WorkOrder> = {
    objectIdentifierKey: 'workOrderNumber',
    itemSize: 32,
    hiddenColumns,
    columnOrder: [
        'workOrderNumber',
        'description',
        'disciplineCode',
        'jobStatus',
        'responsibleCode',
        'milestone',
        'commpkgNumber',
        'plannedStartDate',
        'plannedFinishDate',
        'estimatedHours',
        'expendedHours',
        'remainingHours',
        'projectProgress',
        'materialStatus',
        'holdBy',
        'mccrStatus',
    ] as (keyof WorkOrder)[],
    headers: [
        {
            key: 'workOrderNumber',
            title: 'Workorder',
            width: 200,
        },
        {
            key: 'description',
            title: 'Description',
            width: 300,
        },
        {
            key: 'disciplineCode',
            title: 'Discipline',
            width: 100,
        },
        {
            key: 'jobStatus',
            title: 'Job Status',
            width: 150,
        },
        {
            key: 'responsibleCode',
            title: 'Responsible',
            width: 100,
        },
        {
            key: 'milestone',
            title: 'Milestone',
            width: 150,
        },
        {
            key: 'plannedStartupDate',
            title: 'Planned start',
            width: 150,
        },
        {
            key: 'plannedFinishDate',
            title: 'Planned finish',
            width: 150,
        },
        {
            key: 'estimatedHours',
            title: 'Est mhr',
            width: 100,
        },
        {
            key: 'expendedHours',
            title: 'Exp mhr',
            width: 100,
        },
        {
            key: 'remainingHours',
            title: 'Rem mhrs',
            width: 100,
        },
        {
            key: 'projectProgress',
            title: 'Progress',
            width: 100,
        },
        {
            key: 'materialStatus',
            title: 'Material',
            width: 100,
        },
        {
            key: 'holdBy',
            title: 'Hold',
            width: 100,
        },
        {
            key: 'mccrStatus',
            title: 'MC',
            width: 100,
        },
    ],
    customCellView: [
        {
            key: 'description',
            type: 'Description',
        },
        {
            key: 'plannedStartupDate',

            type: 'YearAndWeek',
        },
        {
            key: 'plannedFinishDate',
            type: 'YearAndWeek',
        },
        {
            key: 'estimatedHours',
            type: 'Number',
        },
        {
            key: 'expendedHours',
            type: 'Number',
        },
        {
            key: 'remainingHours',
            type: 'Number',
        },
        {
            key: 'projectProgress',
            type: 'Progress',
        },
        {
            key: 'mccrStatus',
            type: 'Status',
            cellAttributeFn: (item) => {
                const statusColor = getMccrStatusColor(item);
                return {
                    style: {
                        backgroundColor: item.mccrStatus !== '' ? statusColor : 'transparent',
                    },
                };
            },
        },
        {
            key: 'materialStatus',
            type: 'Status',
            cellAttributeFn: (item) => {
                const statusColor = getMatStatusColor(item);
                return {
                    style: {
                        backgroundColor: item.materialStatus !== '' ? statusColor : 'transparent',
                    },
                };
            },
        },
        {
            key: 'holdBy',
            type: 'Status',
            cellAttributeFn: (item) => {
                return {
                    style: {
                        backgroundColor: item.holdBy
                            ? tokens.colors.interactive.danger__resting.hsla
                            : 'transparent',
                    },
                };
            },
        },
    ],
};
