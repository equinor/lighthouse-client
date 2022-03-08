import { Cognite3DModel, Cognite3DViewer, Cognite3DViewerOptions, Intersection, THREE } from '@cognite/reveal';
import { CancelToken } from '@esfx/async-canceltoken';
import { CameraControlsExtended } from '../controls/CameraControlsExtended';
import { FirstPersonCameraControls } from '../controls/FirstPersonCameraControls';
import { TrackEventBySignature } from '../types/trackEventBySignature';
import { isIntentionallyCancelled } from '../utils/errorHandingUtils';
import { isPrimaryClick } from '../utils/pointerUtils';
import { Echo3dSelectionHandler } from './echo3dSelectionHandler';
import { AssetMetadataSimpleDto } from './generated/EchoModelDistributionApiClient';
import { getModelsClient } from './modelsClient';

/**
 *  Echo3d Viewer class that extends cognite 3d viewer class
 *  Contains methods for handling selection of single tree index by pointer events,
 *  and for loading model by model metadata,
 *  and initializing first person camera controls or orbit camera controls
 *
 * @exports
 * @class Echo3dViewer
 * @augments {Cognite3DViewer}
 */
export class Echo3dViewer extends Cognite3DViewer {
    private trackEventBy;

    private selectionByPickingEnabled = false;

    private trackError?: (ex: Error) => void;

    private mouseLastPicketPosition: { offsetX: number; offsetY: number } | undefined;

    private scaling = 1;

    private previousCancellationTokenSource = CancelToken.source();

    // Key is modelId_revision
    private singleSelectionHandler: Map<string, Echo3dSelectionHandler> = new Map<string, Echo3dSelectionHandler>();

    /**
     * Constructor needed for creating a echo3DViewer
     *
     * @param {Cognite3DViewerOptions} options needed for CogniteClient
     * @param {TrackEventBySignature } trackEventBy optional event used to log/track when controls events are fired
     */
    constructor(options: Cognite3DViewerOptions, trackEventBy?: TrackEventBySignature) {
        super(options);
        this.disableKeyboardNavigation();
        this.cameraControlsEnabled = false;
        this.trackEventBy = trackEventBy;
    }

    /**
     * Method that returns the single selection handler for a given model
     * Returns undefined if handler does not exist for a given model
     * Selection Handlers are identified by the key `modelId_revisionId`
     *
     * @param {string | number} modelId the model id for a selection handler
     * @param { string | number} revisionId the revision id for a selection handler
     * @returns {Echo3dSelectionHandler | undefined} the selection handler for the given input or undefined if none exists
     */
    getSingleSelectionHandler = (
        modelId: string | number,
        revisionId: string | number
    ): Echo3dSelectionHandler | undefined => {
        return this.singleSelectionHandler.get(`${modelId}_${revisionId}`);
    };

    /**
     * Method that will remove an existing single selection handler
     *
     * @param {string | number} modelId the model id of the selection handler to remove
     * @param {string | number} revisionId the revision id of the selection handler to remove
     */
    removeSingleSelectionHandler = (modelId: string | number, revisionId: string | number): void => {
        this.singleSelectionHandler.delete(`${modelId}_${revisionId}`);
    };

    /**
     * Method that sets or changes the viewers scaling
     * This will be used to get correct selection on pointer up or pointer down
     *
     * @param {number} newScaling the new selection
     */
    setScaling = (newScaling: number): void => {
        this.scaling = newScaling;
    };

    /**
     * Methods that attaches a track event method to the viewers control
     * Will be called when certain control actions are preformed
     * Keyboard navigation used, mouse navigation used, touch navigation used and pen navigation used
     * Can be used to log to application insights
     *
     * @param {TrackEventBySignature} trackEventBy the method to attach
     */
    setTrackEventByForControls = (trackEventBy: TrackEventBySignature): void => {
        this.trackEventBy = trackEventBy;
    };

    /**
     * Method that keeps track of the pointer down position if event is primary click
     *
     * @param {PointerEvent} event the pointer event preformed
     */
    private handlePointerDown = (event: PointerEvent): void => {
        if (isPrimaryClick(event) && event.offsetX) {
            this.mouseLastPicketPosition = {
                offsetX: event.offsetX,
                offsetY: event.offsetY
            };
        }
    };

