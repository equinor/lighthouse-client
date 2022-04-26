import React from 'react';
import { DefaultDataView } from '../Components/DefaultDataView';
import { getSidesheetContext } from '../context/sidesheetContext';
import { dispatch, readState } from '../State/actions';
import { SidesheetApi } from '../Types/SidesheetApi';

export function openSidesheet<T>(
    SidesheetContent?: React.FC<{ item: T; actions: SidesheetApi }>,
    props?: T,
    appName?: string
): void {
    if (!SidesheetContent && !props) return;

    const isPinned = readState(getSidesheetContext(), (state) => state.isPinned);
    dispatch(getSidesheetContext(), (state) => {
        return {
            ...state,
            isMinimized: false,
            SidesheetComponent: (SidesheetContent as React.FC<unknown>) || DefaultDataView,
            props,
            isPinned: isPinned,
            appName: appName,
        };
    });
}
