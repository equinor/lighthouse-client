import React from 'react';
import { DefaultDataView } from '../Components/DefaultDataView';
import { getSidesheetContext } from '../context/sidesheetContext';
import { dispatch, readState } from '../State/actions';

export function openSidesheet<T>(SidesheetContent?: React.FC<T>, props?: T): void {
    if (!SidesheetContent && !props) return;

    const isPinned = readState(getSidesheetContext(), (state) => state.isPinned);
    dispatch(getSidesheetContext(), (state) => {
        return {
            ...state,
            isMinimized: false,
            SidesheetComponent: (SidesheetContent as React.FC<unknown>) || DefaultDataView,
            props,
            isPinned: isPinned,
        };
    });
}
