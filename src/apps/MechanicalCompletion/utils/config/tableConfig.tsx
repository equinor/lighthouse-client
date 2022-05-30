import { TableOptions } from '@equinor/WorkSpace';
import { statusColorMap } from '../../../../packages/GardenUtils/src';
import { McPackage } from '../../types';

const hiddenColumns: (keyof McPackage)[] = [
    'commPkgId',
    'commPkgStatus',
    'remark',
    'subsystem',
    'url',
    'tacIsAccepted',
    'tacForecastDate',
    'tacIsShipped',
    'tacPlannedDate',
    'tagVolume',
    'createdDate',
    'siteCodes',
    'updatedDate',
    'projectIdentifier',
    'projectDescription',
    'mcPkgId',
    'disciplineDescription',
    'finalPunchForecastDate',
    'punchAcceptActualDate',
    'rfocForecastDate',
    'rfocActualDate',
    'rfocPlannedDate',
    'rfocIsShipped',
    'rfocIsRejected',
    'rfocIsAccepted',
    'rfccForecastDate',
    'rfccIsShipped',
    'rfccIsAccepted',
    'rfccIsRejected',
    'rfccShippedDate',
    'certificateNumber',
    'priorityDescription',
    'priority2Description',
    'priority3Description',
    'date',
    'order',
    'rowKey',
    'isVoided',
];

export const tableConfig: TableOptions<McPackage> = {
    objectIdentifierKey: 'mcPkgId',
    hiddenColumns,
    itemSize: 32,
    columnOrder: [
        'mcPkgNumber',
        'description',
        'discipline',
        'mcStatus',
        'responsible',
        'phase',
        'area',
        'commPkgNumber',
        'system',
        'finalPunchForecastDate',
        'finalPunchPlannedDate',
        'finalPunchActualDate',
        'rfccPlannedDate',
        'rfccActualDate',
        'priority',
        'priority2',
        'priority3',
    ],
    headers: [
        {
            key: 'mcPkgNumber',
            title: 'MC Package',
            width: 200,
        },
        {
            key: 'description',
            title: 'Description',
            width: 300,
        },
        {
            key: 'system',
            title: 'System',
            width: 100,
        },
        {
            key: 'responsible',
            title: 'Responsible',
            width: 150,
        },
        {
            key: 'phase',
            title: 'MC Package Phase',
        },
        {
            key: 'discipline',
            title: 'Discipline',
            width: 100,
        },
        {
            key: 'mcStatus',
            title: 'MC Status',
            width: 100,
        },
        {
            key: 'area',
            title: 'MC Package Area',
            width: 200,
        },
        {
            key: 'commPkgNumber',
            title: 'Comm. Package',
            width: 200,
        },
        {
            key: 'finalPunchPlannedDate',
            title: 'Forecast M-01 Final Punch',
            width: 200,
        },

        {
            key: 'finalPunchActualDate',
            title: 'Actual M-01 Actual Date',
            width: 200,
        },
        {
            key: 'rfccPlannedDate',
            title: 'Forecast M-03 RFC',
            width: 200,
        },
        {
            key: 'rfccActualDate',
            title: 'Actual M-03 RFC',
            width: 200,
        },
        {
            key: 'priority',
            title: 'Comm Pri1',
            width: 150,
        },
        {
            key: 'priority2',
            title: 'Comm Pri2',
            width: 150,
        },
        {
            key: 'priority3',
            title: 'Comm Pri3',
            width: 150,
        },
    ],
    customCellView: [
        {
            key: 'description',
            type: 'Description',
        },
        {
            key: 'mcStatus',
            type: 'Status',
            cellAttributeFn: (item) => {
                const mcColor = statusColorMap[item.mcStatus];
                return {
                    style: {
                        backgroundColor: mcColor,
                    },
                };
            },
        },
        {
            key: 'rfccActualDate',
            type: 'YearAndWeek',
        },
        {
            key: 'rfccPlannedDate',
            type: 'YearAndWeek',
        },
        {
            key: 'finalPunchActualDate',
            type: 'YearAndWeek',
        },
        {
            key: 'finalPunchPlannedDate',
            type: 'YearAndWeek',
        },
    ],
};
