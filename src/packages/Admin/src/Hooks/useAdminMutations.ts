import { closeSidesheet } from '@equinor/sidesheet';
import {
    deleteWorkflow,
    deleteWorkflowStatus,
    deleteWorkflowStep,
    moveStepDown,
    moveStepUp,
    patchWorkflow,
    patchWorkflowStatus,
    patchWorkflowStep,
    patchWorkflowTemplate,
    postWorkflow,
    postWorkflowStatus,
    postWorkflowStep,
    postWorkflowTemplate,
    Workflow,
} from '@equinor/Workflow';
import { useQueryClient } from 'react-query';
import { WorkflowTemplateModel } from '../Atoms/workflowAdminAtomApi';
import { WorkflowStepModel } from '../Atoms/workflowStepAdminAtomApi';
import { openNewWorkflow } from '../Components/Workspace/OpenNewWorkflow';
import { openNewWorkflowStep } from '../Components/Workspace/OpenNewWorkflowStep';
import { adminQueryKeys } from '../Queries/adminQueryKeys';

interface CreateWorkflowParams {
    workflow: Workflow;
}

interface EditWorkflowParams {
    workflowId: string;
    name: string;
}

interface DeleteWorkflowStepParams {
    stepId: string;
}

interface CreateWorkflowTemplateParams {
    model: WorkflowTemplateModel;
    workflowId: string;
    saveAndClose: boolean;
}

interface EditWorkflowTemplateParams {
    model: WorkflowTemplateModel;
    workflowId: string;
    saveAndClose: boolean;
}

interface CreateWorkflowStepParams {
    workflowStep: WorkflowStepModel;
    saveAndClose: boolean;
}

interface EditWorkflowStepParams {
    workflowStep: WorkflowStepModel;
    saveAndClose: boolean;
}

interface DeleteWorkflowParams {
    workflowId: string;
}

interface CreateWorkflowStatusParams {
    name: string;
    workflowOwner: string;
}

interface EditWorkflowStatusParams {
    id: string;
    name: string;
}

interface DeleteWorkflowStatusParams {
    id: string;
}

interface MoveWorkflowStepUpParams {
    id: string;
}

interface MoveWorkflowStepDownParams {
    id: string;
}

interface AdminMutations {
    createWorkflowMutation: ({ workflow }: CreateWorkflowParams) => Promise<string | undefined>;
    editWorkflowMutation: ({ workflowId, name }: EditWorkflowParams) => Promise<void>;
    deleteWorkflowMutation: ({ workflowId }: DeleteWorkflowParams) => Promise<void>;

    createWorkflowTemplateMutation: ({
        model,
        workflowId,
        saveAndClose,
    }: CreateWorkflowTemplateParams) => Promise<string | undefined>;
    editWorkflowTemplateMutation: ({
        model,
        workflowId,
        saveAndClose,
    }: EditWorkflowTemplateParams) => Promise<void>;
    createWorkflowStepMutation: ({
        workflowStep,
        saveAndClose,
    }: CreateWorkflowStepParams) => Promise<string | undefined>;
    editWorkflowStepMutation: ({
        workflowStep,
        saveAndClose,
    }: EditWorkflowStepParams) => Promise<void>;
    deleteWorkflowStepMutation: ({ stepId }: DeleteWorkflowStepParams) => Promise<void>;

    createWorkflowStatusMutation: ({
        name,
        workflowOwner,
    }: CreateWorkflowStatusParams) => Promise<string | undefined>;
    editWorkflowStatusMutation: ({ id, name }: EditWorkflowStatusParams) => Promise<void>;
    deleteWorkflowStatusMutation: ({ id }: DeleteWorkflowStatusParams) => Promise<void>;
    moveWorkflowStepUpMutation: ({ id }: MoveWorkflowStepUpParams) => Promise<void>;
    moveWorkflowStepDownMutation: ({ id }: MoveWorkflowStepDownParams) => Promise<void>;
}

