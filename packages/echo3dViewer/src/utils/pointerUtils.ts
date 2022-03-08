/**
 *  Check if a pointer event is a primary click
 *  with left mouse button OR a touch contact
 *
 * @exports
 * @param {PointerEvent} event the event to check
 * @returns {*}  {boolean} flag indicating if pointer event is primary or not
 */
export const isPrimaryClick = (event: PointerEvent): boolean => {
    const leftMouseOrTouchContact = 0;
    return event.isPrimary && event.button === leftMouseOrTouchContact;
};
