import { fetchComponent } from '../../../apps/widgets';
import { WidgetComponent } from '../Types/widget';
import { widgetSore } from './widgetsStore';

/**
 * Retrieve Widget React Component by widgetId from the WidgetComponentStore,
 * if not in the store it will try to fetch it and add to WidgetComponentStore.
 *
 * @export
 * @param {string} widgetId
 * @return {*}  {Promise<WidgetComponent>}
 */
export async function getWidgetById(widgetId: string): Promise<WidgetComponent> {
    const currentComponent = widgetSore[widgetId];
    if (currentComponent) return currentComponent;

    const componentManifest = await fetchComponent(widgetId);
    if (componentManifest) {
        try {
            return _addWidget(componentManifest.widgetId, componentManifest.widget);
        } catch (error) {
            console.warn(error);
        }
    }

    throw new Error(`Failed to find WidgetComponent with id ${widgetId}`);
}

/**
 * Internal Function for adding WidgetComponent to WidgetComponentStore.
 *
 * @param {string} widgetId
 * @param {WidgetComponent} widget
 * @return {*}  {WidgetComponent}
 */
function _addWidget(widgetId: string, widget: WidgetComponent): WidgetComponent {
    if (widgetSore[widgetId]) {
        throw new Error(`Widget already exist with id ${widgetId}`);
    }
    widgetSore[widgetId] = widget;
    return widgetSore[widgetId];
}
