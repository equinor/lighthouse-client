export async function throwOnError(res: Response, fallbackMessage?: string): Promise<void> {
    if (!res.ok) {
        if (res.body !== null) {
            throw await res.json();
        } else {
            if (res.status === 403) {
                throw 'User does not have access';
            }
            throw fallbackMessage ?? 'Something went wrong';
        }
    }
}
