import {
    workflowComponent,
    workflowStepComponent,
    workflowStepWidgetManifest,
    workflowWidgetManifest,
} from '@equinor/Admin';
import { CreatorManifest } from '@equinor/lighthouse-fusion-modules';
import { ComponentManifest, WidgetManifest } from '@equinor/lighthouse-widgets';
import {
    actionCenterSidesheetWidgetComponent,
    actionCenterSidesheetWidgetManifest,
} from '../components/ActionCenter/ActionCenterSidesheet';
import {
    htSidesheetWidgetComponent,
    htSidesheetWidgetManifest,
    ReleaseControlSidesheetWidgetComponent,
    ReleaseControlSidesheetWidgetManifest,
} from './DisciplineReleaseControl/DisciplineReleaseControlWidgets';
import { loopSidesheetWidgetComponent, loopSidesheetWidgetManifest } from './Loop/utility/config';
import { mcCreatorComponent, mcCreatorManifest } from './MechanicalCompletion';
import {
    punchSidesheetWidgetComponent,
    punchSidesheetWidgetManifest,
} from './Punch/utility/config';
import {
    querySidesheetWidgetComponent,
    querySidesheetWidgetManifest,
} from './Query/utility/config';
import { releaseComponent, releaseManifest } from './ReleaseControl/ReleaseControlApp';
import {
    releaseCreatorComponent,
    releaseCreatorManifest,
} from './ReleaseControl/workspaceConfig/DataCreator/dataCreatorConfig';
import {
    changeSideSheetWidgetComponent,
    changeSideSheetWidgetManifest,
} from './ScopeChangeRequest/ScopeChangeRequestApp';
import {
    changeCreatorComponent,
    changeCreatorManifest,
} from './ScopeChangeRequest/workspaceConfig/dataCreatorConfig';
import { swcrCreatorComponent, swcrCreatorManifest } from './swcr';
import { tagWidgetComponent, tagWidgetManifest } from './Tags';
import {
    workOrderCreatorComponent,
    workOrderCreatorManifest,
} from './WorkOrder/utility/sidesheetConfig';

const _widgets: WidgetManifest[] = [
    changeSideSheetWidgetManifest,
    htSidesheetWidgetManifest,
    ReleaseControlSidesheetWidgetManifest,
    actionCenterSidesheetWidgetManifest,
    changeCreatorManifest,
    releaseManifest,
    swcrCreatorManifest,
    workOrderCreatorManifest,
    releaseCreatorManifest,
    workflowWidgetManifest,
    punchSidesheetWidgetManifest,
    querySidesheetWidgetManifest,
    workflowStepWidgetManifest,
    mcCreatorManifest,
    loopSidesheetWidgetManifest,
    tagWidgetManifest,
];

const _widgetComponents: ComponentManifest[] = [
    changeSideSheetWidgetComponent,
    htSidesheetWidgetComponent,
    ReleaseControlSidesheetWidgetComponent,
    actionCenterSidesheetWidgetComponent,
    changeCreatorComponent,
    releaseComponent,
    workflowComponent,
    workflowStepComponent,
    swcrCreatorComponent,
    workOrderCreatorComponent,
    workOrderCreatorComponent,
    releaseCreatorComponent,
    punchSidesheetWidgetComponent,
    querySidesheetWidgetComponent,
    mcCreatorComponent,
    tagWidgetComponent,
    loopSidesheetWidgetComponent,
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
