import { CancelError } from '@esfx/async-canceltoken';
import { isIntentionallyCancelled } from '../../utils/errorHandingUtils';

const globalConsoleMethod = global.console;
const warnLog = jest.fn();
let windowSpy: jest.SpyInstance<Window, []> | undefined;
beforeAll(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
});

beforeEach(() => {
    // removes console log in test run
    global.console = { log: jest.fn(), error: jest.fn(), warn: warnLog } as unknown as Console;
});

afterAll(() => {
    global.console = globalConsoleMethod;
    if (windowSpy) windowSpy.mockRestore();
});

describe('isIntentionallyCancelled', () => {
    test('Should return true since code error is cancel error', () => {
        const error = new CancelError();
        const isIntentionallyCancel = isIntentionallyCancelled(error);

        expect(isIntentionallyCancel).toBeTruthy();
    });

    test('Should return false since code error is unknown error', () => {
        const error = new Error();
        const isIntentionallyCancel = isIntentionallyCancelled(error);

        expect(isIntentionallyCancel).toBeFalsy();
    });

    test('Should return false and show developer message since error is unknown object', () => {
        const isIntentionallyCancel = isIntentionallyCancelled({ key: 'Some random object' });

        expect(isIntentionallyCancel).toBeFalsy();
        expect(warnLog).toBeCalled();
    });

    test('Should return false and NOT show developer message when error is unknown object and ensureErrorInput is false', () => {
        const isIntentionallyCancel = isIntentionallyCancelled({ key: 'Some random object' }, false);

        expect(isIntentionallyCancel).toBeFalsy();
        expect(warnLog).not.toBeCalled();
    });
});
