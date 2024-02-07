import { tokens } from '@equinor/eds-tokens';
import { proCoSysUrls, stidUrls } from '@equinor/procosys-urls';
import { CellProps, Column, Table, defaultGroupByFn } from '@equinor/Table';
import { FamTagType } from '@equinor/Workflow';
import styled from 'styled-components';
import { RemoveHtCableCell } from './RemoveHtCableCell';
import { Icon } from '@equinor/lighthouse-components';
import { RcScopeHtTag } from '../../../../types/releaseControl';

interface HtCableTableProps {
    htCables: RcScopeHtTag[];
    editMode: boolean;
}

//This is similar to HtCableTable, but this table doesnt have P&ID link and ISO link for optimizations reasons.
export const CreateRcHtCableTable = ({ htCables, editMode }: HtCableTableProps): JSX.Element => {
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
            currentKey: 'tagNo',
            url: stidUrls.getTagUrl(item.tagNo),
        }),
        Cell: (cell: CellProps<FamTagType>) => (
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
    },
    {
        id: 'circuitTagNos',
        Header: 'Circuit',
        accessor: (item) => item.circuitTagNos,
    },
    {
        id: 'installedCableLength',
        Header: 'HT length (m)',
        accessor: (item) => ({
            content: item,
            currentKey: 'installedCableLength',
        }),
        Cell: (cell: CellProps<FamTagType>) => {
            if (cell.value.content.installedCableLength !== null) {
                return (
                    <StyledCenterCheckIcon>
                        {Number(cell.value.content.installedCableLength)}
                        <Icon
                            color={tokens.colors.interactive.success__text.hex}
                            name="check_circle_outlined"
                            title="This cable is installed."
                        />
                    </StyledCenterCheckIcon>
                );
            }

            if (cell.value.content.estimatedCableLength !== null) {
                return (
                    <StyledCenterCheckIcon>
                        {Number(cell.value.content.estimatedCableLength)}
                        <Icon
                            color={tokens.colors.interactive.primary__hover.hex}
                            name="help_outline"
                            title="Estimated"
                        />
                    </StyledCenterCheckIcon>
                );
            }

            return (
                <StyledCenterCheckIcon>
                    <Icon
                        color={tokens.colors.interactive.danger__text.hex}
                        name="close_circle_outlined"
                        title="No installed cable."
                    />
                </StyledCenterCheckIcon>
            );
        },
        Aggregated: () => null,
        aggregate: 'count',
    },
    {
        id: 'tagHeated',
        Header: 'Tag(s) heated',
        accessor: (item) => item.tagHeated,
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

const StyledCenterCheckIcon = styled.div`
    display: flex;
    align-items: center;
`;

const StidLogoLink = styled.img`
    width: 24px;
`;
