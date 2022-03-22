import { UseMutateFunction, useQueryClient } from 'react-query';
import { spawnConfirmationDialog } from '../../../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { signCriteria } from '../../../../Api/ScopeChange/Workflow';
import { useScopeChangeMutation } from '../../../../Hooks/React-Query/useScopechangeMutation';
import { scopeChangeMutationKeys } from '../../../../Keys/scopeChangeMutationKeys';
import { ServerError } from '../../../../Types/ScopeChange/ServerError';
import { useScopeChangeContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';

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
}: WorkflowSigningParams): UseMutateFunction<void, ServerError, OnSignStepAction, unknown> {
    const {
        workflowKeys: { criteriaSignKey },
        baseKey,
    } = scopeChangeMutationKeys(requestId);

    const queryClient = useQueryClient();

    const { request, setErrorMessage } = useScopeChangeContext();

    async function onSignStep({ action, closeRequest, comment }: OnSignStepAction) {
        if (closeRequest) {
            await signCriteria({
                closeRequest: true,
                criteriaId: criteriaId,
                requestId: requestId,
                stepId: stepId,
                verdict: 'Rejected',
                comment: '',
            });
            return;
        }
        /** Need to determine if it is the last criteria to be signed on the step */
        const unsignedCriterias = request.workflowSteps
            .find((x) => x.id === stepId)
            ?.criterias.filter((x) => x.signedAtUtc === null);
        const sign = async () => {
            await signCriteria({
                requestId: request.id,
                stepId: stepId,
                criteriaId: criteriaId,
                verdict: action,
                comment: comment,
                closeRequest: false,
            }).then(() => {
                queryClient.invalidateQueries(baseKey);
            });
        };

        if (
            request.hasPendingContributions &&
            unsignedCriterias &&
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
    }

    const { mutate: signMutation } = useScopeChangeMutation(
        requestId,
        criteriaSignKey(stepId, criteriaId),
        onSignStep,
        {
            onError: (e: ServerError) => setErrorMessage(e),
        }
    );

    return signMutation;
}
