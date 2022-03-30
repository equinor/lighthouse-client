import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { CriteriaStatus } from '../Criteria/Components/CriteriaDetail';

interface WorkflowIconProps {
    status: CriteriaStatus;
    number?: number | string;
}

export function WorkflowIcon({ status, number }: WorkflowIconProps): JSX.Element {
    switch (status) {
        case 'Active':
            return (
                <FixedIconContainer>
                    <GreenCircle>
                        <span>{number}</span>
                    </GreenCircle>
                </FixedIconContainer>
            );

        case 'Approved':
            return (
                <Icon
                    name="check_circle_outlined"
                    height={'28.8'}
                    width={'28.8'}
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            );

        case 'Rejected': {
            return (
                <Icon
                    name="close_circle_outlined"
                    height={'28.8'}
                    width={'28.8'}
                    color={tokens.colors.infographic.primary__energy_red_100.hex}
                />
            );
        }

        case 'Inactive':
            return (
                <FixedIconContainer>
                    <GreyCircle>
                        <span>{number}</span>
                    </GreyCircle>
                </FixedIconContainer>
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
    border: 2px solid #6f6f6f;
`;

const FixedIconContainer = styled.div`
    width: 29px;
    height: 29px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