    /**
     * Methods that preforms a selection based on the pointer up event
     * Will only do a selection if event is a primary click and action is not a
     * drag event
     *
     * @param {PointerEvent} event the pointer event preformed
     */
    private handlePointerUp = (event: PointerEvent): void => {
        if (isPrimaryClick(event) && this.mouseLastPicketPosition) {
            if (
                event.offsetX >= this.mouseLastPicketPosition.offsetX - 5 &&
                event.offsetX <= this.mouseLastPicketPosition.offsetX + 5 &&
                event.offsetY >= this.mouseLastPicketPosition.offsetY - 5 &&
                event.offsetY <= this.mouseLastPicketPosition.offsetY + 5
            ) {
                this.handleSelection(event);
                this.mouseLastPicketPosition = undefined;
            }
        }
    };

    /**
     * Method that performs a selection based on a pointer event
     * Selection will only be performed if the point intersects with a model that
     * has a selection handler registered
     *
     * @param {PointerEvent} event the pointer event preformed
     */
    private handleSelection = async (event: PointerEvent): Promise<void> => {
        const pickResult: Intersection | null = await this.getIntersectionFromPixel(
            event.offsetX * (1 / this.scaling),
            event.offsetY * (1 / this.scaling)
        );

        // check if null or of PointCloudIntersection type
        if (!pickResult || !('treeIndex' in pickResult)) return;

        const { treeIndex, model, point } = pickResult;
        const { modelId, revisionId } = model;
        const correctSingleSelectionHandler = this.getSingleSelectionHandler(modelId, revisionId);
        if (correctSingleSelectionHandler) {
            try {
                this.previousCancellationTokenSource.cancel();
                const currentSelectionCancelTokenSource = CancelToken.source();
                this.previousCancellationTokenSource = currentSelectionCancelTokenSource;
                await correctSingleSelectionHandler.setSelectionBasedOnTreeIndex(
                    treeIndex,
                    point,
                    currentSelectionCancelTokenSource.token
                );
            } catch (ex) {
                if (isIntentionallyCancelled(ex)) {
                    // Ignore internally cancelled error
                } else if (this.trackError) {
                    this.trackError(ex as Error);
                } else {
                    throw ex;
                }
            }
        }
    };

    /**
     * Methods for registering a selection handler to a model
     * Models id, revision number and hierarchyId id needs to be sett if not this method will throw an error
     *
     * @param {Cognite3DModel} model the model to attach the selection handler to
     * @param { Partial<AssetMetadataSimpleDto>} modelMetadata the metadata of the model
     */
    registererSelectionHandler = (model: Cognite3DModel, modelMetadata: Partial<AssetMetadataSimpleDto>): void => {
        if (!modelMetadata.id || !modelMetadata.revisionNumber || !modelMetadata.hierarchyId)
            throw Error('Model id, model revision and hierarchy id are required values to register selection handler');

        this.singleSelectionHandler.set(
            `${modelMetadata.id}_${modelMetadata.revisionNumber}`,
            new Echo3dSelectionHandler(model, modelMetadata.hierarchyId)
        );
    };

    /**
     * Method for setting a track error method that will get called when
     * an error happens in selection by picking
     *
     * @param {(ex: Error) => void} trackError (optional) track event method. Can also be reset to default undefined
     */
    setTrackErrorOnSelectionByPicking = (trackError?: (ex: Error) => void) => {
        this.trackError = trackError;
    };

    /**
     * Method for enabling selection by pointer
     * This will add selection for all selection handlers registered,
     * and future selection handlers registered
     *
     */
    enableSelectionByPicking = (): void => {
        if (this.selectionByPickingEnabled) return;

        this.domElement.addEventListener('pointerdown', this.handlePointerDown);
        this.domElement.addEventListener('pointerup', this.handlePointerUp);
        this.selectionByPickingEnabled = true;
    };

    /**
     * Method for disposing of event listeners
     */
    disposeAll = (): void => {
        this.disableSelection();
        this.dispose();
    };

    /**
     *  Method for disabling selection
     *  Method removes event listeners attached to the dom element
     */
    disableSelection = () => {
        if (this.domElement) {
            this.domElement.removeEventListener('pointerdown', this.handlePointerDown);
            this.domElement.removeEventListener('pointerup', this.handlePointerUp);
        }
        this.selectionByPickingEnabled = false;
        this.singleSelectionHandler = new Map<string, Echo3dSelectionHandler>();
    };

