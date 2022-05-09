import { DefaultWidget } from '../Components/defaultWidget';
import { WidgetComponent, WidgetManifest } from '../Types/widget';

export const widgetManifestStore: WidgetManifest[] = [
    {
        widgetId: 'demo',
        title: 'Demo Sidesheet',
        widgetType: 'sidesheet',
        color: '#341256',
    },
];

export const widgetSore: Record<string, WidgetComponent> = {
    demo: DefaultWidget,
};
