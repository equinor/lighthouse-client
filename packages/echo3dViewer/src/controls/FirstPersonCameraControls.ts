import { THREE } from '@cognite/reveal';
import { TrackEventBySignature } from '../types/trackEventBySignature';
import { clampAngle, screenPointToAngleXInRad, screenPointToAngleYInRad } from '../utils/calculationUtils';
import { normalizeCursorCoordinatesForThreeScreen } from '../utils/mouseEventOffset';
import { MultiPointerCache } from './MultiPointerCache';

const halfPI = Math.PI / 2;

const MOVE_UP = 'E';
const MOVE_DOWN = 'Q';
const PITCH_UP = 'ArrowUp';
const PITCH_DOWN = 'ArrowDown';
const YAW_LEFT = 'ArrowLeft';
const YAW_RIGHT = 'ArrowRight';
const SHIFT = 'SHIFT';
const CTRL = 'CONTROL';
const ALT = 'ALT';
/** Meta is the Windows Key or Cmd Key on Macs */
const META = 'META';
const MOVE_FORWARD = 'W';
const MOVE_LEFT = 'A';
const MOVE_BACKWARDS = 'S';
const MOVE_RIGHT = 'D';

/**
 * FirstPersonCameraControls class that handles first person camera movements
 * Chunks taken from PointerLockControls and PointerLockControls demo.
 *
 * @see https://github.com/mrdoob/three.js/blob/master/examples/js/controls/PointerLockControls.js
 * @see https://threejs.org/examples/#misc_controls_pointerlock
 */
export class FirstPersonCameraControls extends THREE.EventDispatcher {
    private camera: THREE.PerspectiveCamera;

    private forceUpdateNextUpdate = false;

    private movementSpeed: number;

    private movementSpeedBoostFactor: number;

    /**
     * To adjust the vertical movement speed as a factor of the movementSpeed.
     * 0.5 means 50% of movementSpeed
     */
    private verticalMovementSpeedModifier: number;

    private lookSpeed: number;

    private lookSpeedBoostFactor: number;

    private moveForward: number;

    private moveBackward: number;

    private moveLeft: number;

    private moveRight: number;

    private moveUp: boolean;

    private moveDown: boolean;

    private pitchUp: boolean;

    private pitchDown: boolean;

    private yawLeft: boolean;

    private yawRight: boolean;

    private mouseMoving: boolean;

    private velocity: THREE.Vector3;

    private angularVelocity: THREE.Vector2;

    private accelerationAccumulator: number;

    private shiftKey = false;

    private ctrlKey = false;

    private altKey = false;

    private metaKey = false;

    private domElement: HTMLCanvasElement;

    private fingerDownScreenPosAngles = new THREE.Vector2();

    private startRotation = new THREE.Vector2();

    private pointerCache = new MultiPointerCache();

    private prevPinchDiff = -1;

    private previousActivePointerCount = 0;

    private hasUsedKeysToNavigate = false;

    private hasUsedMouseToNavigate = false;

    private hasUsedTouchToNavigate = false;

    private hasUsedPenToNavigate = false;

    private wheelTimeout: NodeJS.Timeout | undefined = undefined;

    private isMovingByPointer = false;

    private isMovingByKeyboard = false;

    private trackEventBy;

