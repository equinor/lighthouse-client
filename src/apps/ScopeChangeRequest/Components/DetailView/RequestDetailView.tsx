import { Button, TextField } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { SectionRow } from '../../Styles/Section';
import { ScopeChangeRequest, WorkflowStep } from '../../Types/scopeChangeRequest';
import { Workflow } from '../Workflow/Workflow';
import { patchWorkflowStep } from '../../Api/patchWorkflowStep';
import { Field } from './Components/Field';
import { tokens } from '@equinor/eds-tokens';
import { useMemo, useState } from 'react';

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

    const onInitiate = () => {
        const payLoad = {
            ...request,
            setAsOpen: true,
        };
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payLoad),
        };
        fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${request.id}`,
            requestOptions
        ).then(() => refetch());
    };

    interface LogEntry {
        value: string;
        date: string;
        personId: string;
    }

    const logValues: LogEntry[] = useMemo(() => {
        const logArray: LogEntry[] = [];

        request.workflowSteps.map((x) => {
            x.criterias.map((x) => {
                x.signedComment &&
                    logArray.push({
                        value: x.signedComment,
                        date: x.signedAtUtc,
                        personId: x.signedById,
                    });
            });
        });
        return logArray;
    }, [request]);
    const activeCriteriaId = useMemo(() => {
        if (request.state === 'Open') {
            return request.currentWorkflowStep.criterias.find((x) => x.id)?.id;
        }
    }, [request]);

    const onSignStep = () => {
        if (activeCriteriaId) {
            patchWorkflowStep(request.id, activeCriteriaId, comment).then(() => refetch());
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
                <Field
                    customLabel={{ fontSize: '18px', bold: true }}
                    label={'Workflow'}
                    value={
                        <Workflow
                            stepName={'name'}
                            steps={request.workflowSteps}
                            statusFunc={statusFunc}
                        />
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
                                            {new Date(x.date).toLocaleDateString()} by
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
            <RequestActionsContainer>
                {request.state !== 'Closed' && (
                    <>
                        <Field
                            label="Comment"
                            value={
                                <div style={{ width: '50vh' }}>
                                    <TextField
                                        id={'Comment'}
                                        multiline
                                        value={comment}
                                        onChange={(e) => {
                                            setComment(e.target.value);
                                        }}
                                    />
                                </div>
                            }
                        />
                        <ButtonContainer>
                            {request.state === 'Draft' && (
                                <>
                                    <Button onClick={setEditMode}>Edit</Button>
                                    <HorizontalDivider />
                                    <Button onClick={onInitiate} variant="outlined">
                                        Initiate request
                                    </Button>
                                </>
                            )}
                            {request.state === 'Open' && (
                                <>
                                    <Button variant="outlined" color="danger">
                                        Void Request
                                    </Button>
                                    <Button onClick={onSignStep}>Sign</Button>
                                </>
                            )}
                        </ButtonContainer>
                    </>
                )}
            </RequestActionsContainer>
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
