
import { Configuration } from '@azure/msal-browser';
import { AuthenticationProvider, authenticationProvider } from '@equinor/authentication';
import { AppConfig, fetchConfig } from '@equinor/lighthouse-conf';
import React from 'react';
import { render } from 'react-dom';
import { AppManifest, apps } from './apps/apps';
import moduleLoader from './moduleLoader';
import ProCoSysAppClient from './ProCoSysAppClient';



fetchConfig().then((appConfig) => {
    const clientId = appConfig.clientId;
    const tenant = appConfig.tenant;
    const authority = `https://login.microsoftonline.com/${tenant}`;
    const authConfig: Configuration = {
        auth: {
            authority: authority,
            clientId,
            redirectUri: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            navigateToLoginRequestUrl: true
        },
        cache: {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: true
        }
    };

    const authProvider = authenticationProvider(authConfig);



    if (authProvider && !(window !== window.parent && !window.opener)) {
        setupApps(appConfig, authProvider);
        moduleLoader.register()
        render(<ProCoSysAppClient {...{ appConfig, authProvider }} />, document.getElementById('root'));
    }
})


function setupApps(appConfig: AppConfig, authProvider: AuthenticationProvider) {
    apps.forEach((appManifest: AppManifest) => {
        if (appManifest.app) {
            appManifest.app.setup &&
                appManifest.app.setup({
                    ...appManifest,
                    appConfig,
                    authProvider
                });
        }
    });
}
