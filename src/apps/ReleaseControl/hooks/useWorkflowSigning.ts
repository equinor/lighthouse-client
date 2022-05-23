import { UseMutateFunction, useQueryClient } from 'react-query';
import { spawnConfirmationDialog } from '../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { useReleaseControlMutation } from '../../DisciplineReleaseControl/Hooks/useReleaseControlMutation';
import { CriteriaSignState } from '../../ScopeChangeRequest/types/scopeChangeRequest';
import { signCriteria } from '../api/releaseControl/Workflow';
import { releaseControlMutationKeys } from '../queries/releaseControlMutationKeys';
import { useReleaseControlContext } from './useReleaseControlContext';

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
    } = releaseControlMutationKeys(requestId);

    const { pendingContributions, workflowSteps } = useReleaseControlContext(
        ({ releaseControl }) => ({
            pendingContributions: releaseControl.hasPendingContributions,
            workflowSteps: releaseControl.workflowSteps,
        })
    );
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
        const unsignedCriterias = workflowSteps
            ?.find((x) => x.id === stepId)
            ?.criterias?.filter((x) => x.signedAtUtc === null);

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

    const { mutate: signMutation } = useReleaseControlMutation(
        requestId,
        criteriaSignKey(stepId, criteriaId),
        onSignStep
    );

    return signMutation;
}
