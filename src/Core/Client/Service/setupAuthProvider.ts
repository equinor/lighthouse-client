import { Configuration } from '@azure/msal-browser';
import { authenticationProvider } from '@equinor/authentication';
import { AppConfigSettings } from '../Types/AppConfig';
import { InternalState } from '../Types/InternalState';

export function setupAuthProvider({ tenantId, clientId }: AppConfigSettings): InternalState {
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
    return {
        tenantId,
        clientId,
        authProvider: authenticationProvider(authConfig),
    };
}
