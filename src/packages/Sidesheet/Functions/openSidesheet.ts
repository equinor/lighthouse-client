import { deref, swap } from '@dbeining/react-atom';
import Functions from '@equinor/lighthouse-functions';
import Widget, { WidgetManifest } from '@equinor/lighthouse-widgets';
import React from 'react';
import { getApps } from '../../../apps/apps';
import { spawnConfirmationDialog } from '../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { DefaultDataView } from '../Components/DefaultDataView';
import { SuspenseSidesheet } from '../Components/SuspenseSidesheet';
import {
    DEFAULT_TAB_COLOR,
    getSidesheetContext,
    SidesheetCoreContext,
} from '../context/sidesheetContext';
import { dispatch } from '../State/actions';
import { SidesheetApi } from '../Types/SidesheetApi';

export function openSidesheet<T>(
    SidesheetContent?: React.FC<{ item: T; actions: SidesheetApi }>,
    props?: T,
    appName?: string,
    manifest?: Partial<WidgetManifest>
): void {
    if (!SidesheetContent && !props) return;

    /**
     * If unsaved changes, spawn confirmation dialog
     */
    const state = deref(SidesheetCoreContext);
    if (state.hasUnsavedChanges) {
        spawnConfirmationDialog(
            'Unsaved changes, are you sure you want to abandon your changes',
            'Warning!',
            () => {
                swap(SidesheetCoreContext, (s) => ({ ...s, hasUnsavedChanges: false }));
                openSidesheet(SidesheetContent, props, appName, manifest);
            }
        );
        return;
    }

    // Temporary Hack for not braking old code.
    let color =
        getApps().find(({ shortName }) => shortName === appName)?.color ||
        (DEFAULT_TAB_COLOR as string);

    if (manifest) {
        color = manifest.color || DEFAULT_TAB_COLOR;
    }
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
            openSidesheet(SidesheetContent, {}, '', manifest);
        }

        const resolver = await Functions.getFunction(manifest.props?.resolverId);

        if (typeof resolver === 'function') props = await resolver(id);

        openSidesheet(SidesheetContent, props, undefined, manifest);
    }

    openSidesheet(SuspenseSidesheet, mountAsync, id);
}
