import { ApiException, HierarchyClient, HierarchyNodeModel } from '../../services/generated/EchoHierarchyApiClient';
import {
    disposeHierarchyClient,
    getHierarchyClient,
    getTagNoRefNoAndAabbByNodeId,
    initializeHierarchyClient
} from '../../services/hierarchyClient';

describe('HierarchyClient', () => {
    afterEach(() => {
        disposeHierarchyClient();
    });

    test('should successfully return the hierarchy api client', () => {
        initializeHierarchyClient('baseUrl', jest.fn());

        const hierarchyClient = getHierarchyClient();

        expect(hierarchyClient instanceof HierarchyClient).toBeTruthy();
    });

    test('should throw error when trying to use hierarchy client without initializing it first', () => {
        expect(() => getHierarchyClient()).toThrow();
    });

    test('should throw error when trying to use hierarchy client after its disposed of', () => {
        initializeHierarchyClient('baseUrl', jest.fn());

        const hierarchyClient = getHierarchyClient();
        expect(hierarchyClient instanceof HierarchyClient).toBeTruthy();

        disposeHierarchyClient();

        expect(() => getHierarchyClient()).toThrow();
    });

    test('should successfully call getTagNoRefNoAndAabbByNodeId hierarchy client method when', async () => {
        initializeHierarchyClient('baseUrl', jest.fn());

        const hierarchyClient = getHierarchyClient();
        const getTagNodeByNodeIdSpy = jest.spyOn(hierarchyClient, 'getTagNodeByNodeId').mockResolvedValue({
            id: 123,
            name: 'name',
            fullPath: [],
            topNodeId: 345,
            pdmsData: {},
            childrenIds: []
        } as unknown as HierarchyNodeModel);
        const getNodeByNodeIdSpy = jest.spyOn(hierarchyClient, 'getNodeByNodeId').mockResolvedValue({
            id: 123,
            name: 'name',
            fullPath: [],
            topNodeId: 345,
            pdmsData: {},
            childrenIds: []
        } as unknown as HierarchyNodeModel);

        await getTagNoRefNoAndAabbByNodeId(123, 'hierarchyId');

        expect(getTagNodeByNodeIdSpy).toHaveBeenCalled();
        expect(getNodeByNodeIdSpy).toHaveBeenCalled();
    });

    test('should throw error when getTagNoRefNoAndAabbByNodeId is called', async () => {
        initializeHierarchyClient('baseUrl', jest.fn());

        const hierarchyClient = getHierarchyClient();

        jest.spyOn(hierarchyClient, 'getTagNodeByNodeId').mockResolvedValue({
            id: 123,
            name: 'name',
            fullPath: [],
            topNodeId: 345,
            pdmsData: {},
            childrenIds: []
        } as unknown as HierarchyNodeModel);
        jest.spyOn(hierarchyClient, 'getNodeByNodeId').mockRejectedValue(new Error('Internal getNodeByNodeId'));
        await expect(getTagNoRefNoAndAabbByNodeId(123, 'hierarchyId')).rejects.toThrow();
    });

    test('should return undefined when getTagNoRefNoAndAabbByNodeId is called and information cannot be found', async () => {
        initializeHierarchyClient('baseUrl', jest.fn());

        const hierarchyClient = getHierarchyClient();
        jest.spyOn(hierarchyClient, 'getTagNodeByNodeId').mockResolvedValue({
            id: 123,
            name: 'name',
            fullPath: [],
            topNodeId: 345,
            pdmsData: {},
            childrenIds: []
        } as unknown as HierarchyNodeModel);
        jest.spyOn(hierarchyClient, 'getNodeByNodeId').mockRejectedValue(
            new ApiException('Not Found', 404, 'response', {}, {})
        );
        const {
            e3dTagNo: pdmsTagNo,
            referenceNo,
            tagNodeAabb
        } = await getTagNoRefNoAndAabbByNodeId(123, 'hierarchyId');

        expect(pdmsTagNo).toBeUndefined();
        expect(referenceNo).toBeUndefined();
        expect(tagNodeAabb).toBeUndefined();
    });
});
