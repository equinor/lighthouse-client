import { httpClient } from '../../../../Core/Client/Functions/HttpClient';

export const uploadAttachment = async (requestId: string, file: File): Promise<void> => {
    const formData = new FormData();
    const { scopeChange } = httpClient();
    formData.set('File', file, file.name);
    await scopeChange.uploadFile(`api/scope-change-requests/${requestId}/attachments`, formData);
};

export const deleteAttachment = async (requestId: string, attachmentId: string): Promise<void> => {
    const { scopeChange } = httpClient();
    const requestOptions: RequestInit = {
        method: 'DELETE',
    };

    return await scopeChange
        .fetch(`api/scope-change-requests/${requestId}/attachments/${attachmentId}`, requestOptions)
        .then((x) => x.json());
};

export const getAttachment = async (requestId: string, attachmentId: string): Promise<void> => {
    const { scopeChange } = httpClient();
    const requestOptions: RequestInit = {
        method: 'GET',
    };

    return await scopeChange
        .fetch(`api/scope-change-requests/${requestId}/attachments/${attachmentId}`, requestOptions)
        .then((x) => x.json());
};
