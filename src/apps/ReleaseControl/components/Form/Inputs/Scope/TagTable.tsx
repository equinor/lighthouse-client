import { tokens } from '@equinor/eds-tokens';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { Column, Table } from '@equinor/Table';
import styled from 'styled-components';
import { FamTagType } from '../../../../types/releaseControl';
import { RemoveTagCell } from './RemoveTagCell';

interface TagTableProps {
    tags: FamTagType[];
    editMode: boolean;
}

export const TagTable = ({ tags, editMode }: TagTableProps): JSX.Element => {
    if (tags.length === 0) return <></>;

    return (
        <Table
            data={tags}
            columns={editMode ? columns : columns.slice(0, columns.length - 1)}
            height={35 + tags.length * 32}
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
                hideUnderline
                onClick={() => {
                    window.open(proCoSysUrls.getTagUrl(cell.row.original.tagUrlId || ''), '_blank');
                }}
            >
                {cell.row.values.tagNo}
            </Link>
        ),
    },
    {
        id: 'register',
        Header: 'Tag type',
        accessor: (item) => item.register,
    },
    {
        id: 'tagMountedOnNo',
        Header: 'Mounted on',
        accessor: (item) => item.tagMountedOnNo,
        Cell: (cell) => (
            <Link
                hideUnderline
                onClick={() => {
                    window.open(
                        proCoSysUrls.getTagUrl(cell.row.original.tagMountedOnUrlId || ''),
                        '_blank'
                    );
                }}
            >
                {cell.row.values.tagMountedOnNo}
            </Link>
        ),
    },
    {
        id: 'relatedHTCables',
        Header: 'Related HT cables',
        accessor: (item) => item.relatedHTCables,
    },
    {
        id: 'commissioningPackageNo',
        Header: 'Comm',
        accessor: (item) => item.commissioningPackageNo,
        Cell: (cell) => (
            <Link
                hideUnderline
                onClick={() => {
                    window.open(
                        proCoSysUrls.getCommPkgUrl(
                            cell.row.original.commissioningPackageUrlId || ''
                        ),
                        '_blank'
                    );
                }}
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
                hideUnderline
                onClick={() => {
                    window.open(
                        proCoSysUrls.getMcUrl(
                            cell.row.original.mechanicalCompletionPackageUrlId || ''
                        ),
                        '_blank'
                    );
                }}
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
        id: 'remove',
        Header: '',
        width: 30,
        accessor: (item) => item,
        Cell: RemoveTagCell,
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
