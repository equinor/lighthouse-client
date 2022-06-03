import { openSidesheetById } from '@equinor/sidesheet';

const apps = new Map<string, string>();
apps.set('ScopeChangeControl', 'change');

export async function handleActionClick(appName: string, identifier: string): Promise<void> {
    const actualName = apps.get(appName);
    if (!actualName) throw 'App not found';
    openSidesheetById(actualName, identifier);
}
