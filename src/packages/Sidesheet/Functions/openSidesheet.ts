import { Functions } from '@equinor/lighthouse-functions';
import { Widget } from '@equinor/lighthouse-widgets';
import React from 'react';
import { DefaultDataView } from '../Components/DefaultDataView';
import { SuspenseSidesheet } from '../Components/SuspenseSidesheet';
import { getSidesheetContext } from '../context/sidesheetContext';
import { dispatch } from '../State/actions';
import { SidesheetApi } from '../Types/SidesheetApi';

export function openSidesheet<T>(
    SidesheetContent?: React.FC<{ item: T; actions: SidesheetApi }>,
    props?: T,
    appName?: string
): void {
    if (!SidesheetContent && !props) return;

    dispatch(getSidesheetContext(), (state) => {
        return {
            ...state,
            isMinimized: false,
            SidesheetComponent: (SidesheetContent as React.FC<unknown>) || DefaultDataView,
            props,
            appName: appName,
        };
    });
}

export async function openDetail<T>(sideSheetId: string, id?: string, props?: T): Promise<void> {
    async function mountAsync() {
        const SidesheetContent = Widget.getWidget(sideSheetId);

        const manifest = Widget.getWidgetManifest(sideSheetId);
        // debugger;
        const resolver = Functions.getFunction(manifest.props?.resolverId);
        if (typeof resolver === 'function') props = await resolver(id);
        registerSidesheet(SidesheetContent, props);
    }
    registerSidesheet(SuspenseSidesheet, mountAsync);
}

window['openSidesheet'] = openDetail;

export function registerSidesheet<T>(
    SidesheetContent?: React.FC<{ item: T; actions: SidesheetApi }>,
    props?: T
): void {
    if (!SidesheetContent && !props) return;

    dispatch(getSidesheetContext(), (state) => {
        return {
            ...state,
            isMinimized: false,
            SidesheetComponent: (SidesheetContent as React.FC<unknown>) || DefaultDataView,
            props,
        };
    });
}
