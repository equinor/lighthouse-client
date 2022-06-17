import { THREE } from '@cognite/reveal';
// eslint-disable-next-line testing-library/no-dom-import -- react is not in this project
import { fireEvent } from '@testing-library/dom';
import CameraControls from 'camera-controls';
import { CameraControlsExtended } from '../../controls/CameraControlsExtended';

describe('sdf', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        CameraControls.install({ THREE });
    });

    test('Should dolly forward when E key is pressed', () => {
        const domElement = document.createElement('canvas');
        const camera = new THREE.PerspectiveCamera();
        const trackEventBy = jest.fn();
        const controls = new CameraControlsExtended(camera, domElement, trackEventBy, 10);

        const dollySpy = jest.spyOn(controls, 'dolly');

        fireEvent.keyDown(document, { keyCode: 69, target: { tagName: 'CANVAS', isContentEditable: false } });
        jest.advanceTimersByTime(100);

        fireEvent.keyUp(document, { keyCode: 69, target: { tagName: 'CANVAS', isContentEditable: false } });

        expect(controls).toBeDefined();
        expect(dollySpy).toHaveBeenCalled();
        expect(trackEventBy).toBeCalledWith('Navigation', 'Moved', { control: 'orbit', value: 'keys' });

        controls.disposeAll();
    });

    test('Should dolly backward when Q key is pressed', () => {
        const domElement = document.createElement('canvas');
        const camera = new THREE.PerspectiveCamera();
        const trackEventBy = jest.fn();
        const controls = new CameraControlsExtended(camera, domElement, trackEventBy, 10);

        const dollySpy = jest.spyOn(controls, 'dolly');

        fireEvent.keyDown(document, { keyCode: 81, target: { tagName: 'CANVAS', isContentEditable: false } });
        jest.advanceTimersByTime(100);

        fireEvent.keyUp(document, { keyCode: 81, target: { tagName: 'CANVAS', isContentEditable: false } });

        expect(controls).toBeDefined();
        expect(dollySpy).toHaveBeenCalled();
        expect(trackEventBy).toBeCalledWith('Navigation', 'Moved', { control: 'orbit', value: 'keys' });

        controls.disposeAll();
    });

    test('Should rotate faster when key is is pressed while holding shift', () => {
        const domElement = document.createElement('canvas');
        const camera = new THREE.PerspectiveCamera();
        const trackEventBy = jest.fn();
        const controls = new CameraControlsExtended(camera, domElement, trackEventBy, 10);

        const rotateSpy = jest.spyOn(controls, 'rotate');
        const SHIFT_KEYCODE = 16;
        fireEvent.keyDown(document, { keyCode: 37, target: { tagName: 'CANVAS', isContentEditable: false } });
        fireEvent.keyDown(document, {
            keyCode: SHIFT_KEYCODE,
            target: { tagName: 'CANVAS', isContentEditable: false }
        });
        jest.advanceTimersByTime(100);

        fireEvent.keyUp(document, { keyCode: SHIFT_KEYCODE, target: { tagName: 'CANVAS', isContentEditable: false } });
        fireEvent.keyUp(document, { keyCode: 37, target: { tagName: 'CANVAS', isContentEditable: false } });

        expect(controls).toBeDefined();
        const expectedShiftKeySpeedModifier = 2.5;
        expect(rotateSpy).toHaveBeenLastCalledWith(-0.008726646259971648 * expectedShiftKeySpeedModifier, 0, true);
        expect(trackEventBy).toBeCalledWith('Navigation', 'Moved', { control: 'orbit', value: 'keys' });

        controls.disposeAll();
    });

    test('Should rotate left when arrow left key is pressed', () => {
        const domElement = document.createElement('canvas');
        const camera = new THREE.PerspectiveCamera();
        const trackEventBy = jest.fn();
        const controls = new CameraControlsExtended(camera, domElement, trackEventBy, 10);

        const rotateSpy = jest.spyOn(controls, 'rotate');

        fireEvent.keyDown(document, { keyCode: 37, target: { tagName: 'CANVAS', isContentEditable: false } });
        jest.advanceTimersByTime(100);

        fireEvent.keyUp(document, { keyCode: 37, target: { tagName: 'CANVAS', isContentEditable: false } });

        expect(controls).toBeDefined();
        expect(rotateSpy).toHaveBeenLastCalledWith(-0.008726646259971648, 0, true);
        expect(trackEventBy).toBeCalledWith('Navigation', 'Moved', { control: 'orbit', value: 'keys' });

        controls.disposeAll();
    });

    test('Should rotate right when arrow right key is pressed', () => {
        const domElement = document.createElement('canvas');
        const camera = new THREE.PerspectiveCamera();
        const trackEventBy = jest.fn();
        const controls = new CameraControlsExtended(camera, domElement, trackEventBy, 10);

        const rotateSpy = jest.spyOn(controls, 'rotate');

        fireEvent.keyDown(document, { keyCode: 39, target: { tagName: 'CANVAS', isContentEditable: false } });
        jest.advanceTimersByTime(100);

        fireEvent.keyUp(document, { keyCode: 39, target: { tagName: 'CANVAS', isContentEditable: false } });

        expect(controls).toBeDefined();
        expect(rotateSpy).toHaveBeenLastCalledWith(0.008726646259971648, 0, true);
        expect(trackEventBy).toBeCalledWith('Navigation', 'Moved', { control: 'orbit', value: 'keys' });

        controls.disposeAll();
    });

    test('Should rotate upwards when arrow up key is pressed', () => {
        const domElement = document.createElement('canvas');
        const camera = new THREE.PerspectiveCamera();
        const trackEventBy = jest.fn();
        const controls = new CameraControlsExtended(camera, domElement, trackEventBy, 10);

        const rotateSpy = jest.spyOn(controls, 'rotate');

        fireEvent.keyDown(document, { keyCode: 38, target: { tagName: 'CANVAS', isContentEditable: false } });
        jest.advanceTimersByTime(100);

        fireEvent.keyUp(document, { keyCode: 38, target: { tagName: 'CANVAS', isContentEditable: false } });

        expect(controls).toBeDefined();
        expect(rotateSpy).toHaveBeenLastCalledWith(0, -0.008726646259971648, true);
        expect(trackEventBy).toBeCalledWith('Navigation', 'Moved', { control: 'orbit', value: 'keys' });

        controls.disposeAll();
    });

    test('Should rotate downwards when arrow down key is pressed', () => {
        const domElement = document.createElement('canvas');
        const camera = new THREE.PerspectiveCamera();
        const trackEventBy = jest.fn();
        const controls = new CameraControlsExtended(camera, domElement, trackEventBy, 10);

        const rotateSpy = jest.spyOn(controls, 'rotate');

        fireEvent.keyDown(document, { keyCode: 40, target: { tagName: 'CANVAS', isContentEditable: false } });
        jest.advanceTimersByTime(100);

        fireEvent.keyUp(document, { keyCode: 40, target: { tagName: 'CANVAS', isContentEditable: false } });

        expect(controls).toBeDefined();
        expect(rotateSpy).toHaveBeenLastCalledWith(0, 0.008726646259971648, true);
        expect(trackEventBy).toBeCalledWith('Navigation', 'Moved', { control: 'orbit', value: 'keys' });

        controls.disposeAll();
    });
});
