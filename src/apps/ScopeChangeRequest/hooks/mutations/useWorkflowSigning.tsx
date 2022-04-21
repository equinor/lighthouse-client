import { UseMutateFunction, useQueryClient } from 'react-query';
import { spawnConfirmationDialog } from '../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { signCriteria } from '../../api/ScopeChange/Workflow';
import { useScopeChangeMutation } from '../React-Query/useScopechangeMutation';
import { scopeChangeMutationKeys } from '../../keys/scopeChangeMutationKeys';
import { useScopeChangeContext } from '../../context/useScopeChangeAccessContext';

export interface OnSignStepAction {
    action: 'Approved' | 'Rejected';
    closeRequest: boolean;
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

    const { request } = useScopeChangeContext();
    const queryClient = useQueryClient();

    async function onSignStep({ action, closeRequest, comment }: OnSignStepAction) {
        if (closeRequest) {
            await signCriteria({
                closeRequest: true,
                criteriaId: criteriaId,
                requestId: requestId,
                stepId: stepId,
                verdict: 'Rejected',
                comment: comment,
            });
            return;
        }
        /** Need to determine if it is the last criteria to be signed on the step */
        const unsignedCriterias = request.workflowSteps
            .find((x) => x.id === stepId)
            ?.criterias.filter((x) => x.signedAtUtc === null);

        if (request.hasPendingContributions && unsignedCriterias?.length === 1) {
            spawnConfirmationDialog(
                'Not all contributors have responded yet, are you sure you want to continue?',
                'Warning',
                async () => {
                    await signCriteria({
                        requestId: request.id,
                        stepId: stepId,
                        criteriaId: criteriaId,
                        verdict: action,
                        comment: comment,
                        closeRequest: false,
                    }).then(() => queryClient.invalidateQueries());
                }
            );
        } else {
            await signCriteria({
                requestId: request.id,
                stepId: stepId,
                criteriaId: criteriaId,
                verdict: action,
                comment: comment,
                closeRequest: false,
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
