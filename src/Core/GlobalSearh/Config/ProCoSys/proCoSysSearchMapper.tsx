import { getHighlightedText } from '../../Functions/getHiglight';
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
                descriptionProps: { ...item.tag },
                descriptionComponent: ({
                    searchText,
                    mcPkgNo,
                    commPkgNo,
                    disciplineDescription,
                }) => {
                    return (
                        <>
                            {commPkgNo && (
                                <>
                                    <span>Comm Pkg</span>
                                    <b> {getHighlightedText(commPkgNo || '', searchText)}</b>
                                </>
                            )}
                            {mcPkgNo && (
                                <>
                                    <span> | MC Pkg</span>
                                    <b> {getHighlightedText(mcPkgNo || '', searchText)}</b>
                                </>
                            )}
                            {disciplineDescription && (
                                <>
                                    <span> | Discipline </span>
                                    <b>
                                        {getHighlightedText(
                                            disciplineDescription || '',
                                            searchText
                                        )}
                                    </b>
                                </>
                            )}
                            {/* {description && (
                                <>
                                    <span> | Description</span>
                                    <b> {getHighlightedText(description || '', searchText)}</b>
                                </>
                            )} */}
                        </>
                    );
                },
                mapper: (item) => {
                    const { tagNo } = item.tag;
                    return {
                        key: item.key,
                        id: tagNo,
                        title: tagNo,
                        // description: `MC pkg: ${mcPkgNo} | Comm Pkg: ${commPkgNo} | ${description}`,
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
                descriptionProps: { ...item.mcPkg },
                descriptionComponent: ({ searchText, commPkgNo, discipline }) => {
                    return (
                        <>
                            <span>Comm Pkg</span>
                            <b> {getHighlightedText(commPkgNo || '', searchText)}</b>
                            <span> | Discipline</span>
                            <b> {getHighlightedText(discipline || '', searchText)}</b>
                        </>
                    );
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

        //         [11:58 AM] Per Kristian Veiberg
        // "Description" trengs ikke å gjentas på alle

        // [11:58 AM] Per Kristian Veiberg
        // mcpack og compack vises der hvor den finnes

        // [11:59 AM] Per Kristian Veiberg
        // discipline bør vises på tag og mcpkg

        // [11:59 AM] Per Kristian Veiberg
        // responsible, kategori, responsible og tag bør vises på punch

        if (item.commPkg) {
            return searchPushItem(acc, item, {
                type: 'commPkg',
                title: 'CommPkgs',
                color: '#0084C4',
                action: (id: string) => {
                    window.location.hash = `handoverDetails/${id}`;
                },
                descriptionProps: { ...item.commPkg },
                descriptionComponent: ({ searchText, description }) => {
                    return (
                        <>
                            <span> | Description</span>
                            <b> {getHighlightedText(description || '', searchText)}</b>
                        </>
                    );
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
                descriptionProps: { ...item.punchItem },
                descriptionComponent: ({ searchText, responsible, category, tagNo }) => {
                    return (
                        <>
                            <span>TagNo</span>
                            <b> {getHighlightedText(tagNo || '', searchText)}</b>
                            <span> | Category</span>
                            <b> {getHighlightedText(category || '', searchText)}</b>
                            <span> | Responsible</span>
                            <b> {getHighlightedText(responsible || '', searchText)}</b>
                        </>
                    );
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
