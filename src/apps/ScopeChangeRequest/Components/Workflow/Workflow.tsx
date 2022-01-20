import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { useHttpClient } from '../../../../Core/Client/Hooks/useApiClient';
import { addContributor as postContributor } from '../../Api/addContributor';
import { ScopeChangeRequestState } from '../../Types/scopeChangeRequest';
import { PCSPersonSearch } from '../SearchableDropdown/PCSPersonSearch';
import { WorkflowLine } from './WorkflowLine';

interface WorkflowProps<T> {
    requestId: string;
    requestState: ScopeChangeRequestState;
    currentStepId: string | undefined;
    steps: T[];
    statusFunc: (item: T) => 'Completed' | 'Inactive' | 'Active';
    stepName?: keyof T;
    spanDirection?: 'vertical' | 'horizontal';
}
export function Workflow<T>({
    steps,
    requestState,
    statusFunc,
    stepName,
    requestId,
    currentStepId,
}: WorkflowProps<T>): JSX.Element {
    const [contributor, setContributor] = useState<{ value: string; label: string } | undefined>();

    const { customApi } = useHttpClient('api://df71f5b5-f034-4833-973f-a36c2d5f9e31/.default');

    const { mutateAsync, error, isLoading } = useMutation(createContributor, {
        retry: 2,
        retryDelay: 2,
    });

    async function createContributor() {
        if (!contributor?.value || !currentStepId) return;
        await postContributor(contributor.value, requestId, currentStepId, customApi);
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
    }, [contributor]);

    return (
        <div>
            {requestState === 'Open' && (
                <>
                    <div style={{ fontSize: '12px' }}>Add contributors</div>
                    <PCSPersonSearch person={contributor} setPerson={setContributor} />
                    <div style={{ height: '30px' }}>
                        {isLoading && <span>Loading...</span>}
                        {/* {error && (
                            <span style={{ fontSize: '14px', color: 'red' }}>
                                Adding contributor failed
                            </span>
                        )} */}
                    </div>
                </>
            )}

            {steps.map((x, id) => {
                return (
                    <WorkflowStepContainer key={id}>
                        {id !== 0 && (
                            <>
                                <Spacer />
                                <WorkflowLine colored={true} />
                                <Spacer />
                            </>
                        )}
                        <WorkflowStep>
                            <WorkflowIcon status={statusFunc(x)} />

                            {stepName && x[stepName]}
                        </WorkflowStep>
                    </WorkflowStepContainer>
                );
            })}
        </div>
    );
}

const WorkflowStepContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Spacer = styled.div`
    height: 9px;
    width: 2px;
`;

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
                    width="22"
                    height="22"
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
