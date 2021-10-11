export async function configFetch(uri: string) {
    try {
        const result = await fetch(uri);
        return result.json();
    } catch (error) {
        throw error;
    }
}
