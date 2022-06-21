import { THREE } from '@cognite/reveal';
import { CameraControlsExtended } from '../controls/CameraControlsExtended';
import { FirstPersonCameraControls } from '../controls/FirstPersonCameraControls';
import { AabbModel } from '../services/generated/EchoHierarchyApiClient';
import { get3dPositionFromAabbMinMaxValues, worldToNormalizedViewportCoordinates } from './calculationUtils';

const Degree2Radian = Math.PI / 180;
const MinimumDistance = 0.5; // 50cm

/**
 * Move the input camera to make the camera look at the provided aabb model
 * This does NOT rotate the camera.
 *
 * @param {THREE.PerspectiveCamera} camera the camera to move
 * @param {AabbModel} aabb the Axis Aligned Bounding Box to move the camera to look at
 * @returns {*}  {THREE.Vector3} the new world position of the camera
 */
export const moveToAndLookAt = (camera: THREE.PerspectiveCamera, aabb: AabbModel): THREE.Vector3 => {
    const cameraDistance = 2;

    const max = new THREE.Vector3(aabb.max.x, aabb.max.y, aabb.max.y);
    const min = new THREE.Vector3(aabb.min.x, aabb.min.y, aabb.min.y);
    const size = max.sub(min);
    const highestSize = Math.max(size.x, size.y, size.z);

    const boundsCenter = get3dPositionFromAabbMinMaxValues(aabb);

    const cameraView = 2 * Math.tan(0.5 * camera.fov * Degree2Radian);
    let distance = (cameraDistance * highestSize) / cameraView + 0.5 * highestSize;

    // If we are too near try to use size as extra distance.
    if (distance < MinimumDistance) distance = Math.max(size.length() * 2, distance, MinimumDistance);

    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    const newPosition = boundsCenter.sub(cameraDirection.multiplyScalar(distance));
    camera.position.set(newPosition.x, newPosition.y, newPosition.z);

    const newWorldPosition = new THREE.Vector3();
    camera.getWorldPosition(newWorldPosition);
    return newWorldPosition;
};

// Cache for `getDomPositionFor3DPosition` to reduce object instantiations.
const getDomPositionVars = {
    cameraNormal: new THREE.Vector3(),
    cameraPosition: new THREE.Vector3(),
    point: new THREE.Vector3(),
    nearPlane: new THREE.Plane(),
    farPlane: new THREE.Plane()
};

/**
 * Calculate the DomPosition for a given camera and a 3d position
 *
 * @param { THREE.PerspectiveCamera} camera the camera to get world direction and position from
 * @param {THREE.WebGLRenderer} renderer the renderer to get dom element to work with and provide correct calculations
 * @param {THREE.Vector3} position3D the point in 3d space to get the dom position for
 * @returns {THREE.Vector2 | undefined} the point in dom space, returns undefined if point is not visible
 */
export const getDomPositionFor3DPosition = (
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    position3D: THREE.Vector3
): THREE.Vector2 | undefined => {
    const { cameraNormal, cameraPosition, point, nearPlane, farPlane } = getDomPositionVars;
    camera.getWorldDirection(cameraNormal);
    camera.getWorldPosition(cameraPosition);

    point.copy(cameraPosition).addScaledVector(cameraNormal, camera.near);
    nearPlane.setFromNormalAndCoplanarPoint(cameraNormal, point);

    point.copy(cameraPosition).addScaledVector(cameraNormal, camera.far);
    farPlane.setFromNormalAndCoplanarPoint(cameraNormal, point);

    const insideCameraPlanes =
        nearPlane.distanceToPoint(position3D) >= 0.0 && farPlane.distanceToPoint(position3D) <= 0.0;

    if (!insideCameraPlanes) return undefined;

    const normalizedViewportCoordinates = worldToNormalizedViewportCoordinates(renderer, camera, position3D);

    const renderSize = new THREE.Vector2();
    renderer.getSize(renderSize);
    const pixelRatio = renderer.getPixelRatio();

    const x = Math.round((normalizedViewportCoordinates.x * renderSize.width) / pixelRatio);
    const y = Math.round((normalizedViewportCoordinates.y * renderSize.height) / pixelRatio);

    
    if (y > 0  && x > 0 && x < renderSize.width && y < renderSize.height) {
        return new THREE.Vector2(
            x,
            y
        );
    }
    
   return undefined;
};

/**
 * Method for setting a controls position and target
 *
 * @param {FirstPersonCameraControls | CameraControlsExtended | undefined} controls the controls to update
 * @param {THREE.Vector3} position the new position
 * @param {THREE.Vector3} target the new target
 */
export const setPositionAndTargetForControls = (
    controls: FirstPersonCameraControls | CameraControlsExtended | undefined,
    position: THREE.Vector3,
    target: THREE.Vector3
) => {
    if (controls instanceof FirstPersonCameraControls) {
        controls.setPosition(position);
        controls.lookAt(target);
    } else if (controls instanceof CameraControlsExtended) {
        controls.setPosition(position.x, position.y, position.z);
        controls.setTarget(target.x, target.y, target.z);
    }
};
