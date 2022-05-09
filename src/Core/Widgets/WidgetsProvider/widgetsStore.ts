import { WidgetComponent, WidgetManifest } from '../Types/widget';
import { DemoSidesheetWidget } from './defaultWidget';

export const widgetManifestStore: WidgetManifest[] = [
    {
        widgetId: 'demo',
        title: 'Demo Sidesheet',
        widgetType: 'sidesheet',
        color: '#341256',
    },
];

export const widgetSore: Record<string, WidgetComponent> = {
    demo: DemoSidesheetWidget,
};
