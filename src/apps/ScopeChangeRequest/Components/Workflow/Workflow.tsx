import React from 'react';
import { WorkflowDot } from './WorkflowDot';
import { WorkflowContainer } from './Styles/WorkflowContainer';
import styled from 'styled-components';

interface WorkflowProps<T> {
    steps: T[];
    statusDotFunc: (item: T) => 'Completed' | 'Inactive' | 'Active';
    stepName?: keyof T;
    spanDirection?: 'vertical' | 'horizontal';
    dotSize?: number;
}

export function Workflow<T>({
    steps,
    statusDotFunc,
    stepName,
    spanDirection,
    dotSize,
}: WorkflowProps<T>): JSX.Element {
    return (
        <>
            <WorkflowContainer direction={spanDirection === 'horizontal' ? 'row' : 'column'}>
                {steps.map((x, id) => {
                    return (
                        <div key={id}>
                            <WorkflowStep>
                                <WorkflowDot
                                    height={dotSize}
                                    width={dotSize}
                                    state={statusDotFunc(x)}
                                />
                                {stepName && x[stepName]}
                            </WorkflowStep>
                        </div>
                    );
                })}
            </WorkflowContainer>
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
