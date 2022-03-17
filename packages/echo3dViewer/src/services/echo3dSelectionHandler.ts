import {
    Cognite3DModel,
    DefaultNodeAppearance,
    IndexSet,
    NodeAppearance,
    THREE,
    TreeIndexNodeCollection
} from '@cognite/reveal';
import { CancelToken } from '@esfx/async-canceltoken';
import { SelectedNodeInformation } from '../types/selectedNodeInformation';
import { assertNever } from '../utils/assertNeverHelper';
import { moveToAndLookAt } from '../utils/cameraUtils';
import { convertCancelTokenToAbort } from '../utils/cancelTokenUtils';
import { isIntentionallyCancelled } from '../utils/errorHandingUtils';
import { getHierarchyClient, getTagNoRefNoAndAabbByNodeId } from './hierarchyClient';

const defaultSelectedStyle: NodeAppearance = {
    color: [0, 0, 255] as [number, number, number],
    visible: true,
    renderInFront: true,
    renderGhosted: false,
    outlineColor: 4
};

const defaultHighlightedStyle: NodeAppearance = {
    color: [61, 138, 255] as [number, number, number],
    outlineColor: 4,
    renderGhosted: false,
    renderInFront: true,
    visible: true
};

/**
 * Helper to handle selection of a tag og treeIndex by click or tag
 * Automatically fetches relevant information about a tag or a treeIndex and its hierarchy
 */
export class Echo3dSelectionHandler {
    private singleOngoingSelectionCancelTokenSource = CancelToken.source();

    private model: Cognite3DModel;

    private hierarchyId: string;

    private selectedTagInformation: SelectedNodeInformation | undefined;

    private selectedNodes: TreeIndexNodeCollection;

    private siblingNodes: TreeIndexNodeCollection;

    /**
     * Setup a Echo3dSelectionHandler.
     *
     * @param {Cognite3DModel} model the model to apply the selection to
     * @param {string} hierarchyId the hierarchy to find information in
     */
    constructor(model: Cognite3DModel, hierarchyId: string) {
        this.model = model;
        this.siblingNodes = new TreeIndexNodeCollection();
        this.selectedNodes = new TreeIndexNodeCollection();
        this.hierarchyId = hierarchyId;
    }

    /**
     * Get selected tag information if a selection is applied
     *
     * @returns {SelectedNodeInformation | undefined} the selected tag information if any
     */
    getSelectedTagInformation = (): SelectedNodeInformation | undefined => {
        return this.selectedTagInformation;
    };

    /**
     * Clear the current selected tag information, selected nodes and sibling nodes
     */
    clearSelection(): void {
        this.selectedNodes.clear();
        this.siblingNodes.clear();
        this.selectedTagInformation = undefined;
        Echo3dSelectionHandler.emitEvent('selectedTagInformationUpdated');
    }

    /**
     * Apply a style to the "Selected" node
     *
     * @param {NodeAppearance} selectedStyle the style to apply. Default is dark blue
     */
    setSelectedColor(selectedStyle: NodeAppearance = defaultSelectedStyle): void {
        this.model.assignStyledNodeCollection(this.selectedNodes, selectedStyle);
    }

    /**
     * Set style for children/sibling nodes
     *
     * @param {NodeAppearance} highlightedStyle the style to apply. Default is light blue
     */
    setHighlightedColor(highlightedStyle: NodeAppearance = defaultHighlightedStyle): void {
        this.model.assignStyledNodeCollection(this.siblingNodes, highlightedStyle);
    }

    /**
     * Move the given Camera to the selected node based on its BoundingBox model
     * If no selection is applied then the camera will not be moved
     *
     * @param {THREE.PerspectiveCamera} camera the camera that should be moved
     * @returns {THREE.Vector3 | undefined} the new world position of the camera, or undefined if camera is not moved
     */
    moveToLookAtSelection(camera: THREE.PerspectiveCamera): THREE.Vector3 | undefined {
        if (this.selectedTagInformation && this.selectedTagInformation.aabb) {
            return moveToAndLookAt(camera, this.selectedTagInformation.aabb);
        }
    }

