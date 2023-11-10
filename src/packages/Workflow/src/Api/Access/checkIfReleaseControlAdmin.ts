import { checkOptionsRequest } from './optionsRequestChecker';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

export async function checkIfReleaseControlAdmin(
    app: string,
    client: IHttpClient,
    signal?: AbortSignal
): Promise<boolean> {
    const scopeChange = client;

    const requestOptions = {
        method: 'OPTIONS',
        signal,
    };

    const check = () => scopeChange.fetch(`api/${app}`, requestOptions);

    return (await checkOptionsRequest(check)).canPost;
}
