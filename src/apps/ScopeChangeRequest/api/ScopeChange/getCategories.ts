import { httpClient } from '@equinor/portal-client';
import { throwOnError } from '../../functions/throwError';
import { QueryContext } from '../../keys/queries';

interface Category {
    id: string;
    name: string;
}

export const getCategories = async ({ signal }: QueryContext): Promise<Category[]> => {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch('api/change-categories', { signal });

    throwOnError(res, 'Failed to get categories');

    return await res.json();
};
