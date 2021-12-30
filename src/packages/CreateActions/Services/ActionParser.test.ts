import { Token } from '../Types/Token';
import { actionParser } from './ActionParser';

describe('Parser ', () => {
    it('Expect to add query', () => {
        const tokens: Token[] = [
            { type: 'tag', key: 'tag', value: 'pt0105-pt' },
            { type: 'query', key: 'system', value: '20' },
        ];
        const result = actionParser(tokens);
        expect(result.length).toBe(1);
        expect(result[0]['##Id']).toBe('tag-0');
        expect(result[0].query).toEqual({ system: '20' });
    });
    it('should handle multiple actions and to add query', () => {
        const tokens: Token[] = [
            { type: 'tag', key: 'tag', value: 'pt0105-pt' },
            { type: 'query', key: 'system', value: '20' },
            { type: 'tag', key: 'doc', value: '2058-ot' },
            { type: 'query', key: 'system', value: '20' },
            { type: 'query', key: 'discipline', value: 'L' },
            { type: 'tag', key: 'tag', value: 'A-72' },
        ];

        const actions = [
            {
                '##Id': 'tag-0',
                key: 'tag',
                query: { system: '20' },
                value: 'pt0105-pt',
            },
            {
                '##Id': 'doc-1',
                key: 'doc',
                query: { discipline: 'L', system: '20' },
                value: '2058-ot',
            },
            {
                '##Id': 'tag-2',
                key: 'tag',
                query: {},
                value: 'A-72',
            },
        ];
        const result = actionParser(tokens);
        expect(result.length).toBe(3);
        expect(result).toEqual(actions);
    });
});
