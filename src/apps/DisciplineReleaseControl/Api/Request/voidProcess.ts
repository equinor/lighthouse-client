import { httpClient } from '../../../../Core/Client/Functions';
import { throwOnError } from '../../Functions/throwError';

export async function voidProcess(processId: string): Promise<void> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };
    const res = await releaseControls.fetch(
        `api/release-control-processes/${processId}/void`,
        requestOptions
    );

    await throwOnError(res);
}

export async function unVoidProcess(processId: string): Promise<void> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'PATCH',
    };
    const res = await releaseControls.fetch(
        `api/release-control-processes/${processId}/unvoid`,
        requestOptions
    );

    await throwOnError(res);
}
