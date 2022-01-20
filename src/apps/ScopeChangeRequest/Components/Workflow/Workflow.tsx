import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { WorkflowLine } from './WorkflowLine';
import { PCSPersonSearch } from '../SearchableDropdown/PCSPersonSearch';
import { useApiClient } from '../../../../Core/Client/Hooks/useApiClient';
import { addContributor as postContributor } from '../../Api/addContributor';
import { useMutation } from 'react-query';
import { ScopeChangeRequest, WorkflowStep } from '../../Types/scopeChangeRequest';

interface WorkflowProps {
    request: ScopeChangeRequest;
}
export function Workflow({ request }: WorkflowProps): JSX.Element {
    const [contributor, setContributor] = useState<{ value: string; label: string } | undefined>();

    const { scopeChange } = useApiClient();

    const { mutateAsync, isLoading } = useMutation(createContributor);

    async function createContributor() {
        if (!contributor?.value || !request.currentWorkflowStep?.id) return;
        await postContributor(
            contributor.value,
            request.id,
            request.currentWorkflowStep?.id,
            scopeChange
        );
    }

    useEffect(() => {
        if (!contributor?.value) return;
        const addContributor = async () => {
            await mutateAsync();
        };
        addContributor();
        setContributor(undefined);
        /**
         * APi call to add contributor then clear contributor
         */
    }, [contributor, mutateAsync]);

    return (
        <div>
            {request.state === 'Open' && (
                <>
                    <div style={{ fontSize: '12px' }}>Add contributors</div>
                    <PCSPersonSearch person={contributor} setPerson={setContributor} />
                    <div style={{ height: '30px' }}>{isLoading && <span>Loading...</span>}</div>
                </>
            )}

            {request.workflowSteps.map((x, index) => {
                return (
                    <WorkflowStepContainer key={index}>
                        <WorkflowStepViewContainer>
                            <WorkflowIcon status={statusFunc(x)} number={x.order + 1} />
                            {x.name}
                        </WorkflowStepViewContainer>
                        {index !== request.workflowSteps.length - 1 && (
                            <>
                                <Spacer />
                                <div style={{ padding: '1.05px' }}>
                                    <WorkflowLine colored={x.isCompleted} />
                                </div>
                                <Spacer />
                            </>
                        )}

                        {x.contributors.map((x) => {
                            return (
                                <ContributorContainer key={x.id}>
                                    <WorkflowStepViewContainer>
                                        <WorkflowIcon
                                            status={
                                                x.contribution && x.contribution?.id
                                                    ? 'Completed'
                                                    : 'Active'
                                            }
                                            number={'#'}
                                        />
                                        <div title={`${x.person.firstName} ${x.person.lastName}`}>
                                            Contribution
                                        </div>
                                    </WorkflowStepViewContainer>
                                    <Spacer />
                                    <WorkflowLine colored={true} />
                                    <Spacer />
                                </ContributorContainer>
                            );
                        })}
                    </WorkflowStepContainer>
                );
            })}
        </div>
    );
}

const ContributorContainer = styled.div`
    padding: 0px 32px;
`;

const WorkflowStepContainer = styled.div`
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
`;

interface WorkflowIconProps {
    status: 'Completed' | 'Inactive' | 'Active';
    number: number | string;
}

export const statusFunc = (item: WorkflowStep): 'Completed' | 'Inactive' | 'Active' => {
    if (item.isCompleted) {
        return 'Completed';
    }
    if (item.isCurrent) {
        return 'Active';
    } else {
        return 'Inactive';
    }
};

function WorkflowIcon({ status, number }: WorkflowIconProps): JSX.Element {
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
