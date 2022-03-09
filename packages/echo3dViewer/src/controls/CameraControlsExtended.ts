/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access -- types are not exported in hold-event package */
import { THREE } from '@cognite/reveal';
import CameraControls from 'camera-controls';
import { KeyboardKeyHold } from 'hold-event';
import { TrackEventBySignature } from '../types/trackEventBySignature';

const KEYCODE = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    Q: 81,
    E: 69,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40
};
const speedConstant = 0.05;

/**
 * Camera controls class that extends 'CameraControls' from npm package camera-controls
 *
 * The CameraControls package is recommended for intuitive Orbiting Controls
 */
export class CameraControlsExtended extends CameraControls {
    private hasUsedKeysToNavigate = false;

    private hasUsedMouseToNavigate = false;

    private hasUsedTouchToNavigate = false;

    private hasUsedPenToNavigate = false;

    private trackEventBy;

    private wheelTimeout: NodeJS.Timeout | undefined = undefined;

    private keyboardTimeout: NodeJS.Timeout | undefined = undefined;

    /**
     * Initialize Orbit CameraControls
     *
     * @param {THREE.PerspectiveCamera} camera The camera Reference, this is the camera from ThreeJS / Reveal
     * @param {HTMLElement} domElement The DOM element to listen for navigation events
     * @param {TrackEventBySignature} trackEventBy optional parameter for providing a method that
     * will be called when certain control actions are preformed:
     * Keyboard navigation used, mouse navigation used, touch navigation used and pen navigation used
     * @param {number} holdIntervalDelay optional parameter for setting an interval for the keydown events, if not provided
     * the hold events will use requestAnimationFrame. (currently only used to be able to run tests)
     */
    constructor(
        camera: THREE.PerspectiveCamera,
        domElement: HTMLElement,
        trackEventBy?: TrackEventBySignature,
        holdIntervalDelay?: number
    ) {
        super(camera, domElement);

        this.touches.two = CameraControls.ACTION.TOUCH_DOLLY;
        this.touches.three = CameraControls.ACTION.NONE;
        this.mouseButtons.right = CameraControls.ACTION.NONE;
        this.mouseButtons.middle = CameraControls.ACTION.NONE;
        this.trackEventBy = trackEventBy;
        const wKey = new KeyboardKeyHold(KEYCODE.W, holdIntervalDelay);
        const sKey = new KeyboardKeyHold(KEYCODE.S, holdIntervalDelay);
        const aKey = new KeyboardKeyHold(KEYCODE.A, holdIntervalDelay);
        const dKey = new KeyboardKeyHold(KEYCODE.D, holdIntervalDelay);

        wKey.addEventListener('holding', this.onUpKeyDown);
        sKey.addEventListener('holding', this.onDownKeyDown);
        aKey.addEventListener('holding', this.onLeftKeyDown);
        dKey.addEventListener('holding', this.onRightKeyDown);

        const leftKey = new KeyboardKeyHold(KEYCODE.ARROW_LEFT, holdIntervalDelay);
        const rightKey = new KeyboardKeyHold(KEYCODE.ARROW_RIGHT, holdIntervalDelay);
        const upKey = new KeyboardKeyHold(KEYCODE.ARROW_UP, holdIntervalDelay);
        const downKey = new KeyboardKeyHold(KEYCODE.ARROW_DOWN, holdIntervalDelay);

        leftKey.addEventListener('holding', this.onLeftKeyDown);
        rightKey.addEventListener('holding', this.onRightKeyDown);
        upKey.addEventListener('holding', this.onUpKeyDown);
        downKey.addEventListener('holding', this.onDownKeyDown);

        const qKey = new KeyboardKeyHold(KEYCODE.Q, holdIntervalDelay);
        const eKey = new KeyboardKeyHold(KEYCODE.E, holdIntervalDelay);

        qKey.addEventListener('holding', this.onQKeyDown);
        eKey.addEventListener('holding', this.onEKeyDown);
        domElement.addEventListener('wheel', this.onMouseWheelNavigation);
        domElement.addEventListener('pointerdown', this.onPointerNavigation);
    }

    /**
     * Clear input timeouts
     * Useful when you need to reset the state
     */
    private clearTimeouts = (): void => {
        if (this.wheelTimeout) clearTimeout(this.wheelTimeout);
        if (this.keyboardTimeout) clearTimeout(this.keyboardTimeout);
    };

    /**
     * Handle to check if keyboard navigation is still being preformed
     */
    private handleKeyboardNavigationWithTimeout = (): void => {
        this.clearTimeouts();
        this.dispatchEvent({ type: 'controlstart' });

        this.keyboardTimeout = setTimeout(() => {
            this.dispatchEvent({ type: 'controlend' });
        }, 200);
    };

