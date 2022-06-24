import { SearchItem, SearchResult } from '../../Service/SearchApi';
import { SearchItems } from './types';

export function searchPushItem<T extends Record<string, any>>(
    acc: SearchResult[],
    item: SearchItems,
    config: {
        type: string;
        title: string;
        color: string;
        descriptionProps?: T;
        descriptionComponent?: React.FC<T & { searchText: string }>;
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
            action: config.action,
            descriptionProps: config.descriptionProps,
            descriptionComponent: config.descriptionComponent as
                | React.FC<
                      Record<string, any> & {
                          searchText: string;
                      }
                  >
                | undefined,
            count: 0,
            items: [config.mapper(item)],
        });
    }
    return acc;
}
