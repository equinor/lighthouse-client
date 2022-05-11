import { httpClient } from '@equinor/portal-client';

import { throwOnError } from '../../functions/throwError';
import { QueryContext } from '../../keys/queries';

interface Scope {
    name: string;
    id: string;
}

export const getScopes = async ({ signal }: QueryContext): Promise<Scope[]> => {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch('api/scopes', { signal });

    throwOnError(res, 'Failed to get scopes');

    return await res.json();
};
