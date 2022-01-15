export function isProduction(): boolean {
    return process.env.environment === 'prod';
}
