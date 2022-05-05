export type GuesstimateRanges = '0-100' | '101-500' | '501-2000' | '2001-5000' | '>5000';

export const guesstimate = new Map<GuesstimateRanges, number>([
    ['0-100', 1],
    ['101-500', 2],
    ['501-2000', 3],
    ['2001-5000', 4],
    ['>5000', 5],
]);

export function calculateGuesstimateHoursGap(guesstimateHours: number): GuesstimateRanges {
    switch (true) {
        case guesstimateHours <= 100:
            return '0-100';

        case guesstimateHours <= 500:
            return '101-500';

        case guesstimateHours <= 2000:
            return '501-2000';

        case guesstimateHours <= 5000:
            return '2001-5000';

        default:
            return '>5000';
    }
}
