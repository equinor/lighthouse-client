import { SearchResult } from '../../Service/SearchApi';
import { SearchResponse } from './types';
import { searchPushItem } from './utils';

export function proCoSysSearchMapper(response?: SearchResponse): SearchResult[] {
    if (!response) return [];

    return response.items.reduce((acc, item) => {
        if (item.tag) {
            return searchPushItem(acc, item, {
                type: 'tag',
                title: 'Tags',
                color: '#0084C4',
                action: (id: string) => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('projectName', item.project);
                    window.history.replaceState({}, '', url);
                    window.location.hash = `tagDetails/${id}`;
                },
                mapper: (item) => {
                    const { tagNo, description } = item.tag;
                    return {
                        key: item.key,
                        id: tagNo,
                        title: tagNo,
                        description: description,
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