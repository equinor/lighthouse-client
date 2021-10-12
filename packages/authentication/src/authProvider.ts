import { Configuration } from '@azure/msal-browser';
import { authenticationProvider } from './authService';

const clientId = '3becc69f-510a-411b-92a4-c0bf8d5ca588';
const tenant = '3aa4a235-b6e2-48d5-9195-7fcf05b459b0';
const authority = `https://login.microsoftonline.com/${tenant}`;

export const authConfig: Configuration = {
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

export const authProvider = authenticationProvider(authConfig);
