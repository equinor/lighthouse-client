import { tokens } from '@equinor/eds-tokens';
import { DateTime } from 'luxon';
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

export function WorkOrderTable(): JSX.Element {
    const highestEstimate = Math.max(...data.map(({ estimate }) => estimate));
    const highestExpended = Math.max(...data.map(({ actual }) => actual));

    const getPercentEstimate = (number: number) => (number / highestEstimate) * 100;

    const totalProgress = data.reduce((acc, { progress }) => acc + progress, 0);

    return (
        <Table>
            <TableHeader>
                <Header>
                    <ColumnHeader>ID</ColumnHeader>
                    <ColumnHeader style={{ minWidth: '190px' }}>Description</ColumnHeader>
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
                {data.map(
                    ({
                        actual,
                        actualCompleted,
                        discipline,
                        estimate,
                        id,
                        plannedCompleted,
                        progress,
                        status,
                        title,
                    }) => (
                        <TableRow key={id}>
                            <TableData
                                style={{
                                    cursor: 'pointer',
                                    color: `${tokens.colors.interactive.primary__resting.hex}`,
                                }}
                            >
                                {id}
                            </TableData>
                            <TableData>{title}</TableData>
                            <TableData>{discipline}</TableData>
                            <TableData>{status}</TableData>
                            <TableData>{new Date(plannedCompleted).toLocaleDateString()}</TableData>
                            <TableData>{actualCompleted}</TableData>
                            <TableData>
                                <ProgressBar percentWidth={progress} />
                            </TableData>
                            <TableData>
                                <EstimateBar
                                    percentWidth={getPercentEstimate(estimate)}
                                    number={`${estimate}`}
                                />
                            </TableData>
                            <TableData>
                                <ExpendedProgressBar
                                    actual={actual}
                                    estimate={estimate}
                                    highestExpended={highestExpended}
                                />
                            </TableData>
                        </TableRow>
                    )
                )}
                {/* Summary row */}
                <TableData />
                <TableData />
                <TableData />
                <TableData />
                <TableData>
                    {/* Planned finish */}
                    {/* Highest date */}
                    <div>
                        {new Date(
                            data.reduce(
                                (max, { plannedCompleted }) =>
                                    DateTime.fromJSDate(new Date(plannedCompleted)) >
                                        DateTime.fromJSDate(new Date(max))
                                        ? plannedCompleted
                                        : max,
                                new Date().toString()
                            )
                        ).toLocaleDateString()}
                    </div>
                </TableData>
                <TableData />
                <TableData>
                    <ProgressBar percentWidth={(totalProgress / (data.length * 100)) * 100} />
                </TableData>
                <TableData>
                    <div>Coming soon</div>
                </TableData>
                <TableData>
                    <div>Coming soon</div>
                </TableData>
            </tbody>
        </Table>
    );
}

export const data: WorkOrder[] = [
    {
        actual: 132,
        estimate: 120,
        progress: 80,
        id: '1213244',
        title: 'Work order title',
        status: 'WO4',
        discipline: 'L,E',
        plannedCompleted: new Date().toString(),
        actualCompleted: null,
    },
    {
        actual: 196,
        estimate: 100,
        progress: 37,
        id: '12132',
        title: 'Work order title, idk how long',
        status: 'WO4',
        discipline: 'E',
        plannedCompleted: new Date('2022-05-05').toString(),
        actualCompleted: null,
    },
    {
        actual: 50,
        progress: 50,
        estimate: 100,
        id: '121344',
        title: 'Work order title, idk how long',
        status: 'WO3',
        discipline: 'L',
        plannedCompleted: new Date().toString(),
        actualCompleted: null,
    },
];

export interface WorkOrder {
    progress: number;
    actual: number;
    estimate: number;
    id: string;
    title: string;
    status: string;
    discipline: string;
    plannedCompleted: string;
    actualCompleted: string | null;
}
