import { Cognite3DModel, DefaultNodeAppearance, NodeAppearance, TreeIndexNodeCollection } from '@cognite/reveal';
import { CancelToken } from '@esfx/async-canceltoken';
import { assertNever } from '../utils/assertNeverHelper';

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
const whiteStyle: NodeAppearance = {
    color: [255, 255, 255] as [number, number, number],
    outlineColor: 0,
    renderGhosted: false,
    renderInFront: false,
    visible: true
};

/**
 *
 */
export class Echo3dBaseSelectionHandler {
    private singleOngoingSelectionCancelTokenSource = CancelToken.source();

    private dispatchEvent: (event: Event) => boolean;

    protected model: Cognite3DModel;

    protected selectedNodes: TreeIndexNodeCollection;

    siblingNodes: TreeIndexNodeCollection;

    
    /**
     * Setup
     *
     * @param model
     */
    constructor(model: Cognite3DModel) {
        this.dispatchEvent = window.dispatchEvent;
        this.model = model;
        this.siblingNodes = new TreeIndexNodeCollection();
        this.selectedNodes = new TreeIndexNodeCollection();
   
    }

    /**
     * Get the selection handlers model
     *
     * @returns {Cognite3DModel} the single selection handlers model
     */
    getModel(): Cognite3DModel {
        return this.model;
    }


    /**
     * Apply a style to the "Selected" node
     *
     * @param {NodeAppearance} selectedStyle the style to apply. Default is dark blue
     */
    setSelectedColor(selectedStyle: NodeAppearance = defaultSelectedStyle): void {
        this.model.removeAllStyledNodeCollections();
        this.model.assignStyledNodeCollection(this.selectedNodes, selectedStyle);
    }

    /**
     * Apply a style to the "Selected" node
     *
     * @param {NodeAppearance} selectedStyle the style to apply. Default is dark blue
     */
    setSelectedToDefaultColor(): void {
        this.model.removeAllStyledNodeCollections();
        this.model.assignStyledNodeCollection(this.selectedNodes, DefaultNodeAppearance.Default);
    }

    setWhiteAppearance(): void {
        this.model.setDefaultNodeAppearance(whiteStyle);
    }

    /**
     * Apply a predefined node style to the selection
     *
     * @param {'Hidden' | 'Ghosted' | 'Outlined' | 'InFront' | 'Default'} styleMode the style modes to choose from
     */
    setHideMode(styleMode: 'Hidden' | 'Ghosted' | 'Outlined' | 'InFront' | 'Default' | 'White'): void {
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
            case 'White':
                this.model.setDefaultNodeAppearance(whiteStyle);
                break;
            default:
                assertNever(styleMode); // Will error if new case is not implemented
        }
    }

    /**
     * Send a message to all listeners about events occurring in the selection handler
     *
     * @template T generic type definition of the information to pass to the event listeners
     * @param {string} key the key used to identify the event triggered
     * @param {T} payload the information passed to the listeners, if any
     */
    protected emitEvent<T>(key: string, payload?: T): void {
        const event = new CustomEvent(key, { detail: payload });
        this.dispatchEvent(event);
    }

    /**
     * Prepare for new selection, by cancelling all other selections, and resetting selection.
     *
     * @param {CancelToken} cancelToken Optional CancelToken to extend
     * @returns {CancelToken} The cancel token to use
     */
    protected cancelOngoingSelections(cancelToken: CancelToken = CancelToken.none): CancelToken {
        // Ensure we only have one selection operation ongoing
        this.singleOngoingSelectionCancelTokenSource.cancel();
        const scopedSelectionCancelSource = CancelToken.source();
        cancelToken.subscribe(() => scopedSelectionCancelSource.cancel());
        this.singleOngoingSelectionCancelTokenSource = scopedSelectionCancelSource;
        return scopedSelectionCancelSource.token;
    }
}
