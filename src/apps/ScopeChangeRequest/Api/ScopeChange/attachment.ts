import { HttpClient } from '@equinor/http-client';
import { httpClient } from '../../../../Core/Client/Functions/HttpClient';

export const uploadAttachment = async (requestId: string, file: File): Promise<string> => {
    const formData = new FormData();
    const { scopeChange } = httpClient();
    formData.set('File', file, file.name);
    await scopeChange.uploadFile(
        `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${requestId}/attachments`,
        formData
    );

    // const requestOptions: RequestInit = {
    //     method: 'POST',
    //     body: formData,
    // };

    // return await client
    //     .fetch(
    //         `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${requestId}/attachments`,
    //         requestOptions
    //     )
    //     .then((x) => x.json());
};

export const deleteAttachment = async (
    requestId: string,
    attachmentId: string,
    client: HttpClient
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
    client: HttpClient
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
