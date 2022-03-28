export async function throwOnError(res: Response, fallbackMessage?: string): Promise<void> {
    if (!res.ok) {
        if (res.body !== null) {
            throw await res.json();
        } else {
            throw fallbackMessage ?? 'Something went wrong';
        }
    }
}
