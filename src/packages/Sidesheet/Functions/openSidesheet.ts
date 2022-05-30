import { spawnConfirmationDialog } from '@equinor/lighthouse-confirmation-dialog';
import Functions from '@equinor/lighthouse-functions';
import Widget, { WidgetManifest } from '@equinor/lighthouse-widgets';
import React from 'react';
import { DefaultDataView } from '../Components/DefaultDataView';
import { NoAccess } from '../Components/NoAccessSidesheet';
import { SuspenseSidesheet } from '../Components/SuspenseSidesheet';
import { DEFAULT_TAB_COLOR, getSidesheetContext } from '../context/sidesheetContext';
import { dispatch, readState } from '../State/actions';
import { SidesheetApi } from '../Types/SidesheetApi';
import { SidesheetEvents } from '../Types/sidesheetEvents';
import { handleUpdateHashUrl } from '../Utils/urlHandler';
import { notifyListeners } from './notifyListeners';

export function hasUnsavedChanges(): boolean {
    return readState(getSidesheetContext(), (s) => s.hasUnsavedChanges);
}

export function openSidesheet<T>(
    SidesheetContent?: React.FC<{ item: T; actions: SidesheetApi }>,
    props?: T,
    manifest?: Partial<WidgetManifest>
): void {
    if (!SidesheetContent && !props) return;
    let appName: string | undefined;
    let color = DEFAULT_TAB_COLOR;
    /**
     * If unsaved changes, spawn confirmation dialog.
     */
    if (hasUnsavedChanges()) {
        spawnConfirmationDialog(
            'Unsaved changes, are you sure you want to abandon your changes',
            'Warning!',
            () => {
                dispatch(getSidesheetContext(), (s) => ({ ...s, hasUnsavedChanges: false }));
                openSidesheet(SidesheetContent, props, manifest);
            }
        );
        return;
    }

    notifyListeners(SidesheetEvents.SidesheetOpened);

    /**
     *  Handles manifest extraction and url update if needed.
     */
    if (manifest) {
        appName = manifest.props?.parentApp;
        color = manifest.color || DEFAULT_TAB_COLOR;

        handleUpdateHashUrl(
            manifest.widgetId || '',
            (props && props[`${manifest.props?.objectIdentifier}`]) || ''
        );
    }

    /**
     *  Check if user has access to sidesheet
     */
    if (manifest?.props?.hasAccess === false) {
        dispatch(getSidesheetContext(), (state) => {
            manifest.color = DEFAULT_TAB_COLOR;
            return {
                ...state,
                isMinimized: false,
                SidesheetComponent: NoAccess as React.FC<unknown>,
                props: manifest,
                color: manifest.color,
                appName,
            };
        });
        return;
    }

    /**
     *  Clear color on SuspenseSidesheet
     */
    if (SidesheetContent?.name === 'SuspenseSidesheet') color = 'none';

    dispatch(getSidesheetContext(), (state) => {
        return {
            ...state,
            isMinimized: false,
            SidesheetComponent: (SidesheetContent as React.FC<unknown>) || DefaultDataView,
            props,
            color,
            appName,
        };
    });
}

export async function openSidesheetById<T>(
    sideSheetId: string,
    id?: string,
    props?: T
): Promise<void> {
    async function mountAsync() {
        const SidesheetContent = await Widget.getWidget(sideSheetId);
        const manifest = await Widget.getWidgetManifest(sideSheetId);

        if (!id) {
            openSidesheet(SidesheetContent, undefined, manifest);
            return;
        }

        const resolver = await Functions.getFunction(manifest.props?.resolverId || '');

        if (typeof resolver === 'function') props = await resolver(id);

        openSidesheet(SidesheetContent, props, manifest);
    }

    openSidesheet(SuspenseSidesheet, mountAsync);
}
