import Functions from '@equinor/lighthouse-functions';
import Widget from '@equinor/lighthouse-widgets';
import React from 'react';
import { SidesheetWidgetManifest } from '../../../Core/WorkSpace/src';
import { DefaultDataView } from '../Components/DefaultDataView';
import { SuspenseSidesheet } from '../Components/SuspenseSidesheet';
import { DEFAULT_TAB_COLOR, getSidesheetContext } from '../context/sidesheetContext';
import { dispatch } from '../State/actions';
import { SidesheetApi } from '../Types/SidesheetApi';
import { handleUpdateHashUrl } from '../Utils/urlHandler';

export function openSidesheet<T>(
    SidesheetContent?: React.FC<{ item: T; actions: SidesheetApi }>,
    props?: T,
    manifest?: Partial<SidesheetWidgetManifest<T>>
): void {
    if (!SidesheetContent && !props) return;

    // Temporary Hack for not braking old code.
    // let color =
    //     getApps().find(({ shortName }) => shortName === appName)?.color ||
    //     (DEFAULT_TAB_COLOR as string);
    let color = DEFAULT_TAB_COLOR;
    if (manifest) {
        color = manifest.color || DEFAULT_TAB_COLOR;
        handleUpdateHashUrl(
            manifest.widgetId || '',
            (props && props[`${manifest.props?.objectIdentifier}`]) || ''
        );
    }
    dispatch(getSidesheetContext(), (state) => {
        return {
            ...state,
            isMinimized: false,
            SidesheetComponent: (SidesheetContent as React.FC<unknown>) || DefaultDataView,
            props,
            color,
            appName: manifest?.props?.parentApp,
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
        const manifest = (await Widget.getWidgetManifest(sideSheetId)) as Partial<
            SidesheetWidgetManifest<any>
        >;

        if (!id) {
            openSidesheet(SidesheetContent, {}, manifest);
        }

        const resolver = await Functions.getFunction(manifest.props?.resolverId || '');

        if (typeof resolver === 'function') props = await resolver(id);

        openSidesheet(SidesheetContent, props, manifest);
    }

    openSidesheet(SuspenseSidesheet, mountAsync);
}
