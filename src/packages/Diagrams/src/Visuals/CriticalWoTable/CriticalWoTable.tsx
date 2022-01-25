import styled from 'styled-components';
import { WorkOrder } from '../../../../../apps/Construction/mocData/mockData';
import { Fragment } from 'react';
import { createWoStatusMap, filterWoMap } from './utils';
import { WoNumbersDisplay } from './components/WoNumbers';

const Container = styled.div`
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
`;
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
    const woStatusMap = createWoStatusMap(data, 'disciplineDescription');
    const filtered = filterWoMap(woStatusMap);
    const groupByKeys = Object.keys(filtered);
    return (
        <Container>
            <h3>Job cards that have not reached state WO4 in weeks before installation date</h3>
            <Main>
                {groupByKeys &&
                    groupByKeys.map((groupedKey, index) => {
                        const woCountValues = Object.values(filtered[groupedKey]);
                        // if (woCountValues.every((val) => val === 0)) {
                        //     return null;
                        // }
                        const keysOfFiltered = Object.keys(filtered[groupedKey]);

                        return (
                            <Fragment key={groupedKey}>
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
                                                        key={index}
                                                    >
                                                        {index + 1}
                                                        {index === 0 ? ' Week left' : ' Weeks left'}
                                                    </div>
                                                );
                                            })}
                                    </TableData>

                                    <TableData>
                                        <div style={{ fontWeight: 500 }}>{groupedKey}</div>

                                        <WoNumbersDisplay
                                            filtered={filtered}
                                            groupedKey={groupedKey}
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
