import { CreatorManifest } from '@equinor/lighthouse-fusion-modules';
import { ComponentManifest, WidgetManifest } from '@equinor/lighthouse-widgets';
import {
    actionCenterSidesheetWidgetComponent,
    actionCenterSidesheetWidgetManifest
} from '../components/ActionCenter/ActionCenterSidesheet';
import {
    htSidesheetWidgetComponent,
    htSidesheetWidgetManifest,
    ReleaseControlSidesheetWidgetComponent,
    ReleaseControlSidesheetWidgetManifest
} from './DisciplineReleaseControl/DisciplineReleaseControlWidgets';
import { handoverCreatorComponent, handoverCreatorManifest } from './Handover';
import {
    releaseCreatorComponent,
    releaseCreatorManifest
} from './ReleaseControl/ReleaseControlApp';
import {
    changeSideSheetWidgetComponent,
    changeSideSheetWidgetManifest
} from './ScopeChangeRequest/ScopeChangeRequestApp';
import {
    changeCreatorComponent,
    changeCreatorManifest
} from './ScopeChangeRequest/workspaceConfig/dataCreatorConfig';
import { swcrCreatorComponent, swcrCreatorManifest } from './swcr';
import { workOrderCreatorComponent, workOrderCreatorManifest } from './WorkOrder';


const _widgets: WidgetManifest[] = [
    changeSideSheetWidgetManifest,
    htSidesheetWidgetManifest,
    ReleaseControlSidesheetWidgetManifest,
    actionCenterSidesheetWidgetManifest,
    changeCreatorManifest,
    releaseCreatorManifest,
    swcrCreatorManifest,
    handoverCreatorManifest,
    workOrderCreatorManifest,
    releaseCreatorManifest,
];

const _widgetComponents: ComponentManifest[] = [
    changeSideSheetWidgetComponent,
    htSidesheetWidgetComponent,
    ReleaseControlSidesheetWidgetComponent,
    actionCenterSidesheetWidgetComponent,
    changeCreatorComponent,
    releaseCreatorComponent,
    swcrCreatorComponent,
    handoverCreatorComponent,
    workOrderCreatorComponent,
    workOrderCreatorComponent,
    releaseCreatorComponent,
];

export async function getCreators(): Promise<CreatorManifest[]> {
    const creators = await fetchWidgets('creator');
    if (creators.every((creator) => creator.widgetType === 'creator')) {
        return creators as CreatorManifest[];
    }

    return [];
}

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

export function fetchComponent(widgetId: string): Promise<React.FC<any>> {
    return new Promise((resolve, reject) => {
        const component = _widgetComponents.find((component) => component.widgetId === widgetId);
        if (component) return resolve(component.widget);
        return reject(`No component fount with id ${widgetId}`);
    });
}
