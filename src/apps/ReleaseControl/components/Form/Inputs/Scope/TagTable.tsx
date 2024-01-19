import { tokens } from '@equinor/eds-tokens';
import { proCoSysUrls, stidUrls } from '@equinor/procosys-urls';
import { Column, Table } from '@equinor/Table';
import { FamTagType } from '@equinor/Workflow';
import styled from 'styled-components';
import { RemoveTagCell } from './RemoveTagCell';
import { Icon } from '@equinor/eds-core-react';
import { LinkGroup } from './LinkGroup';

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
            href={proCoSysUrls.getTagUrl(cell.row.original.tagUrlId || '')}
            target="_blank"
            hideUnderline>
                {cell.row.values.tagNo}
            </Link>
        ),
    },
    {
        id: 'stidLink',
        Header: 'Links',
        width: "auto",
        minWidth: 80,
        accessor: (item) => (
            <Link href={stidUrls.getTagUrl(item.tagNo)} target="_blank" hideUnderline>
                <StidLogoLink src='images/stid_logo.svg'/>
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
                href={proCoSysUrls.getTagUrl(cell.row.original.tagMountedOnUrlId || '')}
                target="_blank"
                hideUnderline
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
        id: 'areas',
        Header: 'Area',
        accessor: (item) => item.area ?? item.location,
    },
    {
        id: 'pidDrawings',
        Header: 'P&ID',
        width: "auto",
        minWidth: 100,
        accessor: (item) => {
            const links = item.pidDrawings?.map(x => (
                <Link href={stidUrls.getDocUrl(x.docNo)} target="_blank" hideUnderline>
                    <Icon name="link" />
                </Link>
            )) ?? [];

            return <LinkGroup links={links} maxLinks={3} overflowLink={stidUrls.getTagUrl(item.tagNo)} />
        },
    },
    {
        id: 'isoDrawings',
        width: "auto",
        minWidth: 100,
        Header: 'ISO',
        accessor: (item) => {
            const links = item.isoDrawings?.map(x => (
                <Link href={stidUrls.getDocUrl(x.docNo)} target="_blank" hideUnderline>
                    <Icon name="link" />
                </Link>
            )) ?? [];

            return <LinkGroup links={links} maxLinks={3} overflowLink={stidUrls.getTagUrl(item.tagNo)} />
        },
    },

    {
        id: 'remove',
        Header: '',
        width: 30,
        accessor: (item) => item,
        Cell: RemoveTagCell,
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

const StidLogoLink = styled.img`
    width: 24px;
`;
