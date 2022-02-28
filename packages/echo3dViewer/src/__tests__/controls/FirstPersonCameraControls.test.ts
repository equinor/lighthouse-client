import { THREE } from '@cognite/reveal';
import { FirstPersonCameraControls } from '../../controls/FirstPersonCameraControls';
import { degreesToRads } from '../../utils/calculationUtils';

const lookSpeed = Math.PI / 15; // from FirstPersonCameraControls settings

const setupSimpleCameraForTest = (): FirstPersonCameraControls => {
    const camera = new THREE.PerspectiveCamera();
    const canvas = document.createElement('canvas');

    // We cannot set canvas size in the tests, so we replace it with a mock result.
    canvas.getBoundingClientRect = jest.fn(
        () =>
            ({
                top: 10,
                left: 10,
                height: 200,
                width: 200,
                bottom: 0,
                right: 0
            } as DOMRect)
    );

    jest.spyOn(canvas, 'clientHeight', 'get').mockReturnValue(200);
    jest.spyOn(canvas, 'clientWidth', 'get').mockReturnValue(200);

    return new FirstPersonCameraControls(camera, canvas);
};

const pushPositionKey = (scc: FirstPersonCameraControls, movementSpeed: number, key: string, checkPosition = true) => {
    const keydown = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(keydown);
    scc.setMovementSpeed(movementSpeed);
    const deltaTime = 1;
    const beforeUpdate = scc.getCamera().position.clone();
    scc.update(deltaTime);
    const afterUpdate = scc.getCamera().position.clone();
    if (checkPosition) {
        expect(afterUpdate).not.toEqual(beforeUpdate);
    }
    return afterUpdate;
};

const releasePositionKey = (scc: FirstPersonCameraControls, afterUpdate: THREE.Vector3, key: string) => {
    const deltaTime = 1;
    scc.setVelocity(new THREE.Vector3(0));
    const keyup = new KeyboardEvent('keyup', { key });
    document.dispatchEvent(keyup);
    scc.update(deltaTime);
    expect(scc.getCamera().position.clone()).toEqual(afterUpdate); // We released W (and disabled velocity).
};

const pushRotationKey = (scc: FirstPersonCameraControls, key: string) => {
    const keydown = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(keydown);
    const deltaTime = 1;
    const beforeUpdateRotation = scc.getRotation().clone();

    scc.update(deltaTime);

    const afterUpdateRotation = scc.getRotation().clone();
    const afterUpdateQuaternion = scc.getQuaternion().clone();

    expect(beforeUpdateRotation).not.toEqual(afterUpdateRotation);

    return { afterUpdateRotation, afterUpdateQuaternion };
};

const releaseRotationKey = (
    scc: FirstPersonCameraControls,
    afterUpdateRotation: THREE.Vector3,
    afterUpdateQuaternion: THREE.Quaternion,
    key: string,
    deltaTime = 1
) => {
    const keyupUp = new KeyboardEvent('keyup', { key });
    document.dispatchEvent(keyupUp);

    scc.update(deltaTime);

    const afterReleaseRotation = scc.getRotation().clone();

    // Since one `FirstPersonCameraControls.update(1)` gets called we need to account for
    // deacceleration of 0.5
    expect(afterReleaseRotation.x).toBeCloseTo(afterUpdateRotation.x);
    expect(afterReleaseRotation.y).toBeCloseTo(afterUpdateRotation.y);
    expect(afterReleaseRotation.z).toBeCloseTo(afterUpdateRotation.z);
};

