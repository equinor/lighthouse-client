import { Token } from './Token';

export type TokenCreator = (element: string, identifier: string) => Token;
export type TokenFilter = (tokens: Token[]) => Token[];
export type FilterMap = (() => string[]) | string[];
