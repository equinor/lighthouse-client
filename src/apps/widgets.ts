import {
  workflowComponent,
  workflowStepComponent,
  workflowStepWidgetManifest,
  workflowWidgetManifest,
} from '@equinor/Admin';
import { CreatorManifest } from '@equinor/lighthouse-fusion-modules';
import { ComponentManifest, WidgetManifest } from '@equinor/lighthouse-widgets';
import { handoverCreatorComponent, handoverCreatorManifest } from './Handover';
import {
  actionCenterSidesheetWidgetComponent,
  actionCenterSidesheetWidgetManifest,
} from '../components/ActionCenter/ActionCenterSidesheet';

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
import {
  htSidesheetWidgetManifest,
  ReleaseControlSidesheetWidgetManifest,
  htSidesheetWidgetComponent,
  ReleaseControlSidesheetWidgetComponent,
} from './DisciplineReleaseControl/sidesheet';

const _widgets: WidgetManifest[] = [
  changeSideSheetWidgetManifest,
  htSidesheetWidgetManifest as any,
  ReleaseControlSidesheetWidgetManifest as any,
  actionCenterSidesheetWidgetManifest,
  changeCreatorManifest,
  releaseManifest,
  swcrCreatorManifest,
  handoverCreatorManifest,
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
  htSidesheetWidgetComponent as any,
  ReleaseControlSidesheetWidgetComponent as any,
  actionCenterSidesheetWidgetComponent,
  changeCreatorComponent,
  releaseComponent,
  workflowComponent,
  workflowStepComponent,
  swcrCreatorComponent,
  workOrderCreatorComponent,
  workOrderCreatorComponent,
  handoverCreatorComponent,
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
