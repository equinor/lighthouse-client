export function isProduction(): boolean {
    return import.meta.env.CLIENT_ENV === 'prod';
}
