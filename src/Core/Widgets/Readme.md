# Widget Readme

## Spec
A widget is a functional component that can be mounted anywhere, as long as the widgets 
requirements are met. 

- WidgetManifest
- WidgetComponent
- WidgetConfigure
- WidgetLoader

```TS
    interface WidgetManifest {
        widgetId: string;
        widgetType: string;
        title: string;
        icon?: string | React.FC;
        color: string;
    }
```