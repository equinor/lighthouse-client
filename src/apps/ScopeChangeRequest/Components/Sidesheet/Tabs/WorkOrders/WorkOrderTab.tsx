import styled from 'styled-components';

export function WorkOrderTab(): JSX.Element {
    return (
        <>
            <Table>
                <TableHeader>
                    <Header>
                        <ColumnHeader>
                            <HoursTableHeading>
                                <span>Actual</span>
                                <span>Remaining</span>
                                <span style={{ padding: '10px' }}>Estimate</span>
                            </HoursTableHeading>
                        </ColumnHeader>

                        <ColumnHeader>ID</ColumnHeader>
                        <ColumnHeader>Title</ColumnHeader>
                        <ColumnHeader>Status</ColumnHeader>
                        <ColumnHeader>Discipline</ColumnHeader>
                        <ColumnHeader>Plan. compl.</ColumnHeader>
                        <ColumnHeader>Act. compl.</ColumnHeader>
                    </Header>
                </TableHeader>

                <tbody>
                    {data.map((wo) => (
                        <TableRow key={wo.id}>
                            <HoursTableData>
                                <HoursText>{wo.actual}</HoursText>
                                <ProgressBar
                                    percentWidth={(wo.actual / wo.estimate) * 100}
                                    number={wo.estimate - wo.actual}
                                />
                                <HoursText style={{ padding: '20px' }}>{wo.estimate}</HoursText>
                            </HoursTableData>
                            <TableData>{wo.id}</TableData>
                            <TableData>{wo.title}</TableData>
                            <TableData>{wo.status}</TableData>
                            <TableData>{wo.discipline}</TableData>
                            <TableData>
                                {new Date(wo.plannedCompleted).toLocaleDateString()}
                            </TableData>
                            <TableData>{wo.actualCompleted}</TableData>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

const HoursTableHeading = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    flex-direction: row;
    gap: 2em;

    align-items: center;
    margin-left: 5px;
`;

const TableData = styled.td`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
`;

const HoursText = styled.div`
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: right;
`;

const TableRow = styled.tr`
    border-bottom: 2px #dcdcdc solid;
`;

const HoursTableData = styled.td`
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    flex-direction: row;
    gap: 2em;

    align-items: center;
    margin-left: 5px;
`;

const Table = styled.table`
    border-collapse: collapse;
`;

const TableHeader = styled.thead`
    background: #f7f7f7;
    border-bottom: 2px solid #dcdcdc;
`;

const Header = styled.tr`
    gap: 0px;
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
`;

interface ProgressBarProps {
    percentWidth: number;
    number: number;
}

function ProgressBar({ percentWidth, number }: ProgressBarProps) {
    return (
        <ProgressBarContainer style={{ borderBottom: '2px #DCDCDC solid' }}>
            <div
                style={{
                    backgroundColor: '#D9F6E9',
                    width: `${percentWidth}%`,
                    height: '16px',
                    borderBottom: '2px #40D38F solid',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                    }}
                >
                    {number}
                </div>
            </div>
        </ProgressBarContainer>
    );
}

const ProgressBarContainer = styled.div`
    height: 16px;
    width: 200px;
    background-color: #f5f5f5;
`;

const data: WorkOrder[] = [
    {
        actual: 86,
        estimate: 120,
        id: '1213244',
        title: 'Work order title, idk how long',
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
