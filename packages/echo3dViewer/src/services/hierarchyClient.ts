import { CancelToken } from '@esfx/async-canceltoken';
import { SelectedNodeInformation } from '../types/selectedNodeInformation';
import { convertCancelTokenToAbort } from '../utils/cancelTokenUtils';
import { customHttp } from './commonClientMethods';
import { ApiException, HierarchyClient } from './generated/EchoHierarchyApiClient';

let hierarchyClient: HierarchyClient | undefined;

/**
 *
 * Method for initializing the hierarchy service client
 *
 * @param {string} apiUrl the api to use for the client
 * @param {() => Promise<string | undefined>} getAccessToken the access token method that the client will use when doing fetch calls
 * @returns {HierarchyClient} the hierarchy service client to use to fetch hierarchy information
 */
export const initializeHierarchyClient = (
    apiUrl: string,
    getAccessToken: () => Promise<string | undefined>
): HierarchyClient => {
    hierarchyClient = new HierarchyClient(apiUrl, customHttp(getAccessToken));

    return hierarchyClient;
};

/**
 * Method that returns a initialized hierarchy service api client
 * Will throw an error if the method initializeHierarchyClient is not called before this one is
 *
 * @returns {HierarchyClient} an already initialized hierarchy service api client if one exists
 */
export const getHierarchyClient = (): HierarchyClient => {
    if (!hierarchyClient) {
        throw new Error('Hierarchy client api is not initialized');
    }

    return hierarchyClient;
};

/**
 * Method that will find the closest pdms tag and node information for a given treeIndex
 *
 * @param {number} treeIndex the treeIndex to get information about
 * @param {hierarchyId} hierarchyId the hierarchy to find this information in
 * @param {CancelToken} cancellationToken an optional cancel token to use to cancel the api calls
 * @returns {SelectedNodeInformation} the information related to a given tree index
 * All values will be undefined if information cannot be found (404)
 */
export const getTagNoRefNoAndAabbByNodeId = async (
    treeIndex: number,
    hierarchyId: string,
    cancellationToken = CancelToken.none
): Promise<SelectedNodeInformation> => {
    try {
        // Gets closest pdms tag to the treeIndex clicked
        const tagNodePromise = getHierarchyClient().getTagNodeByNodeId(
            hierarchyId,
            treeIndex,
            convertCancelTokenToAbort(cancellationToken)
        );

        // Gets node information about the treeIndex clicked
        const nodePromise = getHierarchyClient().getNodeByNodeId(
            hierarchyId,
            treeIndex,
            convertCancelTokenToAbort(cancellationToken)
        );

        const [tagNode, node] = await Promise.all([tagNodePromise, nodePromise]);

        const pdmsTagNo = tagNode ? tagNode.tag : undefined;
        const referenceNo = node?.pdmsData ? node.pdmsData.RefNo : undefined;

        return { e3dTagNo: pdmsTagNo, referenceNo, ...node };
    } catch (error: unknown) {
        if (error instanceof ApiException && error.status === 404) {
            return { e3dTagNo: undefined, referenceNo: undefined, aabb: undefined };
        }
        throw error;
    }
};

/**
 *  Method for disposing an hierarchy service api client
 */
export const disposeHierarchyClient = () => {
    if (hierarchyClient) hierarchyClient = undefined;
};
