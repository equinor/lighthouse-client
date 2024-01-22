import { tokens } from '@equinor/eds-tokens';
import { proCoSysUrls, stidUrls } from '@equinor/procosys-urls';
import { CellProps, Column, Table, defaultGroupByFn } from '@equinor/Table';
import { FamTagType } from '@equinor/Workflow';
import styled from 'styled-components';
import { RemoveHtCableCell } from './RemoveHtCableCell';
import { Icon } from '@equinor/lighthouse-components';
import { LinkGroup } from './LinkGroup';

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
            options={{ groupByFn: defaultGroupByFn }}
        />
    );
};

const columns: Column<FamTagType>[] = [
    {
        id: 'tagNo',
        Header: 'Tag number',
        accessor: (item) => ({
            content: item,
            currentKey: 'tagNo',
            url: proCoSysUrls.getTagUrl(item.tagUrlId || '')
        }),
        Cell: (cell: CellProps<FamTagType>) => (
            <Link href={cell.value.url} target="_blank" hideUnderline>
                {cell.value.content.tagNo}
            </Link>
        ),
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'stidLink',
        Header: 'Links',
        width: 60,
        accessor: (item) => ({
            content: item,
            currentKey: "tagNo",
            url: stidUrls.getTagUrl(item.tagNo)
        }),
        Cell: (cell: CellProps<FamTagType>) => (
            <Link href={cell.value.url} target="_blank" hideUnderline>
                <StidLogoLink src='images/stid_logo.svg'/>
            </Link>
        ),
        Aggregated: () => null,
        aggregate: 'count',
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
        Header: 'HT length (m)',
        accessor: (item) =>
            item.installedCableLength !== null
                ? Number(item.installedCableLength)
                : item.estimatedCableLength !== null
                ? Number(item.estimatedCableLength)
                : '',
        Cell: (cell: CellProps<FamTagType>) =>
            cell.row.original.installedCableLength !== null ? (
                <StyledCenterCheckIcon>
                    {cell.value}
                    <Icon
                        color={tokens.colors.interactive.success__text.hex}
                        name="check_circle_outlined"
                        title="This cable is installed."
                    ></Icon>
                </StyledCenterCheckIcon>
            ) : cell.row.original.estimatedCableLength !== null ? (
                <StyledCenterCheckIcon>
                    {cell.value}
                    <Icon
                        color={tokens.colors.interactive.primary__hover.hex}
                        name="help_outline"
                        title="Estimated"
                    ></Icon>
                </StyledCenterCheckIcon>
            ) : (
                <StyledCenterCheckIcon>
                    <Icon
                        color={tokens.colors.interactive.danger__text.hex}
                        name="close_circle_outlined"
                        title="No installed cable."
                    ></Icon>
                </StyledCenterCheckIcon>
            ),
            Aggregated: () => null,
            aggregate: 'count',
    },
    {
        id: 'tagHeated',
        Header: 'Tag(s) heated',
        accessor: (item) => item.heatedTagNos,
    },
    {
        id: 'commissioningPackageNo',
        Header: 'Comm',
        accessor: (item) => ({
            content: item,
            currentKey: "commissioningPackageNo",
            url: proCoSysUrls.getCommPkgUrl(item.commissioningPackageUrlId || '')
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
            currentKey: "mechanicalCompletionPackageNo",
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
        id: 'area',
        Header: 'Area',
        accessor: (item) => item.area ?? item.location,
    },
    {
        id: 'pidDrawings',
        Header: 'P&ID',
        minWidth: 100,
        accessor: (item) => ({
            content: item,
            currentKey: "tagNo",
            url: stidUrls.getTagUrl(item.tagNo)
        }),
        Cell: (cell: CellProps<FamTagType>) => {
            const links = cell.value.content.pidDrawings?.map(x => (
                <Link key={x.docNo} href={stidUrls.getDocUrl(x.docNo)} target="_blank" hideUnderline>
                    <Icon name="link" />
                </Link>
            )) ?? [];
            return (<LinkGroup links={links} maxLinks={3} overflowLink={cell.value.url} />);
        },
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'isoDrawings',
        Header: 'ISO',
        minWidth: 100,
        accessor: (item) => ({
            content: item,
            currentKey: "tagNo",
            url: stidUrls.getTagUrl(item.tagNo)
        }),
        Cell: (cell: CellProps<FamTagType>) => {
            const links = cell.value.content.isoDrawings?.map(x => (
                <Link key={x.docNo} href={stidUrls.getDocUrl(x.docNo)} target="_blank" hideUnderline>
                    <Icon name="link" />
                </Link>
            )) ?? [];
            
            return (<LinkGroup links={links} maxLinks={3} overflowLink={cell.value.url} />);
        },
        Aggregated: () => null,
        aggregate: 'count',
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

const StyledCenterCheckIcon = styled.div`
    display: flex;
    align-items: center;
`;

const StidLogoLink = styled.img`
    width: 24px;
`;