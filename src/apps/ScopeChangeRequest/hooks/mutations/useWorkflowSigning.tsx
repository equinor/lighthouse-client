import { UseMutateFunction, useQueryClient } from 'react-query';
import { spawnConfirmationDialog } from '../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { signCriteria } from '../../api/ScopeChange/Workflow';
import { useScopeChangeMutation } from '../React-Query/useScopechangeMutation';
import { scopeChangeMutationKeys } from '../../keys/scopeChangeMutationKeys';
import { useScopeChangeContext } from '../context/useScopeChangeContext';
import { CriteriaSignState } from '../../types/scopeChangeRequest';

export interface OnSignStepAction {
    action: CriteriaSignState;
    comment: string | undefined;
}

interface WorkflowSigningParams {
    requestId: string;
    stepId: string;
    criteriaId: string;
}

export function useWorkflowSigning({
    requestId,
    criteriaId,
    stepId,
}: WorkflowSigningParams): UseMutateFunction<void, unknown, OnSignStepAction, unknown> {
    const {
        workflowKeys: { criteriaSignKey },
    } = scopeChangeMutationKeys(requestId);

    const { pendingContributions, workflowSteps } = useScopeChangeContext((s) => ({
        pendingContributions: s.request.hasPendingContributions,
        workflowSteps: s.request.workflowSteps,
    }));
    const queryClient = useQueryClient();

    async function onSignStep({ action, comment }: OnSignStepAction) {
        if (action !== 'Approved') {
            await signCriteria({
                criteriaId: criteriaId,
                requestId: requestId,
                stepId: stepId,
                verdict: action,
                comment: comment,
            });
            return;
        }

        /** Need to determine if it is the last criteria to be signed on the step */
        const unsignedCriterias =
            workflowSteps &&
            workflowSteps
                .find((x) => x.id === stepId)
                ?.criterias.filter((x) => x.signedAtUtc === null);

        if (pendingContributions && unsignedCriterias?.length === 1) {
            spawnConfirmationDialog(
                'Not all contributors have responded yet, are you sure you want to continue?',
                'Warning',
                async () => {
                    await signCriteria({
                        requestId: requestId,
                        stepId: stepId,
                        criteriaId: criteriaId,
                        verdict: action,
                        comment: comment,
                    }).then(() => queryClient.invalidateQueries());
                }
            );
        } else {
            await signCriteria({
                requestId: requestId,
                stepId: stepId,
                criteriaId: criteriaId,
                verdict: action,
                comment: comment,
            });
        }
    }

    const { mutate: signMutation } = useScopeChangeMutation(
        requestId,
        criteriaSignKey(stepId, criteriaId),
        onSignStep
    );

    return signMutation;
}
