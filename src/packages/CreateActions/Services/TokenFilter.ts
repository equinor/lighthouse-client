import { FilterMap, TokenFilter } from '../Types/Helpers';
import { Token } from '../Types/Token';

export function createFilter(filterMap: FilterMap): TokenFilter {
    const map = typeof filterMap === 'function' ? filterMap() : filterMap;
    return (tokens: Token[]) =>
        tokens.filter((token) => (token.type === 'query' ? true : map.includes(token.key)));
}
