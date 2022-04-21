import styled from 'styled-components';

export function WorkOrderTab(): JSX.Element {
    const isNegative = (num: number) => Math.sign(num) === -1;

    return (
        <>
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
                    {data.map((wo) => (
                        <TableRow key={wo.id}>
                            <TableData>{wo.id}</TableData>
                            <TableData>{wo.title}</TableData>
                            <TableData>{wo.discipline}</TableData>
                            <TableData>{wo.status}</TableData>
                            <TableData>
                                {new Date(wo.plannedCompleted).toLocaleDateString()}
                            </TableData>
                            <TableData>{wo.actualCompleted}</TableData>
                            <TableData>
                                <ProgressBar percentWidth={(wo.actual / wo.estimate) * 100} />
                            </TableData>
                            <TableData>
                                <EstimateBar percentWidth={20} number={'14'} />
                            </TableData>
                            <TableData>
                                <EstimateBar percentWidth={55} number={'55'} />
                            </TableData>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

const TableData = styled.td`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    padding-left: 5px;
    max-height: 32px;
`;

const TableRow = styled.tr`
    border-bottom: 2px #dcdcdc solid;
`;

const Table = styled.table`
    border-collapse: collapse;
`;

const TableHeader = styled.thead`
    background: #f7f7f7;
    border-bottom: 2px solid #dcdcdc;
`;

const Header = styled.tr`
    background: #f7f7f7;
`;

const ColumnHeader = styled.th`
    background: #f7f7f7;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    height: 30px;
    width: 121px;
    padding-left: 5px;
`;

interface ProgressBarProps {
    percentWidth: number;
    number?: string;
}

function ProgressBar({ percentWidth }: ProgressBarProps) {
    return (
        <ProgressBarContainer>
            <ActualProgress borderColor="#40D38F" width={percentWidth} color="#D9F6E9">
                <Percent>{`${Math.round(percentWidth)}%`}</Percent>
            </ActualProgress>
        </ProgressBarContainer>
    );
}

const Percent = styled.div`
    padding-left: 0.5em;
`;

function EstimateBar({ percentWidth, number }: ProgressBarProps) {
    return (
        <ProgressBarContainer>
            <ActualProgress borderColor="#0084C4" color="#CCE6F3" width={percentWidth}>
                <Percent>{number}</Percent>
            </ActualProgress>
        </ProgressBarContainer>
    );
}

const ActualProgress = styled.div<{ width: number; borderColor?: string; color?: string }>`
    background-color: ${({ color }) => `${color ?? '#CCE6F3'}`};
    width: ${({ width }) => `${width}%`};
    height: 16px;
    border-bottom: ${({ borderColor }) => `2px ${borderColor ?? '#0084C4'} solid`};
`;

const ProgressBarContainer = styled.div`
    height: 16px;
    width: 68px;
    background-color: #f5f5f5;
    border-bottom: 2px #dcdcdc solid;
`;

const data: WorkOrder[] = [
    {
        actual: 86,
        estimate: 120,
        id: '1213244',
        title: 'Work order title',
        status: 'WO4',
        discipline: 'L,E',
        plannedCompleted: new Date().toString(),
        actualCompleted: null,
    },
    {
        actual: 20,
        estimate: 100,
        id: '12132',
        title: 'Work order title, idk how long',
        status: 'WO4',
        discipline: 'E',
        plannedCompleted: new Date().toString(),
        actualCompleted: null,
    },
    {
        actual: 50,
        estimate: 100,
        id: '121344',
        title: 'Work order title, idk how long',
        status: 'WO3',
        discipline: 'L',
        plannedCompleted: new Date().toString(),
        actualCompleted: null,
    },
];

interface WorkOrder {
    actual: number;
    estimate: number;
    id: string;
    title: string;
    status: string;
    discipline: string;
    plannedCompleted: string;
    actualCompleted: string | null;
}
