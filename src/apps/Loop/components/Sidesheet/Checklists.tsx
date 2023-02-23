import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { statusColorMap, TabTable } from '@equinor/GardenUtils';
import { proCoSysUrls } from '@equinor/procosys-urls';
import {
    CellProps,
    Column,
    CustomLinkCellWithTextDecoration,
    StatusCustomCell,
} from '@equinor/Table';
import { useQuery } from 'react-query';
import { ChecklistForLoop } from '../../types';
import { checklistColumnNames, getChecklistsForLoop } from '../../utility/api';

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
            url: proCoSysUrls.getCommPkgUrl(pkg.commissioningPackageUrlId ?? ''),
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
            url: proCoSysUrls.getMcUrl(pkg.mechanicalCompletionPackageUrlId ?? ''),
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
        id: 'clStatus',
        Header: 'Checklist status',
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
        Header: 'Form type',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'formularType',
            url: proCoSysUrls.getFormTypeUrl(pkg.checklistUrlId),
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
type LoopProps = {
    loopId: string;
};
export const Checklists = ({ loopId }: LoopProps) => {
    const expressions = generateExpressions('loopId', 'Equals', [loopId]);
    const requestArgs = generateFamRequest(checklistColumnNames, 'Or', expressions);
    const { data, isLoading, error } = useQuery(['checklists', loopId], ({ signal }) =>
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
