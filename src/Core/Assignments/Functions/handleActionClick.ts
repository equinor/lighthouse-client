import { deref } from '@dbeining/react-atom';
import { AppManifest } from '@equinor/portal-client';
import { NavigateFunction } from 'react-router';
import { getApps } from '../../../apps/apps';
import { CoreContext } from '../../WorkSpace/src/WorkSpaceApi/workspaceState';

const apps = new Map<string, string>();
apps.set('ScopeChangeControl', 'change');

export async function handleActionClick(
    appName: string,
    identifier: string,
    navigate: NavigateFunction,
    currentLocation: string
): Promise<void> {
    const actualName = apps.get(appName);
    if (!actualName) throw 'App not found';
    const app = getApps().find(({ shortName }) => shortName === actualName);
    if (!app) throw 'Not found';
    if (currentLocation === actualName) {
        //mount sidesheet
        await openSidesheet(identifier, app);
    } else {
        //HACK: table injected in url
        navigate(`${app.groupe}/${app.shortName}/table#${app.shortName}/${identifier}`);
    }
}

async function openSidesheet(identifier: string, app: AppManifest) {
    const { idResolver, onSelect } = deref(CoreContext)[app.shortName];

    const item = idResolver && (await idResolver(identifier));
    if (!item) return;

    onSelect && onSelect(item);
}
