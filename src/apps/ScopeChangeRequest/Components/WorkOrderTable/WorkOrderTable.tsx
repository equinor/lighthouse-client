import { tokens } from '@equinor/eds-tokens';
import { isProduction, useFacility } from '@equinor/portal-client';
import { WorkOrder } from '../../types/FAM/workOrder';
import { EstimateBar } from '../WoProgressBars/EstimateBar';
import { ExpendedProgressBar } from '../WoProgressBars/ExpendedProgressBar';
import { ProgressBar } from '../WoProgressBars/ProgressBar';
import {
    ColumnHeader,
    Header,
    Table,
    TableData,
    TableHeader,
    TableRow,
} from './workOrderTable.styles';

interface WorkOrderTableProps {
    workOrders: WorkOrder[];
}

export function WorkOrderTable({ workOrders }: WorkOrderTableProps): JSX.Element {
    const highestEstimate = Math.max(...workOrders.map(({ estimatedHours }) => estimatedHours));
    const highestExpended = Math.max(
        ...workOrders.map(({ expendedHours }) => Number(expendedHours) ?? 0)
    );

    const getPercentEstimate = (number: number) => (number / highestEstimate) * 100;
    const { title } = useFacility();

    return (
        <Table>
            <TableHeader>
                <Header>
                    <ColumnHeader>WO</ColumnHeader>
                    <ColumnHeader style={{ minWidth: '190px' }}>Title</ColumnHeader>
                    <ColumnHeader>Discipline</ColumnHeader>
                    <ColumnHeader>Status</ColumnHeader>
                    <ColumnHeader>Plan. finish</ColumnHeader>
                    <ColumnHeader>Act. finish</ColumnHeader>
                    <ColumnHeader>Progress</ColumnHeader>
                    <ColumnHeader>Estimated</ColumnHeader>
                    <ColumnHeader>Expended</ColumnHeader>
                </Header>
            </TableHeader>

            <tbody>
                {workOrders.map(
                    ({
                        expendedHours,
                        actualCompletionDate,
                        disciplineCode,
                        estimatedHours,
                        workOrderNumber,
                        plannedFinishDate,
                        projectProgress,
                        jobStatus,
                        description,
                        workOrderId,
                    }) => (
                        <TableRow key={workOrderNumber}>
                            <TableData
                                style={{
                                    cursor: 'pointer',
                                    color: `${tokens.colors.interactive.primary__resting.hex}`,
                                    textDecoration: 'underline',
                                }}
                                onClick={() =>
                                    window.open(
                                        //TEMP:
                                        `https://${isProduction() ? 'procosys' : 'procosys'
                                        }.equinor.com/${title.replace(
                                            ' ',
                                            '_'
                                        )}/WorkOrders/WorkOrder#id=${workOrderId}`,
                                        '_blank'
                                    )
                                }
                            >
                                {workOrderNumber}
                            </TableData>
                            <TableData>{description}</TableData>
                            <TableData>{disciplineCode}</TableData>
                            <TableData>{jobStatus}</TableData>
                            <TableData>
                                {new Date(plannedFinishDate).toLocaleDateString('EN-GB')}
                            </TableData>
                            <TableData>
                                {new Date(actualCompletionDate).toLocaleDateString('EN-GB')}
                            </TableData>
                            <TableData>
                                <ProgressBar percentWidth={projectProgress} />
                            </TableData>
                            <TableData>
                                <EstimateBar
                                    percentWidth={getPercentEstimate(estimatedHours)}
                                    number={estimatedHours}
                                />
                            </TableData>
                            <TableData>
                                <ExpendedProgressBar
                                    actual={Number(expendedHours) ?? 0}
                                    estimate={estimatedHours}
                                    highestExpended={highestExpended}
                                />
                            </TableData>
                        </TableRow>
                    )
                )}
            </tbody>
        </Table>
    );
}
