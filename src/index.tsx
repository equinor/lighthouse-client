
import { Configuration } from '@azure/msal-browser';
import { authenticationProvider } from '@equinor/authentication';
import { fetchConfig } from '@equinor/lighthouse-conf';
import React from 'react';
import { render } from 'react-dom';
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
        moduleLoader.register()
        render(<ProCoSysAppClient {...{ appConfig, authProvider }} />, document.getElementById('root'));
    }
})


