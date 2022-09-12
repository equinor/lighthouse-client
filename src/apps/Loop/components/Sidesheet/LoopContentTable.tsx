import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { statusColorMap, TabTable } from '@equinor/GardenUtils';
import {
    CellProps,
    Column,
    CustomLinkCellWithTextDecoration,
    StatusCustomCell,
} from '@equinor/Table';
import { useQuery } from 'react-query';
import { proCoSysUrls } from '../../../../packages/ProCoSysUrls/procosysUrl';
import { Loop, LoopContent } from '../../types';
import { getLoopContent, loopContentColumnNames } from '../../utility/api';

const columns: Column<LoopContent>[] = [
    {
        id: 'contentTagNo',
        Header: 'Tag',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'contentTagNo',
            url: proCoSysUrls.getTagUrl(pkg.contentTagId),
        }),
        Cell: (cellProps) => {
            return (
                <CustomLinkCellWithTextDecoration
                    contentToBeDisplayed={cellProps.value.content.contentTagNo}
                    url={cellProps.value.url}
                />
            );
        },
        Aggregated: () => null,
        aggregate: 'count',
        width: 120,
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
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'commissioningPackageNo',
            url: proCoSysUrls.getCommPkgUrl(pkg.commissioningPackageId ?? ''),
        }),
        Cell: (cellProps: CellProps<Loop>) => (
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
        id: 'mechanicalCompletionPackageNo',
        Header: 'MCpkg',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'mechanicalCompletionPackageNo',
            url: proCoSysUrls.getMcUrl(pkg.mechanicalCompletionPackageId ?? ''),
        }),
        Cell: (cellProps: CellProps<Loop>) => (
            <CustomLinkCellWithTextDecoration
                contentToBeDisplayed={cellProps.value.content.mechnicalCompletionNo}
                url={cellProps.value.url}
            />
        ),
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
];
type LoopContentProps = {
    loop: Loop;
};
export const LoopContentTable = ({ loop }: LoopContentProps) => {
    const expressions = generateExpressions('loopNo', 'Equals', [loop.loopNo || '']);
    const requestArgs = generateFamRequest(loopContentColumnNames, 'Or', expressions);
    const { data, isLoading, error } = useQuery(['loopcontent', loop.loopNo], ({ signal }) =>
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
