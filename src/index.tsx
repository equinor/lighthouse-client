import { Configuration } from '@azure/msal-browser';
import { clientApiBuilder } from '@equinor/app-builder';
import { authenticationProvider } from '@equinor/authentication';
import { fetchConfig } from '@equinor/lighthouse-conf';
import { render } from 'react-dom';
import Client from './AppClient';
import { appGroups, apps } from './apps/apps';
import { createDataFactory } from '@equinor/DataFactory';
import { openSidesheet } from './Core/PopoutSidesheet/Functions/openSidesheet';

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
            navigateToLoginRequestUrl: true,
        },
        cache: {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: true,
        },
    };

    const authProvider = authenticationProvider(authConfig);
    if (authProvider && !(window !== window.parent && !window.opener)) {
        apps.forEach((manifest) => {
            manifest.app?.setup &&
                manifest.app.setup(
                    clientApiBuilder({
                        ...manifest,
                        appConfig,
                        authProvider,
                        openSidesheet,
                        createDataFactory,
                    })
                );
        });

        const manifests = { apps, appGroups };

        render(
            <Client {...{ appConfig, authProvider, manifests }} />,
            document.getElementById('root')
        );
    }
});
