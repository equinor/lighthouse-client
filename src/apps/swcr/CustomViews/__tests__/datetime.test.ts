import { DateTime } from 'luxon';
import { getLastWeeks } from '../Graph';

describe('date', () => {
    it('to return', () => {
        const lastWeeks = getLastWeeks();
        console.log(lastWeeks);
        expect(lastWeeks).toHaveLength(20);
    });
});

export {};
