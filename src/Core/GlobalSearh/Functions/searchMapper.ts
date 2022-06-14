import { SearchItem, SearchItems, SearchResponse } from '../Types/Search';

export function searchMapper(response?: SearchResponse): SearchItem[] {
    if (!response) return [];

    return response.items.reduce((acc, item) => {
        if (item.tag) {
            return searchPushItem(acc, item, 'tag', 'Tags', 'blue');
        }
        if (item.mcPkg) {
            return searchPushItem(acc, item, 'mcPkg', 'McPkgs', 'blue');
        }
        if (item.commPkg) {
            return searchPushItem(acc, item, 'commPkg', 'CommPkgs', 'red');
        }
        if (item.punchItem) {
            return searchPushItem(acc, item, 'punchItem', 'PunchItem', 'red');
        }
        return acc;
    }, [] as SearchItem[]);
}

function searchPushItem(
    acc: SearchItem[],
    item: SearchItems,
    type: string,
    title: string,
    color: string
) {
    const current = acc.find((i) => i.type === type);

    if (current) {
        current.items.push(item[type]);
        current.count = current.count + 1;
    } else {
        acc.push({
            type,
            title,
            color,
            count: 0,
            items: [],
        });
    }
    return acc;
}
