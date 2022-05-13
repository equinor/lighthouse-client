import { deref } from '@dbeining/react-atom';
import { AppManifest } from '@equinor/lighthouse-portal-client';
import { openSidesheet, SuspenseSidesheet } from '@equinor/sidesheet';
import { getApps } from '../../apps/apps';
import { CoreContext } from '../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';

const apps = new Map<string, string>();
apps.set('ScopeChangeControl', 'change');

export async function handleActionClick(appName: string, identifier: string): Promise<void> {
    const actualName = apps.get(appName);
    if (!actualName) throw 'App not found';
    const app = getApps().find(({ shortName }) => shortName === actualName);
    if (!app) throw 'Not found';

    await handleSidesheet(identifier, app);
}

async function handleSidesheet(identifier: string, app: AppManifest) {
    async function mountAsync() {
        //HACK: Dont do this
        const { idResolver } = deref(CoreContext)[app.shortName];
        const item = idResolver && (await idResolver(identifier));
        if (!item) return;
        openSidesheet(app.app?.SidesheetComponent, item, app.shortName);
    }

    openSidesheet(SuspenseSidesheet, mountAsync, app.shortName);
}
