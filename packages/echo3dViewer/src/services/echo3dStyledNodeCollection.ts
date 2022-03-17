import { Cognite3DModel, IndexSet, NodeAppearance, TreeIndexNodeCollection } from '@cognite/reveal';
import { CancelToken } from '@esfx/async-canceltoken';
import { convertCancelTokenToAbort } from '../utils/cancelTokenUtils';
import { getHierarchyClient } from './hierarchyClient';

/**
 * Suggestion on how to handle highlight of multiple nodes
 * In progress
 * TODO: needs to be expanded when this feature is added
 */
export class Echo3dStyledNodeCollection {
    private model: Cognite3DModel;

    private hierarchyId: string;

    private highlightedNodes: TreeIndexNodeCollection;

    // private aabbForHighlightedNodes

    /**
     *
     *
     * @param {Cognite3DModel} model the model to preform highlighting on
     * @param {string} hierarchyId the hierarchy id for the model
     */
    constructor(model: Cognite3DModel, hierarchyId: string) {
        this.model = model;
        this.highlightedNodes = new TreeIndexNodeCollection();
        this.hierarchyId = hierarchyId;
    }

    /**
     * Helper method for updating the highlighted nodes style
     * TODO: unsure if partial will work here, might need to do some spread operator stuff
     *
     * @param {Partial<NodeAppearance>} highlightedStyle the style to apply
     */
    setNodeAppearance(highlightedStyle: Partial<NodeAppearance>): void {
        this.model.assignStyledNodeCollection(this.highlightedNodes, highlightedStyle);
    }

    /**
     * Method for adding tree indexes to the highlighted node index set
     * TODO: we need to get all aabb for these treeIndex and maybe other information?
     *
     * @param { number[]} treeIndexes the treeIndexes to add to highlighted nodes
     */
    setByTreeIndexes = (treeIndexes: number[]): void => {
        this.highlightedNodes.updateSet(new IndexSet(treeIndexes));
    };

    /**
     * Highlight a list of Tags
     * Fetch all nodes for the list of tags and add these to the highlighted nodes set.
     * Returns the list of tags that were found. NOTE: Not all tags are found in 3D, so please handle this.
     * TODO: might need to do some stuff to get relevant information for the highlighted set
     *
     * @param {string[]} tags list of tags to highlight
     * @param {CancelToken} cancellationToken token to detect cancellations
     */
    setByTagList = async (tags: string[], cancellationToken: CancelToken = CancelToken.none): Promise<void> => {
        const leafNodeTreeIndexes = await getHierarchyClient().findLeafNodesByTagList(
            this.hierarchyId,
            tags,
            convertCancelTokenToAbort(cancellationToken)
        );
        if (leafNodeTreeIndexes && leafNodeTreeIndexes.results) {
            const leafNodeTreeIndexesTemp = leafNodeTreeIndexes.results.flatMap((x) =>
                x.leafNodes.flatMap((y) => y.id).filter((z) => z !== undefined)
            );
            this.highlightedNodes.updateSet(new IndexSet(leafNodeTreeIndexesTemp));

            // const getAabbForAllTags = await getHierarchyClient().findNodesByTagList(
            //     this.hierarchyId,
            //     tags,
            //     convertCancelTokenToAbort(cancellationToken)
            // );

            // TODO: do some math on getAabbForAllTags
        }
    };
}
