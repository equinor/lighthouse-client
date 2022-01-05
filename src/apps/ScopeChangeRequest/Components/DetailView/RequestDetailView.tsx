import styled from 'styled-components';
import { Field } from './Components/Field';
import { SectionRow } from '../../Styles/Section';
import { ScopeChangeRequest, WorkflowStep } from '../../Types/scopeChangeRequest';
import { Button } from '@equinor/eds-core-react';
import { Workflow } from '../Workflow/Workflow';
import { patchWorkflowStep } from '../../Api/patchWorkflowStep';

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

    const onSignStep = () => {
        patchWorkflowStep(request.id).then(() => refetch());
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
                <Field customLabel={{ fontSize: '18px', bold: true }} label="Log" value={''} />
            </DetailViewContainer>
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
                        <Button onClick={onSignStep}>Sign</Button>
                    </>
                )}
            </ButtonContainer>
        </div>
    );
};

const DetailViewContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const HorizontalDivider = styled.div`
    margin: 0.2em;
`;
