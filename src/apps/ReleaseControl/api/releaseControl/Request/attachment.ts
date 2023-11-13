import { httpClient } from '@equinor/lighthouse-portal-client';
import { throwOnError } from '../../../functions/throwError';

interface AttachmentParams {
    releaseControlId: string;
    file: File;
}

export const uploadAttachment = async ({
    file,
    releaseControlId,
}: AttachmentParams): Promise<void> => {
    const formData = new FormData();
    const { scopeChange } = httpClient();
    formData.set('File', file, file.name);

    const res = await scopeChange.uploadFile(
        `api/releasecontrol/${releaseControlId}/attachments`,
        formData
    );

    await throwOnError(res, 'Failed to upload attachment');
};

interface DeleteAttachmentParams {
    releaseControlId: string;
    attachmentId: string;
}

export const deleteAttachment = async ({
    attachmentId,
    releaseControlId,
}: DeleteAttachmentParams): Promise<void> => {
    const { scopeChange } = httpClient();
    const requestOptions: RequestInit = {
        method: 'DELETE',
    };

    const res = await scopeChange.fetch(
        `api/releasecontrol/${releaseControlId}/attachments/${attachmentId}`,
        requestOptions
    );

    await throwOnError(res, 'Failed to delete attachment');
};

export const getAttachment = async (
    releaseControlId: string,
    attachmentId: string
): Promise<void> => {
    const { scopeChange } = httpClient();
    const requestOptions: RequestInit = {
        method: 'GET',
    };

    return await scopeChange
        .fetch(`api/releasecontrol/${releaseControlId}/attachments/${attachmentId}`, requestOptions)
        .then((x) => x.json());
};
