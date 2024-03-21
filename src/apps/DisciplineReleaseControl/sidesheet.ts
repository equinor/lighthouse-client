import { htSidesheetCreator, rcSidesheetCreator } from './DisciplineReleaseControlWidgets';

export const htSidesheetWidgetManifest = htSidesheetCreator('SidesheetManifest');
export const htSidesheetWidgetComponent = htSidesheetCreator('SidesheetComponentManifest');
export const htResolverFunction = htSidesheetCreator('ResolverFunction');

export const ReleaseControlSidesheetWidgetManifest = rcSidesheetCreator('SidesheetManifest');
export const ReleaseControlSidesheetWidgetComponent = rcSidesheetCreator(
  'SidesheetComponentManifest'
);
export const rcResolverFunction = rcSidesheetCreator('ResolverFunction');
