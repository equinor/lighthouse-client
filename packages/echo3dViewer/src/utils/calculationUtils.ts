import { THREE } from '@cognite/reveal';
import { AabbModel } from '../services/generated/EchoHierarchyApiClient';
/**
 * Method for covering number from degrees to radian
 *
 * @param {number} deg the degree to convert
 * @returns {*}  {number} the radian
 */
export function degreesToRads(deg: number): number {
    return (deg * Math.PI) / 180.0;
}

/**
 * Method for covering number from radian to degrees
 *
 * @param {number} rad the radian to convert
 * @returns {*}  {number} the covered radian in degrees
 */
export function radsToDegrees(rad: number): number {
    return (rad * 180) / Math.PI;
}

/**
 * Method for getting the vertical field of view (fov) and in radians
 *
 * @param {THREE.PerspectiveCamera | { fov: number }} camera the camera or the camera frustum vertical field of view
 * @returns {*}  {number} the vertical fov in radians
 */
export function verticalFovRad(camera: THREE.PerspectiveCamera | { fov: number }): number {
    return degreesToRads(camera.fov);
}

/**
 * Method for getting the horizontal field of view (fov) and in radians
 *
 * @param {THREE.PerspectiveCamera | { fov: number; aspect: number }} camera the camera or
 * the camera frustum vertical field of view and the camera frustum aspect ratio
 * @returns {*}  {number} the vertical fov in radians
 */
export function horizontalFovRad(camera: THREE.PerspectiveCamera | { fov: number; aspect: number }): number {
    const verticalFovInRad = verticalFovRad(camera);
    return 2 * Math.atan(Math.tan(verticalFovInRad / 2) * camera.aspect);
}

/**
 *  Method for turing a screen point position into an angle in radian
 *
 * @param {number} screenPos the screen position
 * @param {number} screenMaxPos the max screen position
 * @param {number} fieldOfViewInRad the field of view in rad
 * @returns {*}  {number} the screen point to angle in radian
 */
export function screenPointToAngleInRad(screenPos: number, screenMaxPos: number, fieldOfViewInRad: number): number {
    const halfScreenMaxPos = screenMaxPos / 2.0;
    const tanHalfFov = Math.tan(fieldOfViewInRad / 2);
    const distanceFromCameraToScreenPlane = halfScreenMaxPos / tanHalfFov;
    const screenPosVerticalFromCenter = screenPos - halfScreenMaxPos;
    // Same as Mathf.Atan(screenPosVerticalFromCenter / distanceFromCameraToScreenPlane) * Mathf.Rad2Deg;
    return Math.atan2(screenPosVerticalFromCenter, distanceFromCameraToScreenPlane);
}

/**
 *  Method for turing a screen point position into an angle X in radian
 *
 * @param {THREE.Vector2} screenPos the screen position
 * @param {THREE.Vector2} screenSize the screen size
 * @param {THREE.PerspectiveCamera | { fov: number }} camera the camera or the camera frustum vertical field of view
 * @returns {number} the screen point to angle X in radian
 */
export function screenPointToAngleXInRad(
    screenPos: THREE.Vector2,
    screenSize: THREE.Vector2,
    camera: THREE.PerspectiveCamera | { fov: number }
): number {
    const screenPosY = screenSize.y - screenPos.y; // Correct for inverted direction
    const verticalFovInRad = degreesToRads(camera.fov);
    return screenPointToAngleInRad(screenPosY, screenSize.y, verticalFovInRad);
}

/**
 *  Method for turing a screen point position into an angle Y in radian
 *
 * @param {THREE.Vector2} screenPos the screen position
 * @param {THREE.Vector2} screenSize the screen size
 * @param {THREE.PerspectiveCamera | { fov: number }} camera the camera or the camera frustum vertical field of view and the camera frustum aspect ratio
 * @returns {number} the screen point to angle Y in radian
 */
export function screenPointToAngleYInRad(
    screenPos: THREE.Vector2,
    screenSize: THREE.Vector2,
    camera: THREE.PerspectiveCamera | { fov: number; aspect: number }
): number {
    const screenPosX = screenPos.x;
    const verticalFovInRad = degreesToRads(camera.fov);
    const horizontalFovInRad = 2 * Math.atan(Math.tan(verticalFovInRad / 2) * camera.aspect);
    return screenPointToAngleInRad(screenPosX, screenSize.x, horizontalFovInRad);
}

/**
 * Returns value clamped to the inclusive range of min and max.
 *
 * @param {number} value the value to clamp
 * @param {number} min the min value to clamp within
 * @param {number} max the max value to clamp within
 * @returns {number} the clamped number
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

/**
 * Clamp an angle to be within min and max. It will try to "adjust the angle by moving it to within the range."
 *
 * Note: There might be bugs here.
 *
 * @param {number} angle the angle
 * @param  {number} min the min value, default is PI
 * @param {number}  max the max value, default is PI
 * @returns  {number} the camped angle
 */
export function clampAngle(angle: number, min: number = Math.PI, max: number = Math.PI): number {
    if (max < min) {
        return angle;
    }
    let angleAdjusted = angle;
    const offset = max - min;
    do {
        if (angleAdjusted < -offset) angleAdjusted += offset;
        if (angleAdjusted > offset) angleAdjusted -= offset;
    } while (angleAdjusted < -offset || angleAdjusted > offset);

    return clamp(angle, min, max);
}

/**
 * Method for converting world coordinates to normalized viewport coordinates
 *
 * @param {THREE.WebGLRenderer}renderer the renderer in use
 * @param {THREE.PerspectiveCamera}camera the camera to use
 * @param {THREE.Vector3} position3D the 3d position to use
 * @returns {THREE.Vector2} the normalized viewport coordinates
 */
export function worldToNormalizedViewportCoordinates(
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera,
    position3D: THREE.Vector3
): THREE.Vector2 {
    const renderSize = new THREE.Vector2();
    const position = new THREE.Vector3();
    const canvas = renderer.domElement;
    const pixelRatio = renderer.getPixelRatio();
    renderer.getSize(renderSize);

    // map to normalized device coordinate (NDC) space
    position.copy(position3D);
    position.project(camera);

    // Compute 'virtual' canvas size
    const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect();
    const scaleX = renderSize.width / canvasWidth;
    const scaleY = renderSize.height / canvasHeight;

    // map to 2D screen space taking into account that different devices
    // have different pixel ratios.
    return new THREE.Vector2(
        ((position.x + 1) / (scaleX * 2)) * pixelRatio,
        ((-position.y + 1) / (scaleY * 2)) * pixelRatio
    );
}

/**
 * Method for getting a 3d position given an aabb model
 *
 * @param {AabbModel} aabb the aabb model to get position to
 * @returns {THREE.Vector3}the 3d position for a given aabb model
 */
export const get3dPositionFromAabbMinMaxValues = (aabb: AabbModel): THREE.Vector3 => {
    return new THREE.Vector3(
        (aabb.max.x + aabb.min.x) / 2,
        (aabb.max.z + aabb.min.z) / 2,
        -(aabb.max.y + aabb.min.y) / 2
    );
};
