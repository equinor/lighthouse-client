import React from 'react';
import { WorkflowDot } from './WorkflowDot';
import styled from 'styled-components';

interface WorkflowProps<T> {
    steps: T[];
    statusDotFunc: (item: T) => 'Completed' | 'Inactive' | 'Outstanding' | 'Error';
    stepName?: keyof T;
    spanDirection?: 'vertical' | 'horizontal';
    dotSize?: number;
}

export function WorkflowCompact<T>({
    steps,
    statusDotFunc,
    stepName,
    dotSize,
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
                                    text={(x as any).workflowStepText}
                                    active={statusDotFunc(x) !== 'Inactive'}
                                />

                                {stepName && x[stepName]}
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
