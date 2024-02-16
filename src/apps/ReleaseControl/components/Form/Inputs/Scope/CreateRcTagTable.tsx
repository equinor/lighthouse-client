import { tokens } from '@equinor/eds-tokens';
import { proCoSysUrls, stidUrls, echoUrls } from '@equinor/procosys-urls';
import { CellProps, Column, Table, defaultGroupByFn } from '@equinor/Table';
import styled from 'styled-components';
import { RemoveTagCell } from './RemoveTagCell';
import { RcScopeTag } from '../../../../types/releaseControl';
import {
    getMccrStatusByNumber,
    getMccrStatusColorByStatus,
} from '../../../../functions/statusUtils';
import { StyledRowView } from '../../../../Styles/WrapperStyles';
import { StatusCircle } from '@equinor/CircuitDiagram';

interface TagTableProps {
    tags: RcScopeTag[];
    editMode: boolean;
}

//This is similar to HtCableTable, but this table doesnt have P&ID link and ISO link for optimizations reasons.
export const CreateRcTagTable = ({ tags, editMode }: TagTableProps): JSX.Element => {
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
const columns: Column<RcScopeTag>[] = [
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
        id: 'tagMountedOn',
        Header: 'Mounted on',
        accessor: (item) => ({
            content: item,
            currentKey: 'tagMountedOn',
            url: proCoSysUrls.getTagUrl(item.tagMountedOnUrlId || ''),
        }),
        Cell: (cell: CellProps<RcScopeTag>) => (
            <Link href={cell.value.url} target="_blank" hideUnderline>
                {cell.value.content.tagMountedOn}
            </Link>
        ),
        Aggregated: () => null,
        aggregate: 'count',
        width: 110,
    },
    {
        id: 'links',
        Header: 'Links',
        width: 70,
        accessor: (item) => ({
            content: item,
            currentKey: 'tagNo',
            stidUrl: stidUrls.getTagUrl(item.tagNo),
            echoUrl: echoUrls.getEchoUrl(item.tagNo),
        }),
        Cell: (cell: CellProps<RcScopeTag>) => (
            <StyledLinkGrouping>
                <Link href={cell.value.stidUrl} target="_blank" hideUnderline title="Open in STID">
                    <StyledStidLogoLink src="images/stid_logo.svg" />
                </Link>
                <Link
                    href={cell.value.echoUrl}
                    target="_blank"
                    hideUnderline
                    title="Open in Echo 3D"
                >
                    <StyledEchoLogoLink src="images/echo_logo.svg" />
                </Link>
            </StyledLinkGrouping>
        ),
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'commissioningStatus',
        Header: 'MC Pkg Owner',
        accessor: (item) => item.commissioningStatus,
    },
    {
        id: 'mccrStatus',
        Header: 'Tag MC',
        accessor: (item) => getMccrStatusByNumber(item.mccrStatus ?? 4),
        Cell: (cell: CellProps<RcScopeTag>) => (
            <StyledRowView>
                {cell.value}
                <StatusCircle statusColor={getMccrStatusColorByStatus(cell.value)} />
            </StyledRowView>
        ),
        width: 70,
    },
    {
        id: 'relatedHTCables',
        Header: 'HT on tag/line',
        accessor: (item) => item.relatedHTCables,
        width: 170,
    },
    {
        id: 'mechanicalCompletionPackageNo',
        Header: 'MC',
        accessor: (item) => ({
            content: item,
            currentKey: 'mechanicalCompletionPackageNo',
            url: proCoSysUrls.getMcUrl(item.mechanicalCompletionPackageUrlId || ''),
        }),
        Cell: (cell: CellProps<RcScopeTag>) => (
            <Link href={cell.value.url} target="_blank" hideUnderline>
                {cell.value.content.mechanicalCompletionPackageNo}
            </Link>
        ),
        Aggregated: () => null,
        aggregate: 'count',
        width: 90,
    },
    {
        id: 'commissioningPackageNo',
        Header: 'Comm',
        accessor: (item) => ({
            content: item,
            currentKey: 'commissioningPackageNo',
            url: proCoSysUrls.getCommPkgUrl(item.commissioningPackageUrlId || ''),
        }),
        Cell: (cell: CellProps<RcScopeTag>) => (
            <Link href={cell.value.url} target="_blank" hideUnderline>
                {cell.value.content.commissioningPackageNo}
            </Link>
        ),
        Aggregated: () => null,
        aggregate: 'count',
        width: 90,
    },
    {
        id: 'area',
        Header: 'Area',
        accessor: (item) => item.area,
        width: 80,
    },
    {
        id: 'openWorkOrders',
        Header: 'WO (open)',
        accessor: (item) => item.openWorkOrders,
    },
    {
        id: 'register',
        Header: 'Tag type',
        accessor: (item) => item.tagType,
        width: 150,
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

const StyledStidLogoLink = styled.img`
    width: 24px;
`;
const StyledEchoLogoLink = styled.img`
    width: 20px;
`;

const StyledLinkGrouping = styled.div`
    display: flex;
    align-items: center;
    gap: 0.2em;
    justify-content: space-evenly;
`;
