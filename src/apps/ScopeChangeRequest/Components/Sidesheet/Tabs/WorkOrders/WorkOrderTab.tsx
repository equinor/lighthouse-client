import styled from 'styled-components';
import { data, WorkOrder, WorkOrderTable } from '../../../WorkOrderTable/WorkOrderTable';
import { useParentSize } from '@cutting/use-get-parent-size';
import { useRef } from 'react';
import { ProgressBar } from '../../../WoProgressBars/ProgressBar';
import { ExpendedProgressBar } from '../../../WoProgressBars/ExpendedProgressBar';
import { EstimateBar } from '../../../WoProgressBars/EstimateBar';

export function WorkOrderTab(): JSX.Element {
    const ref = useRef<null | HTMLDivElement>(null);
    const { width } = useParentSize(ref);

    return (
        <>
            <div ref={ref}>{width > 960 ? <WorkOrderTable /> : <CompactWorkOrderList />}</div>
        </>
    );
}

const CompactWorkOrderList = () => {
    const highestEstimate = Math.max(...data.map(({ estimate }) => estimate));
    const highestExpended = Math.max(...data.map(({ actual }) => actual));

    return (
        <div
            style={{
                display: 'flex',
                gap: '2em',
                flexDirection: 'column',
            }}
        >
            {data.map((wo) => (
                <CompactWorkorder
                    highestEstimate={highestEstimate}
                    highestExpended={highestExpended}
                    key={wo.id}
                    wo={wo}
                />
            ))}
        </div>
    );
};

interface CompactWorkorderProps {
    wo: WorkOrder;
    highestEstimate: number;
    highestExpended: number;
}

const CompactWorkorder = ({ wo, highestEstimate, highestExpended }: CompactWorkorderProps) => {
    const getPercentEstimate = (number: number) => (number / highestEstimate) * 100;

    return (
        <div style={{ height: '72px' }}>
            <Header>{`${wo.id}, ${wo.title} `}</Header>
            <Columns>
                <Column>
                    <div>Disc.</div>
                    <div>{wo.discipline}</div>
                </Column>
                <Column>
                    <div>Status</div>
                    <div>{wo.status}</div>
                </Column>
                <Column>
                    <div>Plan. compl.</div>
                    <div>{new Date(wo.plannedCompleted).toLocaleDateString()}</div>
                </Column>
                <Column>
                    <div>Act. compl.</div>
                    <div>
                        {wo.actualCompleted && new Date(wo.actualCompleted).toLocaleDateString()}
                    </div>
                </Column>
                <Column>
                    <div>Progress</div>
                    <ProgressBar percentWidth={wo.progress} />
                </Column>
                <Column>
                    <div>Estimate</div>
                    <EstimateBar
                        percentWidth={getPercentEstimate(wo.estimate)}
                        number={`${wo.estimate}`}
                    />
                </Column>
                <Column>
                    <div>Expended</div>
                    <div>
                        <ExpendedProgressBar
                            actual={wo.actual}
                            estimate={wo.estimate}
                            highestExpended={highestExpended}
                        />
                    </div>
                </Column>
            </Columns>
        </div>
    );
};

const Header = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
    /* width: max-content; */
`;

const Columns = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 2fr 2fr 2fr;
    column-gap: 2em;

    /* justify-content: space-between; */
`;
