import { AccountInfo, SilentRequest } from '@azure/msal-browser';

export const graphConfig: GraphConfig = {
    graphProfileEndpoint: 'https://graph.microsoft.com/v1.0/me',
    graphProfilePictureEndpoint: 'https://graph.microsoft.com/v1.0/me/photo/$value'
};

interface GraphConfig {
    graphProfileEndpoint: string;
    graphProfilePictureEndpoint: string;
}

/**
 * Method returning graph api request for a user.
 * Method is used to authenticate user before calling the graph api
 * Based on the @azure/msal-browser package
 * @param user to authenticate
 */
export const graphApiRequest = (user: AccountInfo): SilentRequest => {
    return {
        account: user,
        forceRefresh: false,
        scopes: ['openid', 'profile', 'User.Read', 'offline_access']
    };
};
