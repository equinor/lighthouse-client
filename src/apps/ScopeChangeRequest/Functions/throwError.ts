export async function throwOnError(res: Response): Promise<void> {
    if (!res.ok) {
        if (res.body !== null) {
            throw await res.json();
        } else {
            throw 'Something went wrong';
        }
    }
}
