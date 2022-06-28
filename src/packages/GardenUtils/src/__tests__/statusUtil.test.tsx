import { statusColorMap } from '../utils/helpers/statusUtils';

describe('Status util', () => {
    it('should return correct colors', () => {
        const expected = '#9e9e9e';
        const color = statusColorMap['OS'];

        expect(color).toBe(expected);
    });
});
