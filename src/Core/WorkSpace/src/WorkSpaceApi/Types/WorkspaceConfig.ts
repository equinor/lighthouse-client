import { SidesheetApi } from '@equinor/sidesheet';
import { ResolverFunction } from './functions';
import { SidesheetComponentManifest, SidesheetManifest } from './SideSheets';

export interface WorkspaceSideSheet<T, SideSheetIds extends string>
    extends SidesheetManifest<T, SideSheetIds>,
        SidesheetComponentManifest<SideSheetIds> {
    widgetId: SideSheetIds;
    widget: React.FC<{ item: T; actions: SidesheetApi }>;
    resolver: ResolverFunction<T, SideSheetIds>;
}
export type WorkSpaceGroupSideSheet<T, SideSheetIds extends string> = WorkspaceSideSheet<
    T,
    SideSheetIds
>;
