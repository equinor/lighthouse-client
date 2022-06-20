import { CameraChangeDelegate, CameraManager, CameraState, THREE } from '@cognite/reveal';
import TWEEN, { Tween } from '@tweenjs/tween.js';
import { CameraControlsExtended } from '../controls/CameraControlsExtended';
import { FirstPersonCameraControls } from '../controls/FirstPersonCameraControls';
import { AnimationTypeStructure, animationTypeStructureMapper } from '../types/animationTypeStructure';
import { EventTrigger } from '../types/EventTrigger';
import { PixelIntersectionQuery } from '../types/pixelIntersectionQuery';
import { TrackEventBySignature } from '../types/trackEventBySignature';
import { assertNever } from '../utils/assertNeverHelper';
import { setPositionAndTargetForControls } from '../utils/cameraUtils';
import { CameraFrustumHelper } from './helpers/cameraFrustumHelper';
/**
 * Echo 3D Camera Manager used to manage the controls
 */
export class Echo3dCameraManager implements CameraManager {
    /**
     * When false, camera near and far planes will not be updated automatically (defaults to true).
     * This can be useful when you have custom content in the 3D view and need to better
     * control the view frustum.
     *
     * When automatic camera near/far planes are disabled, you are responsible for setting
     * this on your own.
     *
     * @example
     * ```
     * viewer.camera.near = 0.1;
     * viewer.camera.far = 1000.0;
     * viewer.camera.updateProjectionMatrix();
     * ```
     */
    public automaticNearFarPlane = true;

    // Helper to checking for changed boundingBox between updates.
    private readonly currentBoundingBox: THREE.Box3 = new THREE.Box3();

    private readonly events = {
        cameraChange: new EventTrigger<CameraChangeDelegate>()
    };

    private controls: FirstPersonCameraControls | CameraControlsExtended | undefined;

    private camera: THREE.PerspectiveCamera;

    private nearAndFarNeedUpdate = true;

    private readonly raycaster = new THREE.Raycaster();

    domElement: HTMLCanvasElement;

    private trackEventBy;

    private isDisposed = false;

    private readonly cameraFrustumHelper: CameraFrustumHelper;

    /**
     * @param {HTMLCanvasElement} domElement dom element to use
     * @param {THREE.PerspectiveCamera} camera camera to use
     * @param {TrackEventBySignature} trackEventBy optional parameter for providing a method that
     * will be called when certain control actions are preformed:
     * Keyboard navigation used, mouse navigation used, touch navigation used and pen navigation used
     */
    constructor(domElement: HTMLCanvasElement, camera?: THREE.PerspectiveCamera, trackEventBy?: TrackEventBySignature) {
        this.domElement = domElement;
        this.trackEventBy = trackEventBy;
        this.camera = camera ?? new THREE.PerspectiveCamera();
        this.cameraFrustumHelper = new CameraFrustumHelper();
    }

    /**
     *  Method for getting the camera
     *
     * @returns {*}  {THREE.PerspectiveCamera}
     */
    getCamera(): THREE.PerspectiveCamera {
        return this.camera;
    }

    /**
     * Method for applying camera state
     * Not yet implemented: use controls own setTarget, setPosition and setRotation methods
     *
     * @param {CameraState} state camera state to apply
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars ---  needed to support interface structure
    setCameraState(state: CameraState): void {
        if (this.controls) throw Error('Not implemented, use controls setTarget, setPosition and setRotation methods');
    }

    /* istanbul ignore next -- ignore for test coverage until actual use is uncovered  */
    /**
     * Event subscriber method
     *
     * @param {'cameraChange'} event event fired
     * @param {CameraChangeDelegate} callback callback to event
     */
    on(event: 'cameraChange', callback: CameraChangeDelegate): void {
        switch (event) {
            case 'cameraChange':
                this.events.cameraChange.subscribe(callback);
                break;
            default:
                assertNever(event);
        }
    }

