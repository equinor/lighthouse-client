import { Action } from '../Types/Action';
import { FilterMap } from '../Types/Helpers';
import { actionParser } from './ActionParser';
import { lexer } from './Lexer';
import { tokenCreator } from './TokenCreator';
import { createFilter } from './TokenFilter';

export function createActions(text: string, filterMap?: FilterMap): Action[] {
    const tokens = lexer(text, tokenCreator);
    const tokenFilter = filterMap && createFilter(filterMap);
    return actionParser(tokens, tokenFilter);
}
