import { TabTable } from '@equinor/GardenUtils';
import { Column } from '@equinor/Table';
import { useQuery } from 'react-query';
import { Loop } from '../../types';
import { getChecklistsForLoop } from '../../utility/api';
import { generateExpressions, generateFamRequest } from '../../utility/helpers/fam';
const columnNames = [
    'ChecklistId',
    'Facility',
    'Project',
    'LoopId',
    'TagNo',
    'Description',
    'MechanicalCompletionPackageNo',
    'McpkgId',
    'CommissioningPackageNo',
    'CommissioningPackage_ID',
    'FormularType',
    'FormularGroup',
    'Responsible',
    'Status',
    'Revision',
    'SignedDate',
    'VerifiedDate',
    'RFC_Planned_Forecast_Date',
    'RFO_Planned_Forecast_Date',
    'WOPlannedCompletionDate',
    'WOActualCompletionDate',
    'RemainingManHours',
    'System',
    'FunctionalSystem',
    'Priority1',
    'Priority2',
    'Priority3',
    'Location',
    'IsVoided',
    'PackageNo',
    'CallOffNo',
    'Register',
    'Function',
    'LoopContentStatus',
];
const columns: Column<Loop>[] = [
    {
        id: 'formularGroup',
        Header: 'Group',
        accessor: (pkg) => pkg.formularGroup,
    },

    {
        id: 'description',
        Header: 'Description',
        accessor: (pkg) => pkg.description,
    },
    {
        id: 'Cmpkg',
        Header: 'Cmpkg',
        accessor: (pkg) => pkg.commissioningPackageNo,
    },
    {
        id: 'MCpkg',
        Header: 'MCpkg',
        accessor: (pkg) => pkg.mechanicalCompletionPackageNo,
    },
    {
        id: 'mcStatus',
        Header: 'MC status',
        accessor: (pkg) => pkg.loopContentStatus,
    },
    {
        id: 'formularTypes',
        Header: 'Form types',
        accessor: (pkg) => pkg.formularType,
    },
    {
        id: 'responsible',
        Header: 'Responsible',
        accessor: (pkg) => pkg.responsible,
    },
];
type ChecklistsProps = {
    tagNo: string;
};
export const Checklists = ({ tagNo }: ChecklistsProps) => {
    const expressions = generateExpressions('loopId', 'Equals', [tagNo]);
    const requestArgs = generateFamRequest(columnNames, 'Or', expressions);
    const { data, isLoading, error } = useQuery(['checklists', tagNo], ({ signal }) =>
        getChecklistsForLoop(requestArgs, signal)
    );
    return (
        <div>
            <h3>Checklists</h3>
            <TabTable
                packages={data}
                error={error instanceof Error ? error : null}
                isFetching={isLoading}
                resourceName="Checklists"
                columns={columns}
                height={200}
            />
        </div>
    );
};