    /* istanbul ignore next -- ignore for test coverage until actual use is uncovered */
    /**
     * Event unsubscribe method
     *
     * @param {'cameraChange'} event event fired
     * @param {CameraChangeDelegate} callback callback to event
     */
    off(event: 'cameraChange', callback: CameraChangeDelegate): void {
        switch (event) {
            case 'cameraChange':
                this.events.cameraChange.unsubscribe(callback);
                break;
            default:
                assertNever(event);
        }
    }

    /**
     * Method that sets the current controls
     *
     * @param {FirstPersonCameraControls | CameraControlsExtended} newControls new controls to use
     */
    setControls(newControls: FirstPersonCameraControls | CameraControlsExtended | undefined) {
        this.unsubscribeEventListenersFromActiveControls();
        this.controls = newControls;
    }

    /**
     * Unsubscribes event listeners from active controls
     */
    private unsubscribeEventListenersFromActiveControls() {
        if (this.controls) {
            // RemoveEventListener seems identical, but has different signature for FPCamera and Orbit camera.
            if (this.controls instanceof FirstPersonCameraControls) {
                this.controls.removeEventListener('update', this.onCameraPoseUpdated);
            } else if (this.controls instanceof CameraControlsExtended) {
                this.controls.removeEventListener('update', this.onCameraPoseUpdated);
            } else {
                assertNever(this.controls);
            }
        }
    }

    /**
     * Method that returns the current controls
     *
     * @returns {FirstPersonCameraControls | CameraControlsExtended} the current controls if any
     */
    getControls(): FirstPersonCameraControls | CameraControlsExtended | undefined {
        return this.controls;
    }

    /**
     * Method for fitting camera to bounding box
     * Not yet implemented
     *
     * @param {THREE.Box3} box the box
     * @param {number} duration the duration
     * @param {number} radiusFactor the radius factor
     */

    /**
     * Move camera to a place where the content of a bounding box is visible to the camera
     *
     * @param {THREE.Box3} box the bounding box
     * @param {number} duration the duration of the move
     * @param {number} radiusFactor the radius factor
     */
    fitCameraToBoundingBox(box: THREE.Box3, duration?: number, radiusFactor = 2): void {
        if (!this.controls) return;
        const boundingSphere = box.getBoundingSphere(new THREE.Sphere());

        const target = boundingSphere.center;
        const distance = boundingSphere.radius * radiusFactor;
        const direction = new THREE.Vector3(0, 0, -1);
        direction.applyQuaternion(this.camera.quaternion);

        const position = new THREE.Vector3();
        position.copy(direction).multiplyScalar(-distance).add(target);

        this.moveCameraTo(position, target, duration);
    }

    /**
     * Helper method for getting the default duration of an animation
     *
     * @param {number} distanceToCamera the distance to the camera
     * @returns {number} the default duration of an animation
     */
    private static calculateDefaultDuration(distanceToCamera: number): number {
        const defaultMinAnimationDuration = 300;
        const defaultMaxAnimationDuration = 1250;
        let duration = distanceToCamera * 125; // 125ms per unit distance
        duration = Math.min(Math.max(duration, defaultMinAnimationDuration), defaultMaxAnimationDuration);

        return duration;
    }

    /**
     * The helper method for calculating the start target for an animation
     *
     * @param {THREE.Vector3} newTarget the new target
     * @returns {THREE.Vector3} the start target
     */
    private calculateAnimationStartTarget(newTarget: THREE.Vector3): THREE.Vector3 {
        const { raycaster, camera } = this;
        raycaster.setFromCamera(new THREE.Vector2(), camera);
        const distanceToTarget = newTarget.distanceTo(camera.position);
        const scaledDirection = raycaster.ray.direction.clone().multiplyScalar(distanceToTarget);

        return raycaster.ray.origin.clone().add(scaledDirection);
    }

    private stopTween: ((event: Event) => void) | undefined;

