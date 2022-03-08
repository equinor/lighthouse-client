import { THREE } from '@cognite/reveal';
import { normalizeCursorCoordinatesForThreeScreen } from '../../utils/mouseEventOffset';

test('normalizeCoordinates_whenOffset_HasTopLeftOffset', () => {
    const x = 10;
    const y = 10;
    const width = 10;
    const height = 10;

    const result = normalizeCursorCoordinatesForThreeScreen(
        { clientX: x, clientY: y },
        { height, width, left: 10, top: 10 }
    );

    expect(result).toEqual(new THREE.Vector2(-1, 1));
});

test('normalizeCoordinates_whenGivenValuesAccountingForOffset_ReturnsCenterCoordinate', () => {
    const offsetLeft = 10;
    const offsetTop = 10;
    const x = 15;
    const y = 15;
    const width = 10;
    const height = 10;

    const result = normalizeCursorCoordinatesForThreeScreen(
        { clientX: x, clientY: y },
        { height, width, left: offsetLeft, top: offsetTop }
    );

    expect(result).toEqual(new THREE.Vector2(0, 0));
});
