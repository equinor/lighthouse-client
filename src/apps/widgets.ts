import { ComponentManifest, WidgetManifest } from '@equinor/lighthouse-widgets';
import {
    actionCenterSidesheetWidgetComponent,
    actionCenterSidesheetWidgetManifest
} from '../components/ActionCenter/ActionCenterSidesheet';
import {
    ReleaseControlHTSidesheetWidgetComponent,
    ReleaseControlHTSidesheetWidgetManifest
} from './DisciplineReleaseControl/DisciplineReleaseControlWidgets';
import {
    changeSideSheetWidgetComponent,
    changeSideSheetWidgetManifest
} from './ScopeChangeRequest/ScopeChangeRequestApp';

const _widgets: WidgetManifest[] = [
    changeSideSheetWidgetManifest,
    ReleaseControlHTSidesheetWidgetManifest,
    actionCenterSidesheetWidgetManifest,
];

const _widgetComponents: ComponentManifest[] = [
    changeSideSheetWidgetComponent,
    ReleaseControlHTSidesheetWidgetComponent,
    actionCenterSidesheetWidgetComponent,
];

export async function fetchWidgets(widgetType?: string): Promise<WidgetManifest[]> {
    return new Promise((resolve) => {
        if (widgetType) {
            resolve(_widgets.filter((widget) => widget.widgetType === widgetType));
        }
        resolve(_widgets);
    });
}
export async function fetchWidget(widgetId: string): Promise<WidgetManifest> {
    return new Promise((resolve, reject) => {
        const widget = _widgets.find((widget) => widget.widgetId === widgetId);
        if (widget) return resolve(widget);
        return reject(`No widget fount with id ${widgetId}`);
    });
}

export function fetchComponent(widgetId: string): Promise<ComponentManifest> {
    return new Promise((resolve, reject) => {
        const component = _widgetComponents.find((component) => component.widgetId === widgetId);
        if (component) return resolve(component);
        return reject(`No component fount with id ${widgetId}`);
    });
}