    /**
     * Method to animate a move camera event
     *
     * @param {AnimationTypeStructure} from the start point and target of the animation
     * @param {AnimationTypeStructure} to the end point and target of the animation
     * @param {duration} duration the duration of the animation
     * @returns {Tween<AnimationTypeStructure>} the tween animation
     */
    private createTweenAnimation(
        from: AnimationTypeStructure,
        to: AnimationTypeStructure,
        duration: number
    ): { tween: Tween<AnimationTypeStructure> } {
        const animation = new TWEEN.Tween(from);

        /* istanbul ignore next -- ignore until certain how to properly test  */
        /**
         * The stop animation tween method initialization
         *
         * @param {Event}event the event fired
         */
        this.stopTween = (event: Event) => {
            if (this.isDisposed) {
                if (this.stopTween) document.removeEventListener('keydown', this.stopTween);
                animation.stop();
                return;
            }

            if (event.type !== 'keydown') {
                animation.stop();
                if (this.stopTween) this.domElement.removeEventListener('pointerdown', this.stopTween);
                if (this.stopTween) this.domElement.removeEventListener('wheel', this.stopTween);
                if (this.stopTween) document.removeEventListener('keydown', this.stopTween);
            }
        };

        this.domElement.addEventListener('pointerdown', this.stopTween);
        this.domElement.addEventListener('wheel', this.stopTween);
        document.addEventListener('keydown', this.stopTween);

        const tween = animation.to(to, duration).easing((x: number) => TWEEN.Easing.Circular.Out(x));

        return { tween };
    }

    /**
     * Method for moving the camera to a position and target
     *
     * @param {THREE.Vector3} position the position to move to
     * @param {THREE.Vector3}target the target to look at
     * @param {THREE.Vector3}duration how duration the move should take
     */
    private moveCameraTo(position: THREE.Vector3, target: THREE.Vector3, duration?: number): void {
        if (this.isDisposed) {
            return;
        }

        const { camera } = this;
        const newDuration =
            duration ?? Echo3dCameraManager.calculateDefaultDuration(target.distanceTo(this.camera.position));

        const startTarget = this.calculateAnimationStartTarget(target);

        const from = animationTypeStructureMapper(camera.position, startTarget);
        const to = animationTypeStructureMapper(position, target);

        const tempTarget = new THREE.Vector3();
        const tempPosition = new THREE.Vector3();

        const { tween } = this.createTweenAnimation(from, to, newDuration);

        tween
            .onUpdate(() => {
                if (this.isDisposed) {
                    return;
                }
                tempPosition.set(from.x, from.y, from.z);
                tempTarget.set(from.targetX, from.targetY, from.targetZ);
                if (!this.camera) {
                    return;
                }

                setPositionAndTargetForControls(this.controls, tempPosition, tempTarget);
            })
            .onStop(() => {
                setPositionAndTargetForControls(this.controls, tempPosition, tempTarget);
            })
            .onComplete(() => {
                if (this.isDisposed) {
                    return;
                }
                if (this.stopTween) this.domElement.removeEventListener('pointerdown', this.stopTween);
            })
            .start(TWEEN.now());
        tween.update(TWEEN.now());
    }

    /**
     * Method to be used in an animation loop to get camera to update when moved
     *
     * @param {number} deltaTime the delta time
     * @param {THREE.Box3} _boundingBox the bounding box
     */
    update(deltaTime: number, _boundingBox: THREE.Box3): void {
        if (this.controls) this.controls.update(deltaTime);
        if (
            this.automaticNearFarPlane &&
            (this.nearAndFarNeedUpdate || !_boundingBox.equals(this.currentBoundingBox))
        ) {
            this.currentBoundingBox.copy(_boundingBox);
            this.cameraFrustumHelper.updateCameraNearAndFar(this.camera, _boundingBox);
            this.nearAndFarNeedUpdate = false;
        }
    }

