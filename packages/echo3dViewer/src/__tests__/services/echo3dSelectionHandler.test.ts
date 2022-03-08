import { Cognite3DModel, THREE } from '@cognite/reveal';
import { Echo3dSelectionHandler } from '../../services/echo3dSelectionHandler';
import {
    AabbModel,
    HierarchyNodeModel,
    HierarchyNodeModelListResult,
    UInt32ListResult,
    Vector3Model
} from '../../services/generated/EchoHierarchyApiClient';
import { getHierarchyClient, initializeHierarchyClient } from '../../services/hierarchyClient';

describe('Echo3dSelectionHandler', () => {
    beforeAll(() => {
        initializeHierarchyClient('baseurl', jest.fn().mockResolvedValue('accessToken'));
    });

    test('Successfully initialize selection handler', () => {
        const selectionHandler = new Echo3dSelectionHandler({} as Cognite3DModel, 'hierarchyId');

        expect(selectionHandler).toBeDefined();
        expect(selectionHandler.getSelectedTagInformation()).toBeUndefined();
    });

    test('Expect getModel to return the model used in initialization', () => {
        const modelId = 123;
        const modelRevisionId = 456;
        const selectionHandler = new Echo3dSelectionHandler(
            { id: modelId, revisionId: modelRevisionId } as Cognite3DModel,
            'hierarchyId'
        );

        expect(selectionHandler).toBeDefined();
        const { id, revisionId } = selectionHandler.getModel();
        expect(id).toBe(modelId);
        expect(revisionId).toBe(modelRevisionId);
    });
});

describe('Echo3dSelectionHandler - Selection by e3d tag', () => {
    beforeAll(() => {
        initializeHierarchyClient('baseurl', jest.fn().mockResolvedValue('accessToken'));
    });

    test('Set selection based on e3d tag', async () => {
        const e3dTagNo = '73-MA50';
        const selectionHandler = new Echo3dSelectionHandler(
            { id: 123, revisionId: 456 } as Cognite3DModel,
            'hierarchyId'
        );

        const findNodesByTagListSpy = jest.spyOn(getHierarchyClient(), 'findNodesByTagList');
        const hierarchyNodeModelListResult = new HierarchyNodeModelListResult({
            results: [
                new HierarchyNodeModel({
                    id: 114371,
                    name: '/73-MA50',
                    fullPath: ['/HC-MECH', '/HC-MECH-MATERIALHANDLING', '/73-MA50'],
                    topNodeId: 113387,
                    pdmsData: {
                        Description: 'DIESEL POWERED CRANE',
                        Discipline: 'MECH',
                        Inst: 'HUA',
                        Orientation: 'Y is N and Z is U',
                        PreOwnType: 'EQUI',
                        RefNo: '=16807/7553',
                        Tag: '73-MA50',
                        Type: 'EQUI'
                    },
                    childrenIds: [114372, 114374, 114378]
                })
            ],
            totalResults: 1
        });
        findNodesByTagListSpy.mockResolvedValue(hierarchyNodeModelListResult);

        const findLeafNodesByTagSpy = jest.spyOn(getHierarchyClient(), 'findLeafNodesByTag');
        const uInt32ListResult = new UInt32ListResult({ results: [788945, 788946, 788947], totalResults: 1 });
        findLeafNodesByTagSpy.mockResolvedValue(uInt32ListResult);

        const tagInformation = await selectionHandler.setSelectionBasedOnE3dTagNo(e3dTagNo);

        expect(tagInformation).toStrictEqual({
            e3dTagNo,
            referenceNo: hierarchyNodeModelListResult.results[0].pdmsData.RefNo,
            ...hierarchyNodeModelListResult.results[0]
        });
    });

    test('Set selection based on e3d tag, but selection is already set for this tag. No new api calls are done', async () => {
        const e3dTagNo = '73-MA50';
        const selectionHandler = new Echo3dSelectionHandler(
            { id: 123, revisionId: 456 } as Cognite3DModel,
            'hierarchyId'
        );

        const findNodesByTagListSpy = jest.spyOn(getHierarchyClient(), 'findNodesByTagList');
        const hierarchyNodeModelListResult = new HierarchyNodeModelListResult({
            results: [
                new HierarchyNodeModel({
                    id: 114371,
                    name: '/73-MA50',
                    fullPath: ['/HC-MECH', '/HC-MECH-MATERIALHANDLING', '/73-MA50'],
                    topNodeId: 113387,
                    pdmsData: {
                        Description: 'DIESEL POWERED CRANE',
                        Discipline: 'MECH',
                        Inst: 'HUA',
                        Orientation: 'Y is N and Z is U',
                        PreOwnType: 'EQUI',
                        RefNo: '=16807/7553',
                        Tag: '73-MA50',
                        Type: 'EQUI'
                    },
                    childrenIds: [114372, 114374, 114378]
                })
            ],
            totalResults: 1
        });
        findNodesByTagListSpy.mockResolvedValue(hierarchyNodeModelListResult);

        const findLeafNodesByTagSpy = jest.spyOn(getHierarchyClient(), 'findLeafNodesByTag');
        const uInt32ListResult = new UInt32ListResult({ results: [788945, 788946, 788947], totalResults: 1 });
        findLeafNodesByTagSpy.mockResolvedValue(uInt32ListResult);

        const tagInformation = await selectionHandler.setSelectionBasedOnE3dTagNo(e3dTagNo);
        const secondCallTagInformation = await selectionHandler.setSelectionBasedOnE3dTagNo(e3dTagNo);

        expect(findNodesByTagListSpy).toBeCalledTimes(1);
        expect(findLeafNodesByTagSpy).toBeCalledTimes(1);
        expect(tagInformation).toStrictEqual({
            e3dTagNo,
            referenceNo: hierarchyNodeModelListResult.results[0].pdmsData.RefNo,
            ...hierarchyNodeModelListResult.results[0]
        });
        expect(secondCallTagInformation).toStrictEqual({
            e3dTagNo,
            referenceNo: hierarchyNodeModelListResult.results[0].pdmsData.RefNo,
            ...hierarchyNodeModelListResult.results[0]
        });
    });

    test('Set selection based on e3d tag, but tag is not in the model. Should return undefined', async () => {
        const e3dTagNo = '73-MA50';
        const selectionHandler = new Echo3dSelectionHandler(
            { id: 123, revisionId: 456 } as Cognite3DModel,
            'hierarchyId'
        );

        const findNodesByTagListSpy = jest.spyOn(getHierarchyClient(), 'findNodesByTagList');
        const hierarchyNodeModelListResult = new HierarchyNodeModelListResult({
            results: [],
            totalResults: 0
        });
        findNodesByTagListSpy.mockResolvedValue(hierarchyNodeModelListResult);

        const findLeafNodesByTagSpy = jest.spyOn(getHierarchyClient(), 'findLeafNodesByTag');

        const tagInformation = await selectionHandler.setSelectionBasedOnE3dTagNo(e3dTagNo);

        expect(tagInformation).toBeUndefined();
        expect(findNodesByTagListSpy).toBeCalledTimes(1);
        expect(findLeafNodesByTagSpy).toBeCalledTimes(0);
    });
});

