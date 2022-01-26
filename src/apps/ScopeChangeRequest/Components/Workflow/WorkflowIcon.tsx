import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface WorkflowIconProps {
    status: WorkflowStatus;
    number: number | string;
}

type WorkflowStatus = 'Completed' | 'Active' | 'Inactive' | 'Failed';

export function WorkflowIcon({ status, number }: WorkflowIconProps): JSX.Element {
    switch (status) {
        case 'Active':
            return (
                <GreenCircle>
                    <span>{number}</span>
                </GreenCircle>
            );

        case 'Completed':
            return (
                <Icon
                    name="check_circle_outlined"
                    height={'28.8'}
                    width={'28.8'}
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            );

        case 'Inactive':
            return (
                <GreyCircle>
                    <span>{number}</span>
                </GreyCircle>
            );

        case 'Failed':
            return (
                <Icon
                    name="remove_outlined"
                    height={'28.8'}
                    width={'28.8'}
                    color="grey"
                // color={tokens.colors.infographic.primary__energy_red_100.hex}
                />
            );

        default:
            return (
                <Icon
                    name="close"
                    color={tokens.colors.infographic.substitute__green_succulent.hex}
                />
            );
    }
}

const GreenCircle = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    color: white;
    font-size: 14px;
    background: ${tokens.colors.interactive.primary__resting.hex};
`;

const GreyCircle = styled.div`
    color: grey;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 50%;
    width: 20px;
    font-size: 14px;
    height: 20px;
    border: 2px solid grey;
`;
