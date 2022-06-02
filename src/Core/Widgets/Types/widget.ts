export interface WidgetManifest {
    widgetId: string;
    widgetType: string;
    title?: string;
    icon?: string | React.FC;
    color?: string;
    props?: Record<string, any>;
}

export type WidgetComponent = React.FC<any>;

export interface ComponentManifest {
    widget: WidgetComponent;
    widgetType: string;
    widgetId: string;
}