    /**
     * Apply a selection for a given E3D tag,
     * if E3D has no connection to the model, no selection will applied
     *
     * Code is simplified to only care about the first node,
     * should probably be updated to care about all of them in some way
     * TODO: bug: 58515: https://dev.azure.com/EquinorASA/DT%20%E2%80%93%20Digital%20Twin/_workitems/edit/58515
     *
     * @param {string} e3dTagNo the E3D tag for the selection
     * @param {CancelToken} cancellationToken the cancel token to cancel the api calls that is done when preforming a selection
     * @returns {Promise<SelectedNodeInformation | undefined>} the information about the selection applied, and undefined if no selection could be preformed
     */
    async setSelectionBasedOnE3dTagNo(
        e3dTagNo: string,
        cancellationToken: CancelToken = CancelToken.none
    ): Promise<SelectedNodeInformation | undefined> {
        try {
            const localCancellationToken = this.cancelOngoingSelections(cancellationToken);

            // no need to preform the same api calls twice
            if (this.selectedTagInformation && this.selectedTagInformation.e3dTagNo === e3dTagNo) {
                return this.selectedTagInformation;
            }

            this.clearSelection();

            // Code is simplified to only care about the first node,
            // should probably be updated to care about all of them in some way
            // TODO: bug: 58515: https://dev.azure.com/EquinorASA/DT%20%E2%80%93%20Digital%20Twin/_workitems/edit/58515
            const nodesByTagList = await getHierarchyClient().findNodesByTagList(
                this.hierarchyId,
                [e3dTagNo],
                convertCancelTokenToAbort(localCancellationToken)
            );

            if (nodesByTagList.results && nodesByTagList.results.length > 0) {
                const nodeFromTag = nodesByTagList.results[0];

                if (nodeFromTag.id) this.selectedNodes.updateSet(new IndexSet([nodeFromTag.id]));

                const leafNodes = await getHierarchyClient().findLeafNodesByTag(
                    this.hierarchyId,
                    e3dTagNo,
                    convertCancelTokenToAbort(localCancellationToken)
                );

                if (leafNodes) this.siblingNodes.updateSet(new IndexSet(leafNodes.results));

                this.selectedTagInformation = {
                    e3dTagNo,
                    referenceNo: nodeFromTag.pdmsData ? nodeFromTag.pdmsData.RefNo : undefined,
                    ...nodeFromTag
                };

                Echo3dSelectionHandler.emitEvent('selectedTagInformationUpdated');

                return this.selectedTagInformation;
            }

            this.selectedTagInformation = undefined;
            Echo3dSelectionHandler.emitEvent('selectedTagInformationUpdated');
            return this.selectedTagInformation;
        } catch (error: unknown) {
            if (isIntentionallyCancelled(error) && !cancellationToken.signaled) {
                // Ignore internally cancelled error, but not when its cancelled from the outside
            } else throw error;
        }
    }

    /**
     * Send a message to all listeners about events occurring in the selection handler
     *
     * @template T generic type definition of the information to pass to the event listeners
     * @param {string} key the key used to identify the event triggered
     * @param {T} payload the information passed to the listeners, if any
     */
    private static emitEvent<T>(key: string, payload?: T): void {
        const event = new CustomEvent(key, { detail: payload });
        window.dispatchEvent(event);
    }

    /**
     * Prepare for new selection, by cancelling all other selections, and resetting selection.
     *
     * @param {CancelToken} cancelToken Optional CancelToken to extend
     * @returns {CancelToken} The cancel token to use
     */
    private cancelOngoingSelections(cancelToken: CancelToken = CancelToken.none): CancelToken {
        // Ensure we only have one selection operation ongoing
        this.singleOngoingSelectionCancelTokenSource.cancel();
        const scopedSelectionCancelSource = CancelToken.source();
        cancelToken.subscribe(() => scopedSelectionCancelSource.cancel());
        this.singleOngoingSelectionCancelTokenSource = scopedSelectionCancelSource;
        return scopedSelectionCancelSource.token;
    }