describe('Echo3dSelectionHandler - Selection by tree index', () => {
    beforeAll(() => {
        initializeHierarchyClient('baseurl', jest.fn().mockResolvedValue('accessToken'));
    });

    test('Set selection by tree index', async () => {
        const selectionHandler = new Echo3dSelectionHandler(
            { id: 123, revisionId: 456 } as Cognite3DModel,
            'hierarchyId'
        );

        const getTagNodeByNodeIdSpy = jest.spyOn(getHierarchyClient(), 'getTagNodeByNodeId');
        const getTagNodeByNodeIdListResult = new HierarchyNodeModel({
            aabb: new AabbModel({
                min: new Vector3Model({ x: 83, y: 277, z: 41 }),
                max: new Vector3Model({ x: 92, y: 282, z: 56 })
            }),
            childrenIds: [114372, 114374, 114378],
            discipline: 'MECH',
            id: 114371,
            name: '/73-MA50',
            parentId: 114370,
            fullPath: ['/HC-MECH', '/HC-MECH-MATERIALHANDLING', '/73-MA50'],
            topNodeId: 113387,
            refNoDb: 16807,
            refNoSequence: 7553,
            tag: '73-MA50',
            pdmsData: {
                Description: 'DIESEL POWERED CRANE',
                Discipline: 'MECH',
                Inst: 'HUA',
                Orientation: 'Y is N and Z is U',
                PreOwnType: 'EQUI',
                RefNo: '=16807/7553',
                Tag: '73-MA50',
                Type: 'EQUI'
            }
        });
        getTagNodeByNodeIdSpy.mockResolvedValue(getTagNodeByNodeIdListResult);

        const getNodeByNodeIdSpy = jest.spyOn(getHierarchyClient(), 'getNodeByNodeId');
        const getNodeByNodeIdListResult = new HierarchyNodeModel({
            aabb: new AabbModel({
                min: new Vector3Model({ x: 88, y: 277, z: 41 }),
                max: new Vector3Model({ x: 91, y: 281, z: 42 })
            }),
            childrenIds: [],
            discipline: 'MECH',
            id: 114498,
            name: 'CYLINDER 1 of SUBEQUIPMENT 61 of EQUIPMENT /73-MA50',
            parentId: 114492,
            fullPath: [
                '/HC-MECH',
                '/HC-MECH-MATERIALHANDLING',
                '/73-MA50',
                'SUBEQUIPMENT 61 of EQUIPMENT /73-MA50',
                'CYLINDER 1 of SUBEQUIPMENT 61 of EQUIPMENT /73-MA50'
            ],
            topNodeId: 113387,
            refNoDb: 16807,
            refNoSequence: 7555,
            tag: undefined,
            pdmsData: {
                Discipline: 'MECH',
                Inst: 'HUA',
                LevelFrom: '2',
                LevelTo: '10',
                OBST: '2',
                Orientation: 'Y is N and Z is U',
                PreOwnType: 'SUBE',
                RefNo: '=16807/7555',
                Type: 'CYLI'
            }
        });
        getNodeByNodeIdSpy.mockResolvedValue(getNodeByNodeIdListResult);

        const findLeafNodesByTagSpy = jest.spyOn(getHierarchyClient(), 'findLeafNodesByTag');
        const uInt32ListResult = new UInt32ListResult({ results: [788945, 788946, 788947], totalResults: 1 });
        findLeafNodesByTagSpy.mockResolvedValue(uInt32ListResult);

        const tagInformation = await selectionHandler.setSelectionBasedOnTreeIndex(114498);

        expect(tagInformation).toStrictEqual({
            e3dTagNo: getTagNodeByNodeIdListResult.tag,
            point: undefined,
            referenceNo: getNodeByNodeIdListResult.pdmsData.RefNo,
            ...getNodeByNodeIdListResult
        });
    });

    test('Unset selection by tree index', async () => {
        const selectionHandler = new Echo3dSelectionHandler(
            { id: 123, revisionId: 456 } as Cognite3DModel,
            'hierarchyId'
        );

        const getTagNodeByNodeIdSpy = jest.spyOn(getHierarchyClient(), 'getTagNodeByNodeId');
        const getTagNodeByNodeIdListResult = new HierarchyNodeModel({
            aabb: new AabbModel({
                min: new Vector3Model({ x: 83, y: 277, z: 41 }),
                max: new Vector3Model({ x: 92, y: 282, z: 56 })
            }),
            childrenIds: [114372, 114374, 114378],
            discipline: 'MECH',
            id: 114371,
            name: '/73-MA50',
            parentId: 114370,
            fullPath: ['/HC-MECH', '/HC-MECH-MATERIALHANDLING', '/73-MA50'],
            topNodeId: 113387,
            refNoDb: 16807,
            refNoSequence: 7553,
            tag: '73-MA50',
            pdmsData: {
                Description: 'DIESEL POWERED CRANE',
                Discipline: 'MECH',
                Inst: 'HUA',
                Orientation: 'Y is N and Z is U',
                PreOwnType: 'EQUI',
                RefNo: '=16807/7553',
                Tag: '73-MA50',
                Type: 'EQUI'
            }
        });
        getTagNodeByNodeIdSpy.mockResolvedValue(getTagNodeByNodeIdListResult);

        const getNodeByNodeIdSpy = jest.spyOn(getHierarchyClient(), 'getNodeByNodeId');
        const getNodeByNodeIdListResult = new HierarchyNodeModel({
            aabb: new AabbModel({
                min: new Vector3Model({ x: 88, y: 277, z: 41 }),
                max: new Vector3Model({ x: 91, y: 281, z: 42 })
            }),
            childrenIds: [],
            discipline: 'MECH',
            id: 114498,
            name: 'CYLINDER 1 of SUBEQUIPMENT 61 of EQUIPMENT /73-MA50',
            parentId: 114492,
            fullPath: [
                '/HC-MECH',
                '/HC-MECH-MATERIALHANDLING',
                '/73-MA50',
                'SUBEQUIPMENT 61 of EQUIPMENT /73-MA50',
                'CYLINDER 1 of SUBEQUIPMENT 61 of EQUIPMENT /73-MA50'
            ],
            topNodeId: 113387,
            refNoDb: 16807,
            refNoSequence: 7555,
            tag: undefined,
            pdmsData: {
                Discipline: 'MECH',
                Inst: 'HUA',
                LevelFrom: '2',
                LevelTo: '10',
                OBST: '2',
                Orientation: 'Y is N and Z is U',
                PreOwnType: 'SUBE',
                RefNo: '=16807/7555',
                Type: 'CYLI'
            }
        });
        getNodeByNodeIdSpy.mockResolvedValue(getNodeByNodeIdListResult);

        const findLeafNodesByTagSpy = jest.spyOn(getHierarchyClient(), 'findLeafNodesByTag');
        const uInt32ListResult = new UInt32ListResult({ results: [788945, 788946, 788947], totalResults: 1 });
        findLeafNodesByTagSpy.mockResolvedValue(uInt32ListResult);

        const tagInformationFirst = await selectionHandler.setSelectionBasedOnTreeIndex(114498);
        const tagInformationSecond = await selectionHandler.setSelectionBasedOnTreeIndex(114498);

        expect(tagInformationFirst).toStrictEqual({
            e3dTagNo: getTagNodeByNodeIdListResult.tag,
            referenceNo: getNodeByNodeIdListResult.pdmsData.RefNo,
            point: undefined,
            ...getNodeByNodeIdListResult
        });
        expect(tagInformationSecond).toBeUndefined();
    });
});

