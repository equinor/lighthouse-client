import { Echo3dClient } from '../services/echo3dClient';

/**
 * Method that initializes the Echo3DClient with custom login and access token handling
 *
 * @param {string} baseUrl the url to fetch model files from
 * @param {() => Promise<string | undefined>} getAccessToken the method for getting an access token that will be used when fetching model files
 * @returns {Promise<Echo3dClient>} the initialized echo3DClient
 */
const initializeClient = async (
    baseUrl: string,
    getAccessToken: () => Promise<string | undefined>
): Promise<Echo3dClient> => {
    const client = new Echo3dClient({
        appId: '',
        baseUrl
    });

    client.setProject('3d-web'); // Not used for anything in Echo yet. Must be non-empty

    // OAuthLoginResult is not exposed from cognite-sdk 5.6.1. Create our own.
    type OAuthLoginResult = [() => Promise<boolean>, string | null];

    const loginSuccess = await client.loginWithCustom(
        async (callbacks: {
            setCluster: (clusterId: string) => void; // setCluster() is used to set which subdomain of CogniteData.com to use. We should never invoke this as we use our own backend.
            setBearerToken: (bearerToken: string) => void; // Invoke setBearerToken to set the token to use in the CogniteClients httpClient
            validateAccessToken: (bearerToken: string) => Promise<boolean>; // This is not implemented in our API (yet?), but would do a check to a backend route if the token is "valid".
        }): Promise<OAuthLoginResult> => {
            /**
             * Authenticate the user when requesting model files
             * This utilizes the getAccessToken from the input of the parent method
             *
             * @returns {Promise<boolean>} a boolean indicating if the authentication was a success or not.
             * If code is unable to retrieve the access token an error will be thrown
             */
            const authenticate: () => Promise<boolean> = async (): Promise<boolean> => {
                const tokenRetry = await getAccessToken();

                if (!tokenRetry) throw new Error('Unable fetch new token, token seems to be undefined');

                callbacks.setBearerToken(tokenRetry);

                return true;
            };

            const token = await getAccessToken();

            return [authenticate, token ?? null];
        }
    );

    if (!loginSuccess) throw Error('Failed to authenticate Echo3dClient.');

    return client;
};

/**
 * Method that initializes the echo3d client
 *
 * @param {string} baseUrl the model distribution services base Url for the given environment
 * @param {() => Promise<string | undefined>} getAccessToken callback that is invoked when the code needs an accesstoken towards the ModelDistribution service. Return the accessToken here.
 * @returns {Promise<Echo3dClient>} the initialized echo3DClient
 */
export const initializeEcho3dClient = async (
    baseUrl: string,
    getAccessToken: () => Promise<string | undefined>
): Promise<Echo3dClient> => {
    return initializeClient(baseUrl, getAccessToken);
};
