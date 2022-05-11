import { WidgetComponent as IWidget, WidgetManifest } from '../Types/widget';
import { getWidgetById } from './widgetComponentController';
import {
    getWidgetManifest,
    getWidgetManifestByType,
    getWidgetManifests
} from './widgetManifestController';

interface WidgetApi {
    getWidget(widgetId: string): Promise<IWidget>;
    getWidgetManifest(manifestId: string): Promise<WidgetManifest>;
    getWidgetManifests(): Promise<WidgetManifest[]>;
    getWidgetManifestByType(widgetType: string): Promise<WidgetManifest[]>;
}

export const Widget: WidgetApi = {
    getWidget: getWidgetById,
    getWidgetManifest,
    getWidgetManifestByType,
    getWidgetManifests,
};
