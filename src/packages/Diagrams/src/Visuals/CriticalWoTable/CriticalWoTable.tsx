import styled from 'styled-components';
import { WorkOrder } from '../../../../../apps/Construction/mocData/mockData';
import { Fragment } from 'react';
import { createWoStatusMap, filterWoMap } from './utils';
import { WoNumbersDisplay } from './components/WoNumbers';
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
        <div style={{ height: '100%', overflowY: 'scroll' }}>
            <h3>Job cards that have not reached state WO4 in weeks before installation date</h3>
            <Main>
                {disciplines &&
                    disciplines.map((discipline, index) => {
                        const woCountValues = Object.values(filtered[discipline]);
                        if (woCountValues.every((val) => val === 0)) {
                            return null;
                        }
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
        </div>
    );
};

/**
 *
 * Test data here..
 */

// export const counted: WoDiscCount = {
//     Insulation: {
//         one: 1,
//         two: 2,
//         three: 4,
//         four: 5,
//     },

//     Automation: {
//         one: 0,
//         two: 2,
//         three: 5,
//         four: 1,
//     },
// };

// export const blah: WoDiscMap = {
//     Insulation: [
//         {
//             status: 'WO3',
//             plannedFinishDate: new Date('01/20/2022').toString(),
//         },
//         // {
//         //     status: 'WO3',
//         //     plannedFinishDate: new Date('30/11/2021').toString(),
//         // },
//         // {
//         //     status: 'WO3',
//         //     plannedFinishDate: new Date('30/11/2021').toString(),
//         // },
//     ],
//     Automation: [
//         {
//             status: 'WO1',
//             plannedFinishDate: new Date('01/12/2022').toString(),
//         },
//     ],
// };
