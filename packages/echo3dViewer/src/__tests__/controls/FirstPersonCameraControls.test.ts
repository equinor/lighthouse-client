import { THREE } from '@cognite/reveal';
import { FirstPersonCameraControls } from '../../controls/FirstPersonCameraControls';
import { degreesToRads } from '../../utils/calculationUtils';

const lookSpeed = Math.PI / 15; // from FirstPersonCameraControls settings

// Maps the pointer.button to the corresponding pointer.buttons value by index in this array.
// see: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#determining_button_states
const mouseButton2Buttons = [1, 4, 2, 8, 16, 32];

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

const pushPositionKey = (
    scc: FirstPersonCameraControls,
    movementSpeed: number,
    key: string,
    checkPosition = true,
    disabled = false
) => {
    const keydown = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(keydown);
    scc.setMovementSpeed(movementSpeed);
    const deltaTime = 1;
    const beforeUpdate = scc.getCamera().position.clone();
    scc.update(deltaTime);
    const afterUpdate = scc.getCamera().position.clone();
    if (checkPosition && !disabled) {
        expect(afterUpdate).not.toEqual(beforeUpdate);
    }
    if (disabled) {
        expect(afterUpdate).toEqual(beforeUpdate);
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

const pushRotationKey = (scc: FirstPersonCameraControls, key: string, disabled = false) => {
    const keydown = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(keydown);
    const deltaTime = 1;
    const beforeUpdateRotation = scc.getRotation().clone();

    scc.update(deltaTime);

    const afterUpdateRotation = scc.getRotation().clone();
    const afterUpdateQuaternion = scc.getQuaternion().clone();

    if (disabled) {
        expect(beforeUpdateRotation).toEqual(afterUpdateRotation);
    } else {
        expect(beforeUpdateRotation).not.toEqual(afterUpdateRotation);
    }

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

    test('W moves forward even if active element is not body or canvas element', () => {
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
        expect(afterUpdate.z).toBeLessThan(beforeUpdate.z); // -Z is forward

        releasePositionKey(scc, afterUpdate, 'W');
    });

    test('W does not move forward when disabled (active element is not body or canvas element)', () => {
        container.focus();
        const scc = setupSimpleCameraForTest();
        scc.setIsDisabled(true);

        const movementSpeed = 500;

        const keydown = new KeyboardEvent('keydown', { key: 'W' });
        document.dispatchEvent(keydown);
        scc.setMovementSpeed(movementSpeed);
        const deltaTime = 1;
        const beforeUpdate = scc.getCamera().position.clone();
        scc.update(deltaTime);
        const afterUpdate = scc.getCamera().position.clone();
        expect(afterUpdate.z).toEqual(beforeUpdate.z); // -Z is forward

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

    test.each(wasdMovementCases)('%p(%p) does not move the camera %p, %p, %p when disabled', (key, modifierKey) => {
        const scc = setupSimpleCameraForTest();
        scc.setIsDisabled(true);
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

        const afterUpdate = pushPositionKey(scc, movementSpeed, key, checkPositionAfterUpdate, true);

        expect(afterUpdate).toEqual(new THREE.Vector3(0, 0, 0));

        releasePositionKey(scc, afterUpdate, key);
    });

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

    test.each(arrowKeyRotationCases)('%p does not rotate camera to %p, %p when disabled', (key) => {
        const scc = setupSimpleCameraForTest();
        scc.setIsDisabled(true);
        const { afterUpdateRotation, afterUpdateQuaternion } = pushRotationKey(scc, key, true);

        expect(afterUpdateQuaternion.x).toEqual(0);
        expect(afterUpdateQuaternion.y).toEqual(0);

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

        const buttonsState = mouseButton2Buttons[mouseButton];
        const monitorCenter = { x: 110, y: 110 };

        const scc = setupSimpleCameraForTest();
        scc.getDomElement().setPointerCapture = jest.fn(); // Ignore this

        const initialRotation = scc.getCamera().rotation.clone();
        const initialPosition = scc.getCamera().position.clone();

        const pointer1 = new PointerEvent('pointerdown', {
            clientX: monitorCenter.x + 10,
            clientY: monitorCenter.y,
            pointerId: 1,
            button: mouseButton,
            buttons: buttonsState
        });

        expect(scc.getDomElement().style.cursor).not.toBe('grabbing');
        scc.getDomElement().dispatchEvent(pointer1);
        expect(scc.getPointerCache().activePointerCount()).toEqual(
            mouseButton === 0 || mouseButton === 1 || mouseButton === 2 ? 1 : 0
        );

        const pointer1Move = new PointerEvent('pointermove', {
            clientX: monitorCenter.x + 50,
            clientY: monitorCenter.y + 20,
            pointerId: 1,
            buttons: buttonsState
        });

        document.dispatchEvent(pointer1Move);

        expect(scc.getDomElement().style.cursor).toBe('grabbing');
        const afterUpdateRotation = scc.getCamera().rotation.clone();
        const afterUpdatePosition = scc.getCamera().position.clone();

        if (mouseButton === 0 || mouseButton === 2) {
            // Primary or Right-Click button: rotation
            expect(afterUpdateRotation.x).toBeGreaterThan(initialRotation.x);
            expect(afterUpdateRotation.y).toBeGreaterThan(initialRotation.y);

            expect(afterUpdatePosition.x).toEqual(initialPosition.x);
            expect(afterUpdatePosition.y).toEqual(initialPosition.y);
            expect(afterUpdatePosition.z).toEqual(initialPosition.z);
        } else {
            // middle button: panning
            expect(afterUpdateRotation.x).toEqual(initialRotation.x);
            expect(afterUpdateRotation.y).toEqual(initialRotation.y);
            expect(afterUpdateRotation.z).toEqual(initialRotation.z);

            expect(afterUpdatePosition.x).toBeLessThan(initialPosition.x);
            expect(afterUpdatePosition.y).toBeGreaterThan(initialPosition.y);
            expect(afterUpdatePosition.z).toEqual(initialPosition.z);
        }

        if (expected) {
            expect(afterUpdateRotation.x).toBeCloseTo(expected.x, 5);
            expect(afterUpdateRotation.y).toBeCloseTo(expected.y, 5);
        }

        const pointer1Up = new PointerEvent('pointerup', {
            clientX: monitorCenter.x + 50,
            clientY: monitorCenter.y + 20,
            pointerId: 1,
            buttons: buttonsState
        });

        document.dispatchEvent(pointer1Up);
        expect(scc.getDomElement().style.cursor).not.toBe('grabbing');
    };

    const performClickAndMoveWhenDisabledTest = (mouseButton: number): void => {
        // First, verify the input button to the test
        expect(mouseButton).toBeGreaterThanOrEqual(0);
        expect(mouseButton).toBeLessThanOrEqual(2);

        const buttonsState = mouseButton2Buttons[mouseButton];
        const monitorCenter = { x: 110, y: 110 };

        const scc = setupSimpleCameraForTest();
        scc.setIsDisabled(true);
        scc.getDomElement().setPointerCapture = jest.fn(); // Ignore this

        const initialRotation = scc.getCamera().rotation.clone();
        const initialPosition = scc.getCamera().position.clone();

        const pointer1 = new PointerEvent('pointerdown', {
            clientX: monitorCenter.x + 10,
            clientY: monitorCenter.y,
            pointerId: 1,
            button: mouseButton,
            buttons: buttonsState
        });

        scc.getDomElement().dispatchEvent(pointer1);
        expect(scc.getPointerCache().activePointerCount()).toEqual(0);

        const pointer1Move = new PointerEvent('pointermove', {
            clientX: monitorCenter.x + 50,
            clientY: monitorCenter.y + 20,
            pointerId: 1,
            buttons: buttonsState
        });

        document.dispatchEvent(pointer1Move);

        const afterUpdateRotation = scc.getCamera().rotation.clone();
        const afterUpdatePosition = scc.getCamera().position.clone();

        expect(afterUpdatePosition).toEqual(initialPosition);
        expect(afterUpdateRotation).toEqual(initialRotation);
    };

    // eslint-disable-next-line jest/expect-expect --- Tests are performed within containing function
    test('left-click and move does not rotate the camera when disabled', () => {
        performClickAndMoveWhenDisabledTest(0);
    });

    // eslint-disable-next-line jest/expect-expect --- Tests are performed within containing function
    test('right-click and move does not rotate the camera when disabled', () => {
        performClickAndMoveWhenDisabledTest(2);
    });

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
    test('middle-click and move does not rotate but pan the camera', () => {
        const middleButton = 1; // Primary button
        performClickAndMoveTest(middleButton);
    });

    // eslint-disable-next-line jest/expect-expect -- assertions found in performClickAndMoveTest()
    test('right-click and move does rotate the camera same as with left click', () => {
        const secondaryButton = 2; // Secondary button (Right click)
        performClickAndMoveTest(secondaryButton);
    });

    test('two_finger_pinch_moves_forward_when_distance_expands, but not if disabled', () => {
        const scc = setupSimpleCameraForTest();

        scc.getDomElement().setPointerCapture = jest.fn(); // Ignore this

        const initialPosition = scc.getCamera().position.clone();
        const monitorCenter = { x: 110, y: 110 };

        scc.setIsDisabled(true);

        const pointer1 = new PointerEvent('pointerdown', {
            clientX: monitorCenter.x + 10,
            clientY: monitorCenter.y,
            pointerId: 1,
            buttons: 1
        });
        const pointer2 = new PointerEvent('pointerdown', {
            clientX: monitorCenter.x - 50,
            clientY: monitorCenter.y,
            pointerId: 2,
            buttons: 1
        });
        scc.getDomElement().dispatchEvent(pointer1);
        scc.getDomElement().dispatchEvent(pointer2);

        // No active pointers when disabled
        expect(scc.getPointerCache().activePointerCount()).toEqual(0);

        scc.setIsDisabled(false);

        scc.getDomElement().dispatchEvent(pointer1);
        scc.getDomElement().dispatchEvent(pointer2);
        expect(scc.getPointerCache().activePointerCount()).toEqual(2);

        const pointer1Move = new PointerEvent('pointermove', {
            clientX: monitorCenter.x + 50,
            clientY: monitorCenter.y,
            pointerId: 1,
            buttons: 1
        });

        scc.setIsDisabled(true);

        document.dispatchEvent(pointer1Move);

        let afterUpdate = scc.getCamera().position.clone();

        /* No movement if disabled */
        expect(afterUpdate).toEqual(initialPosition);

        scc.setIsDisabled(false);

        document.dispatchEvent(pointer1Move);

        afterUpdate = scc.getCamera().position.clone();

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

    scc.setIsDisabled(true);
    scc.getDomElement().dispatchEvent(wheel);
    scc.update(deltaTime);

    let afterUpdate = scc.getCamera().position.clone();
    /* No movement if disabled */
    expect(afterUpdate).toEqual(initialPosition);

    /* Set enabled and movement should work again */
    scc.setIsDisabled(false);
    scc.getDomElement().dispatchEvent(wheel);
    scc.update(deltaTime);

    afterUpdate = scc.getCamera().position.clone();
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
    const updatedRotation = new THREE.Vector3();
    updatedRotation.setFromEuler(scc.getCamera().rotation);
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

    fpsC.disposeAll();

    expect(canvasRemoveEventListenerSpy).toBeCalledTimes(2);
});

test('Joystick - expect movement up when move up i called, but not if disabled', () => {
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

    /* Dont move if disabled */
    fpsC.setIsDisabled(true);
    fpsC.update(deltaTime);
    const updated = fpsC.getCamera().position.clone();
    expect(updated).toEqual(afterUpdate);
});

test('Joystick - expect movement down when move down i called, but not if disabled', () => {
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

    /* Dont move if disabled */
    fpsC.setIsDisabled(true);
    fpsC.update(deltaTime);
    const updated = fpsC.getCamera().position.clone();
    expect(updated).toEqual(afterUpdate);
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

test('Joystick - expect no movement when disabled and joystick is dragged', () => {
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
    fpsC.setIsDisabled(true);

    const moveVector = new THREE.Vector3(1, 0, 0);
    const radian = 2;
    const force = 3;
    moveVector.applyAxisAngle(new THREE.Vector3(0, 1, 0), radian);
    fpsC.setMoveDirection(moveVector, force > 10 ? 10 : force / 10);

    const deltaTime = 1;
    const beforeUpdate = fpsC.getCamera().position.clone();
    fpsC.update(deltaTime);
    const afterUpdate = fpsC.getCamera().position.clone();

    expect(afterUpdate).toEqual(beforeUpdate);
});
