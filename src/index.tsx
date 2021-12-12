import { Configuration } from '@azure/msal-browser';
import { authenticationProvider } from '@equinor/authentication';
import { fetchConfig } from '@equinor/lighthouse-conf';
import { render } from 'react-dom';
import ProCoSysAppClient from './ProCoSysAppClient';

fetchConfig().then((appConfig) => {
    const clientId = appConfig.settings.clientId;
    const tenantId = appConfig.settings.tenantId;
    const authority = `https://login.microsoftonline.com/${tenantId}`;
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
        render(
            <ProCoSysAppClient {...{ appConfig, authProvider }} />,
            document.getElementById('root')
        );
    }
});
