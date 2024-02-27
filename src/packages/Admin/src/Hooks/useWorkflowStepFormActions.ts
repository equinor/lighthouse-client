import { useMutation } from 'react-query';
import { WorkflowStepAdminAtomApi } from '../Atoms/workflowStepAdminAtomApi';
import { useAdminContext } from '../Hooks/useAdminContext';
import { useAdminMutations } from '../Hooks/useAdminMutations';
import { adminMutationKeys } from '../Queries/adminMutationKeys';
import { useAdminMutation } from '../Hooks/useAdminMutation';

type UseCreateWorkflowStepResult = {
    createWorkflowStep: () => void;
    isLoading: boolean;
};

export const useCreateWorkflowStep = (): UseCreateWorkflowStepResult => {
    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    const { createWorkflowStepMutation } = useAdminMutations();
    const { isLoading, mutate } = useMutation(createWorkflowStepMutation);

    const createWorkflowStep = (saveAndClose = false) => {
        const { prepareWorkflowStep } = WorkflowStepAdminAtomApi;
        mutate({
            workflowStep: prepareWorkflowStep(workflowOwner),
            saveAndClose: saveAndClose,
        });
    };

    return {
        createWorkflowStep,
        isLoading,
    };
};

type UseUpdateWorkflowStepResult = {
    saveWorkflowStep: () => void;
    isLoading: boolean;
};

export const useUpdateWorkflowStep = (): UseUpdateWorkflowStepResult => {
    const workflowOwner = useAdminContext((s) => s.workflowOwner);
    const workflowStep = useAdminContext(({ workflowStep }) => workflowStep);
    const { patchKey } = adminMutationKeys(workflowStep?.id);

    const { editWorkflowStepMutation } = useAdminMutations();

    const { isLoading, mutate } = useAdminMutation(
        workflowStep.id,
        patchKey,
        editWorkflowStepMutation
    );

    const saveWorkflowStep = (saveAndClose = false) => {
        const { prepareWorkflowStep } = WorkflowStepAdminAtomApi;
        mutate({
            workflowStep: prepareWorkflowStep(workflowOwner),
            saveAndClose: saveAndClose,
        });
    };

    return {
        isLoading,
        saveWorkflowStep,
    };
};
