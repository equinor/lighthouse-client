import { threeDClient, threeDViewer } from '@equinor/ThreeDViewer';
import { threeDActionsApi } from './threeDActions';
import { ThreeDClientInstance } from './threeDClient';
import { ThreeDSelectorApi } from './threeDSelectors';
import { ThreeDViewerInstance, ThreeDViewerOptions } from './threeDViewer';

export interface ThreeDConfig extends ThreeDViewerOptions {
    domElement?: HTMLElement;
    baseUrl?: string;
    project?: string;
}

export type ThreeDInstance = ThreeDClientInstance & ThreeDViewerInstance & ThreeDApi;

export type ThreeDApiOptions = ThreeDConfig & ThreeDViewerInstance & { domElement?: HTMLElement };

type ThreeDApi = ReturnType<typeof createThreeDApi>;

function createThreeDApi(options: ThreeDApiOptions) {
    return {
        ...threeDActionsApi(options),
        ...ThreeDSelectorApi(options),
    };
}

export async function threeD(options: ThreeDConfig): Promise<ThreeDInstance> {
    const clientInstance = await threeDClient(options.baseUrl, options.project);
    const viewerInstance = threeDViewer(clientInstance.client, options);
    const threeDApi = createThreeDApi({ ...viewerInstance, ...options });

    return {
        ...clientInstance,
        ...viewerInstance,
        ...threeDApi,
    };
}