    /**
     * Applies a selection for a given treeIndex,
     * if treeIndex has no connection to the model, no selection will applied
     * If the previous selected node is the passed in treeIndex, the selection will be removed
     *
     * @param {number} treeIndex the pdms tag for the selection
     * @param {THREE.Vector3} point optional parameter used to indicate the point of the treeIndex
     * @param {CancelToken} cancellationToken the cancel token to cancel the api calls that is done when preforming a selection
     * @returns {Promise<SelectedNodeInformation | undefined>} the information about the selection applied, and undefined if no selection could be preformed
     */
    async setSelectionBasedOnTreeIndex(
        treeIndex: number,
        point?: THREE.Vector3,
        cancellationToken: CancelToken = CancelToken.none
    ): Promise<SelectedNodeInformation | undefined> {
        try {
            const localCancellationToken = this.cancelOngoingSelections(cancellationToken);

            if (this.selectedNodes.getIndexSet().contains(treeIndex)) {
                this.clearSelection();
                return;
            }

            // Highlight "clicked" Part
            this.selectedNodes.updateSet(new IndexSet([treeIndex]));
            // Reset hierarchy nodes for new selection
            this.siblingNodes.updateSet(new IndexSet());
            Echo3dSelectionHandler.emitEvent('selectionStarted', { point, treeIndex });

            const selectedTagInformation = await getTagNoRefNoAndAabbByNodeId(
                treeIndex,
                this.hierarchyId,
                localCancellationToken
            );

            if (selectedTagInformation.e3dTagNo) {
                const leafNodeTreeIndexes = await getHierarchyClient().findLeafNodesByTag(
                    this.hierarchyId,
                    selectedTagInformation.e3dTagNo,
                    convertCancelTokenToAbort(localCancellationToken)
                );

                this.siblingNodes.updateSet(
                    new IndexSet(leafNodeTreeIndexes.results?.filter((index) => index !== treeIndex))
                );
            }

            this.selectedTagInformation = { ...selectedTagInformation, point };
            Echo3dSelectionHandler.emitEvent('selectedTagInformationUpdated');
            return this.selectedTagInformation;
        } catch (ex: unknown) {
            if (isIntentionallyCancelled(ex) && !cancellationToken.signaled) {
                // Ignore internally cancelled error, but not when its cancelled from the outside
            } else throw ex;
        }
    }

    /**
     * Apply a predefined node style to the selection
     *
     * @param {'Hidden' | 'Ghosted' | 'Outlined' | 'InFront' | 'Default'} styleMode the style modes to choose from
     */
    setHideMode(styleMode: 'Hidden' | 'Ghosted' | 'Outlined' | 'InFront' | 'Default'): void {
        switch (styleMode) {
            case 'Hidden':
                this.model.setDefaultNodeAppearance(DefaultNodeAppearance.Hidden);
                break;
            case 'Ghosted':
                this.model.setDefaultNodeAppearance(DefaultNodeAppearance.Ghosted);
                break;
            case 'Outlined':
                this.model.setDefaultNodeAppearance(DefaultNodeAppearance.Outlined);
                break;
            case 'InFront':
                this.model.setDefaultNodeAppearance(DefaultNodeAppearance.InFront);
                break;
            case 'Default':
                this.model.setDefaultNodeAppearance(DefaultNodeAppearance.Default);
                break;
            default:
                assertNever(styleMode); // Will error if new case is not implemented
        }
    }

    /**
     * Get the selection handlers model
     *
     * @returns {Cognite3DModel} the single selection handlers model
     */
    getModel = (): Cognite3DModel => {
        return this.model;
    };
}
