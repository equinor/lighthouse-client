import { SearchResult } from '../../Service/SearchApi';
import { McPkg, SearchResponse, Tag } from './types';
import { searchPushItem } from './utils';

export function proCoSysSearchMapper(response?: SearchResponse): SearchResult[] {
    if (!response) return [];

    return response.items.reduce((acc, item) => {
        if (item.tag) {
            return searchPushItem<Tag>(acc, item, {
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
                    const { tagNo, commPkgNo, mcPkgNo, disciplineDescription, description } =
                        item.tag;
                    return {
                        key: item.key,
                        id: tagNo,
                        title: tagNo,
                        description: [
                            { value: commPkgNo, label: 'Comm Pkg' },
                            { value: mcPkgNo, label: 'MC Pkg' },
                            { value: disciplineDescription, label: 'Discipline' },
                            { value: description, label: 'Description' },
                        ],
                        objects: item.tag,
                    };
                },
            });
        }
        if (item.mcPkg) {
            return searchPushItem<McPkg>(acc, item, {
                type: 'mcPkg',
                title: 'McPkgs',
                color: '#0084C4',
                action: (id: string) => {
                    window.location.hash = `mcDetails/${id}`;
                },

                mapper: (item) => {
                    const { mcPkgNo, commPkgNo, discipline } = item.mcPkg;
                    return {
                        key: item.key,
                        id: mcPkgNo,
                        title: mcPkgNo,

                        description: [
                            { value: commPkgNo, label: 'Comm Pkg' },
                            { value: discipline, label: 'Discipline' },
                        ],
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
                        description: [{ value: description, label: 'Description' }],
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
                    const { punchItemNo, tagNo, category, responsible } = item.punchItem;
                    return {
                        key: item.key,
                        id: punchItemNo,
                        title: punchItemNo,
                        description: [
                            { value: tagNo, label: 'TagNo' },
                            { value: category, label: 'Category' },
                            { value: responsible, label: 'Responsible' },
                        ],
                        objects: item.tag,
                    };
                },
            });
        }
        return acc;
    }, [] as SearchResult[]);
}
