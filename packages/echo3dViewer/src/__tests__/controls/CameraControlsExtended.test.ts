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

                constructor(type: string, params: PointerEventInit = {}) {
                    super(type, params);
                    this.pointerType = params.pointerType;
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
