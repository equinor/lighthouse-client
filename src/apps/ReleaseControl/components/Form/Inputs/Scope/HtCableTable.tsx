import { tokens } from '@equinor/eds-tokens';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { Column, Table } from '@equinor/Table';
import { FamTagType } from '@equinor/Workflow';
import styled from 'styled-components';
import { RemoveHtCableCell } from './RemoveHtCableCell';

interface HtCableTableProps {
    htCables: FamTagType[];
    editMode: boolean;
}

export const HtCableTable = ({ htCables, editMode }: HtCableTableProps): JSX.Element => {
    if (htCables.length === 0) return <></>;

    return (
        <Table
            data={htCables}
            columns={editMode ? columns : columns.slice(0, columns.length - 1)}
            height={35 + htCables.length * 32}
        />
    );
};
const columns: Column<FamTagType>[] = [
    {
        id: 'tagNo',
        Header: 'Tag number',
        accessor: (item) => item.tagNo,
        Cell: (cell) => (
            <Link
                href={proCoSysUrls.getTagUrl(cell.row.original.tagUrlId || '')}
                target="_blank"
                hideUnderline
            >
                {cell.row.values.tagNo}
            </Link>
        ),
    },
    {
        id: 'switchBoardTagNos',
        Header: 'Switchboard',
        accessor: (item) => item.switchBoardTagNos,
    },
    {
        id: 'circuitTagNos',
        Header: 'Circuit',
        accessor: (item) => item.circuitAndStarterTagNos,
    },
    {
        id: 'installedCableLength',
        Header: 'Cable length (m)',
        accessor: (item) =>
            item.installedCableLength !== null
                ? item.installedCableLength + ' (installed)'
                : item.estimatedCableLength !== null
                ? item.estimatedCableLength + ' (estimated)'
                : '',
    },
    {
        id: 'tagHeated',
        Header: 'Tag(s) heated',
        accessor: (item) => item.heatedTagNos,
    },
    {
        id: 'commissioningPackageNo',
        Header: 'Comm',
        accessor: (item) => item.commissioningPackageNo,
        Cell: (cell) => (
            <Link
                href={proCoSysUrls.getCommPkgUrl(cell.row.original.commissioningPackageUrlId || '')}
                target="_blank"
                hideUnderline
            >
                {cell.row.values.commissioningPackageNo}
            </Link>
        ),
    },
    {
        id: 'mechanicalCompletionPackageNo',
        Header: 'MC',
        accessor: (item) => item.mechanicalCompletionPackageNo,
        Cell: (cell) => (
            <Link
                href={proCoSysUrls.getMcUrl(
                    cell.row.original.mechanicalCompletionPackageUrlId || ''
                )}
                target="_blank"
                hideUnderline
            >
                {cell.row.values.mechanicalCompletionPackageNo}
            </Link>
        ),
    },
    {
        id: 'openWorkOrders',
        Header: 'WO (open)',
        accessor: (item) => item.openWorkOrders,
    },
    {
        id: 'area',
        Header: 'Area',
        accessor: (item) => item.area,
    },
    {
        id: 'remove',
        Header: '',
        width: 30,
        accessor: (item) => item,
        Cell: RemoveHtCableCell,
    },
];

const Link = styled.a`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: ${({ hideUnderline }: { hideUnderline: boolean }) =>
        hideUnderline ? 'none' : 'underline'};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