    /**
     * Constructor for creating first person camera controls
     *
     * @param {THREE.PerspectiveCamera} camera the camera that the control will control
     * @param {HTMLCanvasElement} domElement this is the element where we are listening for navigation inputs
     * @param {TrackEventBySignature} trackEventBy optional parameter for providing a method that
     * will be called when certain control actions are preformed:
     * Keyboard navigation used, mouse navigation used, touch navigation used and pen navigation used
     */
    constructor(camera: THREE.PerspectiveCamera, domElement: HTMLCanvasElement, trackEventBy?: TrackEventBySignature) {
        super();
        this.camera = camera;
        this.movementSpeed = 6.0;
        this.movementSpeedBoostFactor = 4;
        this.verticalMovementSpeedModifier = 0.5; // Semi arbitrary value. The lower vertical speed is based on feedback from using it for small vertical navigation adjustments.
        this.lookSpeed = (Math.PI * 2) / 15;
        this.lookSpeedBoostFactor = 3;
        this.domElement = domElement;
        this.trackEventBy = trackEventBy;

        this.moveForward = 0;
        this.moveBackward = 0;
        this.moveLeft = 0;
        this.moveRight = 0;
        this.moveUp = false;
        this.moveDown = false;
        this.pitchUp = false;
        this.pitchDown = false;
        this.yawLeft = false;
        this.yawRight = false;
        this.mouseMoving = false;

        this.velocity = new THREE.Vector3();
        this.angularVelocity = new THREE.Vector2();
        this.accelerationAccumulator = 0;

        this.domElement.style.touchAction = 'none'; // disable touch scrolling / zooming
        this.domElement.addEventListener('wheel', this.handleWheel, {
            passive: true
        }); // Added passive here based on chrome devtools recommendation.
        document.addEventListener('keyup', this.handleKeyUp, false);
        document.addEventListener('keydown', this.handleKeyDown, false);
        this.domElement.addEventListener('pointerdown', this.handlePointerDown, false);
    }

    /**
     * Gets the active pointer count (Touch points, or mouse clicks)
     *
     * @returns {number} the active pointer count
     */
    private getActivePointerCount = (): number => this.pointerCache.activePointerCount();

    /**
     * Used to notify external listeners if the camera stopped or started moving
     * Using the controlstart and controlend events
     *
     * @param {boolean} isMoving flag indicating whether the controls are moving or not
     */
    private handleIsMovingByKeyboard(isMoving: boolean) {
        if (isMoving) {
            if (this.wheelTimeout) clearTimeout(this.wheelTimeout);
            this.isMovingByKeyboard = true;
            this.dispatchEvent({ type: 'controlstart' });
        } else {
            this.isMovingByKeyboard = false;
            if (!this.isMovingByPointer) this.dispatchEvent({ type: 'controlend' });
        }
    }

    /**
     * Handle mouse wheel to adjust Camera inwards or outwards in the direction of the pointer
     *
     * @param {WheelEvent} ev the wheel event triggered
     */
    handleWheel = (ev: WheelEvent): void => {
        if (!this.hasUsedMouseToNavigate) {
            this.hasUsedMouseToNavigate = true;
            if (this.trackEventBy) this.trackEventBy('Navigation', 'Moved', { value: 'mouse', control: 'FPC' });
        }

        if (ev.deltaY !== 0) {
            this.dispatchEvent({ type: 'controlstart' });
            if (this.wheelTimeout) clearTimeout(this.wheelTimeout);

            this.wheelTimeout = setTimeout(() => {
                this.dispatchEvent({ type: 'controlend' });
            }, 500);

            // Todo: Unhardcode these
            const speedModifier = this.shiftKey ? 3 : 1;
            const arbitraryValue = 0.005;
            const distance = -ev.deltaY * arbitraryValue * speedModifier;
            this.moveTowardsScreenPosition(ev, distance);
        }
    };

