import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, DotProgress, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useMutation } from 'react-query';
import { useHttpClient } from '../../../../Core/Client/Hooks/useApiClient';
import { addContributor as postContributor } from '../../Api/addContributor';
import { PCSPersonSearch } from '../SearchableDropdown/PCSPersonSearch';
import { WorkflowCriterias } from './WorkflowCriterias';
import { Contributor } from './Contributors';
import { useScopeChangeAccessContext } from '../Sidesheet/Context/useScopeChangeAccessContext';

export function Workflow(): JSX.Element {
    const { request, setPerformingAction } = useScopeChangeAccessContext();
    const [contributor, setContributor] = useState<{ value: string; label: string } | null>(null);
    const [contributorTitle, setContributorTitle] = useState<string | undefined>();

    return (
        <div>
            {/* {request.state === 'Open' && (
                <>
                    <>
                        <div style={{ fontSize: '12px' }}>Add contributors</div>
                        <PCSPersonSearch
                            person={contributor}
                            setPerson={setContributor}
                            isDisabled={!canAddContributor}
                        />
                    </>

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
            )} */}

            {request.workflowSteps.map((step, index) => {
                return (
                    <WorkflowStepContainer key={index}>
                        {step.criterias &&
                            step.criterias.map((criteria) => {
                                return (
                                    <WorkflowCriterias
                                        key={criteria.id}
                                        step={step}
                                        criteria={criteria}
                                    />
                                );
                            })}
                        {step.contributors &&
                            step.contributors.map((contributor) => {
                                return (
                                    <Contributor
                                        key={contributor.id}
                                        step={step}
                                        contributor={contributor}
                                    />
                                );
                            })}
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
