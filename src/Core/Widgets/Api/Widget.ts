import { WidgetComponent as IWidget, WidgetManifest } from '../Types/widget';
import { getWidgetById, getWidgetManifestById } from '../WidgetsProvider';

export const Widget = {
    getWidget: (id: string): IWidget => {
        return getWidgetById(id);
    },
    getWidgetManifest: (id: string): WidgetManifest => {
        return getWidgetManifestById(id);
    },
};
