import { assertNever } from '../../utils/assertNeverHelper';

describe('assertNever', () => {
    test('assertNever should throw error', () => {
        expect(() => assertNever({ id: 123 } as never)).toThrow();
    });
});
