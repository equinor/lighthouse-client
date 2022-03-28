import { httpClient } from '../../../../Core/Client/Functions';
import { checkOptionsRequest } from './optionsRequestChecker';

export async function canVoid(processId: string): Promise<boolean> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        releaseControls.fetch(`api/release-control-processes/${processId}/void`, requestOptions);

    return (await checkOptionsRequest(check)).canPatch;
}

export async function canUnVoid(processId: string): Promise<boolean> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        releaseControls.fetch(`api/release-control-processes/${processId}/unvoid`, requestOptions);

    return (await checkOptionsRequest(check)).canPatch;
}
