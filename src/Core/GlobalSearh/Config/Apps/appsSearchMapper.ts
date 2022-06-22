import { tokens } from '@equinor/eds-tokens';
import { SearchItem, SearchResult } from '../../Service/SearchApi';

function navigate(uri: string) {
    const url = new URL(window.location.href);
    url.pathname = uri;
    window.history.pushState({}, '', url);
}

export const appsSearchMapper = (data?: SearchItem[]): SearchResult => ({
    type: 'apps',
    title: 'Applications',
    color: tokens.colors.interactive.success__resting.rgba,
    action: (id: string, item: SearchItem) => {
        if (item.uri) {
            window.open(item.uri, '_blank');
            return;
        }

        navigate(`${item.group}/${id}`);
    },
    items: data || [],
});
