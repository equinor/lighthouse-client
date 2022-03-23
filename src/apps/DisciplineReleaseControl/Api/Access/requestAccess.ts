import { httpClient } from '../../../../Core/Client/Functions';
import { checkOptionsRequest, OptionRequestResult } from './optionsRequestChecker';

export async function getRequestAccess(processId: string): Promise<OptionRequestResult> {
    const { releaseControls } = httpClient();

    const requestOptions = {
        method: 'OPTIONS',
    };

    const check = () =>
        releaseControls.fetch(`api/release-control-processes/${processId}`, requestOptions);

    return await checkOptionsRequest(check);
}
