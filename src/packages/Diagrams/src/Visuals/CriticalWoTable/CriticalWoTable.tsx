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

const Title = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

const TableData = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`;
const WeekHeader = styled.div`
    font-weight: 500;
    padding-top: 1em;
    padding-bottom: 1em;
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
            <Title>
                Job cards that have not reached state WO4 in weeks before installation date
            </Title>
            <Main>
                {groupByKeys &&
                    groupByKeys.map((groupedKey, index) => {
                        const woCountValues = Object.values(filtered[groupedKey]);

                        const keysOfFiltered = Object.keys(filtered[groupedKey]);

                        return (
                            <Fragment key={groupedKey}>
                                <TableData>
                                    <div style={{ visibility: 'hidden' }}>Very hacky :)</div>
                                    {index === 0 &&
                                        keysOfFiltered.map((_key, index) => {
                                            return (
                                                <WeekHeader key={index}>
                                                    {index + 1}
                                                    {index === 0 ? ' Week left' : ' Weeks left'}
                                                </WeekHeader>
                                            );
                                        })}
                                </TableData>
                                {woCountValues.every((val) => val.count === 0) ? null : (
                                    <>
                                        <TableData>
                                            <div style={{ fontWeight: 500 }}>{groupedKey}</div>

                                            <WoNumbersDisplay
                                                filtered={filtered}
                                                groupedKey={groupedKey}
                                                keysOfFiltered={keysOfFiltered}
                                            />
                                        </TableData>
                                        <HLine />
                                    </>
                                )}
                            </Fragment>
                        );
                    })}
            </Main>
        </Container>
    );
};
