import { DefaultWidget } from '../Components/defaultWidget';
import { Widget, WidgetComponent, WidgetManifest } from '../Types/widget';
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
    return DefaultWidget;
}

export function addWidgets(widgets: Widget[]): void {
    widgets.forEach((widget) => addWidget(widget.manifest.widgetId, widget.widget));
}

export function addWidget(widgetId: string, widget: WidgetComponent): void {
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