export function useAdminMutations(): AdminMutations {
    const queryClient = useQueryClient();

    const createWorkflowMutation = async ({ workflow }: CreateWorkflowParams) => {
        const result = await postWorkflow(workflow);
        if (result) {
            const { workflowsKey } = adminQueryKeys();
            queryClient.invalidateQueries(workflowsKey);
            openNewWorkflow(result);
            return result;
        }
    };
    const editWorkflowMutation = async ({ workflowId, name }: EditWorkflowParams) => {
        await patchWorkflow(workflowId, name);
        const { workflowsKey } = adminQueryKeys();
        queryClient.invalidateQueries(workflowsKey);
    };

    const deleteWorkflowMutation = async ({ workflowId }: DeleteWorkflowParams) => {
        await deleteWorkflow({ workflowId });
        const { workflowsKey } = adminQueryKeys();
        queryClient.invalidateQueries(workflowsKey);
        closeSidesheet();
    };

    const createWorkflowTemplateMutation = async ({
        model,
        workflowId,
        saveAndClose,
    }: CreateWorkflowTemplateParams) => {
        const validatedModel = model as WorkflowTemplateModel;
        const rcID = await postWorkflowTemplate(
            {
                ...validatedModel,
            },
            workflowId
        );
        if (saveAndClose) {
            closeSidesheet();
        }
        return rcID;
    };

    const editWorkflowTemplateMutation = async ({
        model,
        workflowId,
        saveAndClose,
    }: EditWorkflowTemplateParams) => {
        const validatedModel = model as WorkflowTemplateModel;
        await patchWorkflowTemplate(
            {
                ...validatedModel,
            },
            workflowId
        );
        if (saveAndClose) {
            closeSidesheet();
        }
    };

    const createWorkflowStepMutation = async ({
        workflowStep,
        saveAndClose,
    }: CreateWorkflowStepParams) => {
        const result = await postWorkflowStep(workflowStep);
        if (result) {
            const { workflowStepsKey } = adminQueryKeys();
            queryClient.invalidateQueries(workflowStepsKey);
            if (!saveAndClose) {
                openNewWorkflowStep(result);
            }
            if (saveAndClose) {
                closeSidesheet();
            }
            return result;
        }
    };
    const editWorkflowStepMutation = async ({
        workflowStep,
        saveAndClose,
    }: EditWorkflowStepParams) => {
        await patchWorkflowStep(workflowStep);
        const { workflowStepsKey } = adminQueryKeys();
        queryClient.invalidateQueries(workflowStepsKey);
        if (saveAndClose) {
            closeSidesheet();
        }
    };
    const deleteWorkflowStepMutation = async ({ stepId }: DeleteWorkflowStepParams) => {
        await deleteWorkflowStep({ stepId });
        const { workflowStepsKey } = adminQueryKeys();
        queryClient.invalidateQueries(workflowStepsKey);
        closeSidesheet();
    };

    const createWorkflowStatusMutation = async ({
        name,
        workflowOwner,
    }: CreateWorkflowStatusParams) => {
        const result = await postWorkflowStatus(name, workflowOwner);
        if (result) {
            const { workflowStatusesKey } = adminQueryKeys();
            queryClient.invalidateQueries(workflowStatusesKey);
            return result;
        }
    };
    const editWorkflowStatusMutation = async ({ id, name }: EditWorkflowStatusParams) => {
        await patchWorkflowStatus(id, name);
        const { workflowStatusesKey } = adminQueryKeys();
        queryClient.invalidateQueries(workflowStatusesKey);
    };
    const deleteWorkflowStatusMutation = async ({ id }: DeleteWorkflowStatusParams) => {
        await deleteWorkflowStatus({ id });
        const { workflowStatusesKey } = adminQueryKeys();
        queryClient.invalidateQueries(workflowStatusesKey);
    };
    const moveWorkflowStepUpMutation = async ({ id }: MoveWorkflowStepUpParams) => {
        await moveStepUp(id);
        const { workflowStepsKey } = adminQueryKeys();
        queryClient.invalidateQueries(workflowStepsKey);
    };
    const moveWorkflowStepDownMutation = async ({ id }: MoveWorkflowStepDownParams) => {
        await moveStepDown(id);
        const { workflowStepsKey } = adminQueryKeys();
        queryClient.invalidateQueries(workflowStepsKey);
    };
    return {
        createWorkflowMutation,
        editWorkflowMutation,
        deleteWorkflowMutation,
        createWorkflowTemplateMutation,
        editWorkflowTemplateMutation,
        createWorkflowStepMutation,
        editWorkflowStepMutation,
        deleteWorkflowStepMutation,
        createWorkflowStatusMutation,
        editWorkflowStatusMutation,
        deleteWorkflowStatusMutation,
        moveWorkflowStepUpMutation,
        moveWorkflowStepDownMutation,
    };
}
