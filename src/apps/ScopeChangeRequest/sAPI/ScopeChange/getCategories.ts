import { httpClient } from '@equinor/portal-client';
import { throwOnError } from '../../sFunctions/throwError';

interface Category {
    id: string;
    name: string;
}

export const getCategories = async (): Promise<Category[]> => {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch('api/change-categories');

    throwOnError(res, 'Failed to get categories');

    return await res.json();
};
