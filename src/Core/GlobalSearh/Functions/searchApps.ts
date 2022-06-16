import { AppManifest, isProduction } from '@equinor/lighthouse-portal-client';

export function searchApps(apps: AppManifest[], searchString: string) {
    if (searchString.length === 0) return [];
    return apps
        .sort((a, b) => a.title.localeCompare(b.title))
        .filter(
            (app) =>
                app.tags.findIndex((tag) =>
                    tag.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
                ) > -1 || app.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
        )
        .slice(0, 5)
        .map((app) => ({
            title: app.title,
            description: app.tags.length > 0 ? `Tags: ${app.tags.toString()}` : '',
            id: app.shortName,
            uri: app.uri && app.uri(isProduction()),
            group: app.groupe,
        }));
}
