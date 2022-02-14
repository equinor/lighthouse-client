import { ServerError } from '../Api/ScopeChange/Types/ServerError';

export async function throwOnError(res: Response): Promise<void> {
    if (!res.ok) {
        const error: ServerError = await res.json();
        throw error;
    }
}
