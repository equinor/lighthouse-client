import { ServerError } from "../Types/ServerError";

export async function throwOnError(res: Response) {
    if (!res.ok) {
        const error: ServerError = await res.json();
        throw error;
    }
}