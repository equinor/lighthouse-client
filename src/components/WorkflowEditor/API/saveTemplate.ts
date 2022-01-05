import { Step } from '../Types/Workflow';
import { BackendFormat } from './Types/backendFormat';

export const saveTemplate = async (workflowId, templateId, steps: Step[]): Promise<void> => {
    const body: BackendFormat = { StepTemplates: steps };
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };

    await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/workflows/${workflowId}/templates/${templateId}`,
        requestOptions
    );
};
