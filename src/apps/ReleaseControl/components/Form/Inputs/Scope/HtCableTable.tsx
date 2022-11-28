import { tokens } from '@equinor/eds-tokens';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { Column, Table } from '@equinor/Table';
import styled from 'styled-components';
import { FamTagType } from '../../../../types/releaseControl';
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
        accessor: ({ tagId, tagNo }) => (
            <Link
                hideUnderline
                onClick={() => {
                    window.open(proCoSysUrls.getTagUrl(tagId || ''), '_blank');
                }}
            >
                {tagNo}
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
        accessor: ({ commissioningPackageId, commissioningPackageNo }) => (
            <Link
                hideUnderline
                onClick={() => {
                    window.open(proCoSysUrls.getCommPkgUrl(commissioningPackageId || ''), '_blank');
                }}
            >
                {commissioningPackageNo}
            </Link>
        ),
    },
    {
        id: 'mechanicalCompletionPackageNo',
        Header: 'MC',
        accessor: ({ mechanicalCompletionPackageId, mechanicalCompletionPackageNo }) => (
            <Link
                hideUnderline
                onClick={() => {
                    window.open(
                        proCoSysUrls.getMcUrl(mechanicalCompletionPackageId || ''),
                        '_blank'
                    );
                }}
            >
                {mechanicalCompletionPackageNo}
            </Link>
        ),
    },
    {
        id: 'openWorkOrders',
        Header: 'WO (open)',
        accessor: (item) => item.openWorkOrders,
    },
    {
        id: 'remove',
        Header: '',
        width: 30,
        accessor: (item) => item,
        Cell: RemoveHtCableCell,
    },
];

const Link = styled.div`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: ${({ hideUnderline }: { hideUnderline: boolean }) =>
        hideUnderline ? 'none' : 'underline'};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
