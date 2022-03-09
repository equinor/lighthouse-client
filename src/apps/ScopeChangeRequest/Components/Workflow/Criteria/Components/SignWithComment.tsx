import { useState } from 'react';
import styled from 'styled-components';

import { Button, Progress, TextField } from '@equinor/eds-core-react';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { signCriteria } from '../../../../Api/ScopeChange/Workflow';
import { spawnConfirmationDialog } from '../../../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { Criteria, WorkflowStep } from '../../../../Types/scopeChangeRequest';
import { tokens } from '@equinor/eds-tokens';
import { useScopeChangeMutation } from '../../../../Hooks/React-Query/useScopechangeMutation';
import { ServerError } from '../../../../Types/ScopeChange/ServerError';
import { useScopechangeMutationKeyGen } from '../../../../Hooks/React-Query/useScopechangeMutationKeyGen';

interface SignWithCommentProps {
    criteria: Criteria;
    step: WorkflowStep;
    close: () => void;
}

export const SignWithComment = ({ criteria, step, close }: SignWithCommentProps): JSX.Element => {
    const { request, setErrorMessage } = useScopeChangeContext();
    const [text, setText] = useState<string | undefined>();
    const { workflowKeys } = useScopechangeMutationKeyGen(request.id);

    interface OnSignStepAction {
        action: 'Approved' | 'Rejected';
    }
    async function onSignStep({ action }: OnSignStepAction) {
        if (request.currentWorkflowStep && request.currentWorkflowStep.criterias.length > 0) {
            const unsignedCriterias = request.currentWorkflowStep.criterias.filter(
                (x) => x.signedAtUtc === null
            );
            const sign = async () => {
                await signCriteria({
                    closeRequest: false,
                    criteriaId: criteria.id,
                    verdict: action,
                    stepId: step.id,
                    comment: text,
                    requestId: request.id,
                });
            };
            if (
                request.currentWorkflowStep.contributors &&
                request.currentWorkflowStep.contributors.some((x) => x.contribution === null) &&
                unsignedCriterias.length === 1
            ) {
                spawnConfirmationDialog(
                    'Not all contributors have responded yet, are you sure you want to continue?',
                    'Warning',
                    sign
                );
            } else {
                await sign();
            }
            setText('');
        }
    }

    const { mutateAsync, isLoading } = useScopeChangeMutation(
        request.id,
        workflowKeys.criteriaSignKey(step.id, criteria.id),
        onSignStep,
        {
            onError: (e: ServerError) => setErrorMessage(e),
        }
    );

    return (
        <>
            {isLoading && <Progress.Dots color="primary" />}

            <Section>
                <Title>Comment</Title>
                <TextField
                    id={'textField'}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </Section>
            <ButtonContainer>
                <Button
                    disabled={!text || text.length === 0}
                    onClick={() => mutateAsync({ action: 'Approved' }).then(() => close())}
                >
                    Sign
                </Button>
                <Divider />
                <Button variant="outlined" onClick={() => close()}>
                    Cancel
                </Button>
            </ButtonContainer>
        </>
    );
};

const Title = styled.div`
    font-size: 14px;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
`;

const Divider = styled.div`
    width: 0.5rem;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
`;

const Section = styled.div`
    margin: 0.2rem;
    width: 100%;
`;