    /**
     * Method for disposing controls
     */
    dispose(): void {
        this.isDisposed = true;
        if (this.controls) {
            this.unsubscribeEventListenersFromActiveControls();
  
            this.controls = undefined;
        }
        if (this.cameraFrustumHelper) {
            this.cameraFrustumHelper.Dispose();
        }
        if (this.stopTween) {
            this.domElement.removeEventListener('pointerdown', this.stopTween);
            this.domElement.removeEventListener('wheel', this.stopTween);
            document.removeEventListener('keydown', this.stopTween);
        }
    }

    /**
     * Method that returns the camera state
     *
     * Use with caution as target will have vector(0) in first person controls
     *
     * @returns {*}  {Required<CameraState>}
     */
    getCameraState(): Required<CameraState> {
        const target = new THREE.Vector3(0);
        if (this.controls instanceof CameraControlsExtended) {
            this.controls.getTarget(target);
        }
        return {
            position: this.camera.position.clone(),
            rotation: this.camera.quaternion.clone(),
            target
        };
    }

    /**
     * Initialize the viewer with orbit camera controls for a given position and target
     * Controls will then orbit around the given target
     *
     * @param {THREE.Vector3} position the position of the camera
     * @param {THREE.Vector3} target the orbit target, if not provided will be set to (0,0,0)
     * @returns {CameraControlsExtended} the controls created
     */
    initializeOrbitControls = (position: THREE.Vector3, target: THREE.Vector3 = new THREE.Vector3(0)) => {
        const controls = new CameraControlsExtended(this.getCamera(), this.domElement, this.trackEventBy);
        controls.setLookAt(position.x, position.y, position.z, target.x, target.y, target.z);

        controls.saveState();
        controls.update(0.0);
        controls.addEventListener('update', this.onCameraPoseUpdated);
        controls.dampingFactor = 1;
        this.setControls(controls);
        return controls;
    };

    /**
     * Initialize the first person camera controls for a given position and rotation
     *
     * @param {THREE.Vector3} position the position the camera should have
     * @param {THREE.Vector3} rotation the rotation the camera should have, if not provided will be set to (0,0,0)
     * @param {PixelIntersectionQuery} pointQueryFunc this is a function that
     * returns the distance to the 1st object intersected by a viewing ray shot through the given pixel (cx, cy)
     * @returns {FirstPersonCameraControls} the controls created
     */
    initializeFirstPersonControlsUsingRotation = (
        position: THREE.Vector3,
        rotation: THREE.Vector3 = new THREE.Vector3(0),
        pointQueryFunc?: PixelIntersectionQuery
    ) => {
        const fpsCameraControls = new FirstPersonCameraControls(
            this.getCamera(),
            this.domElement,
            pointQueryFunc,
            this.trackEventBy
        );
        fpsCameraControls.setPosition(position);
        fpsCameraControls.addEventListener('update', this.onCameraPoseUpdated);
        fpsCameraControls.setRotation(rotation);
        this.setControls(fpsCameraControls);
        return fpsCameraControls;
    };

    /**
     * Initialize the first person camera controls for a given position and target
     *
     * @param {THREE.Vector3} position the position the camera should have
     * @param {THREE.Vector3} target the target to look at in world space
     * @param {PixelIntersectionQuery} pointQueryFunc this is a function that
     * returns the distance to the 1st object intersected by a viewing ray shot through the given pixel (cx, cy)
     * @returns {FirstPersonCameraControls} the controls created
     */
    initializeFirstPersonControlsUsingTarget = (
        position: THREE.Vector3,
        target: THREE.Vector3,
        pointQueryFunc?: PixelIntersectionQuery
    ) => {
        const fpsCameraControls = new FirstPersonCameraControls(
            this.getCamera(),
            this.domElement,
            pointQueryFunc,
            this.trackEventBy
        );
        fpsCameraControls.setPosition(position);
        fpsCameraControls.lookAt(target);
        fpsCameraControls.addEventListener('update', this.onCameraPoseUpdated);
        this.setControls(fpsCameraControls);
        return fpsCameraControls;
    };

    /**
     * Method for invoking necessary updates when camera matrix changes
     */
    onCameraPoseUpdated = () => {
        this.nearAndFarNeedUpdate = true;
    };
}
