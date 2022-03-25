import { httpClient } from '@equinor/portal-client';
import { throwOnError } from '../../Functions/throwError';

interface Category {
    name: string;
}

export const getCategories = async (): Promise<string[]> => {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch('api/categories');

    throwOnError(res);

    return (await res.json()).map((x: Category) => x.name);
};
