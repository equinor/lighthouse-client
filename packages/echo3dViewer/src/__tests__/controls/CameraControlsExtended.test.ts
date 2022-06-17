import { THREE } from '@cognite/reveal';
// eslint-disable-next-line testing-library/no-dom-import -- react is not in this project
import { fireEvent } from '@testing-library/dom';
import CameraControls from 'camera-controls';
import { CameraControlsExtended } from '../../controls/CameraControlsExtended';

describe('CameraControlsExtended', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        CameraControls.install({ THREE });

        if (!global.PointerEvent) {
            class PointerEvent extends Event {
                public pointerType?: string;

                public buttons?: number;

                constructor(type: string, params: PointerEventInit = {}) {
                    super(type, params);
                    this.pointerType = params.pointerType;
                    this.buttons = params.buttons;
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- needed for test
            global.PointerEvent = PointerEvent as any;
        }
    });

    test('Should log mouse click navigation', () => {
        const domElement = document.createElement('canvas');
        const camera = new THREE.PerspectiveCamera();
        const trackEventBy = jest.fn();
        const controls = new CameraControlsExtended(camera, domElement, trackEventBy);

        fireEvent.pointerDown(domElement, { pointerType: 'mouse' });
        fireEvent.pointerUp(domElement, { pointerType: 'mouse' });

        expect(controls).toBeDefined();
        expect(trackEventBy).toBeCalledWith('Navigation', 'Moved', { control: 'orbit', value: 'mouse' });
    });

    test('Should log mouse touch navigation', () => {
        const domElement = document.createElement('canvas');
        const camera = new THREE.PerspectiveCamera();
        const trackEventBy = jest.fn();
        const controls = new CameraControlsExtended(camera, domElement, trackEventBy);

        fireEvent.pointerDown(domElement, { pointerType: 'touch' });
        fireEvent.pointerUp(domElement, { pointerType: 'touch' });

        expect(controls).toBeDefined();
        expect(trackEventBy).toBeCalledWith('Navigation', 'Moved', { control: 'orbit', value: 'touch' });
    });

    test('Should change cursor while dragging', () => {
        const domElement = document.createElement('canvas');
        const camera = new THREE.PerspectiveCamera();
        const trackEventBy = jest.fn();
        const controls = new CameraControlsExtended(camera, domElement, trackEventBy);
        expect(domElement.style.cursor).not.toBe('grabbing');

        domElement.dispatchEvent(new PointerEvent('pointerdown', { buttons: 1 }));
        expect(domElement.style.cursor).not.toBe('grabbing');
        document.dispatchEvent(new PointerEvent('pointermove', { buttons: 1 }));
        expect(domElement.style.cursor).toBe('grabbing');
        document.dispatchEvent(new PointerEvent('pointerup', { buttons: 1 }));
        expect(domElement.style.cursor).not.toBe('grabbing');

        domElement.dispatchEvent(new PointerEvent('pointerdown', { buttons: 1 }));
        expect(domElement.style.cursor).not.toBe('grabbing');
        document.dispatchEvent(new PointerEvent('pointermove', { buttons: 1 }));
        expect(domElement.style.cursor).toBe('grabbing');
        // Ensure pointercancel is also listened to
        document.dispatchEvent(new PointerEvent('pointercancel'));
        expect(domElement.style.cursor).not.toBe('grabbing');

        // Need controls active to listen to events
        expect(controls).toBeDefined();
    });

    test('Should log mouse pen navigation', () => {
        const domElement = document.createElement('canvas');
        const camera = new THREE.PerspectiveCamera();
        const trackEventBy = jest.fn();
        const controls = new CameraControlsExtended(camera, domElement, trackEventBy);

        fireEvent.pointerDown(domElement, { pointerType: 'pen' });
        fireEvent.pointerUp(domElement, { pointerType: 'pen' });

        expect(controls).toBeDefined();
        expect(trackEventBy).toBeCalledWith('Navigation', 'Moved', { control: 'orbit', value: 'pen' });
    });

    test('Should log wheel navigation', () => {
        const domElement = document.createElement('canvas');
        const camera = new THREE.PerspectiveCamera();
        const trackEventBy = jest.fn();
        const controls = new CameraControlsExtended(camera, domElement, trackEventBy);

        fireEvent.wheel(domElement, { pointerType: 'mouse' });

        expect(controls).toBeDefined();
        expect(trackEventBy).toBeCalledWith('Navigation', 'Moved', { control: 'orbit', value: 'mouse' });
    });
});
