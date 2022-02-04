import { Button, Progress, TextField } from '@equinor/eds-core-react';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { signCriteria } from '../../../../../Api/ScopeChange/Workflow/signCriteria';
import { addContribution as postContribution } from '../../../../../Api/ScopeChange/Workflow/addContribution';
import { useScopeChangeAccessContext } from '../../../../Sidesheet/Context/useScopeChangeAccessContext';
import { CriteriaSelector } from './CriteriaSelector';
import { ButtonContainer } from './RequestActionBar';
import { spawnConfirmationDialog } from '../../../../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { VoidRequestButton } from './VoidRequestButton';

export function RequestOpenActions(): JSX.Element {
    const [selectedCriteria, setSelectedCriteria] = useState<string>();
    const [comment, setComment] = useState<string | undefined>(undefined);
    const { request, refetch, contributionId, signableCriterias } = useScopeChangeAccessContext();

    const refresh = { onSuccess: async () => setTimeout(async () => await refetch(), 500) };

    const commentRef = useRef<HTMLDivElement | null>(null);

    const {
        isLoading: signLoading,
        error: signError,
        mutateAsync: onSign,
    } = useMutation(onSignStep, refresh);

    const {
        isLoading: contributeLoading,
        error: contributeError,
        mutateAsync: onContribute,
    } = useMutation(onSendContribution, refresh);

    useEffect(() => {
        if (signableCriterias && signableCriterias.length === 1) {
            setSelectedCriteria(signableCriterias[0].id);
        }
    }, [signableCriterias]);

    async function onSignStep() {
        if (selectedCriteria && request.currentWorkflowStep) {
            const currentStepId = request.currentWorkflowStep.id;
            const unsignedCriterias = request.currentWorkflowStep.criterias.filter(
                (x) => x.signedAtUtc === null
            );
            const sign = async () => {
                await signCriteria(request.id, currentStepId, selectedCriteria, comment);
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
            setComment('');
        }
    }

    async function onSendContribution() {
        if (!contributionId) return;
        if (request.currentWorkflowStep) {
            await postContribution(
                request.id,
                request.currentWorkflowStep?.id,
                contributionId,
                comment
            );
            setComment('');
        }
    }

    return (
        <div>
            <CriteriaSelector setSelected={setSelectedCriteria} />

            <div
                ref={commentRef}
                style={{
                    width: `calc(${commentRef}px - 2rem)px`,
                    boxSizing: 'border-box',
                    padding: '1rem',
                }}
            >
                <TextField
                    style={{ width: `${commentRef.current?.offsetWidth || 650}px` }}
                    id={'Comment'}
                    multiline
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                />
            </div>

            <ButtonContainer>
                <VoidRequestButton />
                <Inline>
                    {signError && <div>Something went wrong</div>}
                    <Button disabled={!selectedCriteria} onClick={async () => await onSign()}>
                        {signLoading ? <Progress.Dots color="primary" /> : <div>Sign</div>}
                    </Button>

                    {contributeError && <div>Something went wrong</div>}
                    {contributionId && (
                        <Button onClick={async () => await onContribute()}>
                            {contributeLoading ? (
                                <Progress.Dots color="primary" />
                            ) : (
                                <span> Contribute</span>
                            )}
                        </Button>
                    )}
                </Inline>
            </ButtonContainer>
        </div>
    );
}

const Inline = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.2em;
    column-gap: 1em;
`;
