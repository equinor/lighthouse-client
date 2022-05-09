import { WidgetComponent, WidgetManifest } from '../Widgets/Types/widget';
import { DemoSidesheetWidget } from '../Widgets/WidgetsProvider/defaultWidget';

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
