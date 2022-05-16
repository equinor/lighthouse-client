import { SidesheetApi } from '@equinor/sidesheet';
import { ResolverFunction } from './functions';
import { SidesheetComponentManifest, SidesheetWidgetManifest } from './SideSheets';

export interface WorkSpaceSideSheet<T> extends SidesheetWidgetManifest, SidesheetComponentManifest {
    widget: React.FC<{ item: T; actions: SidesheetApi }>;
    resolver: ResolverFunction<T>;
}
export interface WorkSpaceGroupSideSheet<T>
    extends SidesheetWidgetManifest,
        SidesheetComponentManifest {
    widget: React.FC<{ item: T; actions: SidesheetApi }>;
    resolver: ResolverFunction<T>;
}
export interface WorkSpaceListSideSheet {}
