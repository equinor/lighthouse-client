import { AuthenticationProvider } from '@equinor/authentication';
import { AppConfig } from '@equinor/lighthouse-conf';
import { useEffect, useState } from 'react';
import { AppManifest, apps } from './apps';

export function useApps(authProvider: AuthenticationProvider, appConfig: AppConfig): AppManifest[] {
    const [appList] = useState(apps);
    useEffect(() => {
        appList.forEach((route) => {
            route.app?.setup &&
                route.app.setup({
                    ...route,
                    appConfig,
                    authProvider,
                });
        });
    }, [appConfig, appList, authProvider]);

    return appList;
}
