/* eslint max-classes-per-file: "off" -- need more classes defined for testing */

import { THREE } from '@cognite/reveal';
import { AabbModel } from '../../services/generated/EchoHierarchyApiClient';
import { getDomPositionFor3DPosition, moveToAndLookAt } from '../../utils/cameraUtils';

describe('getDomPositionFor3DPosition', () => {
    const cases = [
        {
            position3D: new THREE.Vector3(0, 0, 0),
            cameraPosition: new THREE.Vector3(0, 0, -1),
            expectedResult: new THREE.Vector2(500, 500)
        },
        {
            position3D: new THREE.Vector3(0, 0, -10),
            cameraPosition: new THREE.Vector3(0, 0, -1),
            expectedResult: undefined
        }
    ];

    test.each(cases)('given %p dom position is %p', ({ position3D, cameraPosition, expectedResult }) => {
        if (!position3D || !cameraPosition) {
            throw new Error('Parameter needs to be set');
        }

        const camera = new THREE.PerspectiveCamera();
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        const canvas = document.createElement('canvas');
        canvas.getBoundingClientRect = jest
            .fn()
            .mockReturnValue({ top: 0, left: 0, height: 1000, width: 1000, bottom: 0, right: 0 } as DOMRect);

        const renderer = new THREE.WebGLRenderer({ canvas });

        const domPosition = getDomPositionFor3DPosition(camera, renderer, position3D);
        expect(domPosition).toEqual(expectedResult);
    });
});

describe('moveToAndLookAt', () => {
    test('check that camera is moved', () => {
        const aabb = {
            min: {
                x: 1,
                y: 2,
                z: 1
            },
            max: {
                x: 11,
                y: 12,
                z: 1
            }
        } as AabbModel;

        const camera = new THREE.PerspectiveCamera();
        const newWorldPosition = moveToAndLookAt(camera, aabb);

        expect(newWorldPosition).toEqual(new THREE.Vector3(6, 1, 19.445069205095585));
    });

    test('when bounds are very small: positions the camera at least 0.5 meters away', () => {
        const aabb = {
            max: {
                x: 276.74362,
                y: 95.855995,
                z: 516.8126
            },
            min: {
                x: 276.72433,
                y: 95.828995,
                z: 516.78143
            }
        } as AabbModel;

        const camera = new THREE.PerspectiveCamera();
        const newWorldPosition = moveToAndLookAt(camera, aabb);
        const aabbCenter = new THREE.Vector3(
            aabb.max.x + aabb.min.x / 2,
            aabb.max.y + aabb.min.y / 2,
            aabb.max.z + aabb.min.z / 2
        );

        expect(newWorldPosition).toEqual(new THREE.Vector3(276.733975, 516.797015, -95.342495));

        expect(newWorldPosition.sub(aabbCenter).length()).toBeGreaterThan(50);
    });
});
