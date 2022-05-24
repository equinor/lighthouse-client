import Gradient from 'javascript-color-gradient';

export const getGardenColors = (midPoints: number): string[] => [
    '#F7F7F7',
    ...new Gradient()
        .setMidpoint(midPoints - 1)
        .setColorGradient('#D9E9F2', '#A8C8DE', '#73B1B5', '#E6FAEC')
        .getColors(),
    '#4BB748',
];
