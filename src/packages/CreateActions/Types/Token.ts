export type TokenType = 'tag' | 'query' | 'action';

export interface Token {
    type: TokenType;
    key: string;
    value: string;
}
