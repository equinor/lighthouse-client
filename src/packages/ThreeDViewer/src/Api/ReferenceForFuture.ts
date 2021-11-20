import {
    BoundingBoxClipper,
    Cognite3DModel,
    Cognite3DViewer,
    DefaultNodeAppearance,
    IndexSet,
    THREE,
    TreeIndexNodeCollection
} from '@cognite/reveal';
import { ClientOptions, CogniteClient } from '@cognite/sdk';

export interface ObjectData {
    matrix: number[];
    width: number;
    height: number;
    depth: number;
}

type Color = `#${number}`;
type ColorFunc = () => Color;

export function createBox(
    name: string,
    { width, height, depth, matrix }: ObjectData
) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color: 0x676767 });
    const cube = new THREE.Mesh(geometry, material);
    const matrix4 = new THREE.Matrix4();
    matrix4.fromArray(matrix);
    cube.applyMatrix4(matrix4);
    cube.name = name;
    return cube;
}

const selectedStyle = {
    color: [0, 0, 255] as [number, number, number],
    visible: true,
    renderInFront: true,
    renderGhosted: false,
    outlineColor: 4
};

const highlightedStyle = {
    color: [61, 138, 255] as [number, number, number],
    outlineColor: 4,
    renderGhosted: false,
    renderInFront: true,
    visible: true
};

export function ThreeDViewerApi(domElement: HTMLElement, baseUrl?: string) {
    const clientOptions: ClientOptions = {
        appId: '',
        baseUrl: baseUrl || 'https://app-echomodeldist-dev.azurewebsites.net'
    };
    const client = new CogniteClient(clientOptions);
    client.setProject('3d-web');
    const viewer = new Cognite3DViewer({
        sdk: client,
        domElement,
        logMetrics: false
    });

    viewer.setBackgroundColor(new THREE.Color('#5EA4E0'));
    const scene = viewer.getScene();
    const camera = viewer.getCamera();
    const selectedNodes = new TreeIndexNodeCollection();
    let selection: Iterable<number> | undefined = undefined;
    let model: Cognite3DModel | undefined = undefined;

    function setSelection() {
        if (!model) return;

        model.assignStyledNodeCollection(
            selectedNodes,
            DefaultNodeAppearance.Highlighted
        );
    }

    function clipper(clipModel: boolean, id: number) {
        if (!model) return;
        if (clipModel) {
            const { min, max } = {
                min: { x: 1, y: 2, z: 0 },
                max: { x: 2, y: 4, z: 6 }
            };
            const boundingBox = new THREE.Box3(
                new THREE.Vector3(min.x - 1, min.z - 1, -max.y - 1),
                new THREE.Vector3(max.x + 1, max.z + 1, -min.y + 1)
            );
            viewer.fitCameraToBoundingBox(boundingBox, 500);
            const clipper = new BoundingBoxClipper(boundingBox);
            viewer.setClippingPlanes(clipper.clippingPlanes);
        } else {
        }
    }

    function createBB({ min, max }) {
        return new THREE.Box3(
            new THREE.Vector3(min.x, min.z, -max.y),
            new THREE.Vector3(max.x, max.z, -min.y)
        );
    }

    function hider() {
        if (!model || !selection) return;
        model.removeAllStyledNodeCollections();
        const assetNodes = new TreeIndexNodeCollection(new IndexSet(selection));
        model.assignStyledNodeCollection(assetNodes, selectedStyle);
    }

    function setHideMode(hideMode: 'Hide' | 'Ghost' | 'Default') {
        if (!model) return;
        switch (hideMode) {
            case 'Hide':
                model.setDefaultNodeAppearance(DefaultNodeAppearance.Hidden);
                return;
            case 'Ghost':
                model.setDefaultNodeAppearance(DefaultNodeAppearance.Ghosted);
                return;
            default:
                model.setDefaultNodeAppearance(DefaultNodeAppearance.Default);
        }
    }

    return {
        client,
        viewer,
        scene,
        createBox
    };
}
