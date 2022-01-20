import { Button, TextField } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { SectionRow } from '../../Styles/Section';
import { ScopeChangeRequest, WorkflowStep } from '../../Types/scopeChangeRequest';
import { Workflow } from '../Workflow/Workflow';
import { patchWorkflowStep } from '../../Api/patchWorkflowStep';
import { Field } from './Components/Field';
import { tokens } from '@equinor/eds-tokens';
import { useMemo, useState } from 'react';
import { useApiClient } from '../../../../Core/Client/Hooks/useApiClient';
import { patchScopeChange } from '../../Api';

interface RequestDetailViewProps {
    request: ScopeChangeRequest;
    setEditMode: () => void;
    refetch: () => Promise<void>;
}

export const RequestDetailView = ({
    request,
    setEditMode,
    refetch,
}: RequestDetailViewProps): JSX.Element => {
    const [comment, setComment] = useState<string | undefined>(undefined);
    const { customApi } = useApiClient('api://df71f5b5-f034-4833-973f-a36c2d5f9e31/.default');
    const onInitiate = async () => {
        const payload = {
            ...request,
            setAsOpen: true,
        };

        await patchScopeChange(payload, customApi);
        refetch();
    };

    interface LogEntry {
        value: string;
        date: string;
        name: string;
    }

    const logValues: LogEntry[] = useMemo(() => {
        const logArray: LogEntry[] = [];

        if (!request.workflowSteps) {
            return [];
        }
        request.workflowSteps.map((x) => {
            x.criterias.map((x) => {
                x.signedComment &&
                    logArray.push({
                        value: x.signedComment,
                        date: x.signedAtUtc,
                        name: `${x.signedBy.firstName} ${x.signedBy.lastName}`,
                    });
            });
        });
        return logArray;
    }, [request]);

    const activeCriteriaId = useMemo(() => {
        if (
            request.state === 'Open' &&
            request.currentWorkflowStep &&
            request.currentWorkflowStep.criterias.length > 0
        ) {
            return request.currentWorkflowStep.criterias.find((x) => x.id)?.id;
        }
    }, [request]);

    const onSignStep = () => {
        if (activeCriteriaId && request.currentWorkflowStep) {
            patchWorkflowStep(
                request.id,
                request.currentWorkflowStep.id,
                activeCriteriaId,
                customApi,
                comment
            ).then(() => refetch());
            setComment('');
        }
    };

    const statusFunc = (item: WorkflowStep): 'Completed' | 'Inactive' | 'Active' => {
        if (item.isCompleted) {
            return 'Completed';
        }
        if (item.isCurrent) {
            return 'Active';
        } else {
            return 'Inactive';
        }
    };

    return (
        <div>
            <DetailViewContainer>
                <Field
                    label={'Title'}
                    customLabel={{ fontSize: '12px' }}
                    customValue={{ fontSize: '16px' }}
                    value={request.title}
                />
                <SectionRow>
                    <Field
                        label={'Phase'}
                        customLabel={{ fontSize: '12px' }}
                        customValue={{ fontSize: '16px' }}
                        value={request.phase}
                    />
                    <Field
                        label={'Status'}
                        customLabel={{ fontSize: '12px' }}
                        customValue={{ fontSize: '16px' }}
                        value={request.state}
                    />
                </SectionRow>
                <SectionRow>
                    <Field
                        label={'Change category'}
                        customLabel={{ fontSize: '12px' }}
                        customValue={{ fontSize: '16px' }}
                        value={request.category}
                    />
                    <Field
                        label={'Change origin'}
                        customLabel={{ fontSize: '12px' }}
                        customValue={{ fontSize: '16px' }}
                        value={request.origin}
                    />
                </SectionRow>
                <Field
                    label={'Description'}
                    customLabel={{ fontSize: '12px' }}
                    customValue={{ fontSize: '16px' }}
                    value={request.description}
                />
                <SectionRow>
                    <Field
                        label={'Guesstimate mhrs'}
                        customLabel={{ fontSize: '12px' }}
                        customValue={{ fontSize: '16px' }}
                        value={request.guesstimateHours}
                    />
                    <Field
                        label={'Guesstimate description'}
                        customLabel={{ fontSize: '12px' }}
                        customValue={{ fontSize: '16px' }}
                        value={request.guesstimateDescription}
                    />
                </SectionRow>
                <Field
                    customLabel={{ fontSize: '18px', bold: true }}
                    label={'Workflow'}
                    value={
                        <Workflow
                            requestState={request.state}
                            requestId={request.id}
                            currentStepId={request.currentWorkflowStep?.id}
                            stepName={'name'}
                            steps={request.workflowSteps}
                            statusFunc={statusFunc}
                        />
                    }
                />
                <Field
                    customLabel={{ fontSize: '18px', bold: true }}
                    label="Attachments"
                    value={
                        <div>
                            {request.attachments &&
                                request.attachments.map((x) => {
                                    return (
                                        <Link
                                            href={`https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${request.id}/attachments/${x.id}`}
                                            download
                                            key={x.id}
                                        >
                                            {x.fileName}
                                        </Link>
                                    );
                                })}
                        </div>
                    }
                />

                <Field
                    customLabel={{ fontSize: '18px', bold: true }}
                    label="Log"
                    value={
                        <div>
                            {logValues.map((x) => {
                                return (
                                    <LogMessage key={x.value + x.date}>
                                        <span style={{ fontSize: '10px' }}>
                                            {new Date(x.date).toLocaleDateString()} by {x.name}
                                        </span>
                                        <span style={{ fontSize: '16px' }}>
                                            &quot;{x.value}&quot;
                                        </span>
                                    </LogMessage>
                                );
                            })}
                        </div>
                    }
                />
            </DetailViewContainer>
            {request.state !== 'Closed' && (
                <RequestActionsContainer>
                    <Field
                        label="Comment"
                        value={
                            <TextField
                                style={{ width: '100vh' }}
                                id={'Comment'}
                                multiline
                                value={comment}
                                onChange={(e) => {
                                    setComment(e.target.value);
                                }}
                            />
                        }
                    />
                    <ButtonContainer>
                        {request.state === 'Draft' && (
                            <>
                                {/* <Button onClick={setEditMode}>Edit</Button> */}
                                <HorizontalDivider />
                                <Button onClick={onInitiate} variant="outlined">
                                    Initiate request
                                </Button>
                            </>
                        )}
                        {request.state === 'Open' && (
                            <>
                                <span>
                                    {/* <Button variant="outlined" color="danger">
                                            Void Request
                                        </Button> */}
                                </span>
                                <Button disabled={!activeCriteriaId} onClick={onSignStep}>
                                    Sign
                                </Button>
                            </>
                        )}
                    </ButtonContainer>
                </RequestActionsContainer>
            )}
        </div>
    );
};

const ActionSelectorHeight = '180px';

const DetailViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(87vh - ${ActionSelectorHeight});

    overflow: scroll;
`;

const ButtonContainer = styled.div`
    display: flex;
    padding: 0em 1em 1em 1em;
    justify-content: space-between;
`;

const HorizontalDivider = styled.div`
    margin: 0.2em;
`;

const Link = styled.a`
    display: flex;
    color: ${tokens.colors.interactive.primary__resting.rgba};
    cursor: pointer;
    textdecorationline: underline;
    padding: 8px 0px;
`;

const RequestActionsContainer = styled.div`
    border-top: solid 2.5px ${tokens.colors.ui.background__medium.rgba};
    display: flex;
    background-color: white;
    width: 650px;
    height: ${ActionSelectorHeight};
    flex-direction: column;
    position: fixed;
    bottom: 0px;
`;

const LogMessage = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0em;
`;

/**
 //TODO:
 * Do some CSS magic, Calculate height of DetailViewContainer and subtract RequestActionsContainer to make overflow work properly
 */
