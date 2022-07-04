import { statusColorMap, TabTable } from '@equinor/GardenUtils';
import {
    CellProps,
    Column,
    CustomLinkCellWithTextDecoration,
    StatusCustomCell,
} from '@equinor/Table';
import { useQuery } from 'react-query';
import { proCoSysUrls } from '../../../../packages/ProCoSysUrls/procosysUrl';
import { ChecklistForLoop } from '../../types';
import { checklistColumnNames, getChecklistsForLoop } from '../../utility/api';
import { generateExpressions, generateFamRequest } from '../../utility/helpers/fam';

const columns: Column<ChecklistForLoop>[] = [
    {
        id: 'formularGroup',
        Header: 'Group',
        accessor: (pkg) => pkg.formularGroup,
        width: 80,
    },

    {
        id: 'Cmpkg',
        Header: 'Cmpkg',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'commissioningPackageNo',
            url: proCoSysUrls.getCommPkgUrl(pkg.commissioningPackageId ?? ''),
        }),
        Cell: (cellProps: CellProps<ChecklistForLoop>) => (
            <CustomLinkCellWithTextDecoration
                contentToBeDisplayed={cellProps.value.content.commissioningPackageNo}
                url={cellProps.value.url}
            />
        ),
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
    {
        id: 'MCpkg',
        Header: 'MCpkg',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'mechanicalCompletionPackageNo',
            url: proCoSysUrls.getMcUrl(pkg.mechanicalCompletionPackageId ?? ''),
        }),
        Cell: (cellProps: CellProps<ChecklistForLoop>) => (
            <CustomLinkCellWithTextDecoration
                contentToBeDisplayed={cellProps.value.content.mechanicalCompletionPackageNo}
                url={cellProps.value.url}
            />
        ),
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
    {
        id: 'mcStatus',
        Header: 'MC status',
        accessor: (pkg) => pkg.status,
        Cell: (cellProps: CellProps<ChecklistForLoop>) => {
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
        id: 'formularTypes',
        Header: 'Form types',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'formularType',
            url: proCoSysUrls.getFormTypeUrl(pkg.checklistId),
        }),
        Cell: (cellProps: CellProps<ChecklistForLoop>) => (
            <CustomLinkCellWithTextDecoration
                contentToBeDisplayed={cellProps.value.content.formularType}
                url={cellProps.value.url}
            />
        ),
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
    {
        id: 'responsible',
        Header: 'Responsible',
        accessor: (pkg) => pkg.responsible,
        width: 120,
    },
];
type ChecklistsProps = {
    loopNo: string;
};
export const Checklists = ({ loopNo }: ChecklistsProps) => {
    const expressions = generateExpressions('tagNo', 'Equals', [loopNo]);
    const requestArgs = generateFamRequest(checklistColumnNames, 'Or', expressions);
    const { data, isLoading, error } = useQuery(['checklists', loopNo], ({ signal }) =>
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
                height={120}
            />
        </div>
    );
};