    /**
     * Calculate and move towards or away from the mouse pointer when the mouse wheel is triggered
     *
     * @param {{ clientX: number; clientY: number }} clientPos the pointer location to move towards or away from
     * @param {number} clientPos.clientX the pointer locations X coordinate
     * @param { number} clientPos.clientY the pointer locations Y coordinate
     * @param {number} distance the distance to move
     */
    moveTowardsScreenPosition(clientPos: { clientX: number; clientY: number }, distance: number): void {
        const normalizedScreenPos = normalizeCursorCoordinatesForThreeScreen(
            clientPos,
            this.domElement.getBoundingClientRect()
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(normalizedScreenPos, this.camera);
        const direction = raycaster.ray.direction.clone().normalize();
        this.moveTowards(direction, distance);
    }

    /**
     * Use to move the camera in a direction and a certain distance
     *
     * @param {THREE.Vector3} direction the direction to move
     * @param {number} distance the distance to move
     */
    moveTowards(direction: THREE.Vector3, distance: number): void {
        this.camera.position.add(direction.clone().multiplyScalar(distance));
        this.forceUpdateNextUpdate = true;
    }

    /**
     * Cleanup pointer events to not have dangling events when switching camera controls.
     * Will also remove pointer event listeners
     * Used by the dispose method
     */
    resetPointerEvents = (): void => {
        this.mouseMoving = false;
        this.prevPinchDiff = -1;
        this.pointerCache.clearEventCache();
        this.domElement.ownerDocument.removeEventListener('pointermove', this.handlePointerMove, false);
        this.domElement.ownerDocument.removeEventListener('pointerup', this.handlePointerUp, false);
        this.previousActivePointerCount = 0;
    };

    /**
     *  Cleanup method used to clean up event listeners attached and reset the class properties
     */
    dispose(): void {
        document.removeEventListener('keyup', this.handleKeyUp, false);
        document.removeEventListener('keydown', this.handleKeyDown, false);
        this.domElement.removeEventListener('pointerdown', this.handlePointerDown, false);
        this.domElement.removeEventListener('wheel', this.handleWheel, false);
        this.resetPointerEvents();
    }

    /**
     * Get the current Camera reference
     *
     * @returns {THREE.PerspectiveCamera} the camera
     */
    getCamera = (): THREE.PerspectiveCamera => {
        return this.camera;
    };

    /**
     * Get the domElement we use for input
     *
     * @returns {HTMLCanvasElement} the dom element for the controls
     */
    getDomElement = (): HTMLCanvasElement => {
        return this.domElement;
    };

    /**
     * Get the {MultiPointerCache} reference
     *
     * @returns {MultiPointerCache} the multi pointer cache for the controls
     */
    getPointerCache = (): MultiPointerCache => {
        return this.pointerCache;
    };

    /**
     * Set the current velocity
     *
     * @param {THREE.Vector3} newVelocity the new velocity to use
     */
    setVelocity = (newVelocity: THREE.Vector3): void => {
        this.velocity = newVelocity;
    };

    /**
     * Set the movement movement speed
     *
     * @param {number} newMovementSeed the new movement speed
     */
    setMovementSpeed = (newMovementSeed: number): void => {
        this.movementSpeed = newMovementSeed;
    };

    /**
     * Handling the event pointer up navigation
     * Navigation is disabled for middle and secondary button (right-click)
     *
     * @param { PointerEvent} event the pointer event performed
     */
    onPointerUp = (event: PointerEvent): void => {
        if (event.button && event.button !== 0 && event.button !== 2) {
            event.preventDefault(); // Ignore the mouse event
            return;
        }
        this.pointerCache.removePointer(event);
        if (this.getActivePointerCount() === 0) {
            this.resetPointerEvents();
        }
        this.isMovingByPointer = false;
        if (!this.isMovingByKeyboard) this.dispatchEvent({ type: 'controlend' });
    };

    handlePointerUp = this.onPointerUp;

    /**
     * Method that will start the process for moving the camera on pointer event
     *
     * @param {PointerEvent} event the pointer event performed
     */
    startPointerRotate = (event: PointerEvent): void => {
        const worldDirection: THREE.Vector3 = new THREE.Vector3();
        this.camera.getWorldDirection(worldDirection); // Copies into worldDirection
        const oldX = clampAngle(
            Math.atan2(
                worldDirection.y,
                Math.sqrt(worldDirection.z * worldDirection.z + worldDirection.x * worldDirection.x)
            ),
            -halfPI,
            halfPI
        );
        const oldY = Math.atan2(worldDirection.x, -worldDirection.z);

        this.startRotation = new THREE.Vector2(oldX, oldY);
        const screenPosition = new THREE.Vector2(event.clientX, event.clientY);
        const screenSize = new THREE.Vector2(this.domElement.clientWidth, this.domElement.clientHeight);

        this.fingerDownScreenPosAngles = new THREE.Vector2(
            screenPointToAngleXInRad(screenPosition, screenSize, this.camera),
            screenPointToAngleYInRad(screenPosition, screenSize, this.camera)
        );

        this.domElement.setPointerCapture(event.pointerId); // Allow dragging outside the "Screen"
    };

    /**
     * Method that will update the process for moving the camera on pointer event
     *
     * @param {PointerEvent} event the pointer event performed
     */
    updatePointerRotate = (event: PointerEvent): void => {
        this.mouseMoving = true;

        const screenPosition = new THREE.Vector2(event.clientX, event.clientY);
        const screenSize = new THREE.Vector2(this.domElement.clientWidth, this.domElement.clientHeight);
        const newAngles = new THREE.Vector2(
            screenPointToAngleXInRad(screenPosition, screenSize, this.camera),
            screenPointToAngleYInRad(screenPosition, screenSize, this.camera)
        );

        const r = new THREE.Vector2(
            clampAngle(this.startRotation.x - (newAngles.x - this.fingerDownScreenPosAngles.x), -halfPI, halfPI),
            -(this.startRotation.y - (newAngles.y - this.fingerDownScreenPosAngles.y))
        );

        const q1 = new THREE.Quaternion();
        q1.setFromAxisAngle(new THREE.Vector3(1, 0, 0), r.x);
        const q2 = new THREE.Quaternion();
        q2.setFromAxisAngle(new THREE.Vector3(0, 1, 0), r.y);
        this.camera.setRotationFromQuaternion(q2.multiply(q1));
    };

    /**
     * Internal method for handling the event pointer down
     * Navigation is identical for right and left button. Disabled for middle / other.
     *
     * @param { PointerEvent} ev the pointer event performed
     */
    onPointerDown(ev: PointerEvent): void {
        if (ev.button && ev.button !== 0 && ev.button !== 2) {
            ev.preventDefault(); // Ignore the mouse event
            return;
        }
        if (this.wheelTimeout) clearTimeout(this.wheelTimeout);
        this.isMovingByPointer = true;
        this.dispatchEvent({ type: 'controlstart' });
        this.pointerCache.addOrUpdatePointer(ev);
        const activePointers = this.pointerCache.activePointersSnapshot();

        if (this.getActivePointerCount() === 1) {
            // Start listening to pointer move updates on first event
            this.domElement.ownerDocument.addEventListener('pointermove', this.handlePointerMove);
            this.domElement.ownerDocument.addEventListener('pointerup', this.handlePointerUp);
        }

        if (this.getActivePointerCount() === 1) {
            this.previousActivePointerCount = 1;
            this.startPointerRotate(ev);
        } else if (this.getActivePointerCount() === 2) {
            this.domElement.ownerDocument.removeEventListener('pointermove', this.updatePointerRotate, false);
            this.startPinchToMove(activePointers[0], activePointers[1]);
        } else {
            // We do not handle 3 fingers (yet)
        }

        this.previousActivePointerCount = activePointers.length;
        if (ev.pointerType === 'mouse' && !this.hasUsedMouseToNavigate) {
            this.hasUsedMouseToNavigate = true;
            if (this.trackEventBy) this.trackEventBy('Navigation', 'Moved', { value: 'mouse', control: 'FPC' });
        }

        if (ev.pointerType === 'pen' && !this.hasUsedPenToNavigate) {
            this.hasUsedPenToNavigate = true;
            if (this.trackEventBy) this.trackEventBy('Navigation', 'Moved', { value: 'pen', control: 'FPC' });
        }

        if (ev.pointerType === 'touch' && !this.hasUsedTouchToNavigate) {
            this.hasUsedPenToNavigate = true;
            if (this.trackEventBy) this.trackEventBy('Navigation', 'Moved', { value: 'touch', control: 'FPC' });
        }
    }

    handlePointerDown = this.onPointerDown.bind(this) as (ev: PointerEvent) => void;

    /**
     * Internal method for handling the event pointer move
     * Three or more touch points are not handled
     *
     * @param { PointerEvent} ev the pointer event performed
     */
    onPointerMove(ev: PointerEvent): void {
        this.pointerCache.addOrUpdatePointer(ev);
        const activePointers = this.pointerCache.activePointersSnapshot();
        if (this.getActivePointerCount() === 1) {
            // If we reduce from N fingers to 1, we reset.
            if (this.previousActivePointerCount > 1) {
                this.startPointerRotate(ev);
                this.prevPinchDiff = -1;
            }
            this.updatePointerRotate(ev);
        } else if (this.getActivePointerCount() === 2) {
            this.updatePinchToMove(activePointers[0], activePointers[1]);
        } else {
            // Three Or More touch points are not handled (yet).
        }
        // Update pointerCount
        this.previousActivePointerCount = this.getActivePointerCount();
    }

    handlePointerMove = this.onPointerMove.bind(this) as (ev: PointerEvent) => void;

    /**
     * Internal method for handling touch pinch to move camera
     *
     * @param {PointerEvent} evA one of the two touch points
     * @param {PointerEvent} evB the second touch point
     */
    startPinchToMove(evA: PointerEvent, evB: PointerEvent): void {
        this.updatePinchToMove(evA, evB);
    }

    /**
     * Internal method for handling touch pinch to move camera
     *
     * @param {PointerEvent} evA one of the two touch points
     * @param {PointerEvent} evB the second touch point
     */
    updatePinchToMove(evA: PointerEvent, evB: PointerEvent): void {
        const evAPosition = new THREE.Vector2(evA.clientX, evA.clientY);
        const evBPosition = new THREE.Vector2(evB.clientX, evB.clientY);
        const centerPos = evAPosition.clone().add(evBPosition).divideScalar(2);

        const currentDistance = evAPosition.distanceTo(evBPosition);

        if (this.prevPinchDiff === -1) {
            // Wait for next "update" to calculate difference
            this.prevPinchDiff = currentDistance;
            return;
        }

        const delta = currentDistance - this.prevPinchDiff;
        this.prevPinchDiff = currentDistance;

        // TODO: Scale distance based on screen size / resolution. As it is now a high-resolution
        // device will scroll faster because the delta in pixels is higher for same movement.
        const speedTemp = 0.05; // TODO: Adjust speed. This is totally arbitrary
        const distance = delta * speedTemp;
        this.moveTowardsScreenPosition({ clientX: centerPos.x, clientY: centerPos.y }, distance);
    }

    /**
     *  Internal method that will log if user has used any key to navigate
     *  Will only log once for each session (or for each time the control is initialized)
     */
    handleKeyDownShouldLog = (): void => {
        if (!this.hasUsedKeysToNavigate) {
            this.hasUsedKeysToNavigate = true;
            if (this.trackEventBy) this.trackEventBy('Navigation', 'Moved', { value: 'keys', control: 'FPC' });
        }
    };

    /**
     * Internal method that is called when user presses key that should stop existing camera movement
     */
    skipNavigation = (): void => {
        this.moveBackward = 0;
        this.moveForward = 0;
        this.moveLeft = 0;
        this.moveRight = 0;
        this.moveUp = false;
        this.moveDown = false;
    };

    /**
     * Internal method that handles all key presses down
     * Valid keys are: wasd, qe, arrow keys, shift,
     * Other keys are ignored
     * Ctrl and alt will cancel existing camera movement if any
     *
     * @param {KeyboardEvent} e the keyboard action performed
     */
    handleKeyDown = (e: KeyboardEvent): void => {
        if (!(document.activeElement === document.body || document.activeElement === this.domElement)) {
            return;
        }

        // CTRL or ALT skips navigation
        if (e.ctrlKey || e.altKey || e.metaKey || this.ctrlKey || this.altKey || this.metaKey) {
            this.skipNavigation();
            return;
        }

        let anyNavKeyPressed = true;
        switch (e.key.toUpperCase()) {
            case SHIFT:
                this.shiftKey = true;
                break;

            case CTRL:
                this.ctrlKey = true;
                anyNavKeyPressed = false;
                break;

            case ALT:
                this.altKey = true;
                anyNavKeyPressed = false;
                break;

            case META:
                this.metaKey = true;
                anyNavKeyPressed = false;
                break;

            case MOVE_FORWARD:
                this.moveForward = 1;
                this.handleIsMovingByKeyboard(true);
                break;

            case MOVE_LEFT:
                this.moveLeft = 1;
                this.handleIsMovingByKeyboard(true);
                break;

            case MOVE_BACKWARDS:
                this.moveBackward = 1;
                this.handleIsMovingByKeyboard(true);
                break;

            case MOVE_RIGHT:
                this.moveRight = 1;
                this.handleIsMovingByKeyboard(true);
                break;

            case MOVE_UP.toLocaleUpperCase():
                this.moveUp = true;
                this.handleIsMovingByKeyboard(true);
                break;
            case MOVE_DOWN.toLocaleUpperCase():
                this.moveDown = true;
                this.handleIsMovingByKeyboard(true);
                break;

            case PITCH_UP.toLocaleUpperCase():
                this.pitchUp = true;
                this.handleIsMovingByKeyboard(true);
                break;
            case PITCH_DOWN.toLocaleUpperCase():
                this.pitchDown = true;
                this.handleIsMovingByKeyboard(true);
                break;

            case YAW_LEFT.toLocaleUpperCase():
                this.yawLeft = true;
                this.handleIsMovingByKeyboard(true);
                break;
            case YAW_RIGHT.toLocaleUpperCase():
                this.yawRight = true;
                this.handleIsMovingByKeyboard(true);
                break;
            default:
                // Ignore other keys
                anyNavKeyPressed = false;
                break;
        }

        if (anyNavKeyPressed) {
            this.handleKeyDownShouldLog();
        }
    };

    /**
     * Internal method that handles all key released events
     *
     * @param {KeyboardEvent | { key: string }} e the keyboard action performed
     */
    handleKeyUp = (e: KeyboardEvent | { key: string }): void => {
        switch (e.key.toUpperCase()) {
            case SHIFT:
                this.shiftKey = false;
                break;

            case CTRL:
                this.ctrlKey = false;
                break;

            case ALT:
                this.altKey = false;
                break;

            case META:
                this.metaKey = false;
                break;

            case MOVE_FORWARD:
                this.moveForward = 0;
                this.handleIsMovingByKeyboard(false);
                break;

            case MOVE_LEFT:
                this.moveLeft = 0;
                this.handleIsMovingByKeyboard(false);
                break;

            case MOVE_BACKWARDS:
                this.moveBackward = 0;
                this.handleIsMovingByKeyboard(false);
                break;

            case MOVE_RIGHT:
                this.moveRight = 0;
                this.handleIsMovingByKeyboard(false);
                break;

            case MOVE_UP.toUpperCase():
                this.moveUp = false;
                this.handleIsMovingByKeyboard(false);
                break;
            case MOVE_DOWN.toUpperCase():
                this.moveDown = false;
                this.handleIsMovingByKeyboard(false);
                break;

            case PITCH_UP.toUpperCase():
                this.pitchUp = false;
                this.handleIsMovingByKeyboard(false);
                break;
            case PITCH_DOWN.toUpperCase():
                this.pitchDown = false;
                this.handleIsMovingByKeyboard(false);
                break;

            case YAW_LEFT.toUpperCase():
                this.yawLeft = false;
                this.handleIsMovingByKeyboard(false);
                break;
            case YAW_RIGHT.toUpperCase():
                this.yawRight = false;
                this.handleIsMovingByKeyboard(false);
                break;
            default:
                // Ignore other keys
                break;
        }
    };

    /**
     * Method for making the camera look the target position passed in
     *
     * @param {THREE.Vector3} targetPosition the target position to look at
     */
    lookAt(targetPosition: THREE.Vector3): void {
        this.camera.lookAt(targetPosition);
    }

    /**
     * Setter method for updating the cameras rotation
     *
     * @param {THREE.Vector3} rotation the new camera rotation
     */
    setRotation(rotation: THREE.Vector3): void {
        this.camera.rotation.setFromVector3(rotation, 'XYZ');
    }

    /**
     * Getter method for retrieving the controls camera rotation
     *
     * @returns {THREE.Vector3} cameras rotation
     */
    getRotation(): THREE.Vector3 {
        return this.camera.rotation.toVector3();
    }

    /**
     * Getter method for retrieving the controls camera quaternion
     *
     * @returns {THREE.Quaternion} cameras quaternion
     */
    getQuaternion(): THREE.Quaternion {
        return this.camera.quaternion;
    }

    /**
     * Setter method for updating the controls camera position
     *
     * @param {THREE.Vector3} position the new position
     */
    setPosition(position: THREE.Vector3): void {
        // Copy the input position to the cameras position object.
        this.camera.position.set(position.x, position.y, position.z);
        // Consider stopping velocity.
    }

    /**
     * Getter method for retrieving the cameras world position
     *
     * @returns {THREE.Vector3} the cameras world position
     */
    getPosition(): THREE.Vector3 {
        const posOut = new THREE.Vector3();
        this.camera.getWorldPosition(posOut);
        return posOut;
    }

    /**
     * Setter method for updating the move up class property
     * This controls wether the control cameras will continue to move up or not
     *
     * @param {boolean} moveUp new value of the move up property
     */
    setMoveUp(moveUp: boolean): void {
        this.moveUp = moveUp;
    }

    /**
     * Setter method for updating the move down class property
     * This controls wether the control cameras will continue to down up or not
     *
     * @param {boolean} moveDown new value of the move down property
     */
    setMoveDown(moveDown: boolean): void {
        this.moveDown = moveDown;
    }

    /**
     * Internal method for updating the controls camera move direction
     *
     * @param {THREE.Vector3} vector the direction vector
     * @param {number} speedThing the speed to move in
     */
    setMoveDirection(vector: THREE.Vector3, speedThing = 1): void {
        if (vector.z > 0) {
            this.moveForward = -vector.z * speedThing;
            this.moveBackward = 0;
        } else if (vector.z === 0) {
            this.moveForward = vector.z * speedThing;
            this.moveBackward = vector.z * speedThing;
        } else {
            this.moveBackward = vector.z * speedThing;
            this.moveForward = 0;
        }
        if (vector.x > 0) {
            this.moveRight = vector.x * speedThing;
            this.moveLeft = 0;
        } else if (vector.x === 0) {
            this.moveRight = vector.x * speedThing;
            this.moveLeft = vector.x * speedThing;
        } else {
            this.moveLeft = -vector.x * speedThing;
            this.moveRight = 0;
        }
    }

    /**
     * Method that handles the actual moving of the camera when navigation is triggered
     * Will run in render loop
     *
     * @param {number} delta the update delta
     * @returns {boolean} a flag indication if navigation has happened or not
     */
    update(delta: number): boolean {
        const movementSpeed = this.shiftKey ? this.movementSpeed * this.movementSpeedBoostFactor : this.movementSpeed;
        const verticalMovementSpeed = movementSpeed * this.verticalMovementSpeedModifier;
        const lookSpeed = this.shiftKey ? this.lookSpeed * this.lookSpeedBoostFactor : this.lookSpeed;

        this.velocity.multiplyScalar(0.5);
        if (this.velocity.length() < 0.01) {
            this.velocity.set(0, 0, 0);
        }

        this.angularVelocity.multiplyScalar(0.5);
        if (this.angularVelocity.length() < 0.01) {
            this.angularVelocity.set(0, 0);
        }

        if (this.moveForward) {
            this.velocity.z -= movementSpeed * this.moveForward;
        }
        if (this.moveBackward) {
            this.velocity.z += movementSpeed * this.moveBackward;
        }
        if (this.moveRight) {
            this.velocity.x += movementSpeed * this.moveRight;
        }
        if (this.moveLeft) {
            this.velocity.x -= movementSpeed * this.moveLeft;
        }
        if (this.moveUp) {
            this.velocity.y += verticalMovementSpeed;
        }
        if (this.moveDown) {
            this.velocity.y -= verticalMovementSpeed;
        }
        if (this.pitchUp || this.pitchDown) {
            this.angularVelocity.x -= (Number(this.pitchDown) - Number(this.pitchUp)) * lookSpeed;
        }
        if (this.yawLeft || this.yawRight) {
            this.angularVelocity.y -= (Number(this.yawRight) - Number(this.yawLeft)) * lookSpeed;
        }

        const hasMoved =
            this.velocity.length() > 0.01 ||
            this.moveForward ||
            this.moveBackward ||
            this.moveRight ||
            this.moveLeft ||
            this.moveUp ||
            this.moveDown;

        const hasRotated =
            this.angularVelocity.length() > 0.01 ||
            this.mouseMoving ||
            this.pitchUp ||
            this.pitchDown ||
            this.yawLeft ||
            this.yawRight;

        if (hasMoved || hasRotated || this.forceUpdateNextUpdate) {
            // Calculate acceleration
            const reachMaxSpeedAt = 1;
            this.accelerationAccumulator += delta;
            if (this.accelerationAccumulator > reachMaxSpeedAt) {
                this.accelerationAccumulator = reachMaxSpeedAt;
            } else if (this.accelerationAccumulator === 0) {
                this.accelerationAccumulator = 0.0001;
            }
            const acceleratorMultiplier = this.accelerationAccumulator / reachMaxSpeedAt;

            // Apply delta and acceleration
            this.velocity.multiplyScalar(acceleratorMultiplier).multiplyScalar(delta);
            this.angularVelocity.multiplyScalar(delta);

            // Move camera forward/backwards in local space
            // or up/down in world space
            const worldPosition = new THREE.Vector3();
            this.camera.getWorldPosition(worldPosition);
            const worldMove = this.camera.worldToLocal(
                new THREE.Vector3(worldPosition.x, worldPosition.y + this.velocity.y, worldPosition.z)
            );
            this.camera.translateX(this.velocity.x + worldMove.x);
            this.camera.translateY(worldMove.y);
            this.camera.translateZ(this.velocity.z + worldMove.z);

            // Rotate camera
            const quatPitch = new THREE.Quaternion();
            quatPitch.setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.angularVelocity.x).normalize();
            const quatYaw = new THREE.Quaternion();
            quatYaw.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.angularVelocity.y).normalize();
            const currentOrientation = this.camera.quaternion.clone().normalize();

            this.camera.setRotationFromQuaternion(quatYaw.multiply(currentOrientation).multiply(quatPitch).normalize());

            this.camera.updateProjectionMatrix();
            this.dispatchEvent({ type: 'update' });
            this.forceUpdateNextUpdate = false;
            return true;
        }

        if (!hasMoved) {
            this.accelerationAccumulator = 0;
        }
        return false;
    }
}
