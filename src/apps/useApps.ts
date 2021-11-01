import { AppManifest, apps } from './apps';

export function useApps() {
    apps.forEach((appManifest: AppManifest) => {
        if (appManifest.app) {
            appManifest.app.setup && appManifest.app.setup(appManifest);
        }
    });
    return apps;
}
