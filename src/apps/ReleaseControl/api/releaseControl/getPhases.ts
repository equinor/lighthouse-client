import { httpClient } from '../../../../Core/Client/Functions';
import { throwOnError } from '../../functions/throwError';

export interface QueryContext {
    signal?: AbortSignal;
}

interface Phase {
    name: string;
}

export const getPhases = async ({ signal }: QueryContext): Promise<string[]> => {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch('api/phases', { signal });

    throwOnError(res, 'Failed to get phases');

    return (await res.json()).map((x: Phase) => x.name);
};
