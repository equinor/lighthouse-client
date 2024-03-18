import { tokens } from '@equinor/eds-tokens';
import { proCoSysUrls, stidUrls } from '@equinor/procosys-urls';
import { CellProps, Column, Table, defaultGroupByFn } from '@equinor/Table';
import styled from 'styled-components';
import { RemoveHtCableCell } from './RemoveHtCableCell';
import { Icon } from '@equinor/lighthouse-components';
import { LinkGroup } from './LinkGroup';
import { RcScopeHtTag } from '../../../../types/releaseControl';
import { Monospace, StyledRowView } from '../../../../Styles/WrapperStyles';
import { StatusCircle } from '@equinor/CircuitDiagram';
import { getMccrStatusColorByStatus } from '../../../../functions/statusUtils';

interface HtCableTableProps {
    htCables: RcScopeHtTag[];
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
const columns: Column<RcScopeHtTag>[] = [
    {
        id: 'tagNo',
        Header: 'Tag number',
        accessor: (item) => ({
            content: item,
            currentKey: 'tagNo',
            url: proCoSysUrls.getTagUrl(item.tagUrlId || ''),
        }),
        Cell: (cell: CellProps<RcScopeHtTag>) => (
            <Link href={cell.value.url} target="_blank" hideUnderline>
                {cell.value.content.tagNo}
            </Link>
        ),
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'commissioningStatus',
        Header: 'MC Pkg Owner',
        accessor: (item) => item.mechanicalCompletionHandoverStatus,
        width: 120,
    },
    {
        id: 'link',
        Header: 'Link',
        width: 45,
        accessor: (item) => ({
            content: item,
            currentKey: 'tagNo',
            url: stidUrls.getTagUrl(item.tagNo),
        }),
        Cell: (cell: CellProps<RcScopeHtTag>) => (
            <Link href={cell.value.url} target="_blank" hideUnderline>
                <StidLogoLink src="images/stid_logo.svg" />
            </Link>
        ),
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'switchBoardTagNos',
        Header: 'Switchboard',
        accessor: (item) => item.switchboardTagNos,
        width: 100,
    },
    {
        id: 'circuitTagNos',
        Header: 'Circuit',
        accessor: (item) => item.circuitTagNos,
        width: 100,
    },
    {
        id: 'status',
        Header: 'Tag MC',
        accessor: (item) => item.status,
        Cell: (cell: CellProps<RcScopeHtTag>) => {
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
                <>
                    {cell.row.values.signedDate ? (
                        <Monospace>
                            {cell.row.values.signedDate &&
                                new Date(cell.row.values.signedDate).toLocaleDateString('en-gb')}
                        </Monospace>
                    ) : null}
                </>
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
                <>
                    {cell.row.values.signedDate ? (
                        <Monospace>
                            {cell.row.values.verifiedDate &&
                                new Date(cell.row.values.verifiedDate).toLocaleDateString('en-gb')}
                        </Monospace>
                    ) : null}
                </>
            );
        },
    },
    {
        id: 'tagHeated',
        Header: 'Tag(s) heated',
        accessor: (item) => item.tagHeated,
        width: 110,
    },
    {
        id: 'installedCableLength',
        Header: 'HT length (m)',
        accessor: (item) => ({
            content: item,
            currentKey: 'installedCableLength',
        }),
        Cell: (cell: CellProps<RcScopeHtTag>) => {
            if (cell.value.content.installedCableLength !== null) {
                return (
                    <StyledCenterCheckIcon>
                        <Icon
                            color={tokens.colors.interactive.success__text.hex}
                            name="check_circle_outlined"
                            title="Cable installed"
                        />
                        {cell.value.content.installedCableLength}
                    </StyledCenterCheckIcon>
                );
            }

            if (cell.value.content.estimatedCableLength !== null) {
                return (
                    <StyledCenterCheckIcon>
                        <Icon
                            color={tokens.colors.interactive.primary__hover.hex}
                            name="help_outline"
                            title="Estimated cable length"
                        />
                        {cell.value.content.estimatedCableLength}
                    </StyledCenterCheckIcon>
                );
            }

            return (
                <StyledCenterCheckIcon>
                    <Icon
                        color={tokens.colors.interactive.danger__text.hex}
                        name="close_circle_outlined"
                        title="No installed cable"
                    />
                </StyledCenterCheckIcon>
            );
        },
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
    },
    {
        id: 'mechanicalCompletionPackageNo',
        Header: 'MC Pkg',
        accessor: (item) => ({
            content: item,
            currentKey: 'mechanicalCompletionPackageNo',
            url: proCoSysUrls.getMcUrl(item.mechanicalCompletionPackageUrlId || ''),
        }),
        Cell: (cell: CellProps<RcScopeHtTag>) => (
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
        Cell: (cell: CellProps<RcScopeHtTag>) => (
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
        id: 'isoDrawings',
        Header: 'ISO',
        width: 60,
        accessor: (item) => ({
            content: item,
            currentKey: 'tagNo',
            url: stidUrls.getTagUrl(item.tagNo),
        }),
        Cell: (cell: CellProps<RcScopeHtTag>) => {
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

            return <LinkGroup links={links} maxLinks={3} overflowLink={cell.value.url} />;
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
    gap: 0.3em;
`;

const StidLogoLink = styled.img`
    width: 24px;
`;
