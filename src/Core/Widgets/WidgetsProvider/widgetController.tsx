import { WidgetComponent, WidgetManifest } from '../Types/widget';
import { DefaultWidget } from './defaultWidget';
import { widgetManifestStore, widgetSore } from './widgetsStore';

export function getWidgetManifests(): WidgetManifest[] {
    return widgetManifestStore;
}

export function getWidgetManifestById(widgetId: string): WidgetManifest {
    return (
        widgetManifestStore.find((widget) => widget.widgetId === widgetId) || {
            title: 'Unknown',
            widgetId: 'unknown',
            widgetType: 'error',
        }
    );
}

export function getWidgetById(widgetId: string): WidgetComponent {
    const Widget = widgetSore[widgetId];
    if (Widget) return Widget;
    const Default = () => <DefaultWidget widgetId={widgetId} />;
    return Default;
}

export function addWidgetComponent(widgetId: string, widget: WidgetComponent): void {
    if (widgetSore[widgetId]) {
        throw `Widget already exist with id ${widgetId}`;
    }
    widgetSore[widgetId] = widget;
}

export function addWidgetManifest(manifest: WidgetManifest): void {
    if (widgetManifestStore.find((widget) => widget.widgetId === manifest.widgetId)) {
        throw `WidgetManifest already exist with id ${manifest.widgetId}`;
    }
    widgetManifestStore.push(manifest);
}

export function addWidgets(widgets: { manifest: WidgetManifest; widget: WidgetComponent }[]): void {
    widgets.forEach((w) => {
        addWidgetComponent(w.manifest.widgetId, w.widget);
        addWidgetManifest(w.manifest);
    });
}

window['widget'] = {
    addWidgets,
    addWidgetManifest,
    getWidgetById,
    getWidgetManifestById,
    getWidgetManifests,
};
