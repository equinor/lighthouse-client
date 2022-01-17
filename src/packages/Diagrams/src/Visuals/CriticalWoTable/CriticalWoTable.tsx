import styled from 'styled-components';
import { WorkOrder } from '../../../../../apps/Construction/mocData/mockData';
import { Fragment } from 'react';
import { createWoStatusMap, filterWoMap } from './utils';
import { WoNumbersDisplay } from './components/WoNumbers';
<<<<<<< HEAD

const Container = styled.div`
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
`;
=======
>>>>>>> 88a053c13d1e06cc33b70b46c088e22a39fb2c4d
const Main = styled.div`
    width: 100%;
    padding-bottom: 2em;
`;

const TableData = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`;
const HLine = styled.hr`
    width: 100%;
    background-color: #e7e0e0;
    height: 1px;
`;

type CriticalWoTableProps<T> = {
    data: T[];
};

export const CriticalWoTable = <T extends Record<keyof WorkOrder, unknown> = WorkOrder>({
    data,
}: CriticalWoTableProps<T>) => {
    const woDisc = createWoStatusMap(data, 'disciplineDescription');
    const filtered = filterWoMap(woDisc);
    const disciplines = Object.keys(filtered);
    return (
        <Container>
            <h3>Job cards that have not reached state WO4 in weeks before installation date</h3>
            <Main>
                {disciplines &&
                    disciplines.map((discipline, index) => {
                        const woCountValues = Object.values(filtered[discipline]);
                        // if (woCountValues.every((val) => val === 0)) {
                        //     return null;
                        // }
                        const keysOfFiltered = Object.keys(filtered[discipline]);

                        return (
                            <Fragment key={discipline}>
                                <div>
                                    <TableData>
                                        <div style={{ visibility: 'hidden' }}>Very hacky :)</div>
                                        {index === 0 &&
                                            keysOfFiltered.map((_key, index) => {
                                                return (
                                                    <div
                                                        style={{
                                                            fontWeight: 500,
                                                            paddingBottom: '1em',
                                                        }}
                                                    >
                                                        {index + 1}
                                                        {index === 0 ? ' Week left' : ' Weeks left'}
                                                    </div>
                                                );
                                            })}
                                    </TableData>

                                    <TableData>
                                        <div style={{ fontWeight: 500 }}>{discipline}</div>

                                        <WoNumbersDisplay
                                            filtered={filtered}
                                            discipline={discipline}
                                            keysOfFiltered={keysOfFiltered}
                                        />
                                    </TableData>
                                </div>
                                <HLine />
                            </Fragment>
                        );
                    })}
            </Main>
        </Container>
    );
};
