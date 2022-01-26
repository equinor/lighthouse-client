import { Tooltip } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { Contributor, WorkflowStep } from '../../Types/scopeChangeRequest';
import { WorkflowIcon } from './WorkflowIcon';
import { WorkflowLine } from './WorkflowLine';

interface ContributorsProps {
    step: WorkflowStep;
}

export const Contributors = ({ step }: ContributorsProps): JSX.Element => {
    return (
        <>
            {step.contributors.map((y) => {
                return (
                    <ContributorContainer key={y.id}>
                        <WorkflowStepViewContainer>
                            <Inline>
                                <WorkflowIcon
                                    status={contributorStatus(y, step.isCurrent)}
                                    number={'#'}
                                />
                                <WorkflowText>
                                    <Tooltip title={`${y.person.firstName} ${y.person.lastName}`}>
                                        <div>{y.messageToContributor}</div>
                                    </Tooltip>
                                    <div style={{ fontSize: '14px' }}>
                                        {y.person.firstName} {y.person.lastName}
                                    </div>
                                </WorkflowText>
                            </Inline>
                        </WorkflowStepViewContainer>
                        <Spacer />
                        <WorkflowLine colored={true} />
                        <Spacer />
                    </ContributorContainer>
                );
            })}
        </>
    );
};

const ContributorContainer = styled.div`
    padding: 0px 32px;
    width: -webkit-fill-available;
`;

const WorkflowText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Spacer = styled.div`
    height: 9px;
    width: 7px;
`;

const WorkflowStepViewContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2px;
    width: -webkit-fill-available;
`;

const Inline = styled.span`
    display: flex;
    align-items: center;
`;

type WorkflowStatus = 'Completed' | 'Active' | 'Inactive' | 'Failed';

function contributorStatus(contributor: Contributor, currentStep: boolean): WorkflowStatus {
    if (contributor.contribution) {
        return 'Completed';
    }

    if (currentStep) {
        return 'Active';
    } else {
        return 'Failed';
    }
}
