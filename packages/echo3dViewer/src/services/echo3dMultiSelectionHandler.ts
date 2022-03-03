import { Cognite3DModel, IndexSet, THREE } from '@cognite/reveal';
import { CancelToken } from '@esfx/async-canceltoken';
import { moveToAndLookAt } from '../utils/cameraUtils';
import { convertCancelTokenToAbort } from '../utils/cancelTokenUtils';
import { isIntentionallyCancelled } from '../utils/errorHandingUtils';
import { Echo3dBaseSelectionHandler } from './echo3dBaseSelectionHandler';
import {
    AabbModel,
    HierarchyClient,
    HierarchyNodeModel,
    NodeWithLeafNodes,
    Vector3Model
} from './generated/EchoHierarchyApiClient';
import { getHierarchyClient } from './hierarchyClient';

/**
 * Helper to handle multi selection by tags
 * Automatically fetches relevant information about a tags or a treeIndex's and it's hierarchy's
 */
export class Echo3dMultiSelectionHandler extends Echo3dBaseSelectionHandler {
    private hierarchyClient: HierarchyClient;

    private hierarchyId: string;

    protected selectionAaBB: AabbModel | undefined;

    private selectionE3dTagNos: string[];

    /**
     * Setup a Echo3dMultiSelectionHandler.
     *
     * @param {Cognite3DModel} model the model to apply the selection to
     * @param {string} hierarchyId the hierarchy to find information in
     * @param {HierarchyClient} hierarchyClient Echo HierarchyClient for selection in mode meta data
     */
    constructor(model: Cognite3DModel, hierarchyId: string, hierarchyClient?: HierarchyClient) {
        super(model);
        this.hierarchyClient = hierarchyClient || getHierarchyClient();
        this.hierarchyId = hierarchyId;
        this.selectionE3dTagNos = [];
    }

    /**
     * Get the current selection bounding box.
     *
     * @returns {AabbModel | undefined} the  selection bounding box if any
     */
    getSelectionBoundingBox(): AabbModel | undefined {
        return this.selectionAaBB;
    }

    /**
     * Clear the current selection tags information, selected nodes and sibling nodes
     */
    clearSelection(): void {
        this.selectedNodes.clear();
    }

    /**
     * Move the given Camera to the selection based on its BoundingBox model
     * If no selection is applied then the camera will not be moved
     *
     * @param {THREE.PerspectiveCamera} camera the camera that should be moved
     * @returns {THREE.Vector3 | undefined} the new world position of the camera, or undefined if camera is not moved
     */
    moveToLookAtSelection(camera: THREE.PerspectiveCamera): THREE.Vector3 | undefined {
        if (this.selectionAaBB) {
            return moveToAndLookAt(camera, this.selectionAaBB);
        }
    }

    /**
     * @param {string[]} e3dTagNos Tags for selection
     * @param {CancelToken} cancellationToken token for cancellation of selection
     */
    async setSelectionBasedOnE3dTagNos(
        e3dTagNos: string[],
        cancellationToken: CancelToken = CancelToken.none
    ): Promise<void> {
        try {
            const localCancellationToken = this.cancelOngoingSelections(cancellationToken);

            // no need to preform the same api calls twice
            if (this.selectionE3dTagNos.every((e3dTagNo) => e3dTagNos.includes(e3dTagNo)) && this.selectionE3dTagNos.length > 0) {
                return;
            }

            this.clearSelection();

            const nodesByTagList = await this.hierarchyClient.findNodesByTagList(
                this.hierarchyId,
                e3dTagNos,
                convertCancelTokenToAbort(localCancellationToken)
            );

            this.createSelectionAaBB(nodesByTagList.results);

            this.addSelectedNodes(nodesByTagList.results);

            const leafNodes = await this.hierarchyClient.findLeafNodesByTagList(
                this.hierarchyId,
                e3dTagNos,
                convertCancelTokenToAbort(localCancellationToken)
            );

            this.addSelectedLeafNodes(leafNodes.results);
        } catch (error: unknown) {
            if (isIntentionallyCancelled(error) && !cancellationToken.signaled) {
                // Ignore internally cancelled error, but not when its cancelled from the outside
            } else throw error;
        }
    }

    /**
     * Creates a AaBB bounding box according to hierarchyNodeModels selection
     *
     * @param {HierarchyNodeModel[]} [hierarchyNodeModel] HierarchyNodeModels for retrieving the selected aabbModels.
     * @memberof Echo3dSelectionHandler
     */
    private createSelectionAaBB(hierarchyNodeModel?: HierarchyNodeModel[]): void {
        const aabbCollection: AabbModel[] = [];
        let newAabb: AabbModel | undefined;

        if (hierarchyNodeModel) {
            hierarchyNodeModel.forEach((modelResult) => {
                if (modelResult.aabb) {
                    aabbCollection.push(modelResult.aabb);
                }
            });
        }

        aabbCollection.forEach((aabbModel) => {
            if (!newAabb) {
                newAabb = aabbModel;
            }
            if (newAabb) {
                newAabb.min = new Vector3Model({
                    x: Math.min(newAabb.min.x, aabbModel.min.x),
                    y: Math.min(newAabb.min.y, aabbModel.min.y),
                    z: Math.min(newAabb.min.z, aabbModel.min.z)
                });
                newAabb.max = new Vector3Model({
                    x: Math.max(newAabb.max.x, aabbModel.max.x),
                    y: Math.max(newAabb.max.y, aabbModel.max.y),
                    z: Math.max(newAabb.max.z, aabbModel.max.z)
                });
            }
        });

        this.selectionAaBB = newAabb || new AabbModel();
    }

    /**
     * adds the selected Leaf Nodes to selection
     *
     * @private
     * @param {NodeWithLeafNodes[]} [nodeWithLeafNodes] Nods with leaf nodes for extracting leafNode id's.
     * @memberof Echo3dSelectionHandler
     */
    private addSelectedLeafNodes(nodeWithLeafNodes?: NodeWithLeafNodes[]): void {
        const selectionNodeIds: number[] = [];

        if (nodeWithLeafNodes) {
            nodeWithLeafNodes?.forEach((LeafNodeResult) => {
                LeafNodeResult.leafNodes?.forEach((leafNode) => {
                    if (leafNode.id) {
                        selectionNodeIds.push(leafNode.id);
                    }
                });
            });
        }

        this.selectedNodes.updateSet(new IndexSet(selectionNodeIds));
    }

    /**
     * adds the selected Nodes to selection
     *
     * @private
     * @param {HierarchyNodeModel[]} [hierarchyNodeModel] Nodes for collecting id's
     * @memberof Echo3dSelectionHandler
     */
    private addSelectedNodes(hierarchyNodeModel?: HierarchyNodeModel[]): void {
        if (hierarchyNodeModel) {
            this.selectedNodes.updateSet(new IndexSet(hierarchyNodeModel.map((nodeResult) => nodeResult.id)));
        }
    }
}
