import { AppGroups } from '../Types/AppGroupe';
import { AppManifest } from '../Types/AppManifest';
import { ClientRegistry } from '../Types/ClientRegistry';

export type GetApps = () => AppManifest[];
export type GetAppGroups = () => AppGroups;

export function appsProvider(
    getApps: GetApps,
    getInitialGroups: GetAppGroups,
    isProduction: boolean
): ClientRegistry {
    const apps = getProductionApps(getApps(), isProduction);
    const initialGroups = getInitialGroups();

    return {
        apps,
        appGroups: getAppGroups(apps, initialGroups),
    };
}

function getProductionApps(apps: AppManifest[], isProduction: boolean): AppManifest[] {
    return apps.filter((app) => {
        if (isProduction) {
            return app.appEnv === 'prod';
        } else {
            return true;
        }
    });
}

function getAppGroups(apps: AppManifest[], initialGroups: AppGroups): AppGroups {
    const appGroups: AppGroups = {};

    apps.forEach((app) => {
        appGroups[app.groupe] = initialGroups[app.groupe];
    });
    return appGroups;
}
