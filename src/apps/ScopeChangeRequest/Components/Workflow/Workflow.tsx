import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DotProgress, Icon, Tooltip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useMutation } from 'react-query';
import {
    Contributor,
    Criteria,
    ScopeChangeRequest,
    WorkflowStep,
} from '../../Types/scopeChangeRequest';
import { useHttpClient } from '../../../../Core/Client/Hooks/useApiClient';
import { addContributor as postContributor } from '../../Api/addContributor';
import { PCSPersonSearch } from '../SearchableDropdown/PCSPersonSearch';
import { WorkflowLine } from './WorkflowLine';

interface WorkflowProps {
    request: ScopeChangeRequest;
    refetch?: () => Promise<void>;
}
export function Workflow({ request, refetch }: WorkflowProps): JSX.Element {
    const [contributor, setContributor] = useState<{ value: string; label: string } | undefined>();

    const { scopeChange } = useHttpClient();

    const { mutateAsync, isLoading, isError } = useMutation(createContributor);

    async function createContributor() {
        if (!contributor?.value || !request.currentWorkflowStep?.id) return;
        await postContributor(
            contributor.value,
            request.id,
            request.currentWorkflowStep?.id,
            scopeChange
        );
    }

    // async function onSignStep(criteria: string) {
    //     if (request.currentWorkflowStep?.id) {
    //         await patchWorkflowStep(
    //             request.id,
    //             request.currentWorkflowStep.id,
    //             criteria,
    //             scopeChange
    //         );
    //         refetch && (await refetch());
    //     }
    // }

    // async function sendContribution(contributionId: string) {
    //     if (request.currentWorkflowStep && contributionId) {
    //         await postContribution(
    //             request.id,
    //             request.currentWorkflowStep?.id,
    //             contributionId,
    //             scopeChange
    //         );
    //         refetch && (await refetch());
    //     }
    // }

    useEffect(() => {
        if (!contributor?.value) return;
        const addContributor = async () => {
            await mutateAsync();
            refetch && (await refetch());
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
                    <div style={{ height: '30px' }}>
                        {isLoading && <DotProgress color="primary" size={32} />}
                        {isError && (
                            <div
                                style={{
                                    fontSize: '14px',
                                    color: `${tokens.colors.infographic.primary__energy_red_100.hex}`,
                                }}
                            >
                                Failed to add contributor
                            </div>
                        )}
                    </div>
                </>
            )}

            {request.workflowSteps.map((x, index) => {
                const stepStatus = statusFunc(x);
                return (
                    <WorkflowStepContainer key={index}>
                        {x.criterias.map((criteria) => {
                            const date = new Date(criteria.signedAtUtc);

                            const signedDate = date.toLocaleDateString('en-GB');
                            const signedTime = `${date.getHours()}:${date.getMinutes()}`;

                            return (
                                <>
                                    <WorkflowStepViewContainer>
                                        <Inline>
                                            <WorkflowIcon
                                                status={
                                                    stepStatus === 'Active'
                                                        ? criteriaStatus(criteria)
                                                        : stepStatus
                                                }
                                                number={x.order + 1}
                                            />
                                            <WorkflowText>
                                                <Tooltip
                                                    title={
                                                        !x.isCompleted
                                                            ? `Signature from ${criteria.value} required.`
                                                            : `Signed by ${criteria.signedBy.firstName} ${criteria.signedBy.lastName}`
                                                    }
                                                >
                                                    <span>{x.name}</span>
                                                </Tooltip>
                                                {criteria.signedAtUtc ? (
                                                    <div
                                                        style={{ fontSize: '14px' }}
                                                    >{`${signedDate} ${signedTime} - ${criteria.signedBy.firstName} ${criteria.signedBy.lastName} `}</div>
                                                ) : (
                                                    <div style={{ fontSize: '14px' }}>
                                                        {criteria.value}
                                                    </div>
                                                )}
                                            </WorkflowText>
                                        </Inline>
                                        {/* {x.isCurrent && !criteria.signedState && (
                                            <Button
                                                variant="outlined"
                                                onClick={() => onSignStep(criteria.id)}
                                            >
                                                Sign
                                            </Button>
                                        )} */}
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
                                </>
                            );
                        })}

                        {x.contributors.map((y) => {
                            return (
                                <ContributorContainer key={y.id}>
                                    <WorkflowStepViewContainer>
                                        <Inline>
                                            <WorkflowIcon
                                                status={contributorStatus(y, x.isCurrent)}
                                                number={'#'}
                                            />
                                            <WorkflowText>
                                                <Tooltip
                                                    title={`${y.person.firstName} ${y.person.lastName}`}
                                                >
                                                    <div>Contributor</div>
                                                </Tooltip>
                                                <div style={{ fontSize: '14px' }}>
                                                    {y.person.firstName} {y.person.lastName}
                                                </div>
                                            </WorkflowText>
                                        </Inline>
                                        {/* {!y.contribution && x.isCurrent && (
                                            <Button
                                                variant="outlined"
                                                onClick={() => sendContribution(y.id)}
                                            >
                                                Contribute
                                            </Button>
                                        )} */}
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
    width: -webkit-fill-available;
`;

const WorkflowStepContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

interface WorkflowIconProps {
    status: WorkflowStatus;
    number: number | string;
}

export const criteriaStatus = (criteria: Criteria): WorkflowStatus => {
    if (criteria.signedAtUtc === null) {
        return 'Active';
    } else {
        return 'Completed';
    }
};

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

export const statusFunc = (item: WorkflowStep): WorkflowStatus => {
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

        case 'Failed':
            return (
                <Icon
                    name="close_circle_outlined"
                    color={tokens.colors.infographic.primary__energy_red_100.hex}
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
