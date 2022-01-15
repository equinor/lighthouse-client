import { AppGroups } from '../Types/AppGroupe';
import { AppManifest, Manifests } from '../Types/Manifest';

export type GetApps = () => AppManifest[];
export type GetAppGroups = () => AppGroups;

export function appsProvider(getApps: GetApps, getInitialGroups: GetAppGroups): Manifests {
    const apps = getProductionApps(getApps(), false);
    const initialGroups = getInitialGroups();

    return {
        apps,
        appGroups: getAppGroups(apps, initialGroups),
    };
}

function getProductionApps(apps: AppManifest[], isProduction: boolean): AppManifest[] {
    return apps.filter((app) => {
        if (isProduction) {
            return app.isProduction;
        } else {
            return true;
        }
    });
}

function getAppGroups(apps: AppManifest[], initialGroups: AppGroups): AppGroups {
    const appGroups: AppGroups = {};

    apps.forEach((app) => {
        if (Array.isArray(app.groupe)) {
            app.groupe.forEach((groupName: string) => {
                appGroups[groupName] = initialGroups[groupName];
            });
        } else {
            appGroups[app.groupe] = initialGroups[app.groupe];
        }
    });
    return appGroups;
}
