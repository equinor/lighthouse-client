//Todo refactor file.
const apps = new Map<string, string>();
apps.set('ScopeChangeControl', 'change');
apps.set('ReleaseControl', 'releaseDetails');

export async function handleActionClick(appName: string, identifier: string): Promise<void> {
    const actualName = apps.get(appName);
    if (!actualName) throw 'App not found';
    window.open(`/#${actualName}/${identifier}`, '_blank');
}
