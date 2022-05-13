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
    'commPkgNumber',
    'mcPkgId',
    'disciplineDescription',
    'priority',
    'priority2',
    'priority3',
    'finalPunchActualDate',
    'finalPunchForecastDate',
    'finalPunchPlannedDate',
    'punchAcceptActualDate',
    'rfocForecastDate',
    'rfocActualDate',
    'rfocPlannedDate',
    'rfccActualDate',
    'rfccForecastDate',
    'rfocIsShipped',
    'rfocIsRejected',
    'rfocIsAccepted',
    'rfccPlannedDate',
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
    'phase',
];

export const tableConfig: TableOptions<McPackage> = {
    objectIdentifierKey: 'mcPkgId',
    hiddenColumns,
    columnOrder: [
        'mcPkgNumber',
        'description',
        'system',
        ' responsible',
        'discipline',
        'mcStatus',
        'area',
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
            title: 'Area',
            width: 100,
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
    ],
};