describe('FirstPersonCameraControls dom test', () => {
    let container: HTMLInputElement;

    beforeEach(() => {
        container = document.createElement('input');
        document.body.append(container);
    });

    afterEach(() => {
        if (container) document.body.removeChild(container);
    });

    test('W dows not move forward if active element is not body or canvas element', () => {
        container.focus();
        const scc = setupSimpleCameraForTest();
        const movementSpeed = 500;
        const keydown = new KeyboardEvent('keydown', { key: 'W' });
        document.dispatchEvent(keydown);
        scc.setMovementSpeed(movementSpeed);
        const deltaTime = 1;
        const beforeUpdate = scc.getCamera().position.clone();
        scc.update(deltaTime);
        const afterUpdate = scc.getCamera().position.clone();
        expect(afterUpdate).toEqual(beforeUpdate);

        releasePositionKey(scc, afterUpdate, 'W');
    });
});

describe('FirstPersonCameraControls keyboard controls test', () => {
    const movementSpeed = 500;
    const movementSpeedBoostFactor = 4;
    const wasdMovementCases: Array<[string, string | null, number, number, number]> = [
        ['W', 'Shift', 0, 0, -movementSpeed * movementSpeedBoostFactor],
        ['W', null, 0, 0, -movementSpeed],
        ['S', null, 0, 0, movementSpeed],
        ['A', null, -movementSpeed, 0, 0],
        ['D', null, movementSpeed, 0, 0],
        ['E', null, 0, movementSpeed / 2, 0],
        ['Q', null, 0, -movementSpeed / 2, 0],
        ['A', 'Control', 0, 0, 0],
        ['D', 'Alt', 0, 0, 0],
        ['D', 'Meta', 0, 0, 0]
    ];
    test.each(wasdMovementCases)(
        '%p(%p) moves the camera %p, %p, %p',
        (key, modifierKey, expectedX, expectedY, expectedZ) => {
            const scc = setupSimpleCameraForTest();

            if (modifierKey !== null) {
                const keydown = new KeyboardEvent('keydown', { key: modifierKey });
                document.dispatchEvent(keydown);
                window.dispatchEvent(keydown);
            }

            const checkPositionAfterUpdate = !(
                modifierKey === 'Control' ||
                modifierKey === 'Alt' ||
                modifierKey === 'Meta'
            );

            const afterUpdate = pushPositionKey(scc, movementSpeed, key, checkPositionAfterUpdate);

            expect(afterUpdate).toEqual(new THREE.Vector3(expectedX, expectedY, expectedZ));

            releasePositionKey(scc, afterUpdate, key);
        }
    );

    const arrowKeyRotationCases: Array<[string, number, number]> = [
        ['ArrowUp', lookSpeed, 0],
        ['ArrowDown', -lookSpeed, 0],
        ['ArrowLeft', 0, lookSpeed],
        ['ArrowRight', 0, -lookSpeed]
    ];
    test.each(arrowKeyRotationCases)('%p rotates camera to %p, %p', (key, expectedX, expectedY) => {
        const scc = setupSimpleCameraForTest();
        const { afterUpdateRotation, afterUpdateQuaternion } = pushRotationKey(scc, key);

        expect(afterUpdateQuaternion.x).toBeCloseTo(expectedX, 2);
        expect(afterUpdateQuaternion.y).toBeCloseTo(expectedY, 2);

        releaseRotationKey(scc, afterUpdateRotation, afterUpdateQuaternion, key, 0);
    });
});

