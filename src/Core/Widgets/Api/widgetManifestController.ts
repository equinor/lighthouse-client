import { fetchWidget, fetchWidgets } from '../../../apps/widgets';
import { WidgetManifest } from '../Types/widget';
import { widgetManifestStore } from './widgetsStore';

/**
 * Retrieve all  manifest from store, if stor is empty or has demo widget
 * this wil fetch all widgets and add them to the store.
 *
 * @return {*}  {Promise<WidgetManifest[]>}
 */
export async function getWidgetManifests(): Promise<WidgetManifest[]> {
    if (widgetManifestStore.length === 1 || widgetManifestStore.length === 0) {
        const widgetManifests = await fetchWidgets();
        widgetManifests.forEach((widgetManifest) => {
            _addWidgetManifest(widgetManifest);
        });
        return widgetManifests;
    }
    return widgetManifestStore;
}

/**
 * Retrieve manifests from store by type, none found
 * this will try to fetch manifests and add them to store.
 *
 * @param {string} widgetType
 * @return {*}  {Promise<WidgetManifest[]>}
 */
export async function getWidgetManifestByType(widgetType: string): Promise<WidgetManifest[]> {
    const currentManifests = widgetManifestStore.filter(
        (widget) => widget.widgetType === widgetType
    );
    if (currentManifests.length > 0) return currentManifests;

    const widgetManifests = await fetchWidgets(widgetType);
    if (widgetManifests.length) {
        widgetManifests.forEach((widgetManifest) => {
            try {
                _addWidgetManifest(widgetManifest);
            } catch (error) {
                console.warn(error);
            }
        });
        return widgetManifests;
    }

    throw new Error(`Failed to find WidgetManifest by type ${widgetType}`);
}

/**
 * Retrieve manifests from store by widgetId, if not found.
 * it will try to fetch and then add to sore.
 *
 * @export
 * @param {string} widgetId
 * @return {*}  {Promise<WidgetManifest>}
 */
export async function getWidgetManifest(widgetId: string): Promise<WidgetManifest> {
    const currentManifest = widgetManifestStore.find((widget) => widget.widgetId === widgetId);
    if (currentManifest) return currentManifest;

    const widgetManifest = await fetchWidget(widgetId);
    if (widgetManifest) {
        _addWidgetManifest(widgetManifest);
        return widgetManifest;
    }

    throw new Error(`Failed to find WidgetManifest with id ${widgetId}`);
}

/**
 * Internal Function for adding Manifests to store.
 *
 * @param {WidgetManifest} manifest
 * @return {*}  {WidgetManifest}
 */
function _addWidgetManifest(manifest: WidgetManifest): WidgetManifest {
    if (widgetManifestStore.find((widget) => widget.widgetId === manifest.widgetId)) {
        throw new Error(`WidgetManifest already exist with id ${manifest.widgetId}`);
    }
    widgetManifestStore.push(manifest);
    return manifest;
}
