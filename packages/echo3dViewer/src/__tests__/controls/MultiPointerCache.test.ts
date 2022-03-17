import { MultiPointerCache } from '../../controls/MultiPointerCache';

describe('MultiPointerCache', () => {
    test('Successfully added pointer events to pointer cache', () => {
        const mpc = new MultiPointerCache();
        const p0 = { pointerId: 0 } as PointerEvent;
        const p1 = { pointerId: 1 } as PointerEvent;

        mpc.addOrUpdatePointer(p0);
        expect(mpc.activePointerCount()).toBe(1);
        // Update pointer
        mpc.addOrUpdatePointer(p0);
        expect(mpc.activePointerCount()).toBe(1);

        const pointer = mpc.activePointersSnapshot();
        // Add new pointer
        mpc.addOrUpdatePointer(p1);
        expect(mpc.activePointerCount()).toBe(2);

        // Check that both pointers are here
        const pointers = mpc.activePointersSnapshot();
        expect(pointer).not.toEqual(pointers); // We do not expose the original array reference.
        expect(pointers).toEqual([p0, p1]);
    });

    test('Expect activePointersSnapshot to not return original list but same content', () => {
        const mpc = new MultiPointerCache();
        const p1 = { pointerId: 0 } as PointerEvent;
        mpc.addOrUpdatePointer(p1);
        expect(mpc.activePointerCount()).toEqual(1);

        const snapshot1 = mpc.activePointersSnapshot();
        const snapshot2 = mpc.activePointersSnapshot();
        expect(snapshot1).not.toBe(snapshot2); // Expecting different reference.
        expect(snapshot1).toEqual(snapshot2); // Expecting content equality
    });

    test('Removing non existing pointers should do nothing', () => {
        const mpc = new MultiPointerCache();
        const p1 = { pointerId: 0 } as PointerEvent;

        mpc.removePointer(p1);

        expect(mpc.activePointerCount()).toEqual(0);
    });

    test('Removing existing pointers successfully', () => {
        const mpc = new MultiPointerCache();
        const p1 = { pointerId: 0 } as PointerEvent;
        mpc.addOrUpdatePointer(p1);
        expect(mpc.activePointerCount()).toBe(1);

        mpc.removePointer(p1);

        expect(mpc.activePointerCount()).toEqual(0);
    });

    test('Clearing cache should remove all events from cache', () => {
        const mpc = new MultiPointerCache();
        const p0 = { pointerId: 0 } as PointerEvent;
        const p1 = { pointerId: 1 } as PointerEvent;

        mpc.addOrUpdatePointer(p0);
        mpc.addOrUpdatePointer(p1);
        expect(mpc.activePointerCount()).toBe(2);

        mpc.clearEventCache();

        expect(mpc.activePointerCount()).toEqual(0);
    });
});