describe('FirstPersonCameraControls PointerEvent tests', () => {
    beforeEach(() => {
        if (!global.PointerEvent) {
            // Fake a PointerEvent, as its not implemented in jsdom
            class PointerEvent extends MouseEvent {
                public pointerId?: number;

                constructor(type: string, params: PointerEventInit = {}) {
                    super(type, params);
                    this.pointerId = params.pointerId;
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- This is just a continuation of the Fake PointerEvent.
            global.PointerEvent = PointerEvent as any;
        }
        const originalWindow = { ...window };

        const devicePixelRatioGetter = jest.fn().mockReturnValue(1);

        jest.spyOn(global, 'window', 'get').mockImplementation(() =>
            Object.defineProperty({ ...originalWindow } as Window & typeof globalThis, 'devicePixelRatio', {
                get: devicePixelRatioGetter
            })
        );
    });

    const performClickAndMoveTest = (mouseButton: number, expected?: THREE.Euler | undefined): void => {
        // First, verify the input button to the test
        expect(mouseButton).toBeGreaterThanOrEqual(0);
        expect(mouseButton).toBeLessThanOrEqual(2);

        const scc = setupSimpleCameraForTest();
        scc.getDomElement().setPointerCapture = jest.fn(); // Ignore this
        const initialRotation = scc.getCamera().rotation.clone();
        const monitorCenter = { x: 110, y: 110 };

        const pointer1 = new PointerEvent('pointerdown', {
            clientX: monitorCenter.x + 10,
            clientY: monitorCenter.y,
            pointerId: 1,
            button: mouseButton
        });

        scc.getDomElement().dispatchEvent(pointer1);
        expect(scc.getPointerCache().activePointerCount()).toEqual(mouseButton === 0 || mouseButton === 2 ? 1 : 0);

        const pointer1Move = new PointerEvent('pointermove', {
            clientX: monitorCenter.x + 50,
            clientY: monitorCenter.y + 20,
            pointerId: 1
        });

        document.dispatchEvent(pointer1Move);

        const afterUpdate = scc.getCamera().rotation.clone();

        if (mouseButton === 0 || mouseButton === 2) {
            // Primary or Right-Click button
            expect(afterUpdate.x).toBeGreaterThan(initialRotation.x);
            expect(afterUpdate.y).toBeGreaterThan(initialRotation.y);
        } else {
            // middle or secondary button
            expect(afterUpdate.x).toEqual(initialRotation.x);
            expect(afterUpdate.y).toEqual(initialRotation.y);
        }

        if (expected) {
            expect(afterUpdate.x).toBeCloseTo(expected.x, 5);
            expect(afterUpdate.y).toBeCloseTo(expected.y, 5);
        }
    };

    // eslint-disable-next-line jest/expect-expect -- assertions found in performClickAndMoveTest()
    test('left-click and move rotates the camera', () => {
        const primaryButton = 0;
        performClickAndMoveTest(primaryButton);
    });

    // eslint-disable-next-line jest/expect-expect -- assertions found in performClickAndMoveTest()
    test('left-click and move rotates the camera with different ratio set', () => {
        const originalWindow = { ...window };

        const devicePixelRatioGetter = jest.fn().mockReturnValue(3);

        jest.spyOn(global, 'window', 'get').mockImplementation(() =>
            Object.defineProperty({ ...originalWindow } as Window & typeof globalThis, 'devicePixelRatio', {
                get: devicePixelRatioGetter
            })
        );
        const primaryButton = 0;
        performClickAndMoveTest(primaryButton, new THREE.Euler(0.09389859485659983, 0.17904112274778267));
    });

    // eslint-disable-next-line jest/expect-expect -- assertions found in performClickAndMoveTest()
    test('left-click and move rotates the camera with default ratio set', () => {
        const primaryButton = 0;
        performClickAndMoveTest(primaryButton, new THREE.Euler(0.09389859485659983, 0.17904112274778267));
    });

    // eslint-disable-next-line jest/expect-expect -- assertions found in performClickAndMoveTest()
    test('middle-click and move does not rotate the camera', () => {
        const middleButton = 1; // Primary button
        performClickAndMoveTest(middleButton);
    });

    // eslint-disable-next-line jest/expect-expect -- assertions found in performClickAndMoveTest()
    test('right-click and move does rotate the camera same as with left click', () => {
        const secondaryButton = 2; // Secondary button (Right click)
        performClickAndMoveTest(secondaryButton);
    });

    test('two_finger_pinch_moves_forward_when_distance_expands', () => {
        const scc = setupSimpleCameraForTest();
        scc.getDomElement().setPointerCapture = jest.fn(); // Ignore this
        const initialPosition = scc.getCamera().position.clone();
        const monitorCenter = { x: 110, y: 110 };

        const pointer1 = new PointerEvent('pointerdown', {
            clientX: monitorCenter.x + 10,
            clientY: monitorCenter.y,
            pointerId: 1
        });
        const pointer2 = new PointerEvent('pointerdown', {
            clientX: monitorCenter.x - 50,
            clientY: monitorCenter.y,
            pointerId: 2
        });
        scc.getDomElement().dispatchEvent(pointer1);
        scc.getDomElement().dispatchEvent(pointer2);
        expect(scc.getPointerCache().activePointerCount()).toEqual(2);

        const pointer1Move = new PointerEvent('pointermove', {
            clientX: monitorCenter.x + 50,
            clientY: monitorCenter.y,
            pointerId: 1
        });

        document.dispatchEvent(pointer1Move);

        const afterUpdate = scc.getCamera().position.clone();
        expect(afterUpdate).not.toEqual(initialPosition);
        expect(afterUpdate.x).toEqual(0);
        expect(afterUpdate.y).toEqual(0);
        expect(afterUpdate.z).toBeLessThan(0); // Forward is -z
    });
});

test('scroll_center_moves_forward_even_when_rotated', () => {
    const scc = setupSimpleCameraForTest();
    const movementSpeed = 500;
    scc.setMovementSpeed(movementSpeed);
    const deltaTime = 1;
    const initialPosition = scc.getCamera().position.clone();
    const monitorCenter = { x: 110, y: 110 }; //
    const wheel = new WheelEvent('wheel', {
        clientX: monitorCenter.x,
        clientY: monitorCenter.y,
        deltaY: -1
    });
    const wheel2 = new WheelEvent('wheel', {
        clientX: monitorCenter.x,
        clientY: monitorCenter.y,
        deltaY: -1
    });
    scc.getDomElement().dispatchEvent(wheel);
    scc.update(deltaTime);
    const afterUpdate = scc.getCamera().position.clone();
    expect(afterUpdate).not.toEqual(initialPosition);
    expect(afterUpdate.x).toEqual(0);
    expect(afterUpdate.y).toEqual(0);
    expect(afterUpdate.z).toBeCloseTo(-0.005); // Forward is -z

    scc.getCamera().rotateY(degreesToRads(-90)); // Rotate to the right
    scc.getCamera().updateMatrixWorld(true); // Force update matrixes.

    scc.getDomElement().dispatchEvent(wheel2);
    const afterRotatedMove = scc.getCamera().position.clone();
    expect(afterRotatedMove.x).toBeCloseTo(0.005);
    expect(afterRotatedMove.y).toEqual(afterUpdate.y);
    expect(afterRotatedMove.z).toBeCloseTo(afterUpdate.z); // We rotated, so Z should not change.
    // Run another Update. Expect no new change, since no new scroll event.
    scc.update(deltaTime);
});

test('set lookAt', () => {
    const scc = setupSimpleCameraForTest();
    const target = new THREE.Vector3(1, 0, -1); // Left forward (45 degrees)
    scc.lookAt(target);
    const updatedRotation = scc.getCamera().rotation.toVector3().clone();
    expect(updatedRotation.x).toBeCloseTo(0);
    expect(updatedRotation.y).toBeCloseTo(-degreesToRads(45));
    expect(updatedRotation.z).toBeCloseTo(0);
});

test('set and get rotation', () => {
    const fpsC = setupSimpleCameraForTest();
    const rotation = new THREE.Vector3(1, 2, 3);
    fpsC.setRotation(rotation);
    const newRotation = fpsC.getRotation();
    expect(newRotation).toEqual(rotation);
});

test('set and get position', () => {
    const scc = setupSimpleCameraForTest();
    const targetPosition = new THREE.Vector3(Math.PI, Math.PI / 2, 0);
    scc.setPosition(targetPosition.clone());
    const worldPos = scc.getPosition();
    expect(worldPos).toEqual(targetPosition);
});

test('successfully dispose of first person camera controls', () => {
    const camera = new THREE.PerspectiveCamera();
    const canvas = document.createElement('canvas');

    // We cannot set canvas size in the tests, so we replace it with a mock result.
    canvas.getBoundingClientRect = jest.fn(
        () =>
            ({
                top: 10,
                left: 10,
                height: 200,
                width: 200,
                bottom: 0,
                right: 0
            } as DOMRect)
    );

    const canvasAddEventListenerSpy = jest.spyOn(canvas, 'addEventListener');
    const canvasRemoveEventListenerSpy = jest.spyOn(canvas, 'removeEventListener');
    const fpsC = new FirstPersonCameraControls(camera, canvas);

    expect(canvasAddEventListenerSpy).toBeCalledTimes(2);

    fpsC.dispose();

    expect(canvasRemoveEventListenerSpy).toBeCalledTimes(2);
});

test('Joystick - expect movement up when move up i called', () => {
    const camera = new THREE.PerspectiveCamera();
    const canvas = document.createElement('canvas');

    // We cannot set canvas size in the tests, so we replace it with a mock result.
    canvas.getBoundingClientRect = jest.fn(
        () =>
            ({
                top: 10,
                left: 10,
                height: 200,
                width: 200,
                bottom: 0,
                right: 0
            } as DOMRect)
    );

    const fpsC = new FirstPersonCameraControls(camera, canvas);

    fpsC.setMoveUp(true);

    const deltaTime = 1;
    const beforeUpdate = fpsC.getCamera().position.clone();
    fpsC.update(deltaTime);
    const afterUpdate = fpsC.getCamera().position.clone();

    expect(afterUpdate).not.toEqual(beforeUpdate);
    expect(afterUpdate).toEqual(new THREE.Vector3(0, 3, 0));
});

test('Joystick - expect movement down when move down i called', () => {
    const camera = new THREE.PerspectiveCamera();
    const canvas = document.createElement('canvas');

    // We cannot set canvas size in the tests, so we replace it with a mock result.
    canvas.getBoundingClientRect = jest.fn(
        () =>
            ({
                top: 10,
                left: 10,
                height: 200,
                width: 200,
                bottom: 0,
                right: 0
            } as DOMRect)
    );

    const fpsC = new FirstPersonCameraControls(camera, canvas);

    fpsC.setMoveDown(true);

    const deltaTime = 1;
    const beforeUpdate = fpsC.getCamera().position.clone();
    fpsC.update(deltaTime);
    const afterUpdate = fpsC.getCamera().position.clone();

    expect(afterUpdate).not.toEqual(beforeUpdate);
    expect(afterUpdate).toEqual(new THREE.Vector3(0, -3, 0));
});

test('Joystick - expect movement when joystick dragged', () => {
    const camera = new THREE.PerspectiveCamera();
    const canvas = document.createElement('canvas');

    // We cannot set canvas size in the tests, so we replace it with a mock result.
    canvas.getBoundingClientRect = jest.fn(
        () =>
            ({
                top: 10,
                left: 10,
                height: 200,
                width: 200,
                bottom: 0,
                right: 0
            } as DOMRect)
    );

    const fpsC = new FirstPersonCameraControls(camera, canvas);
    const moveVector = new THREE.Vector3(1, 0, 0);
    const radian = 2;
    const force = 3;
    moveVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), radian);
    fpsC.setMoveDirection(moveVector, force > 10 ? 10 : force / 10);

    const deltaTime = 1;
    const beforeUpdate = fpsC.getCamera().position.clone();
    fpsC.update(deltaTime);
    const afterUpdate = fpsC.getCamera().position.clone();

    expect(afterUpdate).not.toEqual(beforeUpdate);
    expect(afterUpdate).toEqual(new THREE.Vector3(-0.749064305784856, 0, -1.6367353682862273));
});