describe('Echo3dSelectionHandler - move to selection', () => {
    beforeAll(() => {
        initializeHierarchyClient('baseurl', jest.fn().mockResolvedValue('accessToken'));
    });

    test('Move camera to selection', async () => {
        const selectionHandler = new Echo3dSelectionHandler(
            { id: 123, revisionId: 456 } as Cognite3DModel,
            'hierarchyId'
        );

        const getTagNodeByNodeIdSpy = jest.spyOn(getHierarchyClient(), 'getTagNodeByNodeId');
        const getTagNodeByNodeIdListResult = new HierarchyNodeModel({
            aabb: new AabbModel({
                min: new Vector3Model({ x: 83, y: 277, z: 41 }),
                max: new Vector3Model({ x: 92, y: 282, z: 56 })
            }),
            childrenIds: [114372, 114374, 114378],
            discipline: 'MECH',
            id: 114371,
            name: '/73-MA50',
            parentId: 114370,
            fullPath: ['/HC-MECH', '/HC-MECH-MATERIALHANDLING', '/73-MA50'],
            topNodeId: 113387,
            refNoDb: 16807,
            refNoSequence: 7553,
            tag: '73-MA50',
            pdmsData: {
                Description: 'DIESEL POWERED CRANE',
                Discipline: 'MECH',
                Inst: 'HUA',
                Orientation: 'Y is N and Z is U',
                PreOwnType: 'EQUI',
                RefNo: '=16807/7553',
                Tag: '73-MA50',
                Type: 'EQUI'
            }
        });
        getTagNodeByNodeIdSpy.mockResolvedValue(getTagNodeByNodeIdListResult);

        const getNodeByNodeIdSpy = jest.spyOn(getHierarchyClient(), 'getNodeByNodeId');
        const getNodeByNodeIdListResult = new HierarchyNodeModel({
            aabb: new AabbModel({
                min: new Vector3Model({ x: 88, y: 277, z: 41 }),
                max: new Vector3Model({ x: 91, y: 281, z: 42 })
            }),
            childrenIds: [],
            discipline: 'MECH',
            id: 114498,
            name: 'CYLINDER 1 of SUBEQUIPMENT 61 of EQUIPMENT /73-MA50',
            parentId: 114492,
            fullPath: [
                '/HC-MECH',
                '/HC-MECH-MATERIALHANDLING',
                '/73-MA50',
                'SUBEQUIPMENT 61 of EQUIPMENT /73-MA50',
                'CYLINDER 1 of SUBEQUIPMENT 61 of EQUIPMENT /73-MA50'
            ],
            topNodeId: 113387,
            refNoDb: 16807,
            refNoSequence: 7555,
            tag: undefined,
            pdmsData: {
                Discipline: 'MECH',
                Inst: 'HUA',
                LevelFrom: '2',
                LevelTo: '10',
                OBST: '2',
                Orientation: 'Y is N and Z is U',
                PreOwnType: 'SUBE',
                RefNo: '=16807/7555',
                Type: 'CYLI'
            }
        });
        getNodeByNodeIdSpy.mockResolvedValue(getNodeByNodeIdListResult);

        const findLeafNodesByTagSpy = jest.spyOn(getHierarchyClient(), 'findLeafNodesByTag');
        const uInt32ListResult = new UInt32ListResult({ results: [788945, 788946, 788947], totalResults: 1 });
        findLeafNodesByTagSpy.mockResolvedValue(uInt32ListResult);

        await selectionHandler.setSelectionBasedOnTreeIndex(114498);

        const camera = new THREE.PerspectiveCamera();
        const positionBefore = new THREE.Vector3();
        positionBefore.copy(camera.position);
        const newWorldCoordinates = selectionHandler.moveToLookAtSelection(camera);
        const positionAfter = new THREE.Vector3();
        positionAfter.copy(camera.position);

        expect(positionBefore).not.toEqual(positionAfter);
        expect(newWorldCoordinates).toBeDefined();
    });

    test('No selection so camera should not move', () => {
        const selectionHandler = new Echo3dSelectionHandler(
            { id: 123, revisionId: 456 } as Cognite3DModel,
            'hierarchyId'
        );

        const camera = new THREE.PerspectiveCamera();
        const positionBefore = new THREE.Vector3();
        positionBefore.copy(camera.position);
        const newWorldCoordinates = selectionHandler.moveToLookAtSelection(camera);
        const positionAfter = new THREE.Vector3();
        positionAfter.copy(camera.position);

        expect(positionBefore).toEqual(positionAfter);
        expect(newWorldCoordinates).toBeUndefined();
    });
});

