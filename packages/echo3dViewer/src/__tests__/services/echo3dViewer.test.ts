import { Cognite3DModel, THREE } from '@cognite/reveal';
import { CogniteClient } from '@cognite/sdk';
import { CancelToken } from '@esfx/async-canceltoken';
// eslint-disable-next-line testing-library/no-dom-import -- react is not in this project
import { fireEvent } from '@testing-library/dom';
import CameraControls from 'camera-controls';
import { initializeHierarchyClient, SelectedNodeInformation } from '../..';
import { CameraControlsExtended } from '../../controls/CameraControlsExtended';
import { FirstPersonCameraControls } from '../../controls/FirstPersonCameraControls';
import { Echo3dViewer } from '../../services/echo3DViewer';
import { AssetDownloadDto, AssetMetadataSimpleDto } from '../../services/generated/EchoModelDistributionApiClient';
import { getModelsClient, initializeModelClient } from '../../services/modelsClient';

const getEcho3dViewerMock = (): Echo3dViewer => {
    const canvasElementMock = document.createElement('canvas');
    const renderer = new THREE.WebGLRenderer({ canvas: canvasElementMock });
    const client = new CogniteClient({
        appId: '',
        baseUrl: ''
    });

    const options = {
        sdk: client,
        renderer,
        domElement: renderer.domElement,
        logMetrics: false
    };

    return new Echo3dViewer(options);
};

describe('Echo3dViewer - getSingleSelectionHandler - registererSelectionHandler', () => {
    test('Should return the registered selection handler', () => {
        const viewer = getEcho3dViewerMock();
        const model = {} as Cognite3DModel;
        const modelMetadata = { id: 123, revisionNumber: 456, hierarchyId: 'hierarchyId' };
        viewer.registererSelectionHandler(model, modelMetadata);

        const selectionHandler = viewer.getSingleSelectionHandler(modelMetadata.id, modelMetadata.revisionNumber);
        expect(selectionHandler).toBeDefined();
    });

    test('Should return undefined if no selection handler is registered', () => {
        const viewer = getEcho3dViewerMock();
        const selectionHandler = viewer.getSingleSelectionHandler(123, 456);

        expect(selectionHandler).toBeUndefined();
    });

    test('Should throw error when the registered selection handler because revision number is undefined', () => {
        const viewer = getEcho3dViewerMock();
        const model = {} as Cognite3DModel;
        const modelMetadata = { id: 123, hierarchyId: 'hierarchyId' };
        expect(() => viewer.registererSelectionHandler(model, modelMetadata)).toThrow();
    });
});

describe('Echo3dViewer - loadModel', () => {
    test('Should successfully load model, but not register selection handler', () => {
        const viewer = getEcho3dViewerMock();
        const revisionNumber = 456;
        const modelMetadata = { id: 123, hierarchyId: 'hierarchyId' } as unknown as AssetMetadataSimpleDto;
        const getAccessToken = jest.fn().mockResolvedValue('accessToken');

        initializeModelClient('baseUrl', getAccessToken);

        const modelsClient = getModelsClient();
        jest.spyOn(modelsClient, 'getModelById').mockResolvedValue({
            assetMetaData: {
                revisionNumber
            }
        } as unknown as AssetDownloadDto);

        const model = viewer.loadModel(modelMetadata);
        const selectionHandler = viewer.getSingleSelectionHandler(modelMetadata.id, revisionNumber);

        expect(selectionHandler).toBeUndefined();
        expect(model).toBeDefined();
    });

    test('Should successfully load model and register selection handler', async () => {
        const viewer = getEcho3dViewerMock();
        const revisionNumber = 456;
        const modelMetadata = { id: 123, hierarchyId: 'hierarchyId' } as unknown as AssetMetadataSimpleDto;
        const getAccessToken = jest.fn().mockResolvedValue('accessToken');

        initializeModelClient('baseUrl', getAccessToken);

        const modelsClient = getModelsClient();
        jest.spyOn(modelsClient, 'getModelById').mockResolvedValue({
            assetMetaData: {
                revisionNumber
            }
        } as unknown as AssetDownloadDto);

        const model = await viewer.loadModel(modelMetadata, true);
        const selectionHandler = viewer.getSingleSelectionHandler(modelMetadata.id, revisionNumber);

        expect(selectionHandler).toBeDefined();
        expect(model).toBeDefined();
    });

    test('Should throw error when loading model because model id is undefined', async () => {
        const viewer = getEcho3dViewerMock();
        const modelMetadata = { hierarchyId: 'hierarchyId' } as unknown as AssetMetadataSimpleDto;

        await expect(viewer.loadModel(modelMetadata)).rejects.toThrow();
    });

    test('Should throw error when loading model and revision id cannot be found', async () => {
        const viewer = getEcho3dViewerMock();
        const modelMetadata = { id: 123, hierarchyId: 'hierarchyId' } as unknown as AssetMetadataSimpleDto;
        const getAccessToken = jest.fn().mockResolvedValue('accessToken');

        initializeModelClient('baseUrl', getAccessToken);

        const modelsClient = getModelsClient();
        jest.spyOn(modelsClient, 'getModelById').mockResolvedValue({} as unknown as AssetDownloadDto);

        await expect(viewer.loadModel(modelMetadata)).rejects.toThrow();
    });

    test('Should throw error when loading model and enabling picking but no hierarchy id is provided', async () => {
        const viewer = getEcho3dViewerMock();
        const modelMetadata = { id: 123 } as unknown as AssetMetadataSimpleDto;

        await expect(viewer.loadModel(modelMetadata, true)).rejects.toThrow();
    });
});

