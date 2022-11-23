import { closeSidesheet } from '@equinor/sidesheet';
import {
    deleteWorkflow,
    deleteWorkflowStatus,
    deleteWorkflowStep,
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
}

interface EditWorkflowTemplateParams {
    model: WorkflowTemplateModel;
    workflowId: string;
}

interface CreateWorkflowStepParams {
    workflowStep: WorkflowStepModel;
}

interface EditWorkflowStepParams {
    workflowStep: WorkflowStepModel;
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

interface AdminMutations {
    createWorkflowMutation: ({ workflow }: CreateWorkflowParams) => Promise<string | undefined>;
    editWorkflowMutation: ({ workflowId, name }: EditWorkflowParams) => Promise<void>;
    deleteWorkflowMutation: ({ workflowId }: DeleteWorkflowParams) => Promise<void>;

    createWorkflowTemplateMutation: ({
        model,
        workflowId,
    }: CreateWorkflowTemplateParams) => Promise<string | undefined>;
    editWorkflowTemplateMutation: ({
        model,
        workflowId,
    }: EditWorkflowTemplateParams) => Promise<string | undefined>;
    createWorkflowStepMutation: ({
        workflowStep,
    }: CreateWorkflowStepParams) => Promise<string | undefined>;
    editWorkflowStepMutation: ({ workflowStep }: EditWorkflowStepParams) => Promise<void>;
    deleteWorkflowStepMutation: ({ stepId }: DeleteWorkflowStepParams) => Promise<void>;

    createWorkflowStatusMutation: ({
        name,
        workflowOwner,
    }: CreateWorkflowStatusParams) => Promise<string | undefined>;
    editWorkflowStatusMutation: ({ id, name }: EditWorkflowStatusParams) => Promise<void>;
    deleteWorkflowStatusMutation: ({ id }: DeleteWorkflowStatusParams) => Promise<void>;
}

export function useAdminMutations(): AdminMutations {
    const queryClient = useQueryClient();

    const createWorkflowMutation = async ({ workflow }: CreateWorkflowParams) => {
        const result = await postWorkflow(workflow);
        if (result) {
            const { baseKey } = adminQueryKeys(result);
            queryClient.invalidateQueries(baseKey);
            openNewWorkflow(result);
            return result;
        }
    };
    const editWorkflowMutation = async ({ workflowId, name }: EditWorkflowParams) => {
        await patchWorkflow(workflowId, name);
        const { baseKey } = adminQueryKeys('');
        queryClient.invalidateQueries(baseKey);
    };

    const deleteWorkflowMutation = async ({ workflowId }: DeleteWorkflowParams) => {
        deleteWorkflow({ workflowId });
        queryClient.invalidateQueries();
        closeSidesheet();
    };

    const createWorkflowTemplateMutation = async ({
        model,
        workflowId,
    }: CreateWorkflowTemplateParams) => {
        const validatedModel = model as WorkflowTemplateModel;
        const rcID = await postWorkflowTemplate(
            {
                ...validatedModel,
            },
            workflowId
        );
        return rcID;
    };

    const editWorkflowTemplateMutation = async ({
        model,
        workflowId,
    }: EditWorkflowTemplateParams) => {
        const validatedModel = model as WorkflowTemplateModel;
        const rcID = await patchWorkflowTemplate(
            {
                ...validatedModel,
            },
            workflowId
        );
        return rcID;
    };

    const createWorkflowStepMutation = async ({ workflowStep }: CreateWorkflowStepParams) => {
        const result = await postWorkflowStep(workflowStep);
        if (result) {
            const { baseKey } = adminQueryKeys(result);
            queryClient.invalidateQueries(baseKey);
            openNewWorkflow(result);
            return result;
        }
    };
    const editWorkflowStepMutation = async ({ workflowStep }: EditWorkflowStepParams) => {
        await patchWorkflowStep(workflowStep);
        const { baseKey } = adminQueryKeys('');
        queryClient.invalidateQueries(baseKey);
    };
    const deleteWorkflowStepMutation = async ({ stepId }: DeleteWorkflowStepParams) => {
        await deleteWorkflowStep({ stepId });
        const { baseKey } = adminQueryKeys('');
        queryClient.invalidateQueries(baseKey);
    };

    const createWorkflowStatusMutation = async ({
        name,
        workflowOwner,
    }: CreateWorkflowStatusParams) => {
        const result = await postWorkflowStatus(name, workflowOwner);
        if (result) {
            const { baseKey } = adminQueryKeys(result);
            queryClient.invalidateQueries(baseKey);
            return result;
        }
    };
    const editWorkflowStatusMutation = async ({ id, name }: EditWorkflowStatusParams) => {
        await patchWorkflowStatus(id, name);
        const { baseKey } = adminQueryKeys('');
        queryClient.invalidateQueries(baseKey);
    };
    const deleteWorkflowStatusMutation = async ({ id }: DeleteWorkflowStatusParams) => {
        await deleteWorkflowStatus({ id });
        const { baseKey } = adminQueryKeys('');
        queryClient.invalidateQueries(baseKey);
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
    };
}
