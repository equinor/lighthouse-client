import { TableOptions } from '@equinor/WorkSpace';
import { statusColorMap } from '@equinor/GardenUtils';
import { McPackage } from '../../types';
import {
    CustomColumn,
    CustomDescriptionCell,
    CustomLinkCellWithTextDecoration,
    CustomYearAndWeekCell,
    StatusCustomCell,
} from '@equinor/Table';
import { proCoSysUrls } from '@equinor/procosys-urls';

const customColumns: CustomColumn<McPackage>[] = [
    {
        id: 'mcPkgNumber',
        Header: 'McpkgNo',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'mcPkgNumber',
            url: proCoSysUrls.getMcUrl(pkg.mcPkgId),
        }),
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
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
        id: 'description',
        Header: 'Description',
        accessor: (pkg) => pkg.description,
        Aggregated: () => null,
        aggregate: 'count',
        width: 300,
        Cell: (cellProps) => {
            return <CustomDescriptionCell description={cellProps.value} />;
        },
    },
    {
        id: 'discipline',
        Header: 'Discipline',
        accessor: (pkg) => pkg.discipline,
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
    {
        id: 'mcStatus',
        Header: 'MC Status',
        accessor: (pkg) => pkg.mcStatus,
        Aggregated: () => null,
        aggregate: 'count',
        Cell: (cellProps) => {
            return (
                <StatusCustomCell
                    contentToBeDisplayed={cellProps.value}
                    cellAttributeFunction={(status) => {
                        const mcColor = statusColorMap[status];
                        return {
                            style: {
                                backgroundColor: mcColor,
                            },
                        };
                    }}
                />
            );
        },
        width: 100,
    },
    {
        id: 'responsible',
        Header: 'Responsible',
        accessor: (pkg) => pkg.responsible,
        Aggregated: () => null,
        aggregate: 'count',
        width: 150,
    },
    {
        id: 'phase',
        Header: 'Phase',
        accessor: (pkg) => pkg.phase,
        Aggregated: () => null,
        aggregate: 'count',
        width: 150,
    },
    {
        id: 'area',
        Header: 'Area',
        accessor: (pkg) => pkg.area,
        Aggregated: () => null,
        aggregate: 'count',
        width: 150,
    },
    {
        id: 'commPkgNumber',
        Header: 'Comm. package',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'commPkgNo',
            url: proCoSysUrls.getCommPkgUrl(pkg.commPkgId),
        }),
        Aggregated: () => null,
        aggregate: 'count',
        Cell: (cellProps) => {
            return (
                <CustomLinkCellWithTextDecoration
                    contentToBeDisplayed={cellProps.value.content.commPkgNumber}
                    url={cellProps.value.url}
                />
            );
        },
        width: 120,
    },
    {
        id: 'system',
        Header: 'System',
        accessor: (pkg) => pkg.system,
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
    {
        id: 'finalPunchPlannedDate',
        Header: 'Planned M-01 Final Punch',
        accessor: (pkg) => pkg.finalPunchPlannedDate,
        Aggregated: () => null,
        aggregate: 'count',
        Cell: (cellProps) => {
            return <CustomYearAndWeekCell dateString={cellProps.value} />;
        },
        width: 200,
    },
    {
        id: 'finalPunchActualDate',
        Header: 'Actual M-01 Actual Date',
        accessor: (pkg) => pkg.finalPunchActualDate,
        Aggregated: () => null,
        aggregate: 'count',
        Cell: (cellProps) => {
            return <CustomYearAndWeekCell dateString={cellProps.value} />;
        },
        width: 200,
    },
    {
        id: 'rfccPlannedDate',
        Header: 'Planned M-03 RFC',
        accessor: (pkg) => pkg.rfccPlannedDate,
        Aggregated: () => null,
        aggregate: 'count',
        Cell: (cellProps) => {
            return <CustomYearAndWeekCell dateString={cellProps.value} />;
        },
        width: 150,
    },
    {
        id: 'rfccActualDate',
        Header: 'Actual M-03 RFC',
        accessor: (pkg) => pkg.rfccActualDate,
        Aggregated: () => null,
        aggregate: 'count',
        Cell: (cellProps) => {
            return <CustomYearAndWeekCell dateString={cellProps.value} />;
        },
        width: 150,
    },
    {
        id: 'priority',
        Header: 'Comm Pri1',
        accessor: (pkg) => pkg.priority,
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
    {
        id: 'priority2',
        Header: 'Comm Pri2',
        accessor: (pkg) => pkg.priority2,
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
    {
        id: 'priority3',
        Header: 'Comm Pri3',
        accessor: (pkg) => pkg.priority3,
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
];

export const tableConfig: TableOptions<McPackage> = {
    objectIdentifierKey: 'mcPkgId',
    preventAutoGenerateColumns: true,
    itemSize: 32,
    customColumns,
};
