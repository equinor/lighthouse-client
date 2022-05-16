export interface WidgetManifest {
    widgetId: string;
    widgetType: string;
    title?: string;
    icon?: string | React.FC;
    color?: string;
    props?: Record<string, any>;
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

export type WidgetComponent = React.FC<any>;

export interface ComponentManifest {
    widget: WidgetComponent;
    widgetType: string;
    widgetId: string;
}

export interface SidesheetComponentManifest extends ComponentManifest {
    widgetType: 'sidesheet';
}
