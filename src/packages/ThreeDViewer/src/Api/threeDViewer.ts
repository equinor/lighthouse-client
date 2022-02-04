import { Cognite3DViewer, Cognite3DViewerOptions, GeometryFilter, THREE } from '@cognite/reveal';
import { ClientInstance, ViewerInstance } from '../Context/3DContextProvider';
import { ModelData } from '../Context/3DState';
// revealEnv.publicPath = `/reveal-worker/`;

export interface ThreeDViewerOptions extends Omit<Cognite3DViewerOptions, 'sdk'> {
    defaultSceneColor?: THREE.ColorRepresentation;
}

export interface ThreeDViewerInstance {
    viewer: ViewerInstance;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    loadModel: (
        modelId: number,
        revisionId: number,
        geometryFilter?: GeometryFilter
    ) => Promise<ModelData>;
}

export function threeDViewer(
    client: ClientInstance,
    options: ThreeDViewerOptions
): ThreeDViewerInstance {
    const viewer = new Cognite3DViewer({
        sdk: client,
        logMetrics: false,
        ...options,
    });
    viewer.setBackgroundColor(new THREE.Color(options.defaultSceneColor || '#5EA4E0'));
    const scene = viewer.getScene();
    const camera = viewer.getCamera();

    async function loadModel(
        modelId: number,
        revisionId: number,
        geometryFilter?: GeometryFilter
    ): Promise<ModelData> {
        const model = await viewer.addCadModel({
            modelId,
            revisionId,
            geometryFilter,
        });
        viewer.fitCameraToModel(model);
        return {
            modelId,
            revisionId,
            model,
        };
    }

    return { viewer, scene, camera, loadModel };
}
