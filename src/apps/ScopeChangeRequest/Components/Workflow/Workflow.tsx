import React from 'react';
import { WorkflowDot } from './WorkflowDot';
import { WorkflowContainer } from './Styles/WorkflowContainer';

interface WorkflowProps {
    steps: WorkflowStep[];
    hideStepNames?: boolean;
}

export const Workflow = ({ steps }: WorkflowProps): JSX.Element => {
    console.log(steps);
    const sortedSteps = steps.sort((a, b) => a.order - b.order);
    console.log(sortedSteps);
    return (
        <>
            <WorkflowContainer>
                {sortedSteps.map((x) => {
                    return (
                        <>
                            <p>{x.name}</p>
                            <WorkflowDot state={x.isCompleted ? 'Completed' : 'Inactive'} />
                        </>
                    );
                })}
            </WorkflowContainer>
        </>
    );
};

export interface WorkflowStep {
    id: string;
    name: string;
    order: number;
    isCompleted: boolean;
}
