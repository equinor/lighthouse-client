import styled from 'styled-components';
import { Fragment, useEffect, useState } from 'react';
import { createWoStatusMap, filterWoMap } from './utils';
import { WoNumbersDisplay } from './components/WoNumbers';
import { SingleSelect } from '@equinor/eds-core-react';
import { CustomVisualArgs } from '@equinor/Diagrams';
import { WorkOrder } from '../../mocData/mockData';

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
const SelectContainer = styled.div`
    width: 30%;
`;
const TableData = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
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

export const CriticalWoTable = <T extends Record<keyof WorkOrder, unknown> = WorkOrder>({
    data,
    enableGrouping = false,
    initialGroupBy,
}: CustomVisualArgs<T>): JSX.Element => {
    const [groupBy, setGroupBy] = useState<keyof T>('disciplineDescription');
    const woStatusMap = createWoStatusMap(data, groupBy);
    const filtered = filterWoMap(woStatusMap);
    const grouped = Object.keys(filtered);
    const groupByKeys = data.length > 0 ? Object.keys(data[0]) : [groupBy];

    const handleChange = (groupByKey: keyof T) => {
        setGroupBy(groupByKey);
    };

    useEffect(() => {
        if (initialGroupBy) {
            setGroupBy(initialGroupBy as keyof T);
        }
    }, [initialGroupBy]);
    return (
        <Container>
            <Title>
                Job cards that have not reached state WO4 in weeks before installation date
            </Title>
            {enableGrouping && (
                <SelectContainer>
                    <SingleSelect
                        items={groupByKeys as string[]}
                        label="Group by"
                        value={`${groupBy}`}
                        handleSelectedItemChange={(select) => {
                            if (select.selectedItem) handleChange(select.selectedItem as keyof T);
                        }}
                        style={{ height: '30px' }}
                    />
                </SelectContainer>
            )}
            <Main>
                {grouped &&
                    grouped.map((groupedKey, index) => {
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
