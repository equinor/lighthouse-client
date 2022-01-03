import { lexer } from './Lexer';
import { tokenCreator } from './TokenCreator';

describe('Lexer ', () => {
    it('Should contain 5 tokens', () => {
        const inputText = 'tag:pt0105-pt tag>pt0105 pt doc>200hp?system=20&tag=pt4095';
        const tokens = lexer(inputText, tokenCreator);

        expect(tokens.length).toBe(5);
    });
    it('Should handle tokens with > and dash', () => {
        const token = { type: 'tag', key: 'tag', value: 'pt0105-pt' };
        const inputText = 'tag>pt0105-pt';
        const tokens = lexer(inputText, tokenCreator);
        expect(tokens).toEqual([token]);
    });
    it('Should handle tokens with : and space', () => {
        const token = { type: 'tag', key: 'tag', value: 'pt0105 pt' };
        const inputText = 'tag:pt0105 pt';
        const tokens = lexer(inputText, tokenCreator);
        expect(tokens).toEqual([token]);
    });
    it('Should handle empty string', () => {
        const inputText = '';
        const tokens = lexer(inputText, tokenCreator);
        expect(tokens).toEqual([]);
    });
    it('Should handle undefined values', () => {
        const inputText = undefined as unknown as string;
        const tokens = lexer(inputText, tokenCreator);
        expect(tokens).toEqual([]);
    });
});
