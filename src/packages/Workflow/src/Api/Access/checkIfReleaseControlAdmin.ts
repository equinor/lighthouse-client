import { httpClient } from '@equinor/lighthouse-portal-client';
import { checkOptionsRequest } from './optionsRequestChecker';

export async function checkIfReleaseControlAdmin(app: string, signal?: AbortSignal): Promise<boolean> {
    const { scopeChange } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
        signal,
    };

    const check = () => scopeChange.fetch(`api/${app}`, requestOptions);

    return (await checkOptionsRequest(check)).canPost;
}
