import { SidesheetApi } from '@equinor/sidesheet';
import { CustomResolverFunction, ResolverFunction } from '../Types';
import { SidesheetComponentManifest, SidesheetManifest } from '../Types/SideSheets';

export interface WorkspaceSideSheet<T, SideSheetId extends string> {
    id: SideSheetId;
    component: React.FC<{ item: T; actions: SidesheetApi }>;
    title?: string;
    icon?: string | React.FC;
    color?: string;
    props: {
        objectIdentifier: keyof T;
        parentApp?: string;
        hasAccess?: boolean;
        function: CustomResolverFunction<T>;
    };
}

export type SidesheetConfigType =
    | 'SidesheetComponentManifest'
    | 'SidesheetManifest'
    | 'ResolverFunction'
    | 'WorkspaceSideSheet';

export function setupWorkspaceSidesheet<T, SideSheetId extends string>(
    config: WorkspaceSideSheet<T, SideSheetId>
): <C extends SidesheetConfigType>(
    type: C
) =>
    | {
          SidesheetComponentManifest: SidesheetComponentManifest<SideSheetId>;
          SidesheetManifest: SidesheetManifest<T, SideSheetId>;
          ResolverFunction: ResolverFunction<T, SideSheetId>;
          WorkspaceSideSheet: WorkspaceSideSheet<T, SideSheetId>;
      }[C] {
    const { id, component, props, title, icon, color } = config;
    return <C extends SidesheetConfigType>(type: C) => {
        return {
            SidesheetComponentManifest: {
                widgetId: id,
                widgetType: 'sidesheet',
                widget: component,
            } as SidesheetComponentManifest<SideSheetId>,
            SidesheetManifest: {
                widgetId: id,
                widgetType: 'sidesheet',
                title,
                icon,
                color,
                props: {
                    resolverId: `${id}Resolver`,
                    objectIdentifier: props.objectIdentifier,
                    parentApp: props.parentApp,
                    hasAccess: props.hasAccess,
                },
            } as SidesheetManifest<T, SideSheetId>,
            ResolverFunction: {
                function: props.function,
                functionId: `${id}Resolver`,
            } as ResolverFunction<T, SideSheetId>,
            WorkspaceSideSheet: {
                ...config,
            } as WorkspaceSideSheet<T, SideSheetId>,
        }[type];
    };
}
