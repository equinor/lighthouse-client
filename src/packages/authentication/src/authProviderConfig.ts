import {
    AccountInfo,
    EndSessionRequest,
    RedirectRequest,
    SilentRequest
} from '@azure/msal-browser';

/**
 * Config method for creating request used for logging out the provided account
 * Based on the @azure/msal-browser package
 * @param user account information of the user to be logged out.
 */
export const logoutRequest = (user: AccountInfo): EndSessionRequest => {
    return {
        account: user
    };
};

/**
 * Config method for that returns the default login request.
 * If other scopes or prompt parameter is needed then this can be provided upon creating a new AuthenticationProvider
 * Based on the @azure/msal-browser package
 */
export const defaultLoginRequest: RedirectRequest = {
    scopes: ['openid', 'profile', 'User.Read', 'offline_access'],
    prompt: 'select_account'
};

/**
 * Config method for that returns the a login request using the account information usually stored on the AuthenticationProvider instance.
 * Method used to silently sign in/re-authenticate a user
 * Based on the @azure/msal-browser package
 */
export const loginSilentlyRequest = (user: AccountInfo): SilentRequest => {
    return {
        account: user,
        forceRefresh: false,
        scopes: ['openid', 'profile', 'User.Read', 'offline_access']
    };
};
