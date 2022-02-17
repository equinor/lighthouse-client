import { useState } from 'react';
import styled from 'styled-components';

import { Button, Progress, TextField } from '@equinor/eds-core-react';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { signCriteria } from '../../../../Api/ScopeChange/Workflow';
import { spawnConfirmationDialog } from '../../../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { Criteria } from '../../../../Types/scopeChangeRequest';
import { tokens } from '@equinor/eds-tokens';
import { useScopeChangeMutation } from '../../../../Hooks/useScopechangeMutation';
import { ServerError } from '../../../../Api/ScopeChange/Types/ServerError';
import { MutationKeys } from '../../../../Api/ScopeChange/mutationKeys';

interface SignWithCommentProps {
    criteria: Criteria;
    close: () => void;
}

export const SignWithComment = ({ criteria, close }: SignWithCommentProps): JSX.Element => {
    const { request, setErrorMessage } = useScopeChangeContext();
    const [text, setText] = useState<string | undefined>();

    interface OnSignStepAction {
        action: 'Approved' | 'Rejected';
    }
    async function onSignStep({ action }: OnSignStepAction) {
        if (request.currentWorkflowStep && request.currentWorkflowStep.criterias.length > 0) {
            const currentStepId = request.currentWorkflowStep.id;
            const unsignedCriterias = request.currentWorkflowStep.criterias.filter(
                (x) => x.signedAtUtc === null
            );
            const sign = async () => {
                await signCriteria(request.id, currentStepId, criteria.id, action, text);
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
        [MutationKeys.Sign, MutationKeys.Step],
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
