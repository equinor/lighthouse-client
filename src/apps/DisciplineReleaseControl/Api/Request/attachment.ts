import { httpClient } from '../../../../Core/Client/Functions';
import { ServerError } from '../Types/ServerError';

interface AttachmentParams {
    processId: string;
    file: File;
}

export const uploadAttachment = async ({ file, processId }: AttachmentParams): Promise<void> => {
    const formData = new FormData();
    const { releaseControls } = httpClient();
    formData.set('File', file, file.name);
    const res = await releaseControls.uploadFile(
        `api/release-control-processes/${processId}/attachments`,
        formData
    );

    if (!res.ok) {
        const error: ServerError = await res.json();
        throw error;
    }
};

export const deleteAttachment = async (processId: string, attachmentId: string): Promise<void> => {
    const { releaseControls } = httpClient();
    const requestOptions: RequestInit = {
        method: 'DELETE',
    };

    return await releaseControls
        .fetch(`api/release-control-processes/${processId}/attachments/${attachmentId}`, requestOptions)
        .then((x) => x.json());
};
