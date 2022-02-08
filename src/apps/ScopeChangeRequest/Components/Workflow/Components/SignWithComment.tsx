import { useState } from 'react';
import styled from 'styled-components';

import { Button, Progress, TextField } from '@equinor/eds-core-react';
import { useScopeChangeAccessContext } from '../../Sidesheet/Context/useScopeChangeAccessContext';
import { signCriteria } from '../../../Api/ScopeChange/Workflow';
import { spawnConfirmationDialog } from '../../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { Criteria } from '../../../Types/scopeChangeRequest';
import { useMutation } from 'react-query';
import { tokens } from '@equinor/eds-tokens';

interface SignWithCommentProps {
    criteria: Criteria;
    onCancel: () => void;
}

export const SignWithComment = ({ criteria, onCancel }: SignWithCommentProps): JSX.Element => {
    const { request, refetch } = useScopeChangeAccessContext();
    const [text, setText] = useState<string | undefined>();

    async function onSignStep() {
        if (request.currentWorkflowStep && request.currentWorkflowStep.criterias.length > 0) {
            const currentStepId = request.currentWorkflowStep.id;
            const unsignedCriterias = request.currentWorkflowStep.criterias.filter(
                (x) => x.signedAtUtc === null
            );
            const sign = async () => {
                await signCriteria(request.id, currentStepId, criteria.id, text).then(() =>
                    refetch()
                );
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
                sign();
            }
            setText('');
        }
    }

    const { mutateAsync, isLoading } = useMutation(onSignStep, { onSuccess: () => onCancel() });

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
                <Button disabled={!text || text.length === 0} onClick={() => mutateAsync()}>
                    Sign
                </Button>
                <Divider />
                <Button variant="outlined" onClick={() => onCancel()}>
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
