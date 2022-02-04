import {
    Cognite3DModel,
    THREE,
    TreeIndexNodeCollection
} from '@cognite/reveal';
import { ClientInstance, ViewerInstance } from './3DContextProvider';

export interface ModelData {
    modelId: number;
    revisionId: number;
    hierarchyId?: string;
    model: Cognite3DModel;
}

export interface ThreeDState {
    client: ClientInstance;
    viewer: ViewerInstance;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    highlightedNodes: TreeIndexNodeCollection;
    selectedNodes: TreeIndexNodeCollection;
    modelData?: ModelData;
    cameraPosition?: THREE.Vector3;
}

export const initialThreeDState: Omit<
    ThreeDState,
    'client' | 'viewer' | 'camera' | 'scene'
> = {
    highlightedNodes: new TreeIndexNodeCollection(),
    selectedNodes: new TreeIndexNodeCollection(),
    modelData: undefined
};
