export function handleUpdateHashUrl(widgetId: string, itemId: string): void {
    const url = new URL(window.location.href);
    url.hash = `${widgetId}/${itemId}`;
    window.history.pushState({}, '', url);
}

export function handleExtractHashUrl(): { widgetId?: string; itemId?: string } {
    const url = new URL(window.location.href);
    const values = url.hash.replace('#', '').split('/');
    return { widgetId: values[0], itemId: values[1] };
}
