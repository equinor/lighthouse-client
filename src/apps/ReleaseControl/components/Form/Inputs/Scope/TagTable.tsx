import { tokens } from '@equinor/eds-tokens';
import { proCoSysUrls, stidUrls, echoUrls } from '@equinor/procosys-urls';
import { CellProps, Column, Table, defaultGroupByFn } from '@equinor/Table';
import styled from 'styled-components';
import { RemoveTagCell } from './RemoveTagCell';
import { Icon } from '@equinor/eds-core-react-old';
import { LinkGroup } from './LinkGroup';
import { RcScopeTag } from '../../../../types/releaseControl';
import {
    getMccrStatusByNumber,
    getMccrStatusColorByStatus,
} from '../../../../functions/statusUtils';
import { StatusCircle } from '@equinor/CircuitDiagram';
import { Monospace, StyledRowView } from '../../../../Styles/WrapperStyles';

interface TagTableProps {
    tags: RcScopeTag[];
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
        id: 'commissioningStatus',
        Header: 'MC Pkg Owner',
        accessor: (item) => item.commissioningStatus,
        width: 120,
    },
    {
        id: 'links',
        Header: 'Links',
        width: 80,
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
        id: 'mccrStatus',
        Header: 'Tag MC',
        accessor: (item) => (item.mccrStatus ? getMccrStatusByNumber(item.mccrStatus) : null),
        Cell: (cell: CellProps<RcScopeTag>) => {
            if (!cell.value) {
                return <></>;
            }
            return (
                <StyledRowView>
                    <StatusCircle statusColor={getMccrStatusColorByStatus(cell.value)} />
                    {cell.value}
                </StyledRowView>
            );
        },
        width: 70,
    },
    {
        id: 'signedDate',
        Header: 'Signed date',
        accessor: (item) => item.signedDate,
        width: 100,
        Cell: (cell) => {
            return (
                <Monospace>
                    {cell.row.values.signedDate &&
                        new Date(cell.row.values.signedDate).toLocaleDateString('en-gb')}
                </Monospace>
            );
        },
    },
    {
        id: 'verifiedDate',
        Header: 'Verified date',
        accessor: (item) => item.verifiedDate,
        width: 100,
        Cell: (cell) => {
            return (
                <Monospace>
                    {cell.row.values.verifiedDate &&
                        new Date(cell.row.values.verifiedDate).toLocaleDateString('en-gb')}
                </Monospace>
            );
        },
    },
    {
        id: 'mechanicalCompletionResponsible',
        Header: 'MC Resp.',
        accessor: (item) => item.mechanicalCompletionResponsible,
        width: 70,
    },
    {
        id: 'relatedHTCables',
        Header: 'HT on tag/line',
        accessor: (item) => item.relatedHTCables,
        width: 120,
    },
    {
        id: 'mechanicalCompletionPackageNo',
        Header: 'MC Pkg',
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
        Header: 'Comm Pkg',
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
        width: 70,
    },
    {
        id: 'pidDrawings',
        Header: 'P&ID',
        width: 60,
        accessor: (item) => ({
            content: item,
            currentKey: 'tagNo',
            url: stidUrls.getTagUrl(item.tagNo),
        }),
        Cell: (cell: CellProps<RcScopeTag>) => {
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
        width: 60,
        Header: 'ISO',
        accessor: (item) => ({
            content: item,
            currentKey: 'tagNo',
            url: stidUrls.getTagUrl(item.tagNo),
        }),
        Cell: (cell: CellProps<RcScopeTag>) => {
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
        id: 'openWorkOrders',
        Header: 'WO (open)',
        accessor: (item) => item.openWorkOrders,
        width: 90,
    },
    {
        id: 'register',
        Header: 'Tag type',
        accessor: (item) => item.tagType,
        width: 140,
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
    justify-content: space-between;
    padding-right: 7px;
`;