describe('Echo3dSelectionHandler - set color selection', () => {
    test('set default selection colors', () => {
        const assignStyledNodeCollection = jest.fn();
        const selectionHandler = new Echo3dSelectionHandler(
            { id: 123, revisionId: 456, assignStyledNodeCollection } as unknown as Cognite3DModel,
            'hierarchyId'
        );

        selectionHandler.setSelectedColor();
        selectionHandler.setHighlightedColor();
        expect(assignStyledNodeCollection).toBeCalledWith(expect.anything(), {
            color: [0, 0, 255] as [number, number, number],
            visible: true,
            renderInFront: true,
            renderGhosted: false,
            outlineColor: 4
        });

        expect(assignStyledNodeCollection).toBeCalledWith(expect.anything(), {
            color: [61, 138, 255] as [number, number, number],
            outlineColor: 4,
            renderGhosted: false,
            renderInFront: true,
            visible: true
        });
    });

    test('set self provided selection colors', () => {
        const assignStyledNodeCollection = jest.fn();
        const selectionHandler = new Echo3dSelectionHandler(
            { id: 123, revisionId: 456, assignStyledNodeCollection } as unknown as Cognite3DModel,
            'hierarchyId'
        );
        const selectionNodeAppearance = {
            color: [100, 100, 100] as [number, number, number],
            outlineColor: 9
        };
        selectionHandler.setSelectedColor(selectionNodeAppearance);

        expect(assignStyledNodeCollection).toBeCalledWith(expect.anything(), selectionNodeAppearance);
    });
});

