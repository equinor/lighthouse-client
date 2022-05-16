export function handleHashUrl(widgetId: string, itemId: string): void {
    const url = new URL(window.location.href);
    url.hash = `${widgetId}/${itemId}`;
    window.history.pushState({}, '', url);
}
