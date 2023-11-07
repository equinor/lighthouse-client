import { TableOptions } from '../../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { HandoverPackage } from '../../Garden/models';
import { getDotsColor } from '../../Garden/utility';
export const hiddenColumns: (keyof HandoverPackage)[] = [
    'siteCode',
    'projectIdentifier',
    'projectDescription',
    'progress',
    'priority1Description',
    'priority2Description',
    'priority3Description',
    'actualStartDate',
    'plannedFinishDate',
    'actualFinishDate',
    'url',
    'id',
    'mcDisciplines',
    'hasUnsignedActions',
    'forecastFinishDate',
    'volume',
    'forecastTacDate',
    'mcPkgsCount',
    'mcPkgsRFCCShippedCount',
    'mcPkgsRFCCSigned',
    'mcPkgsRFOCShipped',
    'mcPkgsRFOCSigned',
    'tacIsAccepted',
    'tacIsShipped',
    'tacIsRejected',
    'plannedTacDate',
    'isSubsea',
    'isDemolition',
    'demolitionPlannedStartDate',
    'demolitionForecastStartDate',
    'demolitionActualStartDate',
    'demolitionPlannedFinishDate',
    'demolitionForecastFinishDate',
    'demolitionActualFinishDate',
    'createdDate',
    'remark',
    'rfocIsShipped',
    'rfocIsAccepted',
    'rfocIsRejected',
    'rfccIsShipped',
    'rfccIsAccepted',
    'rfccIsRejected',
    'subSystem',
    'isReadyForStartup',
    'isInOperation',
    'hasMaintenanceProgram',
    'hasYellowLineMarkup',
    'hasBlueLineMarkup',
    'yellowLineStatus',
    'blueLineStatus',
    'hasOperationAgreement',
    'demolitionDCCAcceptedDate',
    'demolitionRFRCShippedDate',
    'tacActualDate',
    'rfccShippedDate',
    'rfocShippedDate',
    'rfocForecastDate',
    'phase',
    'rowKey',
];
export const tableConfig: TableOptions<HandoverPackage> = {
    objectIdentifierKey: 'commpkgNo',
    hiddenColumns: hiddenColumns,
    columnOrder: [
        'commpkgNo',
        'description',
        'mcDisciplineCodes',
        'mcStatus',
        'commpkgStatus',
        'responsible',
        'area',
        'system',
        'priority1',
        'priority2',
        'priority3',
        'plannedStartDate',
        'forecastStartDate',
        'rfocPlannedDate',
        'rfocActualDate',
    ],
    headers: [
        {
            key: 'commpkgNo',
            title: 'Commpkgno',
            width: 100,
        },
        {
            key: 'description',
            title: 'Description',
            width: 300,
        },
        {
            key: 'mcDisciplineCodes',
            title: 'Disciplines',
        },
        {
            key: 'mcStatus',
            title: 'MC status',
            width: 120,
        },
        {
            key: 'commpkgStatus',
            title: 'Comm status',
            width: 120,
        },
        {
            key: 'responsible',
            title: 'Responsible',
            width: 120,
        },
        {
            key: 'area',
            title: 'Area',
            width: 135,
        },
        {
            key: 'system',
            title: 'System',
            width: 100,
        },
        {
            key: 'priority1',
            title: 'Priority 1',
            width: 120,
        },
        {
            key: 'priority2',
            title: 'Priority 2',
            width: 120,
        },
        {
            key: 'priority3',
            title: 'Priority 3',
            width: 120,
        },
        {
            key: 'plannedStartDate',
            title: 'Planned RFC',
            width: 150,
        },
        {
            key: 'forecastStartDate',
            title: 'Forecast RFC',
            width: 150,
        },
        {
            key: 'rfocPlannedDate',
            title: 'Planned RFO',
            width: 150,
        },
        {
            key: 'rfocActualDate',
            title: 'Actual RFO',
            width: 150,
        },
    ],

    customCellView: [
        {
            key: 'commpkgStatus',
            type: 'Status',
            cellAttributeFn: (item) => {
                return {
                    style: {
                        backgroundColor: item.commpkgStatus
                            ? getDotsColor(item.commpkgStatus)
                            : 'transparent',
                    },
                };
            },
        },
        {
            key: 'mcStatus',
            type: 'Status',
            cellAttributeFn: (item) => {
                return {
                    style: {
                        backgroundColor: item.mcStatus
                            ? getDotsColor(item.mcStatus)
                            : 'transparent',
                    },
                };
            },
        },

        {
            key: 'description',
            type: 'Description',
        },
        {
            key: 'mcDisciplineCodes',
            type: {
                Cell: (cell) => {
                    const disciplines = cell.value.content.mcDisciplineCodes
                        .join(',')
                        .replace(/,/g, ', ');
                    return <>{disciplines}</>;
                },
            },
        },
        {
            key: 'plannedStartDate',
            type: 'Date',
        },
        {
            key: 'forecastStartDate',
            type: 'Date',
        },
        {
            key: 'rfocPlannedDate',
            type: 'Date',
        },
        {
            key: 'rfocActualDate',
            type: 'Date',
        },
    ],
};
