import { TokenCreator } from '../Types/Helpers';
import { Token } from '../Types/Token';

export function lexer(text: string, tokenCreator: TokenCreator): Token[] {
    const tokens: Token[] = [];
    const regExpMatchArray = text?.match(
        /(\w+):((\w+((-)?(\s)?( )?)+)(?!\w+:)(?!\w+>))+|(\w+)>((\w+((-)?(\s)?( )?)+)(?!\w+>)(?!\w+:))+|\?(\w+)=((\w+((-)?(\s)?( )?)+)(?!\w+:)(?!\w+>)(?!\w+:))+|&(\w+)=((\w+((-)?(\s)?( )?)+)(?!\w+:)(?!\w+>)(?!\w+:))+/g
    );
    if (regExpMatchArray) {
        let isQuery = false;
        regExpMatchArray.forEach((element: string) => {
            if (element.includes('>')) {
                tokens.push(tokenCreator(element, '>'));
                isQuery = false;
            }
            if (element.includes(':')) {
                tokens.push(tokenCreator(element, ':'));
                isQuery = false;
            }
            if (element.includes('?') || (element.includes('&') && isQuery)) {
                tokens.push(tokenCreator(element, '='));
                isQuery = true;
            }
        });
    }
    return tokens;
}
