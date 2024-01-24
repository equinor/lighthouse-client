import { tokens } from '@equinor/eds-tokens';
import { proCoSysUrls, stidUrls } from '@equinor/procosys-urls';
import { CellProps, Column, Table, defaultGroupByFn } from '@equinor/Table';
import { FamTagType } from '@equinor/Workflow';
import styled from 'styled-components';
import { RemoveTagCell } from './RemoveTagCell';
import { Icon } from '@equinor/eds-core-react';
import { LinkGroup } from './LinkGroup';
import { Echo3DIconLink } from './Echo3DIconLink';
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
            options={{ groupByFn: defaultGroupByFn }}
        />
    );
};
const columns: Column<FamTagType>[] = [
    {
        id: 'tagNo',
        Header: 'Tag number',
        accessor: (item) => item.tagNo,
        Cell: (cell) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link
                    href={proCoSysUrls.getTagUrl(cell.row.original.tagUrlId || '')}
                    target="_blank"
                    hideUnderline
                >
                    {cell.row.values.tagNo}
                </Link>
            </div>
        ),
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'links',
        Header: 'Links',
        width: 60,
        accessor: (item) => ({
            content: item,
            currentKey: 'tagNo',
            url: stidUrls.getTagUrl(item.tagNo),
        }),
        Cell: (cell: CellProps<FamTagType>) => (
            <StyledLinkGrouping>
                <Link href={cell.value.url} target="_blank" hideUnderline title="Open in STID">
                    <StidLogoLink src="images/stid_logo.svg" />
                </Link>
                <Echo3DIconLink id={cell.row.original.tagNo} />
            </StyledLinkGrouping>
        ),
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'register',
        Header: 'Tag type',
        accessor: (item) => item.register,
    },
    {
        id: 'tagMountedOn',
        Header: 'Mounted on',
        accessor: (item) => ({
            content: item,
            currentKey: 'tagMountedOn',
            url: proCoSysUrls.getTagUrl(item.tagMountedOnUrlId || ''),
        }),
        Cell: (cell: CellProps<FamTagType>) => (
            <Link href={cell.value.url} target="_blank" hideUnderline>
                {cell.value.content.tagMountedOn}
            </Link>
        ),
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'relatedHTCables',
        Header: 'Related HT cables',
        accessor: (item) => item.relatedHTCables,
    },

    {
        id: 'commissioningPackageNo',
        Header: 'Comm',
        accessor: (item) => ({
            content: item,
            currentKey: 'commissioningPackageNo',
            url: proCoSysUrls.getCommPkgUrl(item.commissioningPackageUrlId || ''),
        }),
        Cell: (cell: CellProps<FamTagType>) => (
            <Link href={cell.value.url} target="_blank" hideUnderline>
                {cell.value.content.commissioningPackageNo}
            </Link>
        ),
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'mechanicalCompletionPackageNo',
        Header: 'MC',
        accessor: (item) => ({
            content: item,
            currentKey: 'mechanicalCompletionPackageNo',
            url: proCoSysUrls.getMcUrl(item.mechanicalCompletionPackageUrlId || ''),
        }),
        Cell: (cell: CellProps<FamTagType>) => (
            <Link href={cell.value.url} target="_blank" hideUnderline>
                {cell.value.content.mechanicalCompletionPackageNo}
            </Link>
        ),
        Aggregated: () => null,
        aggregate: 'count',
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
        minWidth: 100,
        accessor: (item) => ({
            content: item,
            currentKey: 'tagNo',
            url: stidUrls.getTagUrl(item.tagNo),
        }),
        Cell: (cell: CellProps<FamTagType>) => {
            const links =
                cell.value.content.pidDrawings?.map((x) => (
                    <Link
                        key={x.docNo}
                        href={stidUrls.getDocUrl(x.docNo)}
                        target="_blank"
                        hideUnderline
                    >
                        <Icon name="link" />
                    </Link>
                )) ?? [];
            return <LinkGroup links={links} maxLinks={3} overflowLink={cell.value.url} />;
        },
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'isoDrawings',
        minWidth: 100,
        Header: 'ISO',
        accessor: (item) => ({
            content: item,
            currentKey: 'tagNo',
            url: stidUrls.getTagUrl(item.tagNo),
        }),
        Cell: (cell: CellProps<FamTagType>) => {
            const links =
                cell.value.content.isoDrawings?.map((x) => (
                    <Link
                        key={x.docNo}
                        href={stidUrls.getDocUrl(x.docNo)}
                        target="_blank"
                        hideUnderline
                    >
                        <Icon name="link" />
                    </Link>
                )) ?? [];

            return (
                <LinkGroup
                    key={`isoDrawings_${cell.value.content.tagNo}`}
                    links={links}
                    maxLinks={3}
                    overflowLink={cell.value.url}
                />
            );
        },
        Aggregated: () => null,
        aggregate: 'count',
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
const StyledLinkGrouping = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
