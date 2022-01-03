import { Token } from '../Types/Token';

export function tokenCreator(element: string, identifier: string): Token {
    const tokenElements = element.split(identifier);
    if (element.includes('?') || element.includes('&'))
        return {
            type: 'query',
            key: tokenElements[0].substring(1),
            value: tokenElements[1].trim(),
        };
    return { type: 'tag', key: tokenElements[0], value: tokenElements[1].trim() };
}
