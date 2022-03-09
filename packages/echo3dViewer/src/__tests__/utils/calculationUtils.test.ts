import { THREE } from '@cognite/reveal';
import { AabbModel } from '../../services/generated/EchoHierarchyApiClient';
import {
    clampAngle,
    degreesToRads,
    get3dPositionFromAabbMinMaxValues,
    radsToDegrees,
    screenPointToAngleXInRad,
    worldToNormalizedViewportCoordinates
} from '../../utils/calculationUtils';

describe('worldToNormalizedViewportCoordinates', () => {
    test('calculate viewport coordinates from world coordinates', () => {
        const camera = new THREE.PerspectiveCamera();
        const all = jest.requireActual<HTMLCanvasElement>('');
        const canvas = {
            ...all,
            offsetLeft: 10,
            offsetTop: 55,
            width: 1000,
            height: 1000,
            getBoundingClientRect: (): DOMRect => {
                return { top: 55, left: 10, height: 1000, width: 1000, bottom: 0, right: 0 } as DOMRect;
            }
        };
        const renderer = new THREE.WebGLRenderer({
            canvas
        });

        const worldPosition = new THREE.Vector3(0, 0, 1);
        const viewportCoordinates = worldToNormalizedViewportCoordinates(renderer, camera, worldPosition);
        expect(viewportCoordinates.x * canvas.width).toBe(500);
        expect(viewportCoordinates.y * canvas.height).toBe(500);
    });
});

describe('clampAngle && clamp', () => {
    test('clampAngle returns input if inside clamp', () => {
        // Arrange
        const inputAngle = 1;
        const unclamped = clampAngle(inputAngle, 0, Math.PI * 1.9);
        expect(unclamped).toBe(inputAngle);
    });

    test('clampAngle returns input if max value is greater than min', () => {
        // Arrange
        const inputAngle = 1;
        const unclamped = clampAngle(inputAngle, Math.PI * 1.9, 0);
        expect(unclamped).toBe(inputAngle);
    });

    test('clampAngle actually clamps', () => {
        // Arrange
        const inputAngle = -100;
        const minClamp = -Math.PI * 2;
        const maxClamp = Math.PI * 2;
        const clamped = clampAngle(inputAngle, minClamp, Math.PI * 2);
        expect(clamped).toBeGreaterThanOrEqual(minClamp);
        expect(clamped).toBeLessThanOrEqual(maxClamp);
    });

    test('clampAngle actually clamps angle larger than offset', () => {
        // Arrange
        const inputAngle = 100;
        const minClamp = -Math.PI * 2;
        const maxClamp = Math.PI * 2;
        const clamped = clampAngle(inputAngle, minClamp, Math.PI * 2);
        expect(clamped).toBeGreaterThanOrEqual(minClamp);
        expect(clamped).toBeLessThanOrEqual(maxClamp);
    });
});

describe('get3dPositionFromAabbMinMaxValues', () => {
    test('Should calculate 3d position from aabb model', () => {
        const aabb = {
            min: {
                x: 1,
                y: 2,
                z: 3
            },
            max: {
                x: 11,
                y: 12,
                z: 13
            }
        } as AabbModel;

        const positionIn3d = get3dPositionFromAabbMinMaxValues(aabb);

        expect(positionIn3d).toEqual(new THREE.Vector3(6, 8, -7));
    });
});

describe('degreesToRads', () => {
    test('degreesToRads', () => {
        const degrees = 180;
        const expectedRads = Math.PI;

        const result = degreesToRads(degrees);
        const numDigitsTolerance = 3;
        expect(result).toBeCloseTo(expectedRads, numDigitsTolerance);
    });
});

describe('radsToDegrees', () => {
    test('radsToDegrees', () => {
        const rads = Math.PI;
        const expectedDegrees = 180;

        const result = radsToDegrees(rads);
        const numDigitsTolerance = 3;
        expect(result).toBeCloseTo(expectedDegrees, numDigitsTolerance);
    });
});

describe('screenPointToAngleXInRad', () => {
    test('screenPointToAngleXInRad', () => {
        const vFovDegrees = 60;
        const aspectRatio = 16 / 9;
        const screenSize = new THREE.Vector2(0, 20);
        const inputPosCenter = new THREE.Vector2(0, 10); // Center Y
        const inputPosUp = new THREE.Vector2(0, 0); // Top Of Screen Y
        const cameraValues = { fov: vFovDegrees, aspect: aspectRatio };
        const resultCenter = screenPointToAngleXInRad(inputPosCenter, screenSize, cameraValues);

        const resultUp = screenPointToAngleXInRad(inputPosUp, screenSize, cameraValues);

        expect(resultCenter).toBeCloseTo(0);
        expect(resultUp).toBeCloseTo(degreesToRads(vFovDegrees / 2));
    });
});
