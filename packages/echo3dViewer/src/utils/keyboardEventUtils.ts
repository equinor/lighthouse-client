/**
 * Check if a Keyboard Event is targeting an input field.
 *
 * @param { KeyboardEvent } event The keyboard event
 * @returns { boolean } True if the event is originates from an input field
 */
export function isInputEvent(event: KeyboardEvent): boolean {
    if (event.target && event.target instanceof HTMLElement) {
        const { target } = event;
        return (
            target.isContentEditable ||
            target.tagName.toLowerCase() === 'input' ||
            target.tagName.toLowerCase() === 'textarea' ||
            target.tagName.toLowerCase() === 'select' // Avoid when open dropdowns
        );
    }

    return false;
}
