import { useState } from 'react';
import styled from 'styled-components';

import { Button, Progress, TextField } from '@equinor/eds-core-react';
import { spawnConfirmationDialog } from '../../../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { tokens } from '@equinor/eds-tokens';
import { Criteria, WorkflowStep } from '../../../../Types/disciplineReleaseControl';
import { useReleaseControlContext } from '../../../Sidesheet/Context/useReleaseControlAccessContext';
import { useReleaseControlMutationKeyGen } from '../../../../Hooks/React-Query/useReleaseControlMutationKeyGen';
import { ServerError } from '../../../../Api/Types/ServerError';
import { useReleaseControlMutation } from '../../../../Hooks/useReleaseControlMutation';
import { signCriteria } from '../../../../Api/Workflow';

interface SignWithCommentProps {
    criteria: Criteria;
    step: WorkflowStep;
    close: () => void;
}

export const SignWithComment = ({ criteria, step, close }: SignWithCommentProps): JSX.Element => {
    const { process, setErrorMessage } = useReleaseControlContext();
    const [text, setText] = useState<string | undefined>();
    const { workflowKeys } = useReleaseControlMutationKeyGen(process.id);

    interface OnSignStepAction {
        action: 'Approved' | 'Rejected';
    }
    async function onSignStep({ action }: OnSignStepAction) {
        if (process.currentWorkflowStep && process.currentWorkflowStep.criterias.length > 0) {
            const unsignedCriterias = process.currentWorkflowStep.criterias.filter(
                (x) => x.signedAtUtc === null
            );
            const sign = async () => {
                await signCriteria(process.id, step.id, criteria.id, action, text);
            };
            if (
                process.currentWorkflowStep.contributors &&
                process.currentWorkflowStep.contributors.some((x) => x.contribution === null) &&
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

    const { mutateAsync, isLoading } = useReleaseControlMutation(
        process.id,
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
