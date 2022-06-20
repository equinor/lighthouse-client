import { TableOptions } from '@equinor/WorkSpace';
import { statusColorMap } from '@equinor/GardenUtils';
import { McPackage } from '../../types';
import { CustomLinkCellWithTextDecoration } from '@equinor/Table';
import { proCoSysUrls } from '../../../../packages/ProCoSysUrls/procosysUrl';

const hiddenColumns: (keyof McPackage)[] = [
    'commPkgId',
    'commPkgNumber',
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
    'mcPkgNumber',
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
        'mcPkgNumberUrl',
        'description',
        'discipline',
        'mcStatus',
        'responsible',
        'phase',
        'area',
        'commPkgNoUrl',
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
            title: 'Phase',
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
            width: 150,
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
            width: 150,
        },
        {
            key: 'rfccActualDate',
            title: 'Actual M-03 RFC',
            width: 150,
        },
        {
            key: 'priority',
            title: 'Comm Pri1',
            width: 100,
        },
        {
            key: 'priority2',
            title: 'Comm Pri2',
            width: 100,
        },
        {
            key: 'priority3',
            title: 'Comm Pri3',
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
    customColumns: [
        {
            id: 'mcPkgNumberUrl',
            Header: 'MCpkgno',
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
            accessor: (pkg) => ({
                content: pkg,
                currentKey: 'mcPkgNumber',
                url: proCoSysUrls.getMcUrl(pkg.mcPkgId),
            }),
            Cell: (cellProps) => {
                return (
                    <CustomLinkCellWithTextDecoration
                        contentToBeDisplayed={cellProps.value.content.mcPkgNumber}
                        url={cellProps.value.url}
                    />
                );
            },
        },
        {
            id: 'commPkgNoUrl',
            Header: 'Comm. package',
            Aggregated: () => null,
            aggregate: 'count',
            width: 120,
            accessor: (pkg) => ({
                content: pkg,
                currentKey: 'commPkgNumber',
                url: proCoSysUrls.getCommPkgUrl(pkg.commPkgId),
            }),
            Cell: (cellProps) => {
                return (
                    <CustomLinkCellWithTextDecoration
                        contentToBeDisplayed={cellProps.value.content.commPkgNumber}
                        url={cellProps.value.url}
                    />
                );
            },
        },
    ],
};
