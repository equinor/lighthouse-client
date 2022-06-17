import { TabTable } from '@equinor/GardenUtils';
import { Column } from '@equinor/Table';
import { useQuery } from 'react-query';
import { Loop, LoopContent } from '../../types';
import { getLoopContent } from '../../utility/api/getLoopContent';
import { generateExpressions, generateFamRequest } from '../../utility/helpers/fam';
const columnNames = [
    'Facility',
    'LoopId',
    'ContentId',
    'Register',
    'MechanicalCompletionStatus',
    'MechanicalCompletionStatusOrder',
    'MechanicalCompletionPackageNo',
    'CommissioningPackageNo',
    'Description',
    'PlannedCompletionDate',
    'ActualCompletionDate',
    'RemainingManHours',
    'ChecklistID',
];
const columns: Column<LoopContent>[] = [
    {
        id: 'checklistID',
        Header: 'Checklist',
        accessor: (pkg) => pkg.checklistID,
    },
    {
        id: 'commissioningPackageNo',
        Header: 'Comm pkg',
        accessor: (pkg) => pkg.commissioningPackageNo,
    },
    {
        id: 'mechanicalCompletionPackageNo',
        Header: 'MC pkg',
        accessor: (pkg) => pkg.mechanicalCompletionPackageNo,
    },
    {
        id: 'mechanicalCompletionStatus',
        Header: 'MC status',
        accessor: (pkg) => pkg.mechanicalCompletionStatus,
    },
];
type LoopContentProps = {
    loop: Loop;
};
export const LoopContentTable = ({ loop }: LoopContentProps) => {
    const expressions = generateExpressions('checklistID', 'Equals', [loop.checklistId || '']);
    const requestArgs = generateFamRequest(columnNames, 'Or', expressions);
    const { data, isLoading, error } = useQuery(['loopcontent', loop.checklistId], () =>
        getLoopContent(requestArgs)
    );

    return (
        <TabTable
            columns={columns}
            packages={data}
            error={error as any}
            isFetching={isLoading}
            resourceName="Loop content"
        />
    );
};
