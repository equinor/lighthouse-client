import { SearchItem, SearchResult } from '../Service/SearchApi';
import { SearchItems, SearchResponse } from '../Types/ProcoSysSearch';

export function searchMapper(response?: SearchResponse): SearchResult[] {
    if (!response) return [];

    return response.items.reduce((acc, item) => {
        if (item.tag) {
            return searchPushItem(acc, item, {
                type: 'tag',
                title: 'Tags',
                color: '#0084C4',
                action: (id: string) => {
                    window.location.hash = `tagDetails/${id}`;
                },
                mapper: (item) => {
                    const { tagNo, description } = item.tag;
                    return {
                        key: item.key,
                        id: tagNo,
                        title: tagNo,
                        description,
                        objects: item.tag,
                    };
                },
            });
        }
        if (item.mcPkg) {
            return searchPushItem(acc, item, {
                type: 'mcPkg',
                title: 'McPkgs',
                color: '#0084C4',
                action: (id: string) => {
                    window.location.hash = `mcDetails/${id}`;
                },
                mapper: (item) => {
                    const { mcPkgNo, description } = item.mcPkg;
                    return {
                        key: item.key,
                        id: mcPkgNo,
                        title: mcPkgNo,
                        description,
                        objects: item.tag,
                    };
                },
            });
        }
        if (item.commPkg) {
            return searchPushItem(acc, item, {
                type: 'commPkg',
                title: 'CommPkgs',
                color: '#0084C4',
                action: (id: string) => {
                    window.location.hash = `handoverDetails/${id}`;
                },
                mapper: (item) => {
                    const { commPkgNo, description } = item.commPkg;
                    return {
                        key: item.key,
                        id: commPkgNo,
                        title: commPkgNo,
                        description,
                        objects: item.tag,
                    };
                },
            });
        }
        if (item.punchItem) {
            return searchPushItem(acc, item, {
                type: 'punchItem',
                title: 'PunchItem',
                color: '#0084C4',
                action: (id: string) => {
                    window.location.hash = `punchDetails/${id}`;
                },
                mapper: (item) => {
                    const { punchItemNo, description } = item.punchItem;
                    return {
                        key: item.key,
                        id: punchItemNo,
                        title: punchItemNo,
                        description,
                        objects: item.tag,
                    };
                },
            });
        }
        return acc;
    }, [] as SearchResult[]);
}

function searchPushItem(
    acc: SearchResult[],
    item: SearchItems,
    config: {
        type: string;
        title: string;
        color: string;
        mapper(item: SearchItems): SearchItem;
        action(id: string): void;
    }
) {
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
            count: 0,
            items: [],
        });
    }
    return acc;
}
