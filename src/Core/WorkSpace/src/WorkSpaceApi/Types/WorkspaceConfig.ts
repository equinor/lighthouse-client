import { SidesheetApi } from '@equinor/sidesheet';
import { ResolverFunction } from './functions';
import { SidesheetComponentManifest, SidesheetWidgetManifest } from './SideSheets';

export interface WorkSpaceSideSheet<T, SideSheetIds extends string>
    extends SidesheetWidgetManifest<T, SideSheetIds>,
        SidesheetComponentManifest<SideSheetIds> {
    widgetId: SideSheetIds;
    widget: React.FC<{ item: T; actions: SidesheetApi }>;
    resolver: ResolverFunction<T, SideSheetIds>;
}
export type WorkSpaceGroupSideSheet<T, SideSheetIds extends string> = WorkSpaceSideSheet<
    T,
    SideSheetIds
>;
