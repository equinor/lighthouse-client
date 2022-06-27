import { statusColorMap, TabTable } from '@equinor/GardenUtils';
import { Column, StatusCustomCell } from '@equinor/Table';
import { useQuery } from 'react-query';
import { Loop, LoopContent } from '../../types';
import { getLoopContent, loopContentColumnNames } from '../../utility/api';
import { generateExpressions, generateFamRequest } from '../../utility/helpers/fam';

const columns: Column<LoopContent>[] = [
    {
        id: 'checklistID',
        Header: 'Tag',
        accessor: (pkg) => pkg.contentTagNo,
        width: 80,
    },
    {
        id: 'description',
        Header: 'Description',
        accessor: (pkg) => pkg.description,
        width: 300,
    },
    {
        id: 'mcStatus',
        Header: 'MC status',
        accessor: (pkg) => pkg.mechanicalCompletionStatus,
        Cell: (cellProps) => {
            if (!cellProps.value) return null;
            return (
                <StatusCustomCell
                    contentToBeDisplayed={cellProps.value}
                    cellAttributeFunction={(status) => {
                        return { style: { backgroundColor: statusColorMap[status] } };
                    }}
                />
            );
        },
        width: 100,
    },
    {
        id: 'commissioningPackageNo',
        Header: 'Cmpkg',
        accessor: (pkg) => pkg.commissioningPackageNo,
        width: 100,
    },
    {
        id: 'mechanicalCompletionPackageNo',
        Header: 'MCpkg',
        accessor: (pkg) => pkg.mechanicalCompletionPackageNo,
        width: 100,
    },
    {
        id: 'register',
        Header: 'Register',
        accessor: (pkg) => pkg.register,
    },
];
type LoopContentProps = {
    loop: Loop;
};
export const LoopContentTable = ({ loop }: LoopContentProps) => {
    const expressions = generateExpressions('loopNo', 'Equals', [loop.tagNo || '']);
    const requestArgs = generateFamRequest(loopContentColumnNames, 'Or', expressions);
    const { data, isLoading, error } = useQuery(['loopcontent', loop.tagNo], ({ signal }) =>
        getLoopContent(requestArgs, signal)
    );

    return (
        <TabTable
            columns={columns}
            packages={data}
            error={error instanceof Error ? error : null}
            isFetching={isLoading}
            resourceName="Loop content"
            height={300}
        />
    );
};
