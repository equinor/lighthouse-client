import Gradient from 'javascript-color-gradient';

export const getGardenColors = (midPoints: number): string[] => [
    '#F7F7F7',
    ...new Gradient()
        .setMidpoint(midPoints - 2)
        .setColorGradient(
            '#D9E9F2',
            '#A8C8DE',
            '#73B1B5',
            '#E6FAEC',
            '#DCAB6A',
            '#FFC67A',
            '#73B1B5',
            '#FFE7D6',
            '#6D889A',
            '#FF92A8'
        )
        .getColors(),
    '#4BB748',
];
