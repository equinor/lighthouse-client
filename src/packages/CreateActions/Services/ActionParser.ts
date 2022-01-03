import { Action } from '../Types/Action';
import { TokenFilter } from '../Types/Helpers';
import { Token } from '../Types/Token';

export function actionParser(tokens: Token[], tokenFilter?: TokenFilter): Action[] {
    tokens = tokenFilter ? tokenFilter(tokens) : tokens;
    let actionKey = '';
    let actionId = 0;

    function getId(key: string): string {
        const currentID = actionId;
        actionId++;
        return `${key}-${currentID}`;
    }

    function creatAction(token: Token): Action {
        actionKey = getId(token.key);
        return { ['##Id']: actionKey, key: token.key, value: token.value, query: {} };
    }

    return tokens.reduce((actions, token) => {
        if (token.type === 'tag') {
            actions = [...actions, creatAction(token)];
        } else if (token.type === 'query' && actionKey !== '') {
            const index = actions.findIndex((action) => action['##Id'] === actionKey);
            if (index !== -1) {
                actions[index].query = { ...actions[index].query, [token.key]: token.value };
            }
        }

        return actions;
    }, [] as Action[]);
}
