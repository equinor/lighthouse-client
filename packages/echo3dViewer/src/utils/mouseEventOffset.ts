import { THREE } from '@cognite/reveal';

/**
 * Normalize coordinates of the event to a THREEjs screen coordinate. [-1,1]
 *
 * @param {{ clientX: number; clientY: number } | MouseEvent | PointerEvent} ev The Cursor position
 * @param {DOMRect | { width: number; height: number; left: number; top: number }} rect The Canvas rect (domElement.getBoundingClientRect())
 * @returns {THREE.Vector2} [-1,1] inclusive coordinates in x and y.
 */
export function normalizeCursorCoordinatesForThreeScreen(
    ev: { clientX: number; clientY: number } | MouseEvent | PointerEvent,
    rect: DOMRect | { width: number; height: number; left: number; top: number }
): THREE.Vector2 {
    const adjustedCoordinates = {
        x: ((ev.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((ev.clientY - rect.top) / rect.height) * -2 + 1 // Flip Y
    };

    return new THREE.Vector2(adjustedCoordinates.x, adjustedCoordinates.y);
}
