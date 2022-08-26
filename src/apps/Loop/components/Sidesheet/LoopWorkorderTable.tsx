import { CellWithLink, TabTable } from '@equinor/GardenUtils';
import { Column, CustomProgressCell, DescriptionCell } from '@equinor/Table';
import { proCoSysUrls } from '../../../../packages/ProCoSysUrls/procosysUrl';
import { Workorder } from '../../types';

const columns: Column<Workorder>[] = [
    {
        id: 'workOrderNo',
        Header: 'WO Number',
        accessor: (pkg) => ({
            content: pkg,
            url: proCoSysUrls.getWorkOrderUrl(pkg.workOrderId),
            currentKey: 'workOrderNo',
        }),
        Cell: CellWithLink,
        width: 130,
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'description',
        Header: 'Description',
        accessor: (wo) => ({ content: wo, currentKey: 'description' }),
        Cell: DescriptionCell,
        width: 300,
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'status',
        Header: 'Status',
        accessor: (wo) => wo.jobStatus,
    },
    {
        id: 'materialStatus',
        Header: 'Material Status',
        accessor: (wo) => wo.materialStatus,
        Aggregated: () => null,
    },
    {
        id: 'projectProgress',
        Header: 'Progress',
        accessor: (wo) => wo.projectProgress,
        Cell: (cellProps) => {
            if (!cellProps.value) {
                return null;
            }

            return <CustomProgressCell progress={cellProps.value} />;
        },
        Aggregated: () => null,
        aggregate: 'count',
    },
];

type LoopWorkOrderTabProps = {
    workorders: Workorder[] | undefined;
    isLoading: boolean;
    error: Error | null;
};
export const LoopWorkOrderTab = ({ workorders, isLoading, error }: LoopWorkOrderTabProps) => {
    return (
        <TabTable
            columns={columns}
            packages={workorders}
            error={error instanceof Error ? error : null}
            isFetching={isLoading}
            resourceName="Workorders"
        />
    );
};
