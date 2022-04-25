import { TableOptions } from '../../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { Status } from '../../Garden/components/commonStyles';
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
            width: 140,
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
            title: 'MC Status',
            width: 120,
        },
        {
            key: 'commpkgStatus',
            title: 'Comm Status',
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
            type: {
                Cell: ({ cell }) => {
                    const commStatus = cell.value.content.commpkgStatus;
                    const commStatusColor = getDotsColor(commStatus);
                    return <Status color={commStatusColor}>{commStatus}</Status>;
                },
            },
        },
        {
            key: 'mcStatus',
            type: {
                Cell: ({ cell }) => {
                    const mcStatus = cell.value.content.mcStatus;
                    const mcStatusColor = getDotsColor(mcStatus);
                    return <Status color={mcStatusColor}>{mcStatus}</Status>;
                },
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
