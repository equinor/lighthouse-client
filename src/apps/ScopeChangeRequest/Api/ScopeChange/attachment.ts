import { BaseClient } from '../../../../packages/httpClient/src';

export const uploadAttachment = async (
    requestId: string,
    file: File,
    client: BaseClient
): Promise<string> => {
    const formData = new FormData();

    // await fileReader.readAsArrayBuffer(file);
    // console.log(fileReader.result);

    formData.set('File', file, file.name);

    // const payload: AttachmentBody = {
    //     OverwriteIfExists: true,
    //     File: fileReader.result,
    // };
    const requestOptions: RequestInit = {
        method: 'POST',
        body: formData,
    };

    return await client
        .fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${requestId}/attachments`,
            requestOptions
        )
        .then((x) => x.json());
};

export const deleteAttachment = async (
    requestId: string,
    attachmentId: string,
    client: BaseClient
): Promise<void> => {
    const requestOptions: RequestInit = {
        method: 'DELETE',
    };

    return await client
        .fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${requestId}/attachments/${attachmentId}`,
            requestOptions
        )
        .then((x) => x.json());
};

//const url = URL.createObjectURL(blob);

export const getAttachment = async (
    requestId: string,
    attachmentId: string,
    client: BaseClient
): Promise<void> => {
    const requestOptions: RequestInit = {
        method: 'GET',
    };

    return await client
        .fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${requestId}/attachments/${attachmentId}`,
            requestOptions
        )
        .then((x) => x.json());
};
