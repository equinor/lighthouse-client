export const publishTemplate = async (workflowId: string, templateId: string): Promise<void> => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
    };

    await fetch(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/workflows/${workflowId}/templates/${templateId}/publish`,
        requestOptions
    );
};
