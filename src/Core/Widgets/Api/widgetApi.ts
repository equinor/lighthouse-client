import { WidgetComponent as IWidget, WidgetManifest, Widgets } from '../Types/widget';
import {
    addWidgets,
    getWidgetById,
    getWidgetManifestById,
    getWidgetManifests
} from './widgetController';

interface IWidgetApi {
    getWidget(widgetId: string): IWidget;
    getWidgetManifest(manifestId: string): WidgetManifest;
    getWidgetManifests(): WidgetManifest[];
    addWidgets(widgets: Widgets): void;
}

export const Widget: IWidgetApi = {
    getWidget: (widgetId: string): IWidget => getWidgetById(widgetId),
    getWidgetManifest: (manifestId: string): WidgetManifest => getWidgetManifestById(manifestId),
    getWidgetManifests,
    addWidgets,
};
