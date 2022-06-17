import { Echo3dClient } from '../services/echo3dClient';

/**
 * Method that initializes the Echo3DClient with custom login and access token handling
 *
 * @param {string} baseUrl the url to fetch model files from
 * @param {() => Promise<string>} getAccessToken Should return a bearer token for the Echo Model Distribution Service.
 * @returns {Promise<Echo3dClient>} the initialized echo3DClient
 */
const initializeClient = async (baseUrl: string, getAccessToken: () => Promise<string>): Promise<Echo3dClient> => {
    const options = {
        appId: '',
        baseUrl,
        project: '3d-web', // Not used for anything in Echo yet. Must be non-empty
        getToken: getAccessToken
    };

    const client = new Echo3dClient(options);

    // verify that access token method returns a token
    const loginSuccess = await client.authenticate();
    if (!loginSuccess) throw Error('Failed to authenticate Echo3dClient.');

    return client;
};

/**
 * Method that initializes the echo3d client
 *
 * @param {string} baseUrl the model distribution services base Url for the given environment
 * @param {() => Promise<string | undefined>} getAccessToken callback that is invoked when the code needs an accessToken towards the ModelDistribution service. Return the accessToken here.
 * @returns {Promise<Echo3dClient>} the initialized echo3DClient
 */
export const initializeEcho3dClient = async (
    baseUrl: string,
    getAccessToken: () => Promise<string>
): Promise<Echo3dClient> => {
    return initializeClient(baseUrl, getAccessToken);
};
