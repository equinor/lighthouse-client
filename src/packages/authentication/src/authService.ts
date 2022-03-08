import {
    AccountInfo,
    Configuration,
    InteractionRequiredAuthError,
    PublicClientApplication,
    RedirectRequest,
    SilentRequest,
} from '@azure/msal-browser';
import { defaultLoginRequest } from './authProviderConfig';

export interface AuthenticationProvider {
    /**
     * Login Function for authentication to azure AD
     * @return {*}  {Promise<void>}
     */
    login: () => Promise<void>;

    /**
     * Logout function, will redirect the user to the login screen.
     * @return {*}  {Promise<void>}
     */
    logout: () => Promise<void>;
    getCurrentUser: () => AccountInfo | null;
    handleLogin: (logRequest?: LoggingFunction) => Promise<void>;
    isAuthenticated: () => boolean;
    getAccessToken: (scope?: string[]) => Promise<string>;
    getUserName: () => string;
}
export interface IAuthServiceProps {
    publicClient: PublicClientApplication;
    scopes: string[];
}

export type LoggingFunction = (...args: unknown[]) => void;

interface AuthProperties {
    account: AccountInfo | null;
    loginError: boolean;
    isAuthenticated: boolean;
    loginRequest: RedirectRequest;
}

/**
 *
 *
 * @export
 * @param {Configuration} configuration
 * @param {RedirectRequest} [customLoginRequest=defaultLoginRequest]
 * @return {*}  {IAuthService}
 */
export function authenticationProvider(
    configuration: Configuration,
    customLoginRequest: RedirectRequest = defaultLoginRequest
): AuthenticationProvider {
    const publicClient: PublicClientApplication = new PublicClientApplication(configuration);

    const authProperties: AuthProperties = {
        account: null,
        loginError: false,
        isAuthenticated: false,
        loginRequest: customLoginRequest,
    };

    async function logout(): Promise<void> {
        return await publicClient.logoutRedirect(authProperties.loginRequest);
    }

    async function login(): Promise<void> {
        await publicClient.loginRedirect(authProperties.loginRequest);
    }

    /**
     * Config method for that returns the a login request using the account information usually stored on the AuthenticationProvider instance.
     * Method used to silently sign in/re-authenticate a user
     * Based on the @azure/msal-browser package
     * @param {AccountInfo} user
     * @return {*}  {SilentRequest}
     */
    function loginSilentlyRequest(user: AccountInfo): SilentRequest {
        return {
            account: user,
            forceRefresh: false,
            scopes: ['openid', 'profile', 'User.Read', 'offline_access'],
        };
    }

    function getCurrentUser(): AccountInfo | null {
        authProperties.account = publicClient.getAllAccounts()[0];
        return authProperties.account;
    }

    function getUserName(): string {
        if (!authProperties.account) return '';
        return authProperties.account.username;
    }

    const getAccessToken = async (scopes?: string[]): Promise<string> => {
        try {
            if (!authProperties.account) return '';
            const { accessToken } = await publicClient.acquireTokenSilent({
                account: authProperties.account,
                scopes: scopes ? scopes : defaultLoginRequest.scopes,
            });
            if (accessToken) {
                return accessToken;
            } else {
                console.log('Token acquisition failed, redirecting');
                publicClient.acquireTokenRedirect(authProperties.loginRequest);
                return '';
            }
        } catch (error) {
            return await acquireTokenPopup(scopes ? scopes : defaultLoginRequest.scopes);
        }
    };

    async function acquireTokenPopup(scopes: string[]) {
        if (!authProperties.account) return '';
        const { accessToken } = await publicClient.acquireTokenPopup({
            account: authProperties.account,
            scopes: scopes,
        });

        if (accessToken) {
            return Promise.resolve(accessToken);
        } else {
            console.log('Token acquisition failed, redirecting');
            publicClient.acquireTokenRedirect(authProperties.loginRequest);
            return '';
        }
    }

    function isAuthenticated(): boolean {
        return authProperties.isAuthenticated;
    }

    async function silentOrRedirectToAuthenticate(logRequest?: LoggingFunction) {
        try {
            const response = await publicClient.acquireTokenSilent(
                loginSilentlyRequest(publicClient.getAllAccounts()[0])
            );
            authProperties.account = response.account;
            authProperties.isAuthenticated = true;
        } catch (error) {
            logRequest && logRequest('Silent token acquisition failed.');
            if (error instanceof InteractionRequiredAuthError) {
                console.log('Acquiring token using redirect');
                publicClient.acquireTokenRedirect(authProperties.loginRequest).then();
            } else {
                logRequest ? logRequest(error) : console.error(error);
            }
        }
    }

    async function handleLogin(logRequest?: LoggingFunction): Promise<void> {
        const response = await publicClient.handleRedirectPromise();

        if (response) {
            logRequest && logRequest('Got response');
            authProperties.isAuthenticated = true;
        } else if (publicClient.getAllAccounts().length === 0) {
            logRequest && logRequest('No response and no users');
            login();
        } else {
            logRequest &&
                logRequest(
                    'No response but I have users, attempting sso-silent or acquire token with redirect'
                );
            await silentOrRedirectToAuthenticate(logRequest);
        }
    }

    return {
        login,
        logout,
        handleLogin,
        getCurrentUser,
        isAuthenticated,
        getAccessToken,
        getUserName,
    };
}
