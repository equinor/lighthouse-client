import { httpClient } from '../../../../Core/Client/Functions';
import { throwOnError } from '../../functions/throwError';

interface Phase {
    name: string;
}

export const getPhases = async (): Promise<string[]> => {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch('api/phases');

    throwOnError(res, 'Failed to get phases');

    return (await res.json()).map((x: Phase) => x.name);
};
