import { ComponentManifest, WidgetManifest } from '@equinor/lighthouse-widgets';

export interface SidesheetComponentManifest extends ComponentManifest {
    widgetType: 'sidesheet';
}

export interface SidesheetWidgetManifest extends WidgetManifest {
    widgetType: 'sidesheet';
    props: {
        resolverId: string;
        objectIdentifier: string;
    };
}
export interface CreatorWidgetManifest<T> extends WidgetManifest {
    widgetType: 'creator';
    props: T;
}