describe('Echo3dSelectionHandler - update Node appearance', () => {
    const testOptions: Array<[string, object]> = [
        ['Hidden', { visible: false }],
        ['Ghosted', { renderGhosted: true, visible: true }],
        ['Outlined', { outlineColor: 1, visible: true }],
        ['InFront', { renderInFront: true, visible: true }],
        ['Default', { color: [0, 0, 0], outlineColor: 0, renderGhosted: false, renderInFront: false, visible: true }]
    ];

    test.each(testOptions)('Apply %p default node appearance', (option, result) => {
        const setDefaultNodeAppearance = jest.fn();
        const selectionHandler = new Echo3dSelectionHandler(
            { id: 123, revisionId: 456, setDefaultNodeAppearance } as unknown as Cognite3DModel,
            'hierarchyId'
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- needed for testing
        selectionHandler.setHideMode(option as any);

        expect(setDefaultNodeAppearance).toBeCalledWith(result);
    });

    test('expect invalid style mode to throw error', () => {
        const setDefaultNodeAppearance = jest.fn();
        const selectionHandler = new Echo3dSelectionHandler(
            { id: 123, revisionId: 456, setDefaultNodeAppearance } as unknown as Cognite3DModel,
            'hierarchyId'
        );

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- needed for testing
        expect(() => selectionHandler.setHideMode('INVALID' as any)).toThrowError(`Unexpected object: INVALID`);
    });
});
