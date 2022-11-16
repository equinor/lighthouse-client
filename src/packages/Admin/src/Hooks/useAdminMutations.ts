import {
    patchWorkflow,
    patchWorkflowTemplate,
    postWorkflow,
    postWorkflowTemplate,
    Workflow,
} from '@equinor/Workflow';
import { WorkflowTemplateModel } from '../Atoms/workflowAdminAtomApi';

interface CreateWorkflowParams {
    workflow: Workflow;
}

interface EditWorkflowParams {
    workflowId: string;
    name: string;
}

interface CreateWorkflowTemplateParams {
    model: WorkflowTemplateModel;
    workflowId: string;
}

interface EditWorkflowTemplateParams {
    model: WorkflowTemplateModel;
    workflowId: string;
}

interface AdminMutations {
    createWorkflowMutation: ({ workflow }: CreateWorkflowParams) => Promise<string | undefined>;
    editWorkflowMutation: ({ workflowId, name }: EditWorkflowParams) => Promise<string | undefined>;
    createWorkflowTemplateMutation: ({
        model,
        workflowId,
    }: CreateWorkflowTemplateParams) => Promise<string | undefined>;
    editWorkflowTemplateMutation: ({
        model,
        workflowId,
    }: EditWorkflowTemplateParams) => Promise<string | undefined>;
}

export function useAdminMutations(): AdminMutations {
    const createWorkflowMutation = async ({ workflow }: CreateWorkflowParams) => {
        const result = await postWorkflow(workflow);
        return result;
    };
    const editWorkflowMutation = async ({ workflowId, name }: EditWorkflowParams) => {
        const result = await patchWorkflow(workflowId, name);
        return result;
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
    return {
        createWorkflowMutation,
        editWorkflowMutation,
        createWorkflowTemplateMutation,
        editWorkflowTemplateMutation,
    };
}
