import React from 'react';
import { WorkflowDot } from './WorkflowDot';
import styled from 'styled-components';

interface WorkflowProps<T> {
    steps: T[];
    statusDotFunc: (
        item: T
    ) => 'Complete' | 'Inactive' | 'Outstanding' | 'PunchAError' | 'PunchBError';
    spanDirection?: 'vertical' | 'horizontal';
    dotSize?: number;
    popoverDisabled?: boolean;
}

export function WorkflowCompact<T>({
    steps,
    statusDotFunc,
    dotSize,
    popoverDisabled,
}: WorkflowProps<T>): JSX.Element {
    return (
        <>
            <WorkflowStepContainer>
                {steps.map((x, id) => {
                    return (
                        <div key={id}>
                            <WorkflowStep>
                                <WorkflowDot
                                    height={dotSize}
                                    width={dotSize}
                                    state={statusDotFunc(x)}
                                    circleText={(x as any).workflowStepText}
                                    popoverText={(x as any).stepName}
                                    active={statusDotFunc(x) !== 'Inactive'}
                                    popoverDisabled={popoverDisabled}
                                />
                            </WorkflowStep>
                        </div>
                    );
                })}
            </WorkflowStepContainer>
        </>
    );
}

const WorkflowStep = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2px;
`;

export interface WorkflowStep {
    id: string;
    name: string;
    order: number;
    isCompleted: boolean;
}

export const WorkflowStepContainer = styled.div`
    display: flex;
    flex-direction: row;
`;
