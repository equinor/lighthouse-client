import { BoundingBoxClipper, Cognite3DModel, THREE } from '@cognite/reveal';
import { Echo3dMultiSelectionHandler } from './echo3dMultiSelectionHandler';
import { Echo3dViewer } from './echo3DViewer';

/**
 * Helper to handle actions on a multi selection according to tags / models selected.
 */
export class Echo3dMultiSelectionActions extends Echo3dMultiSelectionHandler {
    private viewer: Echo3dViewer;

    private boundingBox: THREE.Box3 | undefined;

    /**
     * @param {Echo3dViewer} viewer Currently used Echo3dViewer
     * @param {Cognite3DModel} model the model use for selection
     * @param {string} hierarchyId  the hierarchy to find information selection information
     */
    constructor(viewer: Echo3dViewer, model: Cognite3DModel, hierarchyId: string) {
        super(model, hierarchyId);
        this.viewer = viewer;
    }

    /**
     * Clipping 3d model according to the selected models.
     *
     * @param {boolean} isClipped identifier saying model should be clipped or not.
     * @param {number} padding clipping padding
     */
    clipSelection(isClipped: boolean, padding?: number): void {
        this.setBoundingBox(padding);
        if (isClipped && this.boundingBox) {
            const clipper = new BoundingBoxClipper(this.boundingBox);
            this.viewer.setClippingPlanes(clipper.clippingPlanes);
        } else {
            this.viewer.setClippingPlanes([]);
        }
    }

    /**
     *  Create bounding box with padding according to the selected models.
     *
     * @param {number} padding bounding box padding
     */
    setBoundingBox(padding = 1): void {
        if (!this.selectionAaBB) {
            return;
        }
        const { min, max } = this.selectionAaBB;
        this.boundingBox = new THREE.Box3(
            new THREE.Vector3(min.x - padding, min.z - padding, -max.y - padding),
            new THREE.Vector3(max.x + padding, max.z + padding, -min.y + padding)
        );
    }

    /**
     * Fitting the viewers camera to the currently selected bounding box
     *
     * @param {number} fitDuration duration it take so move to this location.
     */
    fitCameraToCurrentBoundingBox(fitDuration = 500): void {
        if (this.boundingBox) this.viewer.fitCameraToBoundingBox(this.boundingBox, fitDuration);
    }
}
