import { NavigateFunction } from 'react-router';
import { SearchItem, SearchResult } from '../../Service/SearchApi';
import { SearchItems } from './types';

export function searchPushItem(
    acc: SearchResult[],
    item: SearchItems,
    config: {
        type: string;
        title: string;
        color: string;
        appAction?(id: string, navigate: NavigateFunction): void;
        mapper(item: SearchItems): SearchItem;
        action(id: string): void;
    }
): SearchResult[] {
    const current = acc.find((i) => i.type === config.type);

    if (current) {
        current.items.push(config.mapper(item));
        current.count = current?.count || 0 + 1;
    } else {
        acc.push({
            type: config.type,
            title: config.title,
            color: config.color,
            appAction: config.appAction,
            action: config.action,
            count: 0,
            items: [config.mapper(item)],
        });
    }
    return acc;
}
