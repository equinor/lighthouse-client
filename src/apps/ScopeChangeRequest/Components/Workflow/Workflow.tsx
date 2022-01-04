import React from 'react';
import { WorkflowContainer } from './Styles/WorkflowContainer';
import styled from 'styled-components';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

interface WorkflowProps<T> {
    steps: T[];
    statusFunc: (item: T) => 'Completed' | 'Inactive' | 'Active';
    stepName?: keyof T;
    spanDirection?: 'vertical' | 'horizontal';
}
export function Workflow<T>({
    steps,
    statusFunc,
    stepName,
    spanDirection,
}: WorkflowProps<T>): JSX.Element {
    return (
        <>
            <WorkflowContainer direction={spanDirection === 'horizontal' ? 'row' : 'column'}>
                {steps.map((x, id) => {
                    return (
                        <div key={id}>
                            <WorkflowStep>
                                <WorkflowIcon status={statusFunc(x)} />

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

interface WorkflowIconProps {
    status: 'Completed' | 'Inactive' | 'Active';
}

function WorkflowIcon({ status }: WorkflowIconProps): JSX.Element {
    switch (status) {
        case 'Active':
            return (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="1"
                        y="1"
                        width="22"
                        height="22"
                        rx="11"
                        fill="#007079"
                        stroke="#007079"
                        strokeWidth="2"
                    ></rect>
                </svg>
            );

        case 'Completed':
            return (
                <Icon
                    name="check_circle_outlined"
                    color={tokens.colors.infographic.substitute__green_succulent.hex}
                />
            );

        case 'Inactive':
            return (
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="6" cy="6" r="5.5" stroke="#6F6F6F" />
                </svg>
            );

        default:
            return (
                <Icon
                    name="check_circle_outlined"
                    color={tokens.colors.infographic.substitute__green_succulent.hex}
                />
            );
    }
}
