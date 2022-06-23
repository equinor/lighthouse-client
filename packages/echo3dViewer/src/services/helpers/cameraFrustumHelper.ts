import { THREE } from '@cognite/reveal';

/**
 * Helps adjust Camera near and far clip planes.
 * Camera Frustum Helper can automatically adjust the clipping planes of a camera to fit a given bounding box.
 * Call @see updateCameraFrustum to update the frustum.
 *
 * Most of the code here is a slightly modified version of the code in
 * https://github.com/cognitedata/reveal/blob/9ea22fce877529017f1daf614947a16c5b40267f/viewer/packages/camera-manager/src/DefaultCameraManager.ts#L387
 * which is Copyright Cognite 2021 and licensed under the Apache License Version 2.0
 */
export class CameraFrustumHelper {
    private isDisposed = false;

    /**
     * Reusable buffers used by functions in CameraFrustumHelper to avoid allocations.
     */
    private readonly updateNearAndFarPlaneBuffers = {
        cameraPosition: new THREE.Vector3(),
        cameraDirection: new THREE.Vector3(),
        corners: new Array<THREE.Vector3>(
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3()
        )
    };

    /**
     * Reusable buffers used by functions in CameraFrustumHelper to avoid allocations.
     */
    private readonly calculateCameraFarBuffers = {
        nearPlaneCoplanarPoint: new THREE.Vector3(),
        nearPlane: new THREE.Plane()
    };

    /**
     * Dispose the CameraFrustumUtils
     */
    public Dispose() {
        this.isDisposed = true;
    }

    /**
     * Method for calculating bounding box corners
     *
     * @param {THREE.Box3} bbox Input bounding box
     * @param {THREE.Vector3} outBuffer Optional shared buffer to avoid allocations. Needs 8 Vector3.
     * @returns {THREE.Vector3} The result, same as the outBuffer if any.
     */
    private static getBoundingBoxCorners(bbox: THREE.Box3, outBuffer?: THREE.Vector3[]): THREE.Vector3[] {
        // eslint-disable-next-line no-param-reassign -- this is for memory optimization
        outBuffer =
            outBuffer ||
            new Array<THREE.Vector3>(
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3()
            );
        if (outBuffer.length !== 8) {
            throw new Error(`outBuffer must hold exactly 8 elements, but holds ${outBuffer.length} elements`);
        }

        const { min } = bbox;
        const { max } = bbox;
        outBuffer[0].set(min.x, min.y, min.z);
        outBuffer[1].set(max.x, min.y, min.z);
        outBuffer[2].set(min.x, max.y, min.z);
        outBuffer[3].set(min.x, min.y, max.z);
        outBuffer[4].set(max.x, max.y, min.z);
        outBuffer[5].set(max.x, max.y, max.z);
        outBuffer[6].set(max.x, min.y, max.z);
        outBuffer[7].set(min.x, max.y, max.z);
        return outBuffer;
    }

    /**
     * @param {number} near Near z plane
     * @param {THREE.Vector3} cameraPosition Camera position
     * @param {THREE.Vector3} cameraDirection Camera viewing direction
     * @param {Array<THREE.Vector3>} corners Corners of the input bounding box
     * @returns {number} Minimal far z plane to include the entire input bounding box
     */
    private calculateCameraFar(
        near: number,
        cameraPosition: THREE.Vector3,
        cameraDirection: THREE.Vector3,
        corners: Array<THREE.Vector3>
    ): number {
        const { nearPlane, nearPlaneCoplanarPoint } = this.calculateCameraFarBuffers;

        nearPlaneCoplanarPoint.copy(cameraPosition).addScaledVector(cameraDirection, near);
        nearPlane.setFromNormalAndCoplanarPoint(cameraDirection, nearPlaneCoplanarPoint);
        let far = -Infinity;
        for (let i = 0; i < corners.length; ++i) {
            if (nearPlane.distanceToPoint(corners[i]) >= 0) {
                const dist = corners[i].distanceTo(cameraPosition);
                far = Math.max(far, dist);
            }
        }
        far = Math.max(near * 2, far);

        return far;
    }

    /**
     * Method for calculating z of the near plane
     *
     * @param {THREE.PerspectiveCamera} camera Camera representation
     * @param {THREE.Box3} combinedBbox Combined bounding box
     * @param {THREE.Vector3} cameraPosition Camera position
     * @returns {number} Near z plane
     */
    private static calculateCameraNear(
        camera: THREE.PerspectiveCamera,
        combinedBbox: THREE.Box3,
        cameraPosition: THREE.Vector3
    ): number {
        // it is assumed that distance to the corner of the nearplane is the min distance to the box
        let near = combinedBbox.distanceToPoint(cameraPosition);
        near /= Math.sqrt(1 + Math.tan(((camera.fov / 180) * Math.PI) / 2) ** 2 * (camera.aspect ** 2 + 1));
        near = Math.max(0.1, near);

        return near;
    }

    /**
     * Update the camera near and far clip planes.
     * This method is a bit costly so you should only invoke it if the camera has moved/rotated.
     *
     * @param {THREE.PerspectiveCamera} camera Camera
     * @param {THREE.Box3} combinedBbox Combined bounding box
     * @returns {void}
     */
    public updateCameraNearAndFar(camera: THREE.PerspectiveCamera, combinedBbox: THREE.Box3): void {
        // See https://stackoverflow.com/questions/8101119/how-do-i-methodically-choose-the-near-clip-plane-distance-for-a-perspective-proj
        if (this.isDisposed) {
            return;
        }

        const { cameraPosition, cameraDirection, corners } = this.updateNearAndFarPlaneBuffers;
        CameraFrustumHelper.getBoundingBoxCorners(combinedBbox, corners);

        camera.getWorldPosition(cameraPosition);
        camera.getWorldDirection(cameraDirection);

        // 1. Compute nearest to fit the whole bbox (the case
        // where the camera is inside the box is ignored for now)
        let near = CameraFrustumHelper.calculateCameraNear(camera, combinedBbox, cameraPosition);

        // 2. Compute the far distance to the distance from camera to furthest
        // corner of the bounding box that is "in front" of the near plane
        const far = this.calculateCameraFar(near, cameraPosition, cameraDirection, corners);

        // 3. Handle when camera is inside the model by adjusting the near value
        if (combinedBbox.containsPoint(cameraPosition)) {
            near = Math.min(0.1, far / 1000.0);
        }

        // Apply
        camera.near = near;
        camera.far = far;
        camera.updateProjectionMatrix();
    }
}