    /**
     * Call track event by method (if provided)
     * when keyboard navigation is used for the first time during a session
     */
    private logIfKeyboardNavigationUsed = (): void => {
        if (!this.hasUsedKeysToNavigate) {
            this.hasUsedKeysToNavigate = true;
            if (this.trackEventBy) this.trackEventBy('Navigation', 'Moved', { value: 'keys', control: 'orbit' });
        }
    };

    /**
     * Internal method for handling mouse wheel action
     * Will keep control of if mouse wheel navigation is still being preformed
     * Will also call track event by method (if provided)
     * when mouse navigation is used for the first time during a session
     */
    private onMouseWheelNavigation = (): void => {
        this.clearTimeouts();
        this.dispatchEvent({ type: 'controlstart' });

        this.wheelTimeout = setTimeout(() => {
            this.dispatchEvent({ type: 'controlend' });
        }, 500);

        if (!this.hasUsedMouseToNavigate) {
            this.hasUsedMouseToNavigate = true;
            if (this.trackEventBy) this.trackEventBy('Navigation', 'Moved', { value: 'mouse', control: 'orbit' });
        }
    };

    /**
     * Handling pointer events (touch, mouse click and pen)
     * Will call {trackEventBy} method (if provided) when pointer navigation is used only __the first time__ during a session
     *
     * @param {PointerEvent} ev the pointer event performed
     */
    private onPointerNavigation = (ev: PointerEvent): void => {
        this.clearTimeouts();
        if (ev.pointerType === 'mouse' && !this.hasUsedMouseToNavigate) {
            this.hasUsedMouseToNavigate = true;
            if (this.trackEventBy) this.trackEventBy('Navigation', 'Moved', { value: 'mouse', control: 'orbit' });
        }

        if (ev.pointerType === 'pen' && !this.hasUsedPenToNavigate) {
            this.hasUsedPenToNavigate = true;
            if (this.trackEventBy) this.trackEventBy('Navigation', 'Moved', { value: 'pen', control: 'orbit' });
        }

        if (ev.pointerType === 'touch' && !this.hasUsedTouchToNavigate) {
            this.hasUsedPenToNavigate = true;
            if (this.trackEventBy) this.trackEventBy('Navigation', 'Moved', { value: 'touch', control: 'orbit' });
        }
    };

    /**
     * @ignore
     * @private
     */
    private onLeftKeyDown = (event: any | undefined): void => {
        if (!event) return;
        this.handleKeyboardNavigationWithTimeout();
        this.rotate(-speedConstant * THREE.MathUtils.DEG2RAD * event.deltaTime, 0, true);
        this.logIfKeyboardNavigationUsed();
    };

    /**
     * @ignore
     * @private
     */
    private onRightKeyDown = (event: any | undefined): void => {
        if (!event) return;
        this.handleKeyboardNavigationWithTimeout();
        this.rotate(speedConstant * THREE.MathUtils.DEG2RAD * event.deltaTime, 0, true);
        this.logIfKeyboardNavigationUsed();
    };

    /**
     * @ignore
     * @private
     */
    private onUpKeyDown = (event: any | undefined): void => {
        if (!event) return;
        this.handleKeyboardNavigationWithTimeout();
        this.rotate(0, -speedConstant * THREE.MathUtils.DEG2RAD * event.deltaTime, true);
        this.logIfKeyboardNavigationUsed();
    };

    /**
     * @ignore
     * @private
     */
    private onDownKeyDown = (event: any | undefined): void => {
        if (!event) return;
        this.handleKeyboardNavigationWithTimeout();
        this.rotate(0, speedConstant * THREE.MathUtils.DEG2RAD * event.deltaTime, true);
        this.logIfKeyboardNavigationUsed();
    };

    /**
     * @ignore
     * @private
     */
    onQKeyDown = (event: any | undefined): void => {
        if (!event) return;
        this.handleKeyboardNavigationWithTimeout();

        const targetPosition = new THREE.Vector3();
        const cameraPosition = new THREE.Vector3();
        this.getTarget(targetPosition);
        this.getPosition(cameraPosition);
        const speed = Math.max(targetPosition.sub(cameraPosition).length(), 0.1) / 7000;

        this.dolly(-speed * (event.deltaTime as number), false);
        this.logIfKeyboardNavigationUsed();
    };

    /**
     * @ignore
     * @private
     */
    onEKeyDown = (event: any | undefined): void => {
        if (!event) return;
        this.handleKeyboardNavigationWithTimeout();

        const targetPosition = new THREE.Vector3();
        const cameraPosition = new THREE.Vector3();
        this.getTarget(targetPosition);
        this.getPosition(cameraPosition);
        const speed = Math.max(targetPosition.sub(cameraPosition).length(), 0.1) / 7000;

        this.dolly(speed * (event.deltaTime as number), false);
        this.logIfKeyboardNavigationUsed();
    };
}
