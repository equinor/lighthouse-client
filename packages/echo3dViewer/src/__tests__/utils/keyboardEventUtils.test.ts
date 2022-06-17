import { isInputEvent } from '../../utils/keyboardEventUtils';

describe('isInputEvent', () => {
    test('Ensure input events are handled as inputEvents', () => {
        const textArea = document.createElement('input');
        document.body.append(textArea);
        textArea.focus();
        const event = new KeyboardEvent('keydown', { key: 'W' });
        textArea.dispatchEvent(event);

        expect(event.target).toBe(textArea);
        expect(isInputEvent(event)).toBeTruthy();
        document.body.removeChild(textArea);
    });
    test('Ensure non-input element events return false', () => {
        const link = document.createElement('a');
        document.body.append(link);
        link.focus();
        const event = new KeyboardEvent('keydown', { key: 'W' });
        link.dispatchEvent(event);

        expect(event.target).toBe(link);
        expect(isInputEvent(event)).toBeFalsy();
        document.body.removeChild(link);
    });
});
