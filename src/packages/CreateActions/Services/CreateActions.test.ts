import { createActions } from './CreateActions';

describe('CreateActions ', () => {
    it('Should contain 2 actions', () => {
        const inputText = 'tag>pt0105-pt?system=20&discipline=L doc>200hp&test=hello';
        const actions = createActions(inputText);

        expect(actions.length).toBe(2);
        expect(actions[0]['##Id']).toBe('tag-0');
        expect(actions[0].query['discipline']).toBe('L');
        expect(actions[1]['##Id']).toBe('doc-1');
        expect(actions[1].query).toEqual({});
    });
});
