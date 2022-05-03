import { tokens } from '@equinor/eds-tokens';
import { isProduction, useFacility } from '@equinor/portal-client';
import { Column, Table } from '@equinor/Table';
import styled from 'styled-components';

import { WorkOrder } from '../../types/FAM/workOrder';
import { EstimateBar } from '../WoProgressBars/EstimateBar';
import { ExpendedProgressBar } from '../WoProgressBars/ExpendedProgressBar';
import { ProgressBar } from '../WoProgressBars/ProgressBar';

interface WorkOrderTableProps {
    workOrders: WorkOrder[];
}

export function WorkOrderTable({ workOrders }: WorkOrderTableProps): JSX.Element {
    const highestEstimate = Math.max(...workOrders.map(({ estimatedHours }) => estimatedHours));
    const highestExpended = Math.max(
        ...workOrders.map(({ expendedHours }) => Number(expendedHours) ?? 0)
    );

    const { title } = useFacility();

    function generateColumn(
        headerName: string,
        render: (wo: WorkOrder) => string | number | JSX.Element | Date | null | undefined,
        width: number
    ): Column<any> {
        return {
            Header: headerName,
            accessor: headerName,
            width: width,
            Cell: ({ cell }: any) => render(cell.row.original),
        };
    }

    const someColumns: Column<any>[] = [
        generateColumn(
            'WO',
            ({ workOrderNumber, workOrderId }) => (
                <Link
                    hideUnderline
                    onClick={() => {
                        window.open(
                            //TODO:
                            `https://procosys.equinor.com/${title.replace(
                                ' ',
                                '_'
                            )}/WorkOrders/WorkOrder#id=${workOrderId}`,
                            '_blank'
                        );
                    }}
                >
                    {workOrderNumber}
                </Link>
            ),
            90
        ),
        generateColumn('Title', ({ description }) => description, 310),
        generateColumn('Discipline', ({ disciplineCode }) => disciplineCode, 80),
        generateColumn('Status', ({ jobStatus }) => jobStatus, 80),
        generateColumn(
            'Plan. finish',
            ({ plannedFinishDate }) => new Date(plannedFinishDate).toLocaleDateString('EN-GB'),
            100
        ),
        generateColumn(
            'Act. finish',
            ({ actualCompletionDate }) =>
                new Date(actualCompletionDate).toLocaleDateString('EN-GB'),
            100
        ),
        generateColumn(
            'Progress',
            ({ projectProgress }) => <ProgressBar percentWidth={projectProgress} />,
            100
        ),
        generateColumn(
            'Estimated',
            ({ estimatedHours }) => <EstimateBar current={estimatedHours} max={highestEstimate} />,
            100
        ),
        generateColumn(
            'Expended',
            ({ expendedHours, estimatedHours }) => (
                <ExpendedProgressBar
                    actual={Number(expendedHours) ?? 0}
                    estimate={estimatedHours}
                    highestExpended={highestExpended}
                />
            ),
            100
        ),
    ];

    return (
        <div>{workOrders && <Table options={{ data: workOrders, columns: someColumns }} />}</div>
    );
}

const Link = styled.div`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: ${({ hideUnderline }: { hideUnderline: boolean }) =>
        hideUnderline ? 'none' : 'underline'};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;