describe('Echo3dViewer - initialize controls', () => {
    beforeAll(() => {
        CameraControls.install({ THREE });
    });

    test('Should successfully initialize orbit controls with provided target', () => {
        const viewer = getEcho3dViewerMock();
        const inTarget = new THREE.Vector3(1, 2, 3);
        const controls = viewer.initializeOrbitControls(new THREE.Vector3(0, 0, 0), inTarget);

        expect(controls instanceof CameraControlsExtended).toBeTruthy();
        const outTarget = new THREE.Vector3();
        controls.getTarget(outTarget);
        expect(outTarget).toEqual(inTarget);
    });

    test('Should successfully initialize first person camera controls with provided position and rotation', () => {
        const viewer = getEcho3dViewerMock();
        const inPosition = new THREE.Vector3(1, 2, 3);
        const inRotation = new THREE.Vector3(4, 5, 6);
        const controls = viewer.initializeFirstPersonControlsUsingRotation(inPosition, inRotation);

        expect(controls instanceof FirstPersonCameraControls).toBeTruthy();

        expect(controls.getPosition()).toEqual(inPosition);
        expect(controls.getRotation()).toEqual(inRotation);
    });

    test('Should successfully initialize first person camera controls with provided position and target', () => {
        const viewer = getEcho3dViewerMock();
        const inPosition = new THREE.Vector3(1, 2, 3);
        const lookAtPosition = new THREE.Vector3(2, 2, 3);
        const controls = viewer.initializeFirstPersonControlsUsingTarget(inPosition, lookAtPosition);

        expect(controls instanceof FirstPersonCameraControls).toBeTruthy();

        expect(controls.getPosition()).toEqual(inPosition);
    });
});

describe('Echo3dViewer - remove selection handler', () => {
    test('Should successfully remove selection handler', () => {
        const viewer = getEcho3dViewerMock();
        const modelData = { id: 123, revisionNumber: 456, hierarchyId: 'hierarchyId' };
        viewer.registererSelectionHandler({} as Cognite3DModel, modelData);

        expect(viewer.getSingleSelectionHandler(modelData.id, modelData.revisionNumber)).toBeTruthy();

        viewer.removeSingleSelectionHandler(modelData.id, modelData.revisionNumber);

        expect(viewer.getSingleSelectionHandler(modelData.id, modelData.revisionNumber)).toBeUndefined();
    });

    test('Should successfully unload model', () => {
        const viewer = getEcho3dViewerMock();
        const modelData = { id: 123, revisionNumber: 456, hierarchyId: 'hierarchyId' };
        viewer.registererSelectionHandler({} as Cognite3DModel, modelData);

        expect(viewer.getSingleSelectionHandler(modelData.id, modelData.revisionNumber)).toBeTruthy();

        viewer.unloadModelAndSelectionHandler(modelData.id, modelData.revisionNumber);

        expect(viewer.getSingleSelectionHandler(modelData.id, modelData.revisionNumber)).toBeUndefined();
    });

    test('Should successfully dispose selection handler', () => {
        const viewer = getEcho3dViewerMock();
        const modelData = { id: 123, revisionNumber: 456, hierarchyId: 'hierarchyId' };
        viewer.registererSelectionHandler({} as Cognite3DModel, modelData);

        expect(viewer.getSingleSelectionHandler(modelData.id, modelData.revisionNumber)).toBeTruthy();

        viewer.disableSelection();

        expect(viewer.getSingleSelectionHandler(modelData.id, modelData.revisionNumber)).toBeUndefined();
    });

    test('Should successfully dispose viewer', () => {
        const viewer = getEcho3dViewerMock();
        const modelData = { id: 123, revisionNumber: 456, hierarchyId: 'hierarchyId' };
        viewer.registererSelectionHandler({} as Cognite3DModel, modelData);

        expect(viewer.getSingleSelectionHandler(modelData.id, modelData.revisionNumber)).toBeTruthy();

        viewer.disposeAll();

        expect(viewer.getSingleSelectionHandler(modelData.id, modelData.revisionNumber)).toBeUndefined();
        expect(viewer.domElement).toBeUndefined();
    });
});

