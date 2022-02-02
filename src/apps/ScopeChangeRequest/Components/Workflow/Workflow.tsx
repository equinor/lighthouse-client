import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Button, DotProgress, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useMutation } from 'react-query';
import { useHttpClient } from '../../../../Core/Client/Hooks/useApiClient';
import { addContributor as postContributor } from '../../Api/addContributor';
import { PCSPersonSearch } from '../SearchableDropdown/PCSPersonSearch';
import { WorkflowCriterias } from './WorkflowCriterias';
import { Contributors } from './Contributors';
import { ScopeChangeAccessContext } from '../Sidesheet/Context/scopeChangeAccessContext';

export function Workflow(): JSX.Element {
    const { request, setPerformingAction } = useContext(ScopeChangeAccessContext);
    const [contributor, setContributor] = useState<{ value: string; label: string } | null>(null);
    const [contributorTitle, setContributorTitle] = useState<string | undefined>();

    const { scopeChange } = useHttpClient();

    const { mutateAsync, isLoading, isError } = useMutation(createContributor);

    async function createContributor() {
        if (!contributor?.value || !request.currentWorkflowStep?.id || !contributorTitle) return;
        await postContributor(
            contributor.value,
            request.id,
            request.currentWorkflowStep?.id,
            scopeChange,
            contributorTitle
        );
    }

    const addContributor = async () => {
        setPerformingAction(true);
        await mutateAsync();
        setPerformingAction(false);
        setContributorTitle('');
        setContributor(null);
    };

    return (
        <div>
            {request.state === 'Open' && (
                <>
                    <div style={{ fontSize: '12px' }}>Add contributors</div>
                    <PCSPersonSearch person={contributor} setPerson={setContributor} />
                    {contributor !== null && (
                        <Inline>
                            <TextField
                                id={'Contributor text'}
                                placeholder={'Please enter contribution title'}
                                value={contributorTitle}
                                onChange={(e) => {
                                    setContributorTitle(e.target.value);
                                }}
                            />
                            <Button
                                disabled={
                                    contributorTitle === undefined || contributorTitle.length < 1
                                }
                                onClick={async () => await addContributor()}
                            >
                                Add
                            </Button>
                        </Inline>
                    )}

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
                return (
                    <WorkflowStepContainer key={index}>
                        <WorkflowCriterias step={x} />
                        <Contributors step={x} />
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

const Inline = styled.span`
    display: flex;
    align-items: center;
`;
