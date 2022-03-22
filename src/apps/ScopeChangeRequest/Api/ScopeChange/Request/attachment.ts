import { httpClient } from '../../../../../Core/Client/Functions/HttpClient';

interface AttachmentParams {
    requestId: string;
    file: File;
}

export const uploadAttachment = async ({ file, requestId }: AttachmentParams): Promise<void> => {
    const formData = new FormData();
    const { scopeChange } = httpClient();
    formData.set('File', file, file.name);

    const res = await scopeChange.uploadFile(
        `api/scope-change-requests/${requestId}/attachments`,
        formData
    );

    if (!res.ok) {
        throw await res.json();
    }
};

interface DeleteAttachmentParams {
    requestId: string;
    attachmentId: string;
}

export const deleteAttachment = async ({
    attachmentId,
    requestId,
}: DeleteAttachmentParams): Promise<void> => {
    const { scopeChange } = httpClient();
    const requestOptions: RequestInit = {
        method: 'DELETE',
    };

    await scopeChange.fetch(
        `api/scope-change-requests/${requestId}/attachments/${attachmentId}`,
        requestOptions
    );
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
