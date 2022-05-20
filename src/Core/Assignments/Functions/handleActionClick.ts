import { openSidesheetById } from '@equinor/sidesheet';

//Todo refactor file.
const apps = new Map<string, string>();
apps.set('ScopeChangeControl', 'change');

export async function handleActionClick(appName: string, identifier: string): Promise<void> {
    const actualName = apps.get(appName);
    if (!actualName) throw 'App not found';
    await openSidesheetById(identifier, identifier);
}
