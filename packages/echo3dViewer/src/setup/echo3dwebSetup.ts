import { initializeHierarchyClient } from '../services/hierarchyClient';
import { initializeModelClient } from '../services/modelsClient';
import { ApiServiceConfiguration } from '../types/apiServiceConfiguration';
import { EchoSetupObject } from '../types/echoSetupObject';
import { RendererConfiguration } from '../types/rendererConfiguration';
import { initializeEcho3dClient } from './initializeEcho3dClient';
import { initializeEcho3dViewer } from './initializeEcho3dViewer';

/**
 *
 * Setup function that initializes:
 *  - model distribution api client
 *  - hierarchy service api client
 *  - echo 3D client
 *  - echo 3D viewer
 *
 * @param {HTMLCanvasElement} canvas  the canvas to render on
 * @param {ApiServiceConfiguration} modelDistributionConfig configurations needed to initialize the model distribution api
 * @param {ApiServiceConfiguration} hierarchyConfig configurations needed to initialize the hierarchy service api
 * @param {RendererConfiguration | undefined} renderConfig configurations for initializing the renderer, if undefined defaults will be used
 * @returns {Promise<EchoSetupObject>} Everything needed to load a model in the provided canvas initialized
 */
export const setupEcho3dWeb = async (
    canvas: HTMLCanvasElement,
    modelDistributionConfig: ApiServiceConfiguration,
    hierarchyConfig: ApiServiceConfiguration,
    renderConfig?: RendererConfiguration
): Promise<EchoSetupObject> => {
    const modelApiClient = initializeModelClient(
        modelDistributionConfig.baseUrl,
        modelDistributionConfig.getAccessToken
    );
    const hierarchyApiClient = initializeHierarchyClient(hierarchyConfig.baseUrl, hierarchyConfig.getAccessToken);

    const client = await initializeEcho3dClient(
        modelDistributionConfig.baseUrl,
        modelDistributionConfig.getAccessToken
    );
    const echo3dViewer = initializeEcho3dViewer(client, canvas, renderConfig);

    return {
        client,
        viewer: echo3dViewer,
        modelApiClient,
        hierarchyApiClient
    };
};
