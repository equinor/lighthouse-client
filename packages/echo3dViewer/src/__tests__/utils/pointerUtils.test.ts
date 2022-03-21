import { isPrimaryClick } from '../../utils/pointerUtils';

describe('isPrimaryClick', () => {
    beforeEach(() => {
        if (!global.PointerEvent) {
            // Fake a PointerEvent, as its not implemented in jsdom
            class PointerEvent extends MouseEvent {
                public isPrimary?: boolean;

                constructor(type: string, params: PointerEventInit = {}) {
                    super(type, params);
                    this.isPrimary = params.isPrimary;
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- This is just a continuation of the Fake PointerEvent.
            global.PointerEvent = PointerEvent as any;
        }
    });

    test('Pointer event is primary click', () => {
        const event = new PointerEvent('pointerdown', {
            isPrimary: true,
            button: 0
        });

        expect(isPrimaryClick(event)).toBeTruthy();
    });

    test('Pointer event is not primary click', () => {
        const event = new PointerEvent('pointerdown', {
            isPrimary: false,
            button: 0
        });

        expect(isPrimaryClick(event)).toBeFalsy();
    });
});
