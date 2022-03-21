import { customHttp } from './commonClientMethods';
import { AssetMetadataSimpleDto, ModelsClient } from './generated/EchoModelDistributionApiClient';

let modelsClient: ModelsClient | undefined;

/**
 *
 * Initialize the Model Distribution Client
 *
 *
 * @param {string} apiUrl the api to use for the client
 * @param {() => Promise<string | undefined>} getAccessToken the access token method that the client will use when doing fetch calls
 * @returns {ModelsClient} the model distribution client to use to fetch models and information about the models
 */
export const initializeModelClient = (
    apiUrl: string,
    getAccessToken: () => Promise<string | undefined>
): ModelsClient => {
    modelsClient = new ModelsClient(apiUrl, customHttp(getAccessToken));

    return modelsClient;
};

/**
 * Method that returns a initialized model distribution client
 * Will throw an error if the method initializeModelClient is not called before this one is
 *
 * @returns {ModelsClient} an already initialized model distribution api client if one exists
 */
export const getModelsClient = (): ModelsClient => {
    if (!modelsClient) {
        throw new Error('Model client api is not initialized. Call initializeModelClient first.');
    }

    return modelsClient;
};

/**
 * List all available models for the current user matching the filter. Returns the latest revision only.
 *
 * If the returned list of model metadata is empty, then there is no models that the
 * current user has access to.
 *
 * @param {string | null | undefined} artifactKind filter on artifact kind, default is Reveal
 * @param {string | null | undefined} artifactVersion filter on artifact version, default is 8
 * @param {string | null | undefined} plantCode filter on plant code
 * @param {string | null | undefined} plantSection filter on plant selection
 * @param {AbortSignal | undefined} signal abort signal to cancel the request if necessary
 * @returns {Promise<AssetMetadataSimpleDto[]>} a list of all available models for the current user
 */
export const getAvailableModels = async (
    artifactKind: string | null | undefined = 'Reveal',
    artifactVersion: string | null | undefined = '8',
    plantCode?: string | null | undefined,
    plantSection?: string | null | undefined,
    signal?: AbortSignal | undefined
): Promise<AssetMetadataSimpleDto[]> => {
    return getModelsClient().listModels(artifactKind, artifactVersion, plantCode, plantSection, signal);
};

/**
 *  Dispose the initialized ModelsClient instance.
 */
export const disposeModelsClient = () => {
    if (modelsClient) modelsClient = undefined;
};
