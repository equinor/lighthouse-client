import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';
import { ServerError } from '../Types/ServerError';


interface AttachmentParams {
    requestId: string;
    file: File;
}

export const uploadAttachment = async ({ file, requestId }: AttachmentParams): Promise<void> => {
    const formData = new FormData();
    const { scopeChange } = httpClient();
    formData.set('File', file, file.name);
    const res = await scopeChange.uploadFile(`api/scope-change-requests/${requestId}/attachments`, formData);

    if (!res.ok) {
        const error: ServerError = await res.json();
        throw error;
    }
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