describe('Echo3dViewer - test selection by pointer event', () => {
    beforeAll(() => {
        initializeHierarchyClient('apiUrl', jest.fn().mockResolvedValue('accessToken'));

        if (!global.PointerEvent) {
            class PointerEvent extends Event {
                public height?: number;

                public isPrimary?: boolean;

                public offsetX?: number;

                public offsetY?: number;

                public button?: number;

                constructor(type: string, params: PointerEventInit = {}) {
                    super(type, params);
                    this.isPrimary = params.isPrimary;
                    this.button = params.button;
                    this.offsetX = 10;
                    this.offsetY = 10;
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- needed for test
            global.PointerEvent = PointerEvent as any;
        }
    });

    test('Should successfully add selection by pointer event', async () => {
        const viewer = getEcho3dViewerMock();
        const modelData = { id: 123, revisionNumber: 456, hierarchyId: 'hierarchyId' };
        viewer.registererSelectionHandler({} as Cognite3DModel, modelData);
        viewer.enableSelectionByPicking();
        const selectionHandler = viewer.getSingleSelectionHandler(modelData.id, modelData.revisionNumber);

        const treeIndexFromPicking = 12345;
        viewer.getIntersectionFromPixel = jest.fn().mockResolvedValue({
            treeIndex: treeIndexFromPicking,
            model: { modelId: modelData.id, revisionId: modelData.revisionNumber } as Cognite3DModel
        });

        const setSelectionBasedOnTreeIndexSpy = jest.spyOn(selectionHandler!, 'setSelectionBasedOnTreeIndex');
        setSelectionBasedOnTreeIndexSpy.mockResolvedValue({} as SelectedNodeInformation);

        fireEvent.pointerDown(viewer.domElement, { button: 0, isPrimary: true });
        fireEvent.pointerUp(viewer.domElement, { button: 0, isPrimary: true });
        // eslint-disable-next-line @typescript-eslint/unbound-method -- need this so setSelectionBasedOnTreeIndex will get called before expect is
        await new Promise(process.nextTick);

        expect(setSelectionBasedOnTreeIndexSpy).toBeCalledWith(
            treeIndexFromPicking,
            undefined,
            CancelToken.source().token
        );
    });

    test('Should not add selection by pointer event because selection is performed on other model without selection handler', async () => {
        const viewer = getEcho3dViewerMock();
        const modelData = { id: 123, revisionNumber: 456, hierarchyId: 'hierarchyId' };
        viewer.registererSelectionHandler({} as Cognite3DModel, modelData);
        viewer.enableSelectionByPicking();
        const selectionHandler = viewer.getSingleSelectionHandler(modelData.id, modelData.revisionNumber);

        const treeIndexFromPicking = 12345;
        viewer.getIntersectionFromPixel = jest.fn().mockResolvedValue({
            treeIndex: treeIndexFromPicking,
            model: { modelId: 456, revisionId: 789 } as Cognite3DModel
        });

        const setSelectionBasedOnTreeIndexSpy = jest.spyOn(selectionHandler!, 'setSelectionBasedOnTreeIndex');
        setSelectionBasedOnTreeIndexSpy.mockResolvedValue({} as SelectedNodeInformation);

        fireEvent.pointerDown(viewer.domElement, { button: 0, isPrimary: true });
        fireEvent.pointerUp(viewer.domElement, { button: 0, isPrimary: true });
        // eslint-disable-next-line @typescript-eslint/unbound-method -- need this so setSelectionBasedOnTreeIndex will get called before expect is
        await new Promise(process.nextTick);

        expect(setSelectionBasedOnTreeIndexSpy).not.toBeCalledWith(treeIndexFromPicking);
    });

    test('Should not add selection by pointer event because click does not intersect with model', async () => {
        const viewer = getEcho3dViewerMock();
        const modelData = { id: 123, revisionNumber: 456, hierarchyId: 'hierarchyId' };
        viewer.registererSelectionHandler({} as Cognite3DModel, modelData);
        viewer.enableSelectionByPicking();
        const selectionHandler = viewer.getSingleSelectionHandler(modelData.id, modelData.revisionNumber);

        const treeIndexFromPicking = 12345;
        viewer.getIntersectionFromPixel = jest.fn().mockResolvedValue(undefined);

        const setSelectionBasedOnTreeIndexSpy = jest.spyOn(selectionHandler!, 'setSelectionBasedOnTreeIndex');
        setSelectionBasedOnTreeIndexSpy.mockResolvedValue({} as SelectedNodeInformation);

        fireEvent.pointerDown(viewer.domElement, { button: 0, isPrimary: true });
        fireEvent.pointerUp(viewer.domElement, { button: 0, isPrimary: true });
        // eslint-disable-next-line @typescript-eslint/unbound-method -- need this so setSelectionBasedOnTreeIndex will get called before expect is
        await new Promise(process.nextTick);

        expect(setSelectionBasedOnTreeIndexSpy).not.toBeCalledWith(treeIndexFromPicking);
    });
});