    /**
     * Load a Model based on a modelMetadata
     *
     * Model distribution api client needs to be initialized before this method is used
     * If the model given is invalid this will throw, and if the current user does not have access it will also throw.
     *
     * @param {Partial<AssetMetadataSimpleDto>} modelMetadata the models metadata to use for loading the model
     * @param {boolean} enableSelectionByPicking flag to control whether selection should be enabled or not, default is not
     * @returns {Promise<Cognite3DModel>} the model loaded
     */
    loadModel = async (
        modelMetadata:
            | AssetMetadataSimpleDto
            | {
                  id: number;
                  revisionNumber?: number;
                  hierarchyId: string;
                  plantCode?: string;
                  platformSectionId?: string;
              },
        enableSelectionByPicking = false
    ): Promise<Cognite3DModel> => {
        if (!modelMetadata.id) throw Error('Model id cannot be empty when loading a model');
        if (enableSelectionByPicking && !modelMetadata.hierarchyId)
            throw Error('Hierarchy id cannot be empty when loading a model and enabling selection');

        let revisionId = modelMetadata.revisionNumber;
        if (!revisionId) {
            const modelById = await getModelsClient().getModelById(modelMetadata.id);

            if (!modelById.assetMetaData)
                throw Error('Unable to load model because models asset metadata cannot be found');

            revisionId = modelById.assetMetaData.revisionNumber;
        }

        // eslint-disable-next-line no-console -- This is essential debug info, and should be reportable by users.
        console.info(
            `Loading model ${modelMetadata.id}. ${modelMetadata.plantCode ?? 'unknown'} ${
                modelMetadata.platformSectionId ?? 'unknown'
            }. Revision ${revisionId}.`
        );

        const model = await this.addCadModel({
            modelId: modelMetadata.id,
            revisionId
        });

        if (enableSelectionByPicking) {
            this.registererSelectionHandler(model, { ...modelMetadata, revisionNumber: revisionId });
            this.enableSelectionByPicking();
        }

        return model;
    };

    /**
     * Method for unloading a model based on its selection handler
     * If no selection handler is assigned for the model, then the model can be unloaded
     * by using this.removeModel with in parameter Cognite3DModel
     *
     * @param {string | number} modelId  the model id of the model to be removed
     * @param {string | number} revisionId the revision id of the model to be removed
     */
    public unloadModelAndSelectionHandler = (modelId: string | number, revisionId: string | number) => {
        const selectionHandler = this.getSingleSelectionHandler(modelId, revisionId);
        if (selectionHandler) {
            selectionHandler.clearSelection();
            const modelToRemove = selectionHandler.getModel();
            this.removeModel(modelToRemove);
            this.removeSingleSelectionHandler(modelId, revisionId);
        }
    };

    /**
     * Initialize the viewer with orbit camera controls for a given position and target
     * Controls will then orbit around the given target
     *
     * @param {THREE.Vector3} position the position of the camera
     * @param {THREE.Vector3} target the orbit target, if not provided will be set to (0,0,0)
     * @returns {CameraControlsExtended} the created orbit camera control
     */
    initializeOrbitControls = (
        position: THREE.Vector3,
        target: THREE.Vector3 = new THREE.Vector3(0)
    ): CameraControlsExtended => {
        const controls = new CameraControlsExtended(this.getCamera(), this.renderer.domElement, this.trackEventBy);
        controls.setLookAt(position.x, position.y, position.z, target.x, target.y, target.z);

        controls.saveState();
        controls.update(0.0);
        controls.dampingFactor = 1;

        return controls;
    };

    /**
     * Initialize the first person camera controls for a given position and rotation
     *
     * @param {THREE.Vector3} position the position the camera should have
     * @param {THREE.Vector3} rotation the rotation the camera should have, if not provided will be set to (0,0,0)
     * @returns {FirstPersonCameraControls} the created first person camera control
     */
    initializeFirstPersonControlsUsingRotation = (
        position: THREE.Vector3,
        rotation: THREE.Vector3 = new THREE.Vector3(0)
    ): FirstPersonCameraControls => {
        const fpsCameraControls = new FirstPersonCameraControls(
            this.getCamera(),
            this.renderer.domElement,
            this.trackEventBy
        );
        fpsCameraControls.setPosition(position);
        fpsCameraControls.setRotation(rotation);

        return fpsCameraControls;
    };

    /**
     * Initialize the first person camera controls for a given position and target
     *
     * @param {THREE.Vector3} position the position the camera should have
     * @param {THREE.Vector3} target the target to look at in world space
     * @returns {FirstPersonCameraControls} the created first person camera control
     */
    initializeFirstPersonControlsUsingTarget = (
        position: THREE.Vector3,
        target: THREE.Vector3
    ): FirstPersonCameraControls => {
        const fpsCameraControls = new FirstPersonCameraControls(
            this.getCamera(),
            this.renderer.domElement,
            this.trackEventBy
        );
        fpsCameraControls.setPosition(position);
        fpsCameraControls.lookAt(target);

        return fpsCameraControls;
    };
}
