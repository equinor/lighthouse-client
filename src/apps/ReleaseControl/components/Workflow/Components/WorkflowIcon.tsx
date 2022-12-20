import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { DisputedWorkflowIcon } from '../../../../ScopeChangeRequest/Components/WorkflowIcons/DisputedWorkflowIcon';
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
                <FixedIconContainer>
                    <Icon
                        name="check_circle_outlined"
                        height={'20'}
                        width={'25'}
                        color={tokens.colors.interactive.primary__resting.hex}
                    />
                </FixedIconContainer>
            );

        case 'Disputed': {
            return (
                <FixedIconContainer>
                    <DisputedWorkflowIcon />
                </FixedIconContainer>
            );
        }

        case 'Rejected': {
            return (
                <FixedIconContainer>
                    <Icon
                        name="close_circle_outlined"
                        height={'20'}
                        width={'25'}
                        color={tokens.colors.infographic.primary__energy_red_100.hex}
                    />
                </FixedIconContainer>
            );
        }

        case 'Inactive':
            return (
                <FixedIconContainer>
                    <GreyCircle>
                        <Number>{number}</Number>
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

const Number = styled.div`
    margin-top: 2px;
`;

const GreenCircle = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 50%;
    width: 25px;
    height: 20px;
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
    width: 21px;
    height: 16px;
    font-size: 14px;
    border: 2px solid #6f6f6f;
    overflow: hidden;
`;

const FixedIconContainer = styled.div`
    width: 25px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
