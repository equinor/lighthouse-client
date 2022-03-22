export async function throwOnError(res: Response): Promise<void> {
    if (!res.ok) {
        if (res.bodyUsed) {
            throw await res.json();
        } else {
            throw 'Something went wrong';
        }
    }
}
