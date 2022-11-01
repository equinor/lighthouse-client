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
        id: 'register',
        Header: 'Tag type',
        accessor: (item) => item.register,
    },
    {
        id: 'mountedOn', //TODO - change to mountedOnTagNo (also accessor) when backend is updated
        Header: 'Mounted on',
        accessor: (item) => item.mountedOn,
    },
    {
        id: 'relatedHTCables',
        Header: 'Related HT cables',
        accessor: (item) => item.relatedHTCables,
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
