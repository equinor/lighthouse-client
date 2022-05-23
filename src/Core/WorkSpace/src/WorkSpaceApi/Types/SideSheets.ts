import { ComponentManifest, WidgetManifest } from '@equinor/lighthouse-widgets';
import { ResolverIdFormat } from './functions';

export interface SidesheetComponentManifest<SideSheetId extends string> extends ComponentManifest {
    widgetId: SideSheetId;
    widgetType: 'sidesheet';
}

export interface SidesheetWidgetManifest<T, SideSheetId extends string> extends WidgetManifest {
    widgetId: SideSheetId;
    widgetType: 'sidesheet';
    props: {
        resolverId: ResolverIdFormat<SideSheetId>;
        objectIdentifier: keyof T;
        parentApp?: string;
    };
}
