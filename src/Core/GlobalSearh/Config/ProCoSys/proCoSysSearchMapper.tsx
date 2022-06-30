import { NavigateFunction } from 'react-router';
import { SearchDescription, SearchResult } from '../../Service/SearchApi';
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
                    const { tagNo, commPkgNo, mcPkgNo, disciplineDescription, description } =
                        item.tag;

                    const descriptions: SearchDescription[] = [];
                    commPkgNo && descriptions.push({ value: commPkgNo, label: 'Comm Pkg' });
                    mcPkgNo && descriptions.push({ value: mcPkgNo, label: 'MC Pkg' });
                    disciplineDescription &&
                        descriptions.push({ value: disciplineDescription, label: 'Discipline' });

                    return {
                        key: item.key,
                        id: tagNo,
                        title: description ? `${tagNo}, ${description}` : tagNo,
                        description: descriptions,
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
                appAction: (id: string, navigate: NavigateFunction) => {
                    navigate(`ConstructionAndCommissioning/mc#mcDetails/${id}`);
                },
                mapper: (item) => {
                    const { mcPkgNo, commPkgNo, discipline, description } = item.mcPkg;

                    const descriptions: SearchDescription[] = [];
                    commPkgNo && descriptions.push({ value: commPkgNo, label: 'Comm Pkg' });
                    discipline && descriptions.push({ value: discipline, label: 'Discipline' });

                    return {
                        key: item.key,
                        id: mcPkgNo,
                        group: 'ConstructionAndCommissioning',
                        title: description ? `${mcPkgNo}, ${description}` : mcPkgNo,
                        description: descriptions,
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
                appAction: (id: string, navigate: NavigateFunction) => {
                    navigate(`ConstructionAndCommissioning/handover#handoverDetails/${id}`);
                },
                mapper: (item) => {
                    const { commPkgNo, description, responsible, area, remark } = item.commPkg;

                    const descriptions: SearchDescription[] = [];
                    responsible && descriptions.push({ value: responsible, label: 'Responsible' });
                    remark && descriptions.push({ value: remark, label: 'Remark' });
                    area && descriptions.push({ value: area, label: 'Area' });

                    return {
                        key: item.key,
                        id: commPkgNo,

                        title: description ? `${commPkgNo}, ${description}` : commPkgNo,
                        description: descriptions,
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

                    const descriptions: SearchDescription[] = [];
                    tagNo && descriptions.push({ value: tagNo, label: 'TagNo' });
                    category && descriptions.push({ value: category, label: 'Category' });
                    responsible && descriptions.push({ value: responsible, label: 'Responsible' });

                    return {
                        key: item.key,
                        id: punchItemNo,
                        title: punchItemNo,
                        description: descriptions,
                        objects: item.tag,
                    };
                },
            });
        }
        return acc;
    }, [] as SearchResult[]);
}
